"use client";

import * as React from "react";
import { Testimonial } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Field, FieldContent, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Star, Camera, User, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  text: z.string().min(1, "Testimonial text is required"),
  rating: z.number().min(1).max(5),
  avatarUrl: z.string().min(1, "Avatar is required"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingTestimonial: Testimonial | null;
  onSubmit: SubmitHandler<TestimonialFormValues>;
  isLoading: boolean;
}

export function TestimonialSheet({
  isOpen,
  onOpenChange,
  editingTestimonial,
  onSubmit,
  isLoading,
}: TestimonialSheetProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rating: 5,
      avatarUrl: "",
      text: "",
    },
  });

  const avatarUrl = watch("avatarUrl");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Get signature
      const signRes = await fetch("/api/admin/cloudinary-sign", {
        method: "POST",
        body: JSON.stringify({ folder: "testimonials" }),
      });
      const { signature, timestamp, cloudName, apiKey } = await signRes.json();

      // 2. Upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", apiKey);
      formData.append("folder", "testimonials");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setValue("avatarUrl", data.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  React.useEffect(() => {
    if (editingTestimonial) {
      reset({
        name: editingTestimonial.name,
        role: editingTestimonial.role,
        text: editingTestimonial.text,
        rating: editingTestimonial.rating,
        avatarUrl: editingTestimonial.avatarUrl || "",
      });
    } else {
      reset({ 
        name: "", 
        role: "", 
        text: "", 
        rating: 5, 
        avatarUrl: "", 
      });
    }
  }, [editingTestimonial, reset, isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</SheetTitle>
          <SheetDescription>
            Enter the client's feedback and details.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4 px-4">
          <Field>
            <FieldLabel>Client Avatar</FieldLabel>
            <FieldContent>
              <div className="flex flex-col items-center gap-4 py-2">
                <Avatar className="h-16 w-16 border border-white/10">
                  <AvatarImage src={avatarUrl || undefined} className="object-cover" />
                  <AvatarFallback className="bg-muted">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="bg-primary border-white/10 hover:bg-white/10 text-white"
                  >
                    {isUploading ? (
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    ) : (
                      <Camera className="mr-2 h-3 w-3" />
                    )}
                    {avatarUrl ? "Change Photo" : "Upload Photo"}
                  </Button>
                  
                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setValue("avatarUrl", "")}
                      className="text-[10px] text-destructive hover:underline"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </FieldContent>
            <FieldError errors={[errors.avatarUrl]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="name">Client Name</FieldLabel>
            <FieldContent>
              <Input id="name" {...register("name")} placeholder="e.g. Sarah Jenkins" />
            </FieldContent>
            <FieldError errors={[errors.name]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="role">Role / Location</FieldLabel>
            <FieldContent>
              <Input id="role" {...register("role")} placeholder="e.g. Creative Director / Lagos" />
            </FieldContent>
            <FieldError errors={[errors.role]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="rating">Rating (1-5)</FieldLabel>
            <FieldContent>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue("rating", star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= watch("rating")
                          ? "fill-accent-gold text-accent-gold"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </FieldContent>
            <FieldError errors={[errors.rating]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="text">Testimonial</FieldLabel>
            <FieldContent>
              <Textarea 
                id="text" 
                {...register("text")} 
                placeholder="The client's experience..."
                className="min-h-[120px]"
              />
            </FieldContent>
            <FieldError errors={[errors.text]} />
          </Field>


          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-gray-50 text-black">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingTestimonial ? "Update Testimonial" : "Create Testimonial"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
