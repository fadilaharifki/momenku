"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Search, Play } from "lucide-react";
import { InvitationInterface } from "@/type/invitation";
import { useUpdateInvitation } from "@/hooks/api/usePatchUpdateInvitation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function MusicModal({
  open,
  onClose,
  invitation,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  invitation: InvitationInterface;
}) {
  const [source, setSource] = React.useState("default");
  const { mutate, isPending: isLoading } = useUpdateInvitation();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden max-w-md gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-bold">Music</DialogTitle>
          <DialogDescription className="hidden">
            Pengaturan musik latar undangan
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* TOGGLE PENGATURAN */}
          <div className="flex items-center justify-between p-4 border rounded-xl bg-card">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Pengaturan</span>
              <span className="px-2 py-0.5 text-[10px] font-bold text-green-700 bg-green-100 rounded-full uppercase">
                Aktif
              </span>
            </div>
            <Switch
              onCheckedChange={(checked) => {
                mutate({
                  id: invitation.id,
                  payload: {
                    music_status: checked ? 1 : 0,
                  },
                });
              }}
              value={invitation.music_status}
            />
          </div>

          {/* SELECT SOURCE */}
          <div className="space-y-2">
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="w-full h-12 focus:ring-teal-500">
                <SelectValue placeholder="Pilih Sumber Musik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Music Source: Default</SelectItem>
                <SelectItem value="youtube">Music Source: YouTube</SelectItem>
                <SelectItem value="soundcloud">
                  Music Source: SoundCloud
                </SelectItem>
                <SelectItem value="link">Audio Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* DYNAMIC CONTENT */}
          {source === "default" ? (
            <div className="space-y-4">
              {/* UPLOAD BOX */}
              <div className="p-8 text-center border-2 border-dashed rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <p className="text-sm font-bold text-foreground">
                  Upload file MP3 (maks. 5 MB)
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Biaya:{" "}
                  <span className="font-bold text-foreground">-10 Credit</span>{" "}
                  — Saldo:{" "}
                  <span className="font-bold text-foreground">0 Credit.</span>
                </p>
              </div>

              {/* SEARCH & LIST */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari Music..."
                  className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="space-y-2 max-height-[200px] overflow-y-auto pr-2">
                {/* Item 1 */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-full border-foreground"
                    >
                      <Play className="size-3 fill-current" />
                    </Button>
                    <span className="text-sm font-medium">
                      AKAD - PAYUNG TEDUH
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 h-8 text-[11px] font-bold uppercase"
                  >
                    Digunakan
                  </Button>
                </div>
                {/* Item 2 */}
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 rounded-full border-muted-foreground text-muted-foreground"
                    >
                      <Play className="size-3" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Flashlight - Jessie J
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-[11px] font-bold uppercase border-green-500 text-green-600 hover:bg-green-50"
                  >
                    Gunakan
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 text-purple-700">
                <span className="text-xs font-medium">
                  Tutorial Custom Music
                </span>
                <Button
                  size="sm"
                  className="bg-purple-700 hover:bg-purple-800 h-7 text-[10px]"
                >
                  Klik Disini
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-medium text-muted-foreground">
                  Link {source.charAt(0).toUpperCase() + source.slice(1)} / ID
                </label>
                <textarea
                  className="w-full h-24 p-3 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 outline-hidden resize-none"
                  placeholder={`Masukkan link ${source} di sini...`}
                />
              </div>

              <div className="p-4 border border-red-100 bg-red-50 rounded-lg">
                <p className="text-[11px] leading-relaxed text-red-800 italic">
                  * Dengan melakukan embed atau menggunakan file ini, Anda
                  menyatakan memiliki lisensi resmi atau hak cipta sah untuk
                  menggunakannya. Segala pelanggaran menjadi tanggung jawab
                  pengguna.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
