"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye } from "lucide-react";

const templates = [
  {
    id: "elegant-gold",
    name: "Elegant Gold",
    description:
      "Tema klasik dengan ornamen emas dan nuansa mewah. Cocok untuk pernikahan formal dan tradisional.",
    image: "/images/template-elegant.jpg",
    category: "Premium",
  },
  {
    id: "rustic-garden",
    name: "Rustic Garden",
    description:
      "Tema bohemian dengan aksen botanical hijau dan nuansa warm earth-tone. Cocok untuk pernikahan outdoor.",
    image: "/images/template-rustic.jpg",
    category: "Premium",
  },
  {
    id: "modern-luxury",
    name: "Modern Luxury",
    description:
      "Tema modern minimalis dengan geometric lines, black & gold. Cocok untuk pernikahan kontemporer.",
    image: "/images/template-modern.jpg",
    category: "Exclusive",
  },
];

export default function TemplatePage() {
  const [selected, setSelected] = useState("elegant-gold");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Pilih Template</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pilih desain undangan yang sesuai dengan tema pernikahan Anda
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((tpl) => (
          <Card
            key={tpl.id}
            className={`group cursor-pointer overflow-hidden border-2 transition-all ${
              selected === tpl.id
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/30"
            }`}
            onClick={() => setSelected(tpl.id)}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={tpl.image}
                alt={tpl.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {selected === tpl.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <Check className="size-6 text-primary-foreground" />
                  </div>
                </div>
              )}
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                {tpl.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className=" text-lg font-semibold text-foreground">
                {tpl.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {tpl.description}
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant={selected === tpl.id ? "default" : "outline"}
                  className={
                    selected === tpl.id
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-border text-foreground hover:bg-secondary"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(tpl.id);
                  }}
                >
                  {selected === tpl.id ? "Terpilih" : "Pilih"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/template/${tpl.id}`, "_blank");
                  }}
                >
                  <Eye className="mr-1 size-3" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Simpan & Lanjutkan
        </Button>
      </div>
    </div>
  );
}
