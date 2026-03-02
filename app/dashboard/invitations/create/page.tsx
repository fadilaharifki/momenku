"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Globe,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useGetCategories } from "@/hooks/api/useGetCategories";
import { useCreateInvitation } from "@/hooks/api/usePostCreateInvitation";
import { toast } from "sonner";

export default function SetupInvitationStep() {
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category");
  const themeParam = searchParams.get("theme");

  const [category, setCategory] = useState(categoryParam || "wedding");
  const [slug, setSlug] = useState("");

  const { data: resCategories } = useGetCategories({ limit: "all" });
  const categories = resCategories?.data || [];

  const router = useRouter();
  const { mutate: create, isPending } = useCreateInvitation({
    onSuccess: (res) => {
      router.push(`/dashboard/invitations/${res.data?.id}`);
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Gagal membuat undangan";
      toast.error(msg);
    },
  });

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleNext = () => {
    if (!slug) return toast.error("Link undangan tidak boleh kosong");
    if (!themeParam)
      return toast.error("Pilih tema terlebih dahulu di katalog");

    create({
      theme_slug: themeParam,
      domain: slug,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Menampilkan informasi tema yang dipilih (Opsional) */}
      {themeParam && (
        <div className="mb-4 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-bold text-accent uppercase tracking-widest">
          Tema Terpilih: {themeParam.replace(/-/g, " ")}
        </div>
      )}

      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Atur Kategori &{" "}
          <span className="text-primary border-b-4 border-accent/30">
            Link Undangan
          </span>
        </h2>
        <p className="text-muted-foreground text-sm mt-3 font-medium">
          Langkah awal untuk identitas undangan digital unik Anda.
        </p>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-xl bg-card border-2 border-accent/20 rounded-[32px] shadow-2xl shadow-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl" />

        <CardContent className="p-8 md:p-10 relative z-10 space-y-8">
          {/* Kategori Undangan */}
          <div className="space-y-3">
            <Label className="text-[11px] font-bold text-primary tracking-[0.2em] uppercase ml-1">
              Kategori Undangan
            </Label>
            <div className="flex gap-4 w-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 shrink-0 transition-transform hover:rotate-6">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full h-12 bg-secondary/30 border-border rounded-xl focus:ring-primary/20 font-semibold">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent className="rounded-xl font-poppins">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.slug}
                      className="font-medium py-2.5"
                    >
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Link Undangan Section */}
          <div className="space-y-4">
            <Label className="text-[11px] font-bold text-primary tracking-[0.2em] uppercase ml-1">
              Link Undangan kustom
            </Label>

            <Alert className="bg-accent/10 border-accent/20 rounded-2xl py-3 px-4">
              <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
              <AlertDescription className="text-[11px] leading-relaxed text-accent-foreground font-semibold italic ml-2">
                Gunakan huruf kecil, angka, atau tanda hubung (-).
              </AlertDescription>
            </Alert>

            <div className="group flex items-center bg-secondary/30 border border-border rounded-2xl overflow-hidden focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all">
              <div className="hidden sm:flex px-5 py-3 bg-secondary border-r border-border text-muted-foreground text-xs font-bold items-center gap-2 tracking-wide">
                <Globe size={14} className="text-primary" />
                momenku.com/
              </div>
              <Input
                type="text"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
                }
                placeholder="cth. nama-dan-pasangan"
                className="flex-1 border-0 bg-transparent h-12 px-5 text-sm font-bold outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/40"
              />
              <div className="pr-3">
                <div className="bg-primary/10 p-2 rounded-xl group-focus-within:bg-primary group-focus-within:text-white transition-all">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 rounded-2xl border-border hover:bg-secondary transition-all active:scale-90"
            >
              <ArrowLeft size={24} className="text-muted-foreground" />
            </Button>
            <Button
              onClick={handleNext}
              disabled={isPending}
              className="h-14 flex-1 bg-primary text-white rounded-2xl font-bold transition-all active:scale-95"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  Selanjutnya <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
