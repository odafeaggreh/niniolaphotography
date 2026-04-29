"use client";

import { Testimonial } from "@/app/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialsTableProps {
  testimonials: Testimonial[];
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

export function TestimonialsTable({
  testimonials,
  onEdit,
  onDelete,
}: TestimonialsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="max-w-[300px]">Text</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.map((testimonial) => (
            <TableRow key={testimonial.id}>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={testimonial.avatarUrl || undefined} alt={testimonial.name} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{testimonial.name}</TableCell>
              <TableCell>{testimonial.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent-gold text-accent-gold" />
                  <span className="text-sm">{testimonial.rating}</span>
                </div>
              </TableCell>
              <TableCell className="max-w-[300px] truncate text-muted-foreground text-xs italic">
                "{testimonial.text}"
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(testimonial)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(testimonial.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {testimonials.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No testimonials found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
