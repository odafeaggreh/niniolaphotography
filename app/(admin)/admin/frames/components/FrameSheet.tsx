"use client";

import * as React from "react";
import { Product } from "@/app/types";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { ImageManager } from "@/components/admin/ImageManager";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const frameSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.string().min(1, "Price amount is required"),
  currency: z.string().min(1, "Currency is required"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.object({
    url: z.string().url(),
    isPrimary: z.boolean(),
    cloudinaryPublicId: z.string(),
  })).min(1, "At least one image is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["available", "out_of_stock", "unavailable"]),
  order: z.number().int(),
});

type FrameFormValues = z.infer<typeof frameSchema>;

interface FrameSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingFrame: Product | null;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export function FrameSheet({
  isOpen,
  onOpenChange,
  editingFrame,
  onSubmit,
  isLoading,
}: FrameSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FrameFormValues>({
    resolver: zodResolver(frameSchema),
    defaultValues: {
      status: "available",
      order: 0,
      category: "Frames",
      images: [],
      description: "",
    },
  });

  React.useEffect(() => {
    if (editingFrame) {
      // Parse existing price: "₦ 50,000" -> currency: "₦", amount: "50,000"
      const priceStr = editingFrame.price || "";
      const parts = priceStr.split(" ");
      let currency = "₦";
      let amount = priceStr;

      if (parts.length > 1) {
        currency = parts[0];
        amount = parts.slice(1).join(" ");
      } else if (priceStr.match(/^[₦$€£]/)) {
        currency = priceStr.charAt(0);
        amount = priceStr.slice(1).trim();
      }

      reset({
        title: editingFrame.title,
        amount: amount,
        currency: currency,
        category: editingFrame.category || "Frames",
        images: editingFrame.images || [],
        description: editingFrame.description || "",
        status: editingFrame.status || "available",
        order: editingFrame.order,
      });
    } else {
      reset({ 
        title: "", 
        amount: "", 
        currency: "₦",
        category: "Frames", 
        images: [], 
        description: "", 
        status: "available", 
        order: 0 
      });
    }
  }, [editingFrame, reset, isOpen]);

  const handleFormSubmit = (data: FrameFormValues) => {
    const { amount, currency, ...rest } = data;
    const formattedData = {
      ...rest,
      price: `${currency} ${amount}`.trim(),
    };
    onSubmit(formattedData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{editingFrame ? "Edit Frame" : "Add New Frame"}</SheetTitle>
          <SheetDescription>
            Enter the details for the frame product.
          </SheetDescription>
        </SheetHeader>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 py-4 px-4">
            <Field>
              <FieldLabel>Product Images</FieldLabel>
              <FieldContent>
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
                    <ImageManager
                      images={field.value}
                      onChange={field.onChange}
                      folder="products"
                    />
                  )}
                />
              </FieldContent>
              <FieldError errors={[errors.images]} />
            </Field>
  
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <FieldContent>
                <Input id="title" {...register("title")} placeholder="Frame Title" />
              </FieldContent>
              <FieldError errors={[errors.title]} />
            </Field>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid grid-cols-[100px_1fr] gap-4 items-end">
                <Field>
                  <FieldLabel>Currency</FieldLabel>
                  <FieldContent>
                    <Controller
                      name="currency"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="₦" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="₦">₦ (NGN)</SelectItem>
                            <SelectItem value="$">$ (USD)</SelectItem>
                            <SelectItem value="£">£ (GBP)</SelectItem>
                            <SelectItem value="€">€ (EUR)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel htmlFor="amount">Price</FieldLabel>
                  <FieldContent>
                    <Input id="amount" {...register("amount")} placeholder="50,000" />
                  </FieldContent>
                  <FieldError errors={[errors.amount]} />
                </Field>
              </div>
  
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <FieldContent>
                  <Input id="category" {...register("category")} placeholder="Frames" />
                </FieldContent>
                <FieldError errors={[errors.category]} />
              </Field>
            </div>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <FieldContent>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </FieldContent>
            <FieldError errors={[errors.description]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="status">Availability Status</FieldLabel>
            <FieldContent>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available / In Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FieldContent>
            <FieldError errors={[errors.status]} />
          </Field>

          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-gray-50 text-black">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingFrame ? "Update Frame" : "Create Frame"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
