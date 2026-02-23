"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, Sparkles, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetThemes } from "@/hooks/api/useGetThemes";

export function Templates() {
  const {
    data: response,
    isLoading,
    error,
  } = useGetThemes({
    limit: "all",
  });

  const themes = response?.data || [];

  return (
    <section
      id="template"
      className="py-24 lg:py-32 bg-background relative overflow-hidden font-poppins"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
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

          <p className="text-muted-foreground leading-relaxed italic text-sm md:text-base">
            Pilih dari koleksi premium kami yang dirancang khusus untuk
            memancarkan aura kemewahan dan kehangatan.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground italic">
              Menyiapkan koleksi desain terbaik...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">
              Gagal memuat tema. Silakan coba lagi nanti.
            </p>
          </div>
        )}

        {/* Template cards */}
        {!isLoading && (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className="group relative flex flex-col rounded-[2rem] border border-border bg-card transition-all duration-500 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(82,115,95,0.1)] overflow-hidden"
              >
                {/* Is Premium Badge */}
                {theme.is_premium === 1 && (
                  <div className="absolute top-5 left-5 z-20 rounded-full bg-accent px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-accent-foreground shadow-lg">
                    Premium
                  </div>
                )}

                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={theme.image_url || "/placeholder-theme.jpg"}
                    alt={theme.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Button
                      asChild
                      className="w-full rounded-full bg-primary text-white hover:bg-primary/90 font-bold gap-2"
                    >
                      <Link
                        href={`/dashboard/invitations/create?theme=${theme.slug}&category=${theme.category?.slug}`}
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
                      <Link href={`/template/${theme.slug}`}>
                        <Eye className="h-4 w-4" />
                        Preview Desain
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-px w-4 bg-accent" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-primary">
                      {theme.category?.name || "Uncategorized"}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors italic">
                    {theme.name}
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {theme.description}
                  </p>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/dashboard/invitations/create?theme=${theme.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-all group/link"
                    >
                      Gunakan Sekarang
                      <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    <Link
                      href={`/template/${theme.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
