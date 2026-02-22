"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Anisa & Rizky",
    location: "Jakarta",
    rating: 5,
    text: "Undangan digitalnya sangat elegan dan mewah! Tamu-tamu kami semua terkesima melihat desainnya. Fitur RSVP sangat membantu kami mendata kehadiran tamu.",
    template: "Elegant Gold",
  },
  {
    name: "Dewi & Arief",
    location: "Bandung",
    rating: 5,
    text: "Prosesnya sangat mudah dan cepat. Dalam 10 menit undangan sudah jadi. Yang paling suka fitur WhatsApp broadcast, kirim ke semua tamu sekali klik!",
    template: "Modern Luxury",
  },
  {
    name: "Sari & Budi",
    location: "Surabaya",
    rating: 5,
    text: "Kami pilih paket Platinum dan sangat puas. Admin sangat responsif dan hasilnya luar biasa. Custom domain buat undangan kami makin eksklusif.",
    template: "Rustic Garden",
  },
];

export function Testimonials() {
  return (
    <section id="testimoni" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
              Testimoni Pasangan
            </p>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl tracking-tight">
            Cerita <span className="text-primary italic">Bahagia</span> Mereka
          </h2>

          <div className="ornament-divider mx-auto my-6 max-w-[200px]">
            {/* Menggunakan ornamen gold dari globals.css */}
            <span className="text-accent text-lg">&#10022;</span>
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-md mx-auto italic">
            "Kepercayaan Anda adalah kehormatan bagi kami dalam mengabadikan
            momen spesial sekali seumur hidup."
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group relative rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-[0_20px_40px_rgba(82,115,95,0.08)] hover:-translate-y-2"
            >
              {/* Quote Icon - Warna Sage Soft */}
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Quote size={48} strokeWidth={1} />
              </div>

              {/* Stars - Menggunakan warna Gold Accent */}
              <div className="mb-6 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="mb-8 text-sm md:text-base leading-relaxed text-foreground/80 font-medium">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between border-t border-border/50 pt-6">
                <div className="flex flex-col">
                  <p className="text-sm font-bold tracking-tight text-foreground uppercase">
                    {testimonial.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-semibold tracking-widest uppercase mt-0.5">
                    {testimonial.location}
                  </p>
                </div>

                {/* Badge Template - Sage Minimalist */}
                <div className="rounded-lg bg-primary/5 px-3 py-1.5 text-[10px] font-bold text-primary border border-primary/10 uppercase tracking-tighter">
                  {testimonial.template}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
