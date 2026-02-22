"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, GripVertical, Save, ImageIcon } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
}

const dummyImages: GalleryImage[] = [
  { id: 1, src: "/images/couple-elegant.jpg", caption: "Foto Prewedding 1" },
  { id: 2, src: "/images/couple-rustic.jpg", caption: "Foto Prewedding 2" },
  { id: 3, src: "/images/couple-modern.jpg", caption: "Foto Prewedding 3" },
];

export default function GaleriPage() {
  const [images, setImages] = useState<GalleryImage[]>(dummyImages);

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Galeri Foto</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload foto prewedding atau foto berdua untuk ditampilkan di undangan
        </p>
      </div>

      {/* Upload area */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-border p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Upload className="size-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Drag & drop foto di sini atau klik tombol di bawah
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Format: JPG, PNG, WebP. Maks 5MB per foto. Maks 10 foto.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Upload className="mr-2 size-4" />
              Pilih Foto
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Photo list */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Foto Terupload</CardTitle>
          <CardDescription className="text-muted-foreground">
            {images.length} dari 10 foto. Drag untuk mengubah urutan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <ImageIcon className="size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Belum ada foto yang diupload
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group flex items-center gap-4 rounded-lg border border-border p-3 transition-colors hover:bg-secondary"
                >
                  <GripVertical className="size-4 cursor-grab text-muted-foreground" />
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) =>
                        setImages((prev) =>
                          prev.map((i) =>
                            i.id === img.id
                              ? { ...i, caption: e.target.value }
                              : i,
                          ),
                        )
                      }
                      className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                      placeholder="Tambahkan caption..."
                    />
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      320 KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                    onClick={() => removeImage(img.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary"
        >
          Batal
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="mr-2 size-4" />
          Simpan Galeri
        </Button>
      </div>
    </div>
  );
}
