"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Menggunakan button shadcn

const templates = [
  {
    slug: "elegant-gold-001", // Anggap ini UUID
    name: "Elegant Gold",
    category: "Pernikahan",
    description:
      "Desain klasik dengan sentuhan emas yang mewah. Cocok untuk pernikahan yang elegan dan berkelas.",
    image: "/images/template-elegant.jpg",
    popular: true,
  },
  {
    slug: "rustic-garden-002",
    name: "Rustic Garden",
    category: "Pernikahan",
    description:
      "Nuansa bohemian dengan aksen botanical dan warna earth tone yang hangat dan natural.",
    image: "/images/template-rustic.jpg",
    popular: false,
  },
  {
    slug: "modern-luxury-003",
    name: "Modern Luxury",
    category: "Pernikahan",
    description:
      "Desain modern minimalis dengan aksen hitam dan emas. Untuk pasangan yang menyukai kemewahan kontemporer.",
    image: "/images/template-modern.jpg",
    popular: false,
  },
];

export function Templates() {
  return (
    <section
      id="template"
      className="py-24 lg:py-32 bg-background relative overflow-hidden font-poppins"
    >
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
            <Sparkles className="w-3 h-3 text-accent" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
              Exclusive Gallery
            </p>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl tracking-tight">
            Template <span className="italic text-primary">Karya Desainer</span>
          </h2>

          <div className="ornament-divider mx-auto my-8 max-w-[200px] flex items-center justify-center gap-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <span className="text-accent text-lg">&#10022;</span>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </div>

          <p className="text-muted-foreground leading-relaxed italic text-sm md:text-base">
            Pilih dari koleksi premium kami yang dirancang khusus untuk
            memancarkan aura kemewahan dan kehangatan.
          </p>
        </div>

        {/* Template cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.slug}
              className="group relative flex flex-col rounded-[2rem] border border-border bg-card transition-all duration-500 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(82,115,95,0.1)] overflow-hidden"
            >
              {/* Popular badge */}
              {template.popular && (
                <div className="absolute top-5 left-5 z-20 rounded-full bg-accent px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent-foreground shadow-lg animate-pulse">
                  Terpopuler
                </div>
              )}

              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Hover Content Actions */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button
                    asChild
                    className="w-full rounded-full bg-primary text-white hover:bg-primary/90 font-bold gap-2"
                  >
                    <Link
                      href={`/dashboard/invitations/create?theme=${template.slug}`}
                    >
                      <Wand2 className="h-4 w-4" />
                      Gunakan Template
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-primary font-bold gap-2"
                  >
                    <Link href={`/template/${template.slug}`}>
                      <Eye className="h-4 w-4" />
                      Preview Desain
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Content Description */}
              <div className="p-8">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-4 bg-accent" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                    {template.category}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors italic">
                  {template.name}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {template.description}
                </p>

                {/* Action Link di bawah untuk akses cepat */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/dashboard/invitations/create?theme=${template.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-all group/link"
                  >
                    Gunakan Sekarang
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                  </Link>

                  <Link
                    href={`/template/${template.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Eye size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Katalog */}
        <div className="mt-16 text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-2 border-primary/20 bg-primary/5 px-10 py-6 text-base font-bold text-primary hover:bg-primary hover:text-white transition-all shadow-xl shadow-primary/5"
          >
            <Link href="/templates">
              Lihat Semua Koleksi Template
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
