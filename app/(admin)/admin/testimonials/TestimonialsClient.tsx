"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Testimonial } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { TestimonialsTable } from "./components/TestimonialsTable";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TestimonialSheet } from "./components/TestimonialSheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export function TestimonialsClient({ 
  initialTestimonials,
  totalCount,
  currentPage,
  pageSize
}: TestimonialsClientProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingTestimonial(null);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Truncate name for privacy: "James Bond" -> "James B."
      const nameParts = data.name.trim().split(/\s+/);
      const formattedData = {
        ...data,
        name: nameParts.length > 1 
          ? `${nameParts[0]} ${nameParts[1].charAt(0).toUpperCase()}.` 
          : nameParts[0]
      };

      if (editingTestimonial) {
        const res = await fetch(`/api/admin/testimonials/${editingTestimonial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        });
        if (!res.ok) throw new Error("Failed to update testimonial");
        toast.success("Testimonial updated successfully");
      } else {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedData),
        });
        if (!res.ok) throw new Error("Failed to create testimonial");
        toast.success("Testimonial created successfully");
      }
      
      setIsOpen(false);
      setEditingTestimonial(null);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsOpen(true);
  };

  const confirmDelete = (id: string) => {
    setTestimonialToDelete(id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!testimonialToDelete) return;
    setIsDeleting(true);
    
    try {
      const res = await fetch(`/api/admin/testimonials/${testimonialToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      toast.success("Testimonial deleted successfully");
      router.refresh();
      setTestimonialToDelete(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete testimonial");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">
            Manage client testimonials and reviews.
          </p>
        </div>
        <Button 
          onClick={() => {
            setEditingTestimonial(null);
            setIsOpen(true);
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <TestimonialsTable 
        testimonials={initialTestimonials} 
        onEdit={handleEdit} 
        onDelete={confirmDelete} 
      />

      {totalCount > pageSize && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href={currentPage > 1 ? `?page=${currentPage - 1}` : "#"} 
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.ceil(totalCount / pageSize) }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  href={`?page=${i + 1}`}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href={currentPage < Math.ceil(totalCount / pageSize) ? `?page=${currentPage + 1}` : "#"} 
                className={currentPage === Math.ceil(totalCount / pageSize) ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <TestimonialSheet 
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        editingTestimonial={editingTestimonial}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />

      <AlertDialog open={!!testimonialToDelete} onOpenChange={(open) => !open && !isDeleting && setTestimonialToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Testimonial"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
