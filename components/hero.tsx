import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-wedding.jpg"
          alt="Premium wedding invitation"
          fill
          className="object-cover opacity-[0.08] dark:opacity-20"
          priority
        />
        {/* Overlay dengan gradasi hijau tipis */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Badge dengan warna Sage Green */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
            The Art of Digital Invitation
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
          Abadikan Momen <br />
          <span className="gold-shimmer">Terindah Anda</span>
        </h1>

        <div className="ornament-divider mx-auto mb-8 max-w-xs">
          <span className="text-accent text-xl">&#10022;</span>
        </div>

        <p className="mx-auto mb-10 max-w-2xl text-muted-foreground md:text-lg">
          Buat undangan digital pernikahan yang elegan dan mewah dalam hitungan
          menit. Desain eksklusif, fitur lengkap, dan pengalaman premium untuk
          hari istimewa Anda.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#harga"
            className="group bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold transition-all hover:shadow-[0_10px_25px_rgba(82,115,95,0.3)] active:scale-95"
          >
            Mulai Buat Undangan
          </Link>
          <Link
            href="#template"
            className="border-2 border-primary/20 text-primary hover:bg-primary/5 px-10 py-4 rounded-full font-bold transition-all"
          >
            Lihat Katalog
          </Link>
        </div>
      </div>
    </section>
  );
}
