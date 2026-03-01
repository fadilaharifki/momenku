"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/form-input";
import { LoginWithGoogle } from "../login-with-google";
import { useRegisterUser } from "@/hooks/api/usePostRegisterUser";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    full_name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
    phone_number: z
      .string()
      .min(10, "Nomor minimal 10 digit")
      .regex(/^62[0-9]+$/, "Nomor harus diawali dengan 62 (contoh: 62812...)"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    agreed: z.boolean().refine((val) => val === true, "Anda harus setuju"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

const benefits = [
  "50+ template premium eksklusif",
  "Undangan unlimited tamu",
  "Fitur RSVP & ucapan otomatis",
  "Amplop digital & gift registry",
  "Background music custom",
  "Masa aktif selamanya (Platinum)",
];

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending: isLoading } = useRegisterUser({
    onSuccess: () => {
      router.push("/login");
    },
  });

  const { control, handleSubmit, setValue, watch } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
      agreed: false,
    },
  });

  const agreed = watch("agreed");

  const onSubmit = async (values: RegisterValues) => {
    mutate({
      full_name: values.full_name,
      email: values.email,
      phone_number: values.phone_number,
      password: values.password,
    });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left - Form Section */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Logo Section */}
          <Link href="/" className="mb-10 inline-flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
              <Sparkles className="h-5 w-5 text-accent" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Momen<span className="text-primary">Ku</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Daftar <span className="text-primary">Akun</span>
            </h1>
            <p className="text-sm text-muted-foreground italic font-medium">
              Mulailah perjalanan hari istimewa Anda bersama kami.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
            <FormInput
              name="full_name"
              control={control}
              label="NAMA LENGKAP"
              placeholder="Nama Lengkap Anda"
              icon={User}
              className="h-12 bg-secondary/20 rounded-xl focus:ring-primary/20 border-border"
            />

            <FormInput
              name="email"
              control={control}
              label="EMAIL"
              placeholder="nama@email.com"
              type="email"
              icon={Mail}
              className="h-12 bg-secondary/20 rounded-xl focus:ring-primary/20 border-border"
            />

            <FormInput
              name="phone_number"
              control={control}
              label="NO. WHATSAPP"
              placeholder="62812..."
              type="tel"
              icon={Phone}
              className="h-12 bg-secondary/20 rounded-xl focus:ring-primary/20 border-border"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="password"
                control={control}
                label="PASSWORD"
                placeholder="Min. 8 Karakter"
                type={showPassword ? "text" : "password"}
                icon={Lock}
                className="h-12 bg-secondary/20 rounded-xl focus:ring-primary/20 border-border"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              <FormInput
                name="confirmPassword"
                control={control}
                label="KONFIRMASI"
                placeholder="Ulangi Password"
                type={showConfirmPassword ? "text" : "password"}
                icon={Lock}
                className="h-12 bg-secondary/20 rounded-xl focus:ring-primary/20 border-border"
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            </div>

            <div className="flex items-start space-x-3 py-3 px-1">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(checked) =>
                  setValue("agreed", checked as boolean)
                }
                className="mt-0.5 border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-md"
              />
              <label
                htmlFor="terms"
                className="text-[11px] font-medium text-muted-foreground cursor-pointer leading-tight"
              >
                Saya menyetujui{" "}
                <span className="text-primary font-bold hover:underline underline-offset-2">
                  Syarat & Ketentuan
                </span>{" "}
                serta Kebijakan Privasi yang berlaku.
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !agreed}
              className="h-12 w-full bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : null}
              Daftar Sekarang
            </Button>
          </form>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
              <span className="bg-background px-4 text-muted-foreground">
                Atau daftar melalui
              </span>
            </div>
          </div>

          <LoginWithGoogle />

          <p className="mt-10 text-center text-sm text-muted-foreground font-medium">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Masuk Disini
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Image Section (Botanical Look) */}
      <div className="relative hidden w-1/2 lg:block overflow-hidden">
        <Image
          src="/images/template-elegant.jpg"
          alt="MomenKu Premium Templates"
          fill
          className="object-cover"
          priority
        />
        {/* Sage Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-primary/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
          <div className="bg-white/95 dark:bg-card/90 p-10 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-sm max-w-sm">
            <div className="mb-6 inline-flex p-3 rounded-2xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground">
              Eksklusif Untuk <span className="text-primary">Momen Anda</span>
            </h2>
            <div className="space-y-4 text-left">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">
                    {b}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground italic">
                "Bergabunglah dengan ribuan pasangan yang telah mempercayakan
                momen bahagia mereka kepada kami."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
