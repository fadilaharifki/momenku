"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Diamond,
  Gift,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const events = [
  {
    title: "Holy Matrimony",
    date: "Sabtu, 10 Oktober 2026",
    time: "10:00 - 12:00 WIB",
    location: "Chapel at The Mulia, Bali",
  },
  {
    title: "Wedding Reception",
    date: "Sabtu, 10 Oktober 2026",
    time: "18:00 - 21:00 WIB",
    location: "The Grand Ballroom, The Mulia Bali",
  },
];

export function ModernLuxuryTemplate() {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#080808]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/couple-modern.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/90 to-[#080808]" />

        {/* Geometric frame */}
        <div className="absolute inset-12 border border-[#d4af37]/10 hidden md:block" />
        <div className="absolute inset-16 border border-[#d4af37]/5 hidden md:block" />

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <Diamond className="h-6 w-6 text-[#d4af37]" />
          <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
            Save the Date
          </p>

          <div className="flex items-center gap-6 md:gap-10">
            <h1 className=" text-4xl font-bold text-[#fafafa] md:text-7xl">
              KEVIN
            </h1>
            <span className=" text-2xl text-[#d4af37] md:text-4xl">&</span>
            <h1 className=" text-4xl font-bold text-[#fafafa] md:text-7xl">
              JESSICA
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
            <p className="text-xs tracking-widest text-[#7a7a7a]">
              10 . 10 . 2026
            </p>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
          </div>

          <p className="text-sm text-[#7a7a7a]">Dear,</p>
          <p className=" text-xl text-[#fafafa]">Tamu Undangan</p>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-6 inline-flex items-center gap-2 bg-[#d4af37] px-10 py-3 text-xs font-bold tracking-widest uppercase text-[#080808] transition-colors hover:bg-[#e8c84a]"
          >
            Open Invitation
            <ChevronDown className="h-3 w-3 animate-bounce" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#fafafa]">
      {/* Back */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/#template"
          className="inline-flex items-center gap-2 bg-[#111]/80 backdrop-blur-sm px-4 py-2 text-xs text-[#d4af37] border border-[#d4af37]/20 hover:bg-[#111] transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>
      </div>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/couple-modern.jpg"
            alt="Kevin & Jessica"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/50 via-[#080808]/70 to-[#080808]" />
        </div>

        {/* Geometric lines */}
        <div className="absolute top-0 left-1/2 h-32 w-px -translate-x-1/2 bg-gradient-to-b from-[#d4af37]/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-32 w-px -translate-x-1/2 bg-gradient-to-t from-[#d4af37]/30 to-transparent" />

        <div className="relative z-10 text-center px-6">
          <p className="mb-8 text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
            The Wedding of
          </p>

          <h1 className="mb-3  text-7xl font-bold md:text-9xl tracking-tight text-[#fafafa]">
            K
          </h1>
          <div className="my-2 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#d4af37]/40" />
            <Diamond className="h-4 w-4 text-[#d4af37]" />
            <div className="h-px w-12 bg-[#d4af37]/40" />
          </div>
          <h1 className="mb-8  text-7xl font-bold md:text-9xl tracking-tight text-[#fafafa]">
            J
          </h1>

          <p className="text-xs tracking-[0.4em] text-[#7a7a7a]">
            KEVIN ALEXANDER & JESSICA WANG
          </p>
          <p className="mt-2 text-xs text-[#7a7a7a]">
            10 Oktober 2026 | Bali, Indonesia
          </p>
        </div>
      </section>

      {/* Couple */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <Diamond className="mx-auto mb-4 h-5 w-5 text-[#d4af37]" />
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
              The Happy Couple
            </h2>
          </div>

          <div className="grid gap-16 md:grid-cols-2">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="absolute -inset-2 border border-[#d4af37]/20" />
                <div className="h-56 w-44 overflow-hidden">
                  <Image
                    src="/images/couple-modern.jpg"
                    alt="Kevin"
                    width={176}
                    height={224}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <h3 className="mb-1  text-2xl font-bold text-[#fafafa]">
                Kevin Alexander
              </h3>
              <div className="my-2 h-px w-8 bg-[#d4af37]/40 mx-auto" />
              <p className="text-xs text-[#7a7a7a]">Son of</p>
              <p className="text-sm text-[#d4af37]">
                Mr. William & Mrs. Linda Alexander
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="absolute -inset-2 border border-[#d4af37]/20" />
                <div className="h-56 w-44 overflow-hidden">
                  <Image
                    src="/images/couple-modern.jpg"
                    alt="Jessica"
                    width={176}
                    height={224}
                    className="h-full w-full object-cover object-right"
                  />
                </div>
              </div>
              <h3 className="mb-1  text-2xl font-bold text-[#fafafa]">
                Jessica Wang
              </h3>
              <div className="my-2 h-px w-8 bg-[#d4af37]/40 mx-auto" />
              <p className="text-xs text-[#7a7a7a]">Daughter of</p>
              <p className="text-sm text-[#d4af37]">
                Mr. David & Mrs. Christine Wang
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <Diamond className="mx-auto mb-4 h-5 w-5 text-[#d4af37]" />
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
              Wedding Events
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.title}
                className="border border-[#d4af37]/15 p-8 text-center"
              >
                <h3 className="mb-6 text-xs font-bold tracking-[0.3em] uppercase text-[#d4af37]">
                  {event.title}
                </h3>
                <div className="mb-3 flex items-center justify-center gap-2 text-sm text-[#7a7a7a]">
                  <Calendar className="h-4 w-4 text-[#d4af37]" />
                  {event.date}
                </div>
                <div className="mb-3 flex items-center justify-center gap-2 text-sm text-[#7a7a7a]">
                  <Clock className="h-4 w-4 text-[#d4af37]" />
                  {event.time}
                </div>
                <div className="mb-6 flex items-center justify-center gap-2 text-sm text-[#7a7a7a]">
                  <MapPin className="h-4 w-4 text-[#d4af37]" />
                  {event.location}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 border border-[#d4af37]/30 px-6 py-2 text-[10px] font-bold tracking-widest uppercase text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  View Map
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Diamond className="mx-auto mb-4 h-5 w-5 text-[#d4af37]" />
          <h2 className="mb-12 text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
            Counting Down
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: "365", label: "DAYS" },
              { value: "14", label: "HOURS" },
              { value: "22", label: "MINS" },
              { value: "08", label: "SECS" },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-[#d4af37]/15 bg-[#0d0d0d] p-4 md:p-8"
              >
                <p className=" text-3xl font-bold text-[#d4af37] md:text-5xl">
                  {item.value}
                </p>
                <p className="mt-2 text-[9px] tracking-[0.3em] text-[#7a7a7a]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <Diamond className="mx-auto mb-4 h-5 w-5 text-[#d4af37]" />
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
              Our Gallery
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {[
              "/images/couple-modern.jpg",
              "/images/template-modern.jpg",
              "/images/hero-wedding.jpg",
            ].map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 border border-[#d4af37]/0 group-hover:border-[#d4af37]/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-lg text-center">
          <Diamond className="mx-auto mb-4 h-5 w-5 text-[#d4af37]" />
          <h2 className="mb-8 text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
            RSVP
          </h2>

          {rsvpSubmitted ? (
            <div className="border border-[#d4af37]/20 bg-[#0d0d0d] p-8">
              <Heart className="mx-auto mb-4 h-8 w-8 text-[#d4af37] fill-[#d4af37]" />
              <p className=" text-xl text-[#fafafa]">Thank You!</p>
              <p className="mt-2 text-sm text-[#7a7a7a]">
                Your RSVP has been received.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRsvpSubmitted(true);
              }}
              className="flex flex-col gap-4 border border-[#d4af37]/15 bg-[#0d0d0d] p-8 text-left"
            >
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37]">
                  Full Name
                </label>
                <input
                  className="w-full border-b border-[#d4af37]/20 bg-transparent px-0 py-2.5 text-sm text-[#fafafa] outline-none focus:border-[#d4af37]/50 placeholder:text-[#7a7a7a]/50"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37]">
                  Attendance
                </label>
                <select className="w-full border-b border-[#d4af37]/20 bg-transparent px-0 py-2.5 text-sm text-[#fafafa] outline-none focus:border-[#d4af37]/50">
                  <option className="bg-[#0d0d0d]">Joyfully Accept</option>
                  <option className="bg-[#0d0d0d]">Regretfully Decline</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37]">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  defaultValue={1}
                  className="w-full border-b border-[#d4af37]/20 bg-transparent px-0 py-2.5 text-sm text-[#fafafa] outline-none focus:border-[#d4af37]/50"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-[#d4af37] py-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#080808] transition-colors hover:bg-[#e8c84a]"
              >
                Submit RSVP
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Wishes */}
      <section className="py-24 px-6 bg-[#0d0d0d]">
        <div className="mx-auto max-w-lg text-center">
          <Diamond className="mx-auto mb-4 h-5 w-5 text-[#d4af37]" />
          <h2 className="mb-8 text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
            Wedding Wishes
          </h2>

          {wishSubmitted ? (
            <div className="border border-[#d4af37]/20 bg-[#080808] p-8">
              <MessageCircle className="mx-auto mb-4 h-8 w-8 text-[#d4af37]" />
              <p className=" text-xl text-[#fafafa]">
                Thank you for your warm wishes!
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWishSubmitted(true);
              }}
              className="flex flex-col gap-4 border border-[#d4af37]/15 bg-[#080808] p-8 text-left"
            >
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37]">
                  Name
                </label>
                <input
                  className="w-full border-b border-[#d4af37]/20 bg-transparent px-0 py-2.5 text-sm text-[#fafafa] outline-none focus:border-[#d4af37]/50 placeholder:text-[#7a7a7a]/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37]">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full border-b border-[#d4af37]/20 bg-transparent px-0 py-2.5 text-sm text-[#fafafa] outline-none focus:border-[#d4af37]/50 resize-none placeholder:text-[#7a7a7a]/50"
                  placeholder="Write your wishes..."
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-[#d4af37] py-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#080808] transition-colors hover:bg-[#e8c84a]"
              >
                Send Wishes
              </button>
            </form>
          )}

          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                name: "Michael Chen",
                message:
                  "Congratulations on your special day! Wishing you both eternal love and happiness.",
              },
              {
                name: "Amanda Putri",
                message:
                  "Such a beautiful couple! May your journey together be filled with joy and blessings.",
              },
            ].map((wish) => (
              <div
                key={wish.name}
                className="border border-[#d4af37]/10 bg-[#0d0d0d] p-6 text-left"
              >
                <p className="mb-2 text-xs font-bold tracking-wider text-[#d4af37]">
                  {wish.name}
                </p>
                <p className="text-sm leading-relaxed text-[#7a7a7a]">
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-lg text-center">
          <Diamond className="mx-auto mb-4 h-5 w-5 text-[#d4af37]" />
          <h2 className="mb-4 text-[10px] tracking-[0.5em] uppercase text-[#d4af37]">
            Wedding Gift
          </h2>
          <p className="mb-8 text-sm text-[#7a7a7a]">
            Your presence is the greatest gift. Should you wish to honor us
            further:
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                bank: "Bank BCA",
                account: "5678901234",
                name: "Kevin Alexander",
              },
              {
                bank: "Bank CIMB",
                account: "4321098765",
                name: "Jessica Wang",
              },
            ].map((item) => (
              <div
                key={item.bank}
                className="border border-[#d4af37]/15 bg-[#0d0d0d] p-6"
              >
                <Gift className="mx-auto mb-3 h-5 w-5 text-[#d4af37]" />
                <p className="mb-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37]">
                  {item.bank}
                </p>
                <p className="font-mono text-lg text-[#fafafa]">
                  {item.account}
                </p>
                <p className="mt-1 text-xs text-[#7a7a7a]">a.n. {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d4af37]/10 py-12 px-6 text-center">
        <Diamond className="mx-auto mb-4 h-4 w-4 text-[#d4af37]" />
        <p className="text-xs text-[#7a7a7a]">
          We would be honored by your presence on our special day.
        </p>
        <p className="mt-4  text-xl text-[#fafafa]">Kevin & Jessica</p>
        <p className="mt-6 text-[10px] tracking-[0.3em] text-[#7a7a7a]/50">
          MADE WITH <span className="text-[#d4af37]">MOMENKU</span>
        </p>
      </footer>
    </div>
  );
}
