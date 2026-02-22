"use client";

import { MousePointerClick, Edit3, Send, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Pilih Template",
    description:
      "Pilih desain template premium yang sesuai dengan tema pernikahan Anda.",
  },
  {
    icon: Edit3,
    number: "02",
    title: "Edit & Kustomisasi",
    description:
      "Sesuaikan detail acara, upload foto, pilih musik, dan atur tampilan.",
  },
  {
    icon: Send,
    number: "03",
    title: "Kirim ke Tamu",
    description:
      "Bagikan undangan ke semua tamu via WhatsApp dalam satu kali klik.",
  },
  {
    icon: PartyPopper,
    number: "04",
    title: "Nikmati Hari Bahagia",
    description:
      "Pantau RSVP, kelola tamu, dan nikmati hari istimewa Anda dengan tenang.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center lg:mb-24">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-6 bg-primary/30" />
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary">
              Simple Process
            </p>
            <div className="h-px w-6 bg-primary/30" />
          </div>

          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl tracking-tight">
            Langkah Mudah{" "}
            <span className=" italic text-primary">Menciptakan Momen</span>
          </h2>

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-lg mx-auto italic ">
            "Proses sederhana untuk hasil yang luar biasa. Kami hadir untuk
            memudahkan persiapan hari bahagia Anda."
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group text-center">
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-[calc(50%+3rem)] hidden h-[1px] w-[calc(100%-6rem)] bg-gradient-to-r from-primary/40 via-accent/20 to-transparent lg:block" />
              )}

              {/* Icon & Number Circle */}
              <div className="relative mx-auto mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/10 bg-card shadow-sm transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_10px_30px_rgba(82,115,95,0.1)]">
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon */}
                <step.icon
                  className="relative h-9 w-9 text-primary transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.5}
                />

                {/* Step Number Badge */}
                <span className="absolute -top-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-accent font-sans text-[11px] font-bold text-accent-foreground shadow-lg">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="relative px-4">
                <h3 className="mb-3 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                  {step.description}
                </p>
              </div>

              {/* Mobile Decorative Number (Watermark) */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-bold text-primary/[0.03] select-none -z-10 lg:hidden">
                {step.number}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Ornament */}
        <div className="mt-20 flex justify-center opacity-30">
          <div className="ornament-divider w-full max-w-[300px]">
            <span className="text-accent text-sm">&#10022;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
