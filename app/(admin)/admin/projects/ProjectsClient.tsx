"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Project } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProjectsTable } from "./components/ProjectsTable";
import { ProjectSheet } from "./components/ProjectSheet";
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

interface ProjectsClientProps {
  initialProjects: Project[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [projectToDelete, setProjectToDelete] = React.useState<string | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setEditingProject(null);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to update project");
        toast.success("Project updated successfully");
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create project");
        toast.success("Project created successfully");
      }
      
      setIsOpen(false);
      setEditingProject(null);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsOpen(true);
  };

  const confirmDelete = (id: string) => {
    setProjectToDelete(id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent dialog from closing automatically
    if (!projectToDelete) return;
    setIsDeleting(true);
    
    try {
      const res = await fetch(`/api/admin/projects/${projectToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      toast.success("Project deleted successfully");
      router.refresh();
      setProjectToDelete(null); // Close dialog on success
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your photography projects and portfolio.
          </p>
        </div>
        <Button onClick={() => {
          setEditingProject(null);
          setIsOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <ProjectsTable 
        projects={initialProjects} 
        onEdit={handleEdit} 
        onDelete={confirmDelete} 
      />

      <ProjectSheet 
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        editingProject={editingProject}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />

      <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && !isDeleting && setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
