"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sparkles, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "Berapa lama proses pembuatan undangan?",
    answer:
      "Untuk paket Silver (self-edit), Anda bisa membuat undangan dalam 10-15 menit. Untuk paket Gold dan Platinum yang dibantu admin, prosesnya 1-2 hari kerja setelah semua data dan foto diterima.",
  },
  {
    question: "Apa yang dimaksud dengan masa aktif?",
    answer:
      "Masa aktif adalah durasi undangan online dapat diakses oleh tamu. Setelah masa aktif berakhir, undangan tidak dapat dibuka. Paket Silver aktif 30 hari, Gold 90 hari, dan Platinum selamanya.",
  },
  {
    question: "Apakah template bisa dikustomisasi?",
    answer:
      "Tentu! Semua template bisa dikustomisasi sesuai keinginan Anda. Anda bisa mengubah warna, font, layout, background, dan menambahkan elemen sesuai selera.",
  },
  {
    question: "Berapa jumlah tamu yang bisa diundang?",
    answer:
      "Tidak ada batasan jumlah tamu untuk semua paket. Anda bisa mengirimkan undangan ke sebanyak mungkin tamu yang diinginkan secara personal.",
  },
  {
    question: "Apakah bisa custom domain sendiri?",
    answer:
      "Ya, fitur custom domain tersedia di paket Gold dan Platinum. Anda bisa menggunakan domain seperti namaanda.com agar lebih eksklusif.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 mb-4">
            <Sparkles className="w-3 h-3 text-accent" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">
              Informasi Terkait
            </p>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl tracking-tight">
            Common <span className="italic text-primary">Questions</span>
          </h2>

          <p className="text-muted-foreground text-sm max-w-md mx-auto italic font-medium">
            Segala hal yang perlu Anda ketahui sebelum memulai momen berharga
            bersama kami.
          </p>

          <div className="ornament-divider mx-auto my-8 max-w-[150px]">
            <span className="text-accent text-lg">&#10022;</span>
          </div>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="group rounded-2xl border border-border bg-card transition-all duration-300 data-[state=open]:border-primary/30 data-[state=open]:shadow-[0_10px_30px_rgba(82,115,95,0.05)] overflow-hidden"
            >
              <AccordionTrigger className="py-6 px-6 text-left text-base font-bold text-foreground hover:text-primary hover:no-underline md:text-lg transition-colors data-[state=open]:text-primary">
                <span className="flex-1 pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground border-t border-border/50 pt-4 bg-secondary/10 font-medium">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Footer FAQ */}
        <div className="mt-16 text-center flex flex-col items-center gap-4">
          <div className="p-3 rounded-full bg-secondary">
            <MessageCircleQuestion className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Punya pertanyaan lain?{" "}
            <a
              href="#"
              className="text-primary font-bold hover:underline transition-all"
            >
              Hubungi Tim Support Kami
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
