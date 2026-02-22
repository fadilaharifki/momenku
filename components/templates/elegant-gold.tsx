"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Music,
  Gift,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const events = [
  {
    title: "Akad Nikah",
    date: "Sabtu, 15 Maret 2026",
    time: "08:00 - 10:00 WIB",
    location: "Masjid Istiqlal, Jakarta Pusat",
    mapUrl: "#",
  },
  {
    title: "Resepsi",
    date: "Sabtu, 15 Maret 2026",
    time: "11:00 - 14:00 WIB",
    location: "The Ritz Carlton Jakarta, Pacific Place",
    mapUrl: "#",
  },
];

const gallery = [
  "/images/couple-elegant.jpg",
  "/images/template-elegant.jpg",
  "/images/hero-wedding.jpg",
];

export function ElegantGoldTemplate() {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0c0a06]">
        {/* Background ornament */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/hero-wedding.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a06]/80 via-[#0c0a06]/90 to-[#0c0a06]" />

        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a84c]/70">
            The Wedding of
          </p>
          <h1 className=" text-5xl font-bold text-[#f5f0e8] md:text-7xl">
            Ahmad <span className="text-[#c9a84c]">&</span> Fatimah
          </h1>
          <p className="text-sm text-[#8a8272]">Sabtu, 15 Maret 2026</p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

          <p className="text-sm text-[#8a8272]">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <p className=" text-2xl text-[#f5f0e8]">Tamu Undangan</p>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/50 bg-[#c9a84c]/10 px-8 py-3 text-sm font-medium text-[#c9a84c] transition-all hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]"
          >
            Buka Undangan
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0a06] text-[#f5f0e8]">
      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/#template"
          className="inline-flex items-center gap-2 rounded-full bg-[#1a1714]/80 backdrop-blur-sm px-4 py-2 text-xs text-[#c9a84c] border border-[#c9a84c]/20 hover:bg-[#1a1714] transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Kembali
        </Link>
      </div>

      {/* Music toggle */}
      <button
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a84c]/30 bg-[#1a1714]/80 backdrop-blur-sm text-[#c9a84c] hover:bg-[#1a1714] transition-colors"
        aria-label="Toggle music"
      >
        <Music className="h-5 w-5" />
      </button>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/couple-elegant.jpg"
            alt="Ahmad & Fatimah"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a06]/60 via-[#0c0a06]/70 to-[#0c0a06]" />
        </div>

        {/* Gold corner ornaments */}
        <div className="absolute top-8 left-8 h-20 w-20 border-t-2 border-l-2 border-[#c9a84c]/40" />
        <div className="absolute top-8 right-8 h-20 w-20 border-t-2 border-r-2 border-[#c9a84c]/40" />
        <div className="absolute bottom-8 left-8 h-20 w-20 border-b-2 border-l-2 border-[#c9a84c]/40" />
        <div className="absolute bottom-8 right-8 h-20 w-20 border-b-2 border-r-2 border-[#c9a84c]/40" />

        <div className="relative z-10 text-center px-6">
          <p className="mb-4 text-xs tracking-[0.4em] uppercase text-[#c9a84c]">
            Bismillahirrahmanirrahim
          </p>
          <div className="ornament-divider mx-auto mb-8 max-w-[200px]">
            <Heart className="h-4 w-4 text-[#c9a84c] shrink-0 fill-[#c9a84c]" />
          </div>
          <p className="mb-2 text-sm text-[#8a8272]">The Wedding of</p>
          <h1 className="mb-4  text-6xl font-bold md:text-8xl">Ahmad</h1>
          <p className="mb-4  text-3xl text-[#c9a84c]">&</p>
          <h1 className="mb-8  text-6xl font-bold md:text-8xl">Fatimah</h1>
          <div className="ornament-divider mx-auto mb-6 max-w-[200px]">
            <span className="text-[#c9a84c]">&#10022;</span>
          </div>
          <p className="text-sm text-[#8a8272]">Sabtu, 15 Maret 2026</p>
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[#c9a84c]">
            Assalamualaikum Wr. Wb.
          </p>
          <p className="mb-12 leading-relaxed text-[#8a8272] text-sm">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
            menyelenggarakan acara pernikahan putra-putri kami:
          </p>

          <div className="grid gap-16 md:grid-cols-2">
            {/* Groom */}
            <div className="flex flex-col items-center">
              <div className="mb-6 h-48 w-48 overflow-hidden rounded-full border-2 border-[#c9a84c]/30 p-1">
                <div className="h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/images/couple-elegant.jpg"
                    alt="Ahmad"
                    width={192}
                    height={192}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <h3 className="mb-1  text-2xl font-bold text-[#f5f0e8]">
                Ahmad Rizky Pratama
              </h3>
              <p className="text-sm text-[#8a8272]">Putra pertama dari</p>
              <p className="text-sm text-[#c9a84c]">Bpk. Hasan & Ibu Aisyah</p>
            </div>

            {/* Bride */}
            <div className="flex flex-col items-center">
              <div className="mb-6 h-48 w-48 overflow-hidden rounded-full border-2 border-[#c9a84c]/30 p-1">
                <div className="h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/images/couple-elegant.jpg"
                    alt="Fatimah"
                    width={192}
                    height={192}
                    className="h-full w-full object-cover object-right"
                  />
                </div>
              </div>
              <h3 className="mb-1  text-2xl font-bold text-[#f5f0e8]">
                Fatimah Azzahra
              </h3>
              <p className="text-sm text-[#8a8272]">Putri kedua dari</p>
              <p className="text-sm text-[#c9a84c]">
                Bpk. Ibrahim & Ibu Khadijah
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 px-6 bg-[#100e0a]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[#c9a84c]">
              Waktu & Tempat
            </p>
            <h2 className=" text-3xl font-bold md:text-4xl text-[#f5f0e8]">
              Acara Pernikahan
            </h2>
            <div className="ornament-divider mx-auto mt-4 max-w-[200px]">
              <span className="text-[#c9a84c]">&#10022;</span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.title}
                className="rounded-xl border border-[#c9a84c]/20 bg-[#0c0a06] p-8 text-center"
              >
                <h3 className="mb-6  text-2xl font-bold text-[#c9a84c]">
                  {event.title}
                </h3>
                <div className="mb-4 flex items-center justify-center gap-2 text-sm text-[#8a8272]">
                  <Calendar className="h-4 w-4 text-[#c9a84c]" />
                  {event.date}
                </div>
                <div className="mb-4 flex items-center justify-center gap-2 text-sm text-[#8a8272]">
                  <Clock className="h-4 w-4 text-[#c9a84c]" />
                  {event.time}
                </div>
                <div className="mb-6 flex items-center justify-center gap-2 text-sm text-[#8a8272]">
                  <MapPin className="h-4 w-4 text-[#c9a84c]" />
                  {event.location}
                </div>
                <a
                  href={event.mapUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-[#c9a84c]/30 px-6 py-2 text-xs font-medium text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  Buka Google Maps
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[#c9a84c]">
            Menghitung Hari
          </p>
          <h2 className="mb-12  text-3xl font-bold md:text-4xl text-[#f5f0e8]">
            Countdown
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { value: "120", label: "Hari" },
              { value: "08", label: "Jam" },
              { value: "45", label: "Menit" },
              { value: "30", label: "Detik" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#c9a84c]/20 bg-[#100e0a] p-4 md:p-6"
              >
                <p className=" text-3xl font-bold text-[#c9a84c] md:text-5xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-[#8a8272]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 bg-[#100e0a]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[#c9a84c]">
              Momen Bahagia
            </p>
            <h2 className=" text-3xl font-bold md:text-4xl text-[#f5f0e8]">
              Galeri Foto
            </h2>
            <div className="ornament-divider mx-auto mt-4 max-w-[200px]">
              <span className="text-[#c9a84c]">&#10022;</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl border border-[#c9a84c]/10"
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0c0a06]/0 group-hover:bg-[#0c0a06]/30 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[#c9a84c]">
            Konfirmasi Kehadiran
          </p>
          <h2 className="mb-8  text-3xl font-bold md:text-4xl text-[#f5f0e8]">
            RSVP
          </h2>

          {rsvpSubmitted ? (
            <div className="rounded-xl border border-[#c9a84c]/20 bg-[#100e0a] p-8">
              <Heart className="mx-auto mb-4 h-8 w-8 text-[#c9a84c] fill-[#c9a84c]" />
              <p className=" text-xl text-[#f5f0e8]">Terima kasih!</p>
              <p className="mt-2 text-sm text-[#8a8272]">
                Konfirmasi Anda telah kami terima.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRsvpSubmitted(true);
              }}
              className="flex flex-col gap-4 rounded-xl border border-[#c9a84c]/20 bg-[#100e0a] p-8 text-left"
            >
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#c9a84c]">
                  Nama Lengkap
                </label>
                <input
                  className="w-full rounded-lg border border-[#c9a84c]/20 bg-[#0c0a06] px-4 py-2.5 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50 placeholder:text-[#8a8272]/50"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#c9a84c]">
                  Kehadiran
                </label>
                <select className="w-full rounded-lg border border-[#c9a84c]/20 bg-[#0c0a06] px-4 py-2.5 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50">
                  <option>Hadir</option>
                  <option>Tidak Hadir</option>
                  <option>Masih Ragu</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#c9a84c]">
                  Jumlah Tamu
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  defaultValue={1}
                  className="w-full rounded-lg border border-[#c9a84c]/20 bg-[#0c0a06] px-4 py-2.5 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-lg bg-[#c9a84c] py-3 text-sm font-semibold text-[#0c0a06] transition-colors hover:bg-[#e8d5a0]"
              >
                Konfirmasi Kehadiran
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Wishes */}
      <section className="py-24 px-6 bg-[#100e0a]">
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[#c9a84c]">
            Kirim Doa
          </p>
          <h2 className="mb-8  text-3xl font-bold md:text-4xl text-[#f5f0e8]">
            Ucapan & Doa
          </h2>

          {wishSubmitted ? (
            <div className="rounded-xl border border-[#c9a84c]/20 bg-[#0c0a06] p-8">
              <MessageCircle className="mx-auto mb-4 h-8 w-8 text-[#c9a84c]" />
              <p className=" text-xl text-[#f5f0e8]">
                Terima kasih atas doa dan ucapannya!
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setWishSubmitted(true);
              }}
              className="flex flex-col gap-4 rounded-xl border border-[#c9a84c]/20 bg-[#0c0a06] p-8 text-left"
            >
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#c9a84c]">
                  Nama
                </label>
                <input
                  className="w-full rounded-lg border border-[#c9a84c]/20 bg-[#0c0a06] px-4 py-2.5 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50 placeholder:text-[#8a8272]/50"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#c9a84c]">
                  Ucapan & Doa
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-[#c9a84c]/20 bg-[#0c0a06] px-4 py-2.5 text-sm text-[#f5f0e8] outline-none focus:border-[#c9a84c]/50 resize-none placeholder:text-[#8a8272]/50"
                  placeholder="Tulis ucapan dan doa untuk mempelai..."
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-lg bg-[#c9a84c] py-3 text-sm font-semibold text-[#0c0a06] transition-colors hover:bg-[#e8d5a0]"
              >
                Kirim Ucapan
              </button>
            </form>
          )}

          {/* Sample wishes */}
          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                name: "Budi Santoso",
                message:
                  "Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah mawaddah warahmah.",
              },
              {
                name: "Dewi Anggraini",
                message:
                  "Barakallahu lakuma wa baraka alaikuma. Semoga selalu bahagia!",
              },
            ].map((wish) => (
              <div
                key={wish.name}
                className="rounded-xl border border-[#c9a84c]/10 bg-[#0c0a06] p-6 text-left"
              >
                <p className="mb-2 text-sm font-semibold text-[#c9a84c]">
                  {wish.name}
                </p>
                <p className="text-sm leading-relaxed text-[#8a8272]">
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-2 text-xs tracking-[0.3em] uppercase text-[#c9a84c]">
            Amplop Digital
          </p>
          <h2 className="mb-4  text-3xl font-bold md:text-4xl text-[#f5f0e8]">
            Hadiah
          </h2>
          <p className="mb-8 text-sm text-[#8a8272]">
            Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda
            kasih, dapat melalui:
          </p>

          <div className="flex flex-col gap-4">
            {[
              {
                bank: "Bank BCA",
                account: "1234567890",
                name: "Ahmad Rizky Pratama",
              },
              {
                bank: "Bank Mandiri",
                account: "0987654321",
                name: "Fatimah Azzahra",
              },
            ].map((item) => (
              <div
                key={item.bank}
                className="rounded-xl border border-[#c9a84c]/20 bg-[#100e0a] p-6"
              >
                <Gift className="mx-auto mb-3 h-6 w-6 text-[#c9a84c]" />
                <p className="mb-1 text-sm font-semibold text-[#c9a84c]">
                  {item.bank}
                </p>
                <p className="font-mono text-lg text-[#f5f0e8]">
                  {item.account}
                </p>
                <p className="mt-1 text-xs text-[#8a8272]">a.n. {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#c9a84c]/10 py-12 px-6 text-center">
        <p className="text-sm text-[#8a8272]">
          Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i
          berkenan hadir.
        </p>
        <div className="ornament-divider mx-auto my-6 max-w-[200px]">
          <Heart className="h-3 w-3 text-[#c9a84c] shrink-0 fill-[#c9a84c]" />
        </div>
        <p className=" text-xl text-[#f5f0e8]">Ahmad & Fatimah</p>
        <p className="mt-4 text-xs text-[#8a8272]/50">
          Dibuat dengan <span className="text-[#c9a84c]">MomenKu</span>
        </p>
      </footer>
    </div>
  );
}
