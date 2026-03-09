"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Info,
  UploadCloud,
  CheckCircle2,
  Loader2,
  X,
  Trash2,
} from "lucide-react";
import { InvitationInterface } from "@/type/invitation";
import { useUpdateInvitation } from "@/hooks/api/usePatchUpdateInvitation";
import { useUploadImage } from "@/hooks/api/usePostUploadImage";
import { toast } from "sonner";
import Image from "next/image";

export function BackgroundModal({
  open,
  onClose,
  invitation,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  invitation: InvitationInterface;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutate: updateInvitation, isPending: isUpdating } =
    useUpdateInvitation();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const isUsingCustom = invitation.is_custom_background_url === true;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/"))
      return toast.error("Harus file gambar!");
    if (file.size > 2 * 1024 * 1024) return toast.error("Maksimal 2MB");

    try {
      const result = await uploadImage({ file, invitationId: invitation.id });
      updateInvitation({
        id: invitation.id,
        payload: {
          custom_background_url: result.data?.url,
          is_custom_background_url: true,
        },
      });
      toast.success("Background kustom berhasil diunggah!");
    } catch (error) {
      toast.error("Gagal mengunggah gambar");
    }
  };

  const handleRemoveCustom = (e: React.MouseEvent) => {
    e.stopPropagation(); // Agar tidak men-trigger setAsCustom
    updateInvitation({
      id: invitation.id,
      payload: {
        custom_background_url: null,
        is_custom_background_url: false,
      },
    });
    toast.success("Background kustom dihapus");
  };

  const setAsDefault = () => {
    if (!isUsingCustom) return;
    updateInvitation({
      id: invitation.id,
      payload: { is_custom_background_url: false },
    });
  };

  const setAsCustom = () => {
    if (isUsingCustom || !invitation.custom_background_url) return;
    updateInvitation({
      id: invitation.id,
      payload: { is_custom_background_url: true },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="p-0 overflow-hidden max-w-lg gap-0 border-none shadow-2xl bg-white"
      >
        <DialogHeader className="p-6 pb-4 border-b flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold text-slate-800">
            Background Utama
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={() => onClose(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="flex gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
            <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-sm text-indigo-900 leading-relaxed">
              Merubah background ini akan merubah keseluruhan background
              halaman.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* OPSI DEFAULT */}
            <div className="space-y-3">
              <div
                onClick={setAsDefault}
                className={`relative aspect-[2/3] rounded-2xl border-2 overflow-hidden cursor-pointer transition-all hover:ring-4 hover:ring-teal-500/10 ${
                  !isUsingCustom
                    ? "border-teal-500 shadow-md scale-[1.02]"
                    : "border-slate-200"
                }`}
              >
                {invitation.background_url ? (
                  <Image
                    src={invitation.background_url}
                    alt="Default"
                    fill
                    className="object-cover opacity-80"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-100" />
                )}
                {!isUsingCustom && (
                  <div className="absolute top-3 right-3 bg-teal-500 text-white p-1 rounded-full shadow-lg z-10 animate-in zoom-in">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </div>
              <p className="text-sm font-bold text-slate-700 ml-1">
                Bg Default
              </p>
            </div>

            {/* OPSI CUSTOM */}
            <div className="space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => {
                  if (!invitation.custom_background_url) {
                    fileInputRef.current?.click();
                  } else {
                    setAsCustom();
                  }
                }}
                className={`relative aspect-[2/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all cursor-pointer overflow-hidden ${
                  isUsingCustom
                    ? "border-teal-500 bg-teal-50/30 scale-[1.02] shadow-md"
                    : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {isUploading ? (
                  <Loader2 className="h-8 w-8 text-teal-500 animate-spin" />
                ) : invitation.custom_background_url ? (
                  <div className="relative w-full h-full group">
                    <Image
                      src={invitation.custom_background_url}
                      alt="Custom"
                      fill
                      className="object-cover"
                    />

                    {/* Tombol Hapus - Hanya muncul saat hover */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0"
                        onClick={handleRemoveCustom}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-white rounded-full shadow-sm text-slate-400">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 text-center px-4">
                      Upload Background
                    </span>
                  </>
                )}

                {isUsingCustom && (
                  <div className="absolute top-3 right-3 bg-teal-500 text-white p-1 rounded-full shadow-lg z-10 animate-in zoom-in">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </div>
              <p className="text-sm font-bold text-slate-700 ml-1">
                Bg Custom {(isUpdating || isUploading) && "..."}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 bg-slate-50 border-t">
          <Button
            onClick={() => onClose(false)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 rounded-xl font-bold h-11"
          >
            Selesai
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
