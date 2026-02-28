"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { usePostRSVP } from "@/hooks/api/usePostRSVP";
import { toast } from "sonner";
interface RSVPGuestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rsvpData: {
    rsvp_status: number;
    rsvp_settings: any;
  };
  invitationId: string;
}

export default function RSVPGuestDialog({
  invitationId,
  isOpen,
  onClose,
  rsvpData,
}: RSVPGuestDialogProps) {
  const { rsvp_settings, rsvp_status } = rsvpData;

  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const { mutate: handleSave, isPending: loading } = usePostRSVP(invitationId, {
    onSuccess: (res) => {
      toast.success(res.message);
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const attendanceValue = watch("attendance");

  console.log(rsvpData, "rsvpData");

  const onSubmit = async (formData: any) => {
    handleSave(formData);
  };

  // Jangan tampilkan apapun jika fitur RSVP nonaktif
  if (rsvp_status !== 1) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-112.5 p-0 border-none bg-white overflow-hidden rounded-[2.5rem] font-poppins shadow-2xl">
        {/* Tombol Tutup Custom */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-all active:scale-90"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-serif text-center text-slate-800 tracking-[0.2em] uppercase">
              RSVP
            </DialogTitle>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
              Momenku Wedding Confirmation
            </p>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 max-h-[60vh] overflow-y-auto px-1 scrollbar-hide"
          >
            {rsvp_settings?.inputs
              ?.filter((i: any) => i.is_published)
              .map((field: any) => {
                // Logic: Field 'guest' (Jumlah Tamu) hanya muncul jika Kehadiran sesuai showguest (misal: "Hadir")
                if (field.name === "guest" && attendanceValue !== "Hadir") {
                  return null;
                }

                return (
                  <div key={field.name} className="space-y-2">
                    <Label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-rose-400">*</span>
                      )}
                    </Label>

                    {field.type === "select" ||
                    field.name === "attendance" ||
                    field.name === "guest" ? (
                      <Select
                        onValueChange={(val) => setValue(field.name, val)}
                        required={field.required}
                      >
                        <SelectTrigger className="w-full h-12 rounded-2xl bg-slate-50 border-none ring-0 focus:ring-2 focus:ring-[#d1b894]/20 transition-all text-sm">
                          <SelectValue placeholder={`Pilih ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100">
                          {field.name === "guest"
                            ? [...Array(parseInt(field.value || "1"))].map(
                                (_, i) => {
                                  const val = (i + 1).toString();
                                  return (
                                    <SelectItem key={val} value={val}>
                                      {val} Orang
                                    </SelectItem>
                                  );
                                },
                              )
                            : field.value?.split(",").map((opt: string) => (
                                <SelectItem key={opt} value={opt}>
                                  {opt}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "textarea" ? (
                      <Textarea
                        {...register(field.name, { required: field.required })}
                        placeholder={field.placeholder || "Tulis ucapan..."}
                        className="rounded-2xl bg-slate-50 border-none min-h-25 focus-visible:ring-2 focus-visible:ring-[#d1b894]/20 text-sm"
                      />
                    ) : field.type === "phone" ? (
                      <div className="flex gap-2">
                        <div className="w-20 h-12 flex items-center justify-center bg-slate-100 border-none rounded-2xl text-sm font-bold text-slate-500">
                          +{rsvp_settings.default_country_code || 62}
                        </div>
                        <Input
                          {...register(field.name, {
                            required: field.required,
                          })}
                          type="tel"
                          placeholder="8123xxx"
                          className="flex-1 h-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#d1b894]/20 text-sm"
                        />
                      </div>
                    ) : (
                      <Input
                        {...register(field.name, { required: field.required })}
                        type={field.type}
                        placeholder={field.placeholder || field.label}
                        className="h-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-[#d1b894]/20 text-sm"
                      />
                    )}
                  </div>
                );
              })}
          </form>

          <div className="mt-8">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="w-full h-14 bg-accent text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-[#d1b894]/30 transition-all active:scale-95"
            >
              {loading ? "Sabar ya..." : "Konfirmasi Kehadiran"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
