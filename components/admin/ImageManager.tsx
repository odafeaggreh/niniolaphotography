"use client";

import * as React from "react";
import { Plus, X, Star, Loader2, Image as ImageIcon } from "lucide-react";
import { ProjectImage } from "@/app/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageManagerProps {
  images: ProjectImage[];
  onChange: (images: ProjectImage[]) => void;
  folder?: string;
}

export function ImageManager({ images, onChange, folder }: ImageManagerProps) {
  const [uploadingCount, setUploadingCount] = React.useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingCount((prev) => prev + files.length);

    try {
      // 1. Get signature
      const signRes = await fetch("/api/admin/cloudinary-sign", {
        method: "POST",
        body: JSON.stringify({ folder }),
      });
      const { signature, timestamp, cloudName, apiKey } = await signRes.json();

      // 2. Upload in parallel
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        formData.append("api_key", apiKey);
        formData.append("folder", folder || "niniolaphotography");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        return {
          url: data.secure_url,
          cloudinaryPublicId: data.public_id,
          isPrimary: false,
        } as ProjectImage;
      });

      const newImages = await Promise.all(uploadPromises);
      
      // If no images exist, set the first new one as primary
      const updatedImages = [...images, ...newImages];
      if (updatedImages.length > 0 && !updatedImages.some(img => img.isPrimary)) {
        updatedImages[0].isPrimary = true;
      }
      
      onChange(updatedImages);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadingCount((prev) => Math.max(0, prev - files.length));
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const setPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // If we removed the primary image, set another one as primary if available
    if (images[index].isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }
    onChange(newImages);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((img, index) => (
        <div
          key={img.cloudinaryPublicId}
          className={cn(
            "group relative aspect-square rounded-lg border bg-muted overflow-hidden transition-all",
            img.isPrimary && "ring-2 ring-accent-gold border-accent-gold"
          )}
        >
          <img
            src={img.url}
            alt="Uploaded"
            className="h-full w-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant={img.isPrimary ? "default" : "secondary"}
              size="sm"
              onClick={() => setPrimary(index)}
              className={cn(img.isPrimary && "bg-accent-gold hover:bg-accent-hover text-black")}
            >
              <Star className={cn("size-4 mr-1", img.isPrimary && "fill-current")} />
              {img.isPrimary ? "Primary" : "Set Primary"}
            </Button>
            
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => removeImage(index)}
            >
              <X className="size-4" />
            </Button>
          </div>
          
          {img.isPrimary && (
            <div className="absolute top-2 left-2 bg-accent-gold text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              Primary
            </div>
          )}
        </div>
      ))}

      {/* Upload Box */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploadingCount > 0}
        className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-accent-gold/50 hover:bg-accent-gold/5 transition-all flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-accent-gold"
      >
        {uploadingCount > 0 ? (
          <>
            <Loader2 className="size-8 animate-spin" />
            <span className="text-xs font-medium">Uploading {uploadingCount}...</span>
          </>
        ) : (
          <>
            <Plus className="size-8" />
            <span className="text-xs font-medium">Add Images</span>
          </>
        )}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
