"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Leaf,
  Gift,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const events = [
  {
    title: "Pemberkatan",
    date: "Minggu, 22 Juni 2026",
    time: "09:00 - 11:00 WIB",
    location: "Gereja Katedral, Bandung",
  },
  {
    title: "Resepsi",
    date: "Minggu, 22 Juni 2026",
    time: "12:00 - 15:00 WIB",
    location: "The Valley Resort, Lembang",
  },
];

export function RusticGardenTemplate() {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#1a1510]">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/images/couple-rustic.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510]/70 via-[#1a1510]/85 to-[#1a1510]" />

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <Leaf className="h-8 w-8 text-[#8b9a6b]" />
          <p className="text-xs tracking-[0.25em] uppercase text-[#8b9a6b]">
            You are invited to
          </p>
          <h1 className=" text-5xl font-bold text-[#f0ebe3] md:text-7xl">
            Daniel <span className="text-[#8b9a6b]">&</span> Sarah
          </h1>
          <p className="text-sm text-[#9a8e7e]">Minggu, 22 Juni 2026</p>

          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-[#8b9a6b]/40" />
            <Leaf className="h-3 w-3 text-[#8b9a6b]" />
            <div className="h-px w-12 bg-[#8b9a6b]/40" />
          </div>

          <p className="text-sm text-[#9a8e7e]">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <p className=" text-2xl text-[#f0ebe3]">Tamu Undangan</p>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#8b9a6b]/50 bg-[#8b9a6b]/10 px-8 py-3 text-sm font-medium text-[#8b9a6b] transition-all hover:bg-[#8b9a6b]/20"
          >
            Buka Undangan
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1510] text-[#f0ebe3]">
      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/#template"
          className="inline-flex items-center gap-2 rounded-full bg-[#231e17]/80 backdrop-blur-sm px-4 py-2 text-xs text-[#8b9a6b] border border-[#8b9a6b]/20 hover:bg-[#231e17] transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Kembali
        </Link>
      </div>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/couple-rustic.jpg"
            alt="Daniel & Sarah"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510]/50 via-[#1a1510]/70 to-[#1a1510]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <Leaf className="mx-auto mb-6 h-10 w-10 text-[#8b9a6b]" />
          <p className="mb-3 text-sm text-[#9a8e7e]">
            The Wedding Celebration of
          </p>
          <h1 className="mb-2  text-6xl font-bold md:text-8xl text-[#f0ebe3]">
            Daniel
          </h1>
          <div className="my-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-[#8b9a6b]/40" />
            <Heart className="h-5 w-5 text-[#8b9a6b] fill-[#8b9a6b]" />
            <div className="h-px w-16 bg-[#8b9a6b]/40" />
          </div>
          <h1 className="mb-6  text-6xl font-bold md:text-8xl text-[#f0ebe3]">
            Sarah
          </h1>
          <p className="text-sm text-[#9a8e7e]">22 . 06 . 2026</p>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 px-6 text-center">
        <div className="mx-auto max-w-xl">
          <Leaf className="mx-auto mb-6 h-6 w-6 text-[#8b9a6b]" />
          <blockquote className=" text-lg italic leading-relaxed text-[#c4b9a8] md:text-xl">
            {
              '"Kasih itu sabar, kasih itu murah hati. Ia tidak cemburu, tidak memegahkan diri dan tidak sombong."'
            }
          </blockquote>
          <p className="mt-4 text-xs tracking-wider text-[#8b9a6b]">
            1 Korintus 13:4
          </p>
        </div>
      </section>

      {/* Couple */}
      <section className="py-20 px-6 bg-[#15110c]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <Leaf className="mx-auto mb-4 h-6 w-6 text-[#8b9a6b]" />
            <h2 className=" text-3xl font-bold md:text-4xl text-[#f0ebe3]">
              Mempelai
            </h2>
          </div>

          <div className="grid gap-16 md:grid-cols-2">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 h-48 w-48 overflow-hidden rounded-2xl border border-[#8b9a6b]/20 rotate-3 transition-transform hover:rotate-0">
                <Image
                  src="/images/couple-rustic.jpg"
                  alt="Daniel"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-1  text-2xl font-bold text-[#f0ebe3]">
                Daniel Kristian
              </h3>
              <p className="text-sm text-[#9a8e7e]">Putra kedua dari</p>
              <p className="text-sm text-[#8b9a6b]">Bpk. Yohanes & Ibu Maria</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 h-48 w-48 overflow-hidden rounded-2xl border border-[#8b9a6b]/20 -rotate-3 transition-transform hover:rotate-0">
                <Image
                  src="/images/couple-rustic.jpg"
                  alt="Sarah"
                  width={192}
                  height={192}
                  className="h-full w-full object-cover object-right"
                />
              </div>
              <h3 className="mb-1  text-2xl font-bold text-[#f0ebe3]">
                Sarah Elisabeth
              </h3>
              <p className="text-sm text-[#9a8e7e]">Putri pertama dari</p>
              <p className="text-sm text-[#8b9a6b]">Bpk. Petrus & Ibu Ruth</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <Leaf className="mx-auto mb-4 h-6 w-6 text-[#8b9a6b]" />
            <h2 className=" text-3xl font-bold md:text-4xl text-[#f0ebe3]">
              Acara
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.title}
                className="rounded-2xl border border-[#8b9a6b]/15 bg-[#15110c] p-8 text-center"
              >
                <h3 className="mb-6  text-2xl font-bold text-[#8b9a6b]">
                  {event.title}
                </h3>
                <div className="mb-3 flex items-center justify-center gap-2 text-sm text-[#9a8e7e]">
                  <Calendar className="h-4 w-4 text-[#8b9a6b]" />
                  {event.date}
                </div>
                <div className="mb-3 flex items-center justify-center gap-2 text-sm text-[#9a8e7e]">
                  <Clock className="h-4 w-4 text-[#8b9a6b]" />
                  {event.time}
                </div>
                <div className="mb-6 flex items-center justify-center gap-2 text-sm text-[#9a8e7e]">
                  <MapPin className="h-4 w-4 text-[#8b9a6b]" />
                  {event.location}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-[#8b9a6b]/30 px-6 py-2 text-xs font-medium text-[#8b9a6b] hover:bg-[#8b9a6b]/10 transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  Lihat Lokasi
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-24 px-6 bg-[#15110c]">
        <div className="mx-auto max-w-3xl text-center">
          <Leaf className="mx-auto mb-4 h-6 w-6 text-[#8b9a6b]" />
          <h2 className="mb-12  text-3xl font-bold md:text-4xl text-[#f0ebe3]">
            Hitung Mundur
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: "210", label: "Hari" },
              { value: "12", label: "Jam" },
              { value: "30", label: "Menit" },
              { value: "15", label: "Detik" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#8b9a6b]/15 bg-[#1a1510] p-4 md:p-6"
              >
                <p className=" text-3xl font-bold text-[#8b9a6b] md:text-5xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-[#9a8e7e]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <Leaf className="mx-auto mb-4 h-6 w-6 text-[#8b9a6b]" />
            <h2 className=" text-3xl font-bold md:text-4xl text-[#f0ebe3]">
              Galeri
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[
              "/images/couple-rustic.jpg",
              "/images/template-rustic.jpg",
              "/images/hero-wedding.jpg",
            ].map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-[#8b9a6b]/10"
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-6 bg-[#15110c]">
        <div className="mx-auto max-w-lg text-center">
          <Leaf className="mx-auto mb-4 h-6 w-6 text-[#8b9a6b]" />
          <h2 className="mb-8  text-3xl font-bold md:text-4xl text-[#f0ebe3]">
            RSVP
          </h2>

          {rsvpSubmitted ? (
            <div className="rounded-2xl border border-[#8b9a6b]/20 bg-[#1a1510] p-8">
              <Heart className="mx-auto mb-4 h-8 w-8 text-[#8b9a6b] fill-[#8b9a6b]" />
              <p className=" text-xl text-[#f0ebe3]">Terima kasih!</p>
              <p className="mt-2 text-sm text-[#9a8e7e]">
                Konfirmasi Anda telah kami terima.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRsvpSubmitted(true);
              }}
              className="flex flex-col gap-4 rounded-2xl border border-[#8b9a6b]/15 bg-[#1a1510] p-8 text-left"
            >
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8b9a6b]">
                  Nama
                </label>
                <input
                  className="w-full rounded-xl border border-[#8b9a6b]/20 bg-[#15110c] px-4 py-2.5 text-sm text-[#f0ebe3] outline-none focus:border-[#8b9a6b]/50 placeholder:text-[#9a8e7e]/50"
                  placeholder="Nama lengkap"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8b9a6b]">
                  Kehadiran
                </label>
                <select className="w-full rounded-xl border border-[#8b9a6b]/20 bg-[#15110c] px-4 py-2.5 text-sm text-[#f0ebe3] outline-none focus:border-[#8b9a6b]/50">
                  <option>Hadir</option>
                  <option>Tidak Hadir</option>
                  <option>Masih Ragu</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8b9a6b]">
                  Jumlah Tamu
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  defaultValue={1}
                  className="w-full rounded-xl border border-[#8b9a6b]/20 bg-[#15110c] px-4 py-2.5 text-sm text-[#f0ebe3] outline-none focus:border-[#8b9a6b]/50"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-xl bg-[#8b9a6b] py-3 text-sm font-semibold text-[#1a1510] transition-colors hover:bg-[#a3b283]"
              >
                Konfirmasi
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Wishes */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-lg text-center">
          <Leaf className="mx-auto mb-4 h-6 w-6 text-[#8b9a6b]" />
          <h2 className="mb-8  text-3xl font-bold md:text-4xl text-[#f0ebe3]">
            Ucapan & Doa
          </h2>

          {wishSubmitted ? (
            <div className="rounded-2xl border border-[#8b9a6b]/20 bg-[#15110c] p-8">
              <MessageCircle className="mx-auto mb-4 h-8 w-8 text-[#8b9a6b]" />
              <p className=" text-xl text-[#f0ebe3]">
                Terima kasih atas ucapannya!
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWishSubmitted(true);
              }}
              className="flex flex-col gap-4 rounded-2xl border border-[#8b9a6b]/15 bg-[#15110c] p-8 text-left"
            >
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8b9a6b]">
                  Nama
                </label>
                <input
                  className="w-full rounded-xl border border-[#8b9a6b]/20 bg-[#1a1510] px-4 py-2.5 text-sm text-[#f0ebe3] outline-none focus:border-[#8b9a6b]/50 placeholder:text-[#9a8e7e]/50"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#8b9a6b]">
                  Ucapan
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-[#8b9a6b]/20 bg-[#1a1510] px-4 py-2.5 text-sm text-[#f0ebe3] outline-none focus:border-[#8b9a6b]/50 resize-none placeholder:text-[#9a8e7e]/50"
                  placeholder="Tulis ucapan untuk mempelai..."
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-xl bg-[#8b9a6b] py-3 text-sm font-semibold text-[#1a1510] transition-colors hover:bg-[#a3b283]"
              >
                Kirim Ucapan
              </button>
            </form>
          )}

          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                name: "Rina Kusuma",
                message:
                  "Selamat menempuh hidup baru! Semoga selalu dilimpahi cinta dan kebahagiaan.",
              },
              {
                name: "Andi Wijaya",
                message:
                  "Congratulations Daniel & Sarah! Wishing you a lifetime of love and happiness.",
              },
            ].map((wish) => (
              <div
                key={wish.name}
                className="rounded-2xl border border-[#8b9a6b]/10 bg-[#15110c] p-6 text-left"
              >
                <p className="mb-2 text-sm font-semibold text-[#8b9a6b]">
                  {wish.name}
                </p>
                <p className="text-sm leading-relaxed text-[#9a8e7e]">
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift */}
      <section className="py-24 px-6 bg-[#15110c]">
        <div className="mx-auto max-w-lg text-center">
          <Leaf className="mx-auto mb-4 h-6 w-6 text-[#8b9a6b]" />
          <h2 className="mb-4  text-3xl font-bold md:text-4xl text-[#f0ebe3]">
            Kado Digital
          </h2>
          <p className="mb-8 text-sm text-[#9a8e7e]">
            Kehadiran Anda merupakan hadiah terindah. Namun jika ingin
            memberikan tanda kasih:
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                bank: "Bank BCA",
                account: "2345678901",
                name: "Daniel Kristian",
              },
              {
                bank: "Bank BNI",
                account: "1098765432",
                name: "Sarah Elisabeth",
              },
            ].map((item) => (
              <div
                key={item.bank}
                className="rounded-2xl border border-[#8b9a6b]/15 bg-[#1a1510] p-6"
              >
                <Gift className="mx-auto mb-3 h-6 w-6 text-[#8b9a6b]" />
                <p className="mb-1 text-sm font-semibold text-[#8b9a6b]">
                  {item.bank}
                </p>
                <p className="font-mono text-lg text-[#f0ebe3]">
                  {item.account}
                </p>
                <p className="mt-1 text-xs text-[#9a8e7e]">a.n. {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#8b9a6b]/10 py-12 px-6 text-center">
        <Leaf className="mx-auto mb-4 h-5 w-5 text-[#8b9a6b]" />
        <p className="text-sm text-[#9a8e7e]">
          Merupakan suatu kehormatan apabila Bapak/Ibu/Saudara/i berkenan hadir.
        </p>
        <p className="mt-4  text-xl text-[#f0ebe3]">Daniel & Sarah</p>
        <p className="mt-4 text-xs text-[#9a8e7e]/50">
          Dibuat dengan <span className="text-[#8b9a6b]">MomenKu</span>
        </p>
      </footer>
    </div>
  );
}
