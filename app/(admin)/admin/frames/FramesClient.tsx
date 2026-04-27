"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Product } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FramesTable } from "./components/FramesTable";
import { FrameSheet } from "./components/FrameSheet";
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

interface FramesClientProps {
  initialFrames: Product[];
}

export function FramesClient({ initialFrames }: FramesClientProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingFrame, setEditingFrame] = React.useState<Product | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [frameToDelete, setFrameToDelete] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingFrame(null);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (editingFrame) {
        const res = await fetch(`/api/admin/frames/${editingFrame.id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update frame");
        toast.success("Frame updated successfully");
      } else {
        const res = await fetch("/api/admin/frames", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create frame");
        toast.success("Frame created successfully");
      }
      
      setIsOpen(false);
      setEditingFrame(null);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (frame: Product) => {
    setEditingFrame(frame);
    setIsOpen(true);
  };

  const confirmDelete = (id: string) => {
    setFrameToDelete(id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent dialog from closing automatically
    if (!frameToDelete) return;
    setIsDeleting(true);
    
    try {
      const res = await fetch(`/api/admin/frames/${frameToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete frame");
      toast.success("Frame deleted successfully");
      router.refresh();
      setFrameToDelete(null); // Close dialog on success
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete frame");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Frames (Shop Items)</h1>
          <p className="text-muted-foreground">
            Manage your photo frames and products available for sale.
          </p>
        </div>
        <Button onClick={() => {
          setEditingFrame(null);
          setIsOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Frame
        </Button>
      </div>

      <FramesTable 
        frames={initialFrames} 
        onEdit={handleEdit} 
        onDelete={confirmDelete} 
      />

      <FrameSheet 
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        editingFrame={editingFrame}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />

      <AlertDialog open={!!frameToDelete} onOpenChange={(open) => !open && !isDeleting && setFrameToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the frame from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Frame"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
