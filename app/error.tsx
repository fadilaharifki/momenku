"use client"; // Wajib use client

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke layanan seperti Sentry kalau ada
    console.error("Momenku_Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 font-poppins text-center">
      <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <AlertCircle size={40} />
      </div>

      <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">
        Aduh, Sepertinya Ada Masalah!
      </h1>
      <p className="text-slate-500 max-w-md mb-8">
        Terjadi kesalahan sistem di Momenku. Jangan panik, tim kami sudah
        diberitahu. Coba segarkan halaman atau kembali nanti.
      </p>

      <div className="flex gap-4">
        <Button
          onClick={() => reset()} // Fungsi bawaan Next.js untuk mencoba render ulang
          className="bg-[#3e938a] hover:bg-[#2d6e67] text-white rounded-2xl px-8 h-12 font-bold gap-2 shadow-lg"
        >
          <RefreshCcw size={18} /> Coba Lagi
        </Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/dashboard")}
          className="rounded-2xl px-8 h-12 font-bold border-slate-200"
        >
          Ke Dashboard
        </Button>
      </div>

      {error.digest && (
        <p className="mt-10 text-[10px] text-slate-300 font-mono uppercase tracking-widest">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
