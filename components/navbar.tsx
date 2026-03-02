"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useAuthStore } from "@/stores/auth-store";

export function Navbar() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efek transparan ke solid saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ActionButton = ({ isMobile }: { isMobile: boolean }) => {
    const className = isMobile
      ? "flex flex-col gap-4"
      : "flex items-center gap-6";
    return (
      <>
        {user?.isLoggedIn ? (
          <div className={className}>
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
            >
              Daftar Sekarang
            </Link>
          </div>
        )}
      </>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Momen<span className="text-primary">Ku</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {["Fitur", "Template", "Harga", "Testimoni", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <ActionButton isMobile={false} />

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 shadow-xl md:hidden animate-in fade-in slide-in-from-top-5">
            <div className="flex flex-col gap-5">
              {["Fitur", "Template", "Harga", "Testimoni", "FAQ"].map(
                (item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-bold text-foreground/80 hover:text-primary"
                  >
                    {item}
                  </Link>
                ),
              )}
              <hr className="border-border" />
              <ActionButton isMobile={true} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
