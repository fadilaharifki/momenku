"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { LoginWithGoogle } from "../login-with-google";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating login logic
    setTimeout(() => {
      setIsLoading(false);
      // router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Kiri - Image Panel (Botanical Overlay) */}
      <div className="relative hidden w-1/2 lg:block border-r border-border overflow-hidden">
        <Image
          src="/images/hero-wedding.jpg"
          alt="MomenKu - Premium Digital Invitation"
          fill
          className="object-cover transition-transform duration-10000 hover:scale-110"
          priority
        />
        {/* Overlay Sage Gradient yang Mewah */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-background/90 backdrop-blur-[1px]" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center text-white">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="h-8 w-8 text-accent" />
          </div>
          <h2 className="mb-4 text-5xl font-bold tracking-tight">
            Momen<span className="text-accent">Ku</span>
          </h2>
          <p className="max-w-md text-lg font-medium leading-relaxed opacity-90 italic">
            "Tempat di mana setiap detail kecil dari kebahagiaan Anda dirancang
            dengan penuh keanggunan."
          </p>

          <div className="mt-12 flex items-center gap-4">
            <div className="h-px w-12 bg-white/30" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              Premium Experience
            </span>
            <div className="h-px w-12 bg-white/30" />
          </div>
        </div>
      </div>

      {/* Kanan - Form Panel */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="mb-12 flex items-center gap-2 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Momen<span className="text-primary">Ku</span>
            </span>
          </Link>

          <div className="mb-10">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
              Selamat Datang <span className="text-primary">Kembali</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Silakan masuk untuk mengelola momen istimewa Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-primary tracking-[0.15em] uppercase text-[10px] font-bold ml-1"
              >
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 border-border bg-secondary/20 pl-12 rounded-xl focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label
                  htmlFor="password"
                  className="text-primary tracking-[0.15em] uppercase text-[10px] font-bold"
                >
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  Lupa password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 border-border bg-secondary/20 pl-12 pr-12 rounded-xl focus:ring-primary/20 focus:border-primary transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Masuk ke Akun <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-background px-4 text-muted-foreground">
                Atau masuk dengan
              </span>
            </div>
          </div>

          <div className="group">
            <LoginWithGoogle />
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground font-medium">
            Belum bergabung?{" "}
            <Link
              href="/register"
              className="font-bold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline"
            >
              Mulai Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
