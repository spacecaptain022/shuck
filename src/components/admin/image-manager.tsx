"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type Media = {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
};

type Props = {
  productId: string;
  initialMedia: Media[];
};

export function ImageManager({ productId, initialMedia }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      // Upload to Cloudinary via our API
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const json = await uploadRes.json();
        throw new Error(json.error ?? "Upload failed");
      }

      const { url } = await uploadRes.json();

      // Add media record
      const mediaRes = await fetch(`/api/admin/products/${productId}/media`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          sortOrder: initialMedia.length,
        }),
      });

      if (!mediaRes.ok) {
        throw new Error("Failed to save image");
      }

      router.refresh();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  async function handleDelete(mediaId: string) {
    if (!confirm("Remove this image?")) return;

    await fetch(`/api/admin/products/${productId}/media/${mediaId}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold">Images</h2>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id={`img-upload-${productId}`}
          />
          <Button
            type="button"
            variant="outline"
            className="rounded-xl h-8 text-xs gap-1.5"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-3.5 w-3.5" />
            {uploading ? "Uploading…" : "Upload Image"}
          </Button>
        </div>
      </div>

      {uploadError && (
        <div className="px-5 py-2 text-sm text-destructive border-b border-border">
          {uploadError}
        </div>
      )}

      {/* Image grid */}
      {initialMedia.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-muted-foreground">
          No images yet. Upload one above.
        </div>
      ) : (
        <div className="p-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {initialMedia.map((media) => (
            <div key={media.id} className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden bg-secondary border border-border">
                <Image
                  src={media.url}
                  alt={media.altText ?? "Product image"}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDelete(media.id)}
                className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-background/90 text-muted-foreground hover:text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <Trash2 className="h-3 w-3" />
              </button>
              {media.altText && (
                <p className="text-xs text-muted-foreground mt-1 truncate px-0.5">
                  {media.altText}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
