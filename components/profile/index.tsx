"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { usePatchUpdateProfile } from "@/hooks/api/usePatchUpdateProfile";
import { toast } from "sonner"; // Import toast

export default function ProfileComponent({ initialData, email }: any) {
  const { mutate: updateProfile, isPending } = usePatchUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { isDirty }, // Ambil state isDirty
  } = useForm({
    defaultValues: {
      full_name: initialData.full_name || "",
      phone_number: initialData.phone_number || "",
      avatar_url: initialData.avatar_url || "",
    },
  });

  const onSubmit = (values: any) => {
    // Cek jika tidak ada perubahan
    if (!isDirty) {
      toast.info("Tidak ada perubahan yang dilakukan.");
      return;
    }

    updateProfile(values);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-black tracking-tight text-foreground uppercase">
          Profil Saya
        </h3>
        <p className="text-sm text-muted-foreground">
          Kelola informasi identitas dan akun Momenku kamu.
        </p>
      </div>

      <Separator className="bg-border/50" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <Avatar className="h-24 w-24 border-4 border-primary/10">
            <AvatarImage
              src={initialData.avatar_url?.replace("http://", "https://")}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="text-2xl font-bold bg-secondary text-primary">
              {initialData.full_name?.[0]?.toUpperCase() || "M"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-bold text-lg text-foreground capitalize">
              {initialData.full_name}
            </h4>
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full inline-block font-bold">
              GOOGLE ACCOUNT
            </p>
          </div>
        </div>

        <div className="grid gap-6 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="grid gap-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input
              id="email"
              value={email}
              disabled
              className="bg-muted rounded-xl"
            />
            <p className="text-[10px] text-muted-foreground italic">
              *Email tidak dapat diubah karena terhubung dengan Google.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="full_name">Nama Lengkap</Label>
            <Input
              id="full_name"
              {...register("full_name")}
              placeholder="Masukkan nama lengkap"
              className="rounded-xl"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone_number">Nomor WhatsApp (Opsional)</Label>
            <Input
              id="phone_number"
              {...register("phone_number")}
              placeholder="Contoh: 08123456789"
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary text-primary-foreground rounded-xl px-8 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all min-w-40"
          >
            {isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
