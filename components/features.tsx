"use client";

import {
  Smartphone,
  Palette,
  Music,
  MapPin,
  QrCode,
  MessageSquareHeart,
  Users,
  Send,
  Image as ImageIcon,
  Clock,
  Globe,
  Shield,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Undangan tampil sempurna di semua perangkat, dari HP hingga desktop.",
  },
  {
    icon: Palette,
    title: "Custom Desain",
    description: "Ubah warna, font, dan layout sesuai keinginan Anda.",
  },
  {
    icon: Music,
    title: "Background Music",
    description:
      "Pilih dari ratusan musik latar atau upload lagu favorit Anda.",
  },
  {
    icon: MapPin,
    title: "Google Maps",
    description: "Tamu bisa langsung navigasi ke lokasi acara Anda.",
  },
  {
    icon: QrCode,
    title: "QR Code Check-in",
    description: "Sistem check-in digital untuk memudahkan verifikasi tamu.",
  },
  {
    icon: MessageSquareHeart,
    title: "Ucapan & Doa",
    description: "Tamu bisa mengirimkan ucapan dan doa restu secara online.",
  },
  {
    icon: Users,
    title: "RSVP Digital",
    description:
      "Kelola konfirmasi kehadiran tamu dengan mudah dan terorganisir.",
  },
  {
    icon: Send,
    title: "WhatsApp Broadcast",
    description:
      "Kirim undangan ke semua tamu dalam satu kali klik via WhatsApp.",
  },
  {
    icon: ImageIcon,
    title: "Galeri Foto",
    description: "Tampilkan momen indah Anda dalam galeri foto yang elegan.",
  },
  {
    icon: Clock,
    title: "Hitung Mundur",
    description: "Countdown timer menuju hari bahagia Anda.",
  },
  {
    icon: Globe,
    title: "Custom Domain",
    description: "Gunakan domain pribadi untuk undangan yang lebih eksklusif.",
  },
  {
    icon: Shield,
    title: "Nama Tamu Unik",
    description: "Setiap tamu mendapat undangan personal dengan nama mereka.",
  },
];

export function Features() {
  return (
    <section id="fitur" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary/40" />
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
              Premium Experience
            </p>
            <div className="h-px w-8 bg-primary/40" />
          </div>

          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl tracking-tight">
            Fitur <span className=" italic text-primary">Lengkap</span> & Modern
          </h2>

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-lg mx-auto">
            "Segala kemudahan dalam satu genggaman untuk menciptakan kesan
            pertama yang tak terlupakan."
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-3xl border border-border bg-card transition-all hover:border-accent/30 hover:shadow-[0_15px_30px_rgba(250,174,25,0.05)]"
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="h-4 w-4 text-primary/40" />
              </div>

              <h3 className="mb-3 text-lg font-bold tracking-tight text-foreground">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/70 transition-colors">
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 h-0.5 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
