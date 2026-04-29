"use client";

import * as React from "react";
import { Project } from "@/app/types";
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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { ImageManager } from "@/components/admin/ImageManager";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.object({
    url: z.string().url(),
    isPrimary: z.boolean(),
    cloudinaryPublicId: z.string(),
  })).min(1, "At least one image is required"),
  description: z.string().min(1, "Description is required"),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingProject: Project | null;
  onSubmit: SubmitHandler<ProjectFormValues>;
  isLoading: boolean;
}

export function ProjectSheet({
  isOpen,
  onOpenChange,
  editingProject,
  onSubmit,
  isLoading,
}: ProjectSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      images: [],
      description: "",
    },
  });

  React.useEffect(() => {
    if (editingProject) {
      reset({
        title: editingProject.title,
        category: editingProject.category,
        images: editingProject.images || [],
        description: editingProject.description || "",
      });
    } else {
      reset({ 
        title: "", 
        category: "", 
        images: [], 
        description: "", 
      });
    }
  }, [editingProject, reset, isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{editingProject ? "Edit Project" : "Add New Project"}</SheetTitle>
          <SheetDescription>
            Enter the details for the photography project.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4 px-4">
          <Field>
            <FieldLabel>Project Images</FieldLabel>
            <FieldContent>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <ImageManager
                    images={field.value}
                    onChange={field.onChange}
                    folder="projects"
                  />
                )}
              />
            </FieldContent>
            <FieldError errors={[errors.images]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <FieldContent>
              <Input id="title" {...register("title")} placeholder="Project Title" />
            </FieldContent>
            <FieldError errors={[errors.title]} />
          </Field>

          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <FieldContent>
              <Input id="category" {...register("category")} placeholder="e.g. Portrait, Landscape" />
            </FieldContent>
            <FieldError errors={[errors.category]} />
          </Field>

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


          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="bg-gray-50 text-black">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingProject ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
