"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background Accent - Memberikan gradasi halus di bagian bawah */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/40 to-secondary/20" />

      {/* Decorative Line Dividers */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        {/* Ornament Corners - Dibuat lebih tipis & elegan */}
        <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-primary/20 hidden md:block" />
        <div className="absolute -top-4 -right-4 w-20 h-20 border-t border-r border-primary/20 hidden md:block" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b border-l border-primary/20 hidden md:block" />
        <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-primary/20 hidden md:block" />

        <div className="flex justify-center mb-8">
          <div className="p-3 rounded-full bg-primary/5 border border-primary/10 animate-pulse">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>

        <h2 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
          Siap Mewujudkan <br />
          <span className=" italic text-primary">Undangan Impian Anda?</span>
        </h2>

        <div className="ornament-divider mx-auto my-8 max-w-[200px]">
          {/* Custom Divider dari globals.css */}
        </div>

        <p className="mx-auto mb-12 max-w-2xl text-muted-foreground leading-relaxed text-base md:text-lg">
          Bergabunglah dengan ribuan pasangan yang telah mempercayakan momen
          istimewa mereka kepada{" "}
          <span className="font-bold text-foreground">MomenKu</span>. Buat
          undangan eksklusif Anda hanya dalam hitungan menit.
        </p>

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <Link
            href="#harga"
            className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-10 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_10px_30px_rgba(175,143,61,0.3)] active:scale-95"
          >
            Mulai Buat Undangan
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border-2 border-primary/20 bg-white/50 backdrop-blur-sm px-10 py-4 text-base font-bold text-primary transition-all hover:border-primary hover:bg-white active:scale-95"
          >
            Konsultasi Gratis
          </Link>
        </div>

        <p className="mt-10 text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
          Tanpa Biaya Tersembunyi • Garansi 7 Hari
        </p>
      </div>
    </section>
  );
}
