"use client";

import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { X, MessageSquare, Badge } from "lucide-react";
import { usePostRSVP } from "@/hooks/api/usePostRSVP";
import { useGetRSVPByCode } from "@/hooks/api/useGetRSVPByCode";
import { useGetRSVPs } from "@/hooks/api/useGetRSVPs";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { useUpdateRSVPByCode } from "@/hooks/api/usePatchUpdateRSVPByCode";
import { RSVPDataSetting } from "@/type/rsvp";

interface RSVPGuestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rsvpData: RSVPDataSetting;
  invitationId: string;
  rsvpCode?: string;
}

export default function RSVPGuestDialog({
  invitationId,
  isOpen,
  onClose,
  rsvpData,
  rsvpCode,
}: RSVPGuestDialogProps) {
  const [showForm, setShowForm] = useState(true);

  // Buat Schema Zod secara dinamis berdasarkan rsvp_settings
  const dynamicSchema = useMemo(() => {
    const shape: any = {};

    rsvpData?.rsvp_settings?.inputs?.forEach((input: any) => {
      if (!input.is_published) return;

      let fieldSchema = z.string();

      if (input.required && input.name !== "guest_count") {
        fieldSchema = fieldSchema.min(1, `${input.label} wajib diisi`);
      }

      shape[input.name] = fieldSchema.default("");
    });

    return z.object(shape).superRefine((data, ctx) => {
      const guestSetting = rsvpData?.rsvp_settings?.inputs?.find(
        (i: any) => i.name === "guest_count",
      );

      if (
        data.attendance === "Hadir" &&
        guestSetting?.required &&
        (!data.guest_count || data.guest_count === "")
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Jumlah tamu wajib diisi",
          path: ["guest_count"],
        });
      }
    });
  }, [rsvpData?.rsvp_settings]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dynamicSchema),
  });
  const attendanceValue = watch("attendance");

  const { data: detailRsvp } = useGetRSVPByCode(rsvpCode, {
    enabled: !!rsvpCode,
  });
  const { data: allRsvps } = useGetRSVPs({
    invitation_id: invitationId,
    limit: "all",
  });

  const { mutate: handleSave, isPending: loadingSave } =
    usePostRSVP(invitationId);
  const { mutate: handleUpdate, isPending: loadingUpdate } =
    useUpdateRSVPByCode();

  useEffect(() => {
    if (detailRsvp?.data) {
      const data = detailRsvp.data as Record<string, any>;
      Object.keys(data).forEach((key) => setValue(key, data[key]?.toString()));
      setShowForm(false);
    }
  }, [detailRsvp, setValue]);

  const onSubmit = (formData: any) => {
    const paylaod = {
      ...formData,
      guest_count: formData.attendance === "Haidr" ? formData.guest_count : "0",
    };
    if (rsvpCode && detailRsvp?.data) {
      handleUpdate(
        {
          code: rsvpCode,
          payload: paylaod,
        },
        {
          onSuccess: (res) => {
            toast.success(res.message);
            setShowForm(false);
          },
        },
      );
    } else {
      handleSave(paylaod, {
        onSuccess: (res) => {
          toast.success(res.message);
          reset();
        },
      });
    }
  };

  if (rsvpData?.rsvp_settings.rsvp_status !== 1) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md p-0 border-none bg-white overflow-hidden rounded-[2.5rem] font-poppins shadow-2xl max-h-[90vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-all active:scale-90"
        >
          <X size={20} />
        </button>

        <div className="p-8 overflow-y-auto scrollbar-hide">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-serif text-center text-slate-800 tracking-widest uppercase">
              {showForm ? "RSVP Confirmation" : "E-Ticket"}
            </DialogTitle>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
              Momenku Digital Invitation
            </p>
          </DialogHeader>

          {!showForm &&
          detailRsvp?.data &&
          rsvpData.rsvp_settings.show_download_qr ? (
            <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
              <div className="bg-slate-50 p-6 rounded-4xl border-2 border-dashed border-slate-200 flex flex-col items-center">
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                  <QRCode value={detailRsvp.data.rsvp_code} size={150} />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">
                  RSVP CODE
                </p>
                <h3 className="text-xl font-black text-primary tracking-widest">
                  {detailRsvp.data.rsvp_code}
                </h3>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-800">
                  Terima Kasih, {detailRsvp.data.name}!
                </h4>
                <p className="text-sm text-slate-500 italic">
                  "Konfirmasi kehadiranmu telah kami terima."
                </p>
              </div>
              {rsvpData.rsvp_settings.show_update_confirmation && (
                <Button
                  variant="outline"
                  onClick={() => setShowForm(true)}
                  className="w-full h-12 rounded-2xl border-slate-200 text-slate-500 text-xs font-bold uppercase hover:bg-slate-50"
                >
                  Edit Data RSVP
                </Button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {rsvpData?.rsvp_settings?.inputs
                ?.filter((i: any) => i.is_published)
                .map((field: any) => {
                  if (
                    field.name === "guest_count" &&
                    attendanceValue !== "Hadir"
                  )
                    return null;

                  return (
                    <div key={field.name} className="space-y-1.5">
                      <Label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-rose-400">*</span>
                        )}
                      </Label>

                      {field.type === "select" ||
                      field.name === "attendance" ||
                      field.name === "guest_count" ? (
                        <Select
                          onValueChange={(val) =>
                            setValue(field.name, val, { shouldValidate: true })
                          }
                          defaultValue={watch(field.name) as string | undefined}
                        >
                          <SelectTrigger className="w-full h-11 rounded-xl bg-slate-50 border-none ring-0 focus:ring-2 focus:ring-primary/20 text-sm">
                            <SelectValue placeholder={`Pilih ${field.label}`} />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {field.name === "guest_count"
                              ? [...Array(parseInt(field.value || "1"))].map(
                                  (_, i) => (
                                    <SelectItem
                                      key={i}
                                      value={(i + 1).toString()}
                                    >
                                      {i + 1} Orang
                                    </SelectItem>
                                  ),
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
                          {...register(field.name)}
                          placeholder={field.placeholder}
                          className="rounded-xl bg-slate-50 border-none min-h-24 text-sm focus-visible:ring-2 focus-visible:ring-primary/20"
                        />
                      ) : (
                        <Input
                          {...register(field.name)}
                          type={field.type}
                          placeholder={field.placeholder}
                          className="h-11 rounded-xl bg-slate-50 border-none text-sm focus-visible:ring-2 focus-visible:ring-primary/20"
                        />
                      )}
                      {errors[field.name] && (
                        <p className="text-[10px] text-rose-500 ml-1 font-medium">
                          {errors[field.name]?.message as string}
                        </p>
                      )}
                    </div>
                  );
                })}

              <Button
                type="submit"
                disabled={loadingSave || loadingUpdate}
                className="w-full h-12 bg-slate-800 text-white rounded-xl font-bold uppercase tracking-widest mt-4 shadow-lg active:scale-95 transition-all"
              >
                {loadingSave || loadingUpdate
                  ? "Processing..."
                  : rsvpCode
                    ? "Update RSVP"
                    : "Kirim RSVP"}
              </Button>
            </form>
          )}

          {rsvpData.rsvp_settings.show_comments && (
            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={18} className="text-primary" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  Ucapan & Doa Restu
                </h3>
              </div>

              <div className="space-y-4 max-h-75 overflow-y-auto pr-2 scrollbar-hide">
                {allRsvps?.data?.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                        {rsvp.name}
                      </p>
                      <span
                        className={`text-[9px] px-2.5 py-1 rounded-md font-black uppercase tracking-tighter transition-all ${
                          rsvp.attendance === "Hadir" || rsvp.attendance
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-rose-100 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {rsvp.attendance === "Hadir" || rsvp.attendance
                          ? "Hadir"
                          : "Absen"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      {rsvp.comment}
                    </p>
                  </div>
                ))}
                {(!allRsvps?.data || allRsvps.data.length === 0) && (
                  <p className="text-center text-xs text-slate-400 py-4 italic">
                    Belum ada ucapan.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
