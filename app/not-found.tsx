"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Search, Sparkles, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-poppins relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-100 h-100 bg-accent/5 rounded-full blur-[100px]" />

      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        <div className="relative inline-block">
          <h1 className="text-[150px] md:text-[200px] font-black leading-none text-primary/10 tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-card p-6 rounded-[2.5rem] shadow-2xl shadow-primary/10 border border-primary/10 rotate-3 group hover:rotate-0 transition-transform duration-500">
              <Search
                className="h-16 w-16 text-primary animate-pulse"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
              Halaman Tidak Ditemukan
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight italic">
            Ups! Alamatnya <span className="text-primary">Kurang Tepat.</span>
          </h2>

          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed font-medium italic">
            Sepertinya momen yang kamu cari tidak ada di sini. Mungkin alamatnya
            sudah dipindah atau undangan ini sudah berakhir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full sm:w-auto h-14 px-8 rounded-2xl border-border hover:bg-secondary font-bold gap-2 text-foreground"
          >
            <ArrowLeft className="h-5 w-5" /> Kembali
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 transition-all gap-2"
          >
            <Link href="/">
              <Home className="h-5 w-5" /> Ke Beranda Utama
            </Link>
          </Button>
        </div>

        <div className="pt-12 flex flex-wrap justify-center gap-6 opacity-60">
          <Link
            href="/templates"
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/pricing"
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Harga
          </Link>
          <Link
            href="/contact"
            className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Bantuan
          </Link>
        </div>
      </div>

      <p className="absolute bottom-8 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em]">
        © 2026 MomenKu - Digital Invitation
      </p>
    </div>
  );
}
