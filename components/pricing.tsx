"use client";

import { Check, Sparkles, Crown, Gem, ShieldCheck } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Silver",
    icon: Sparkles,
    price: "99K",
    originalPrice: "149K",
    period: "sekali bayar",
    description:
      "Cocok untuk yang ingin membuat undangan sendiri dengan mudah.",
    features: [
      "Pilih dari 50+ template premium",
      "Editor drag & drop",
      "Nama tamu personal",
      "RSVP digital",
      "Galeri foto (max 10)",
      "Background music",
      "Countdown timer",
      "Google Maps lokasi",
      "Masa aktif 30 hari",
    ],
    notIncluded: ["Custom domain", "WhatsApp broadcast", "QR Code check-in"],
    cta: "Pilih Silver",
    popular: false,
  },
  {
    name: "Gold",
    icon: Crown,
    price: "199K",
    originalPrice: "299K",
    period: "sekali bayar",
    description: "Paket terlaris dengan fitur lengkap dan bantuan admin.",
    features: [
      "Semua fitur Silver",
      "Custom domain pribadi",
      "WhatsApp broadcast",
      "QR Code check-in",
      "Galeri foto unlimited",
      "Ucapan & doa digital",
      "Custom background & layout",
      "Support WhatsApp prioritas",
      "2x revisi oleh admin",
      "Masa aktif 90 hari",
    ],
    notIncluded: [],
    cta: "Pilih Gold",
    popular: true,
  },
  {
    name: "Platinum",
    icon: Gem,
    price: "349K",
    originalPrice: "499K",
    period: "sekali bayar",
    description: "Full service, terima beres. Kami yang handle semuanya.",
    features: [
      "Semua fitur Gold",
      "Full dibuatkan admin",
      "Revisi unlimited",
      "Custom desain eksklusif",
      "Video undangan 3D",
      "Live streaming link",
      "Amplop digital (gift)",
      "Multi bahasa (ID & EN)",
      "Prioritas respon 24 jam",
      "Masa aktif selamanya",
    ],
    notIncluded: [],
    cta: "Pilih Platinum",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="harga" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              Pricing Plans
            </span>
          </div>

          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl tracking-tight">
            Investasi untuk <span className="text-primary">Momen Istimewa</span>
          </h2>

          <div className="ornament-divider mx-auto my-6 max-w-[150px]">
            <span className="text-accent text-lg">&#10022;</span>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-sm md:text-base">
            Pilih paket yang sesuai dengan kebutuhan Anda. Semua paket sudah
            termasuk template premium dan fitur lengkap.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border transition-all duration-500 ${
                plan.popular
                  ? "border-primary bg-card shadow-[0_20px_50px_rgba(82,115,95,0.15)] scale-105 z-10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent px-6 py-1.5 rounded-full shadow-lg">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
                    Paling Populer
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-8 lg:p-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary">
                    <plan.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-muted-foreground line-through decoration-primary/30">
                      Rp {plan.originalPrice}
                    </span>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-tighter bg-accent/10 px-2 py-0.5 rounded">
                      Hemat{" "}
                      {parseInt(plan.originalPrice) - parseInt(plan.price)}K
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">Rp</span>
                    <span className="text-5xl font-extrabold tracking-tight text-primary">
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-1 space-y-4 mb-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Fitur Termasuk:
                  </p>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium text-foreground/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 opacity-30 italic"
                      >
                        <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                        <span className="text-sm line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <Link
                  href="#"
                  className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold tracking-wide transition-all active:scale-95 ${
                    plan.popular
                      ? "bg-primary text-white shadow-[0_10px_20px_rgba(82,115,95,0.3)] hover:bg-primary/90"
                      : "border-2 border-primary/20 text-primary hover:bg-primary/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Info */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              7-Day Money Back Guarantee
            </span>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm text-center leading-relaxed">
            Kami menjamin kepuasan Anda. Jika layanan kami tidak sesuai
            ekspektasi, hubungi kami dalam 7 hari untuk refund penuh.
          </p>
        </div>
      </div>
    </section>
  );
}
