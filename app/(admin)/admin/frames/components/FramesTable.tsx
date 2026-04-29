"use client";

import { Product } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface FramesTableProps {
  frames: Product[];
  onEdit: (frame: Product) => void;
  onDelete: (id: string) => void;
}

export function FramesTable({ frames, onEdit, onDelete }: FramesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {frames.map((frame) => {
            const primaryImage = frame.images?.find(img => img.isPrimary) || frame.images?.[0];

            return (
              <TableRow key={frame.id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                    {primaryImage ? (
                      <img
                        src={primaryImage.url}
                        alt={frame.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground uppercase">
                        No Img
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{frame.title}</TableCell>
                <TableCell>{frame.price}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    frame.status === "available" ? "bg-green-100 text-green-800" :
                    frame.status === "out_of_stock" ? "bg-orange-100 text-orange-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {frame.status?.replace("_", " ") || "available"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(frame)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDelete(frame.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {frames.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No frames found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
