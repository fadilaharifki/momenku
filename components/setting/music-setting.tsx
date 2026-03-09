"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Play,
  Pause,
  Loader2,
  Music as MusicIcon,
  CheckCircle2,
  UploadCloud,
  ExternalLink,
} from "lucide-react";
import { InvitationInterface } from "@/type/invitation";
import { useUpdateInvitation } from "@/hooks/api/usePatchUpdateInvitation";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetMusics } from "@/hooks/api/useGetMusics";
import { useUploadMusic } from "@/hooks/api/usePostUploadMusic";
import ReactPlayer from "react-player";

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
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [previewId, setPreviewId] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [inputUrl, setInputUrl] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { ref, inView } = useInView();
  const { mutate: updateInvitation, isPending: isUpdating } =
    useUpdateInvitation();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetMusics({
      keyword: debouncedSearch,
      limit: 10,
    });

  const { mutateAsync: uploadMusic, isPending: isUploadingFile } =
    useUploadMusic({
      onSuccess: () => toast.success("Musik berhasil diunggah!"),
      onError: (err: any) =>
        toast.error(err.response?.data?.message || "Gagal upload"),
    });

  const musics = data?.pages.flatMap((page) => page.data) || [];

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  React.useEffect(() => {
    if (!open) {
      setPreviewId(null);
      setPreviewUrl(null);
    }
  }, [open]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("audio/"))
      return toast.error("Harus file audio!");
    if (file.size > 5 * 1024 * 1024) return toast.error("Maksimal 5MB");

    try {
      await uploadMusic({ file, invitationId: invitation.id });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {}
  };

  const handlePreview = (id: string, url: string) => {
    if (previewId === id) {
      setPreviewId(null);
      setPreviewUrl(null);
    } else {
      setPreviewId(id);
      setPreviewUrl(url);
    }
  };

  const handleSaveMusic = (url: string) => {
    const urlPattern = /^(https?:\/\/)/;
    if (!urlPattern.test(url)) {
      return toast.error("Masukkan link URL yang valid (http/https)");
    }

    updateInvitation({
      id: invitation.id,
      payload: { music_url: url, music_status: 1 },
    });
  };

  const currentMusicUrl = invitation.music_url;
  const isCurrentYT =
    currentMusicUrl?.includes("youtube.com") ||
    currentMusicUrl?.includes("youtu.be");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden max-w-md gap-0 border-none shadow-2xl">
        <div className="hidden">
          {previewUrl && (
            <ReactPlayer
              src={previewUrl}
              playing={!!previewId}
              volume={0.8}
              width="0px"
              height="0px"
              onEnded={() => {
                setPreviewId(null);
                setPreviewUrl(null);
              }}
            />
          )}
        </div>

        <DialogHeader className="p-6 pb-4 border-b bg-white">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <div className="p-2 bg-teal-50 rounded-lg">
              <MusicIcon className="size-5 text-teal-600" />
            </div>
            Pengaturan Musik
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6 bg-slate-50/50 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between p-4 border rounded-2xl bg-white shadow-sm transition-all hover:shadow-md">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">
                Aktifkan Musik
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                Musik akan berputar otomatis saat undangan dibuka
              </span>
            </div>
            <Switch
              checked={invitation.music_status === 1}
              onCheckedChange={(checked) => {
                updateInvitation({
                  id: invitation.id,
                  payload: { music_status: checked ? 1 : 0 },
                });
              }}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider ml-1">
              Sumber Musik
            </label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="w-full h-12 bg-white rounded-2xl border-slate-200 shadow-sm focus:ring-teal-500">
                <SelectValue placeholder="Pilih Sumber Musik" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="default">Koleksi Momenku</SelectItem>
                <SelectItem value="upload">Upload File MP3</SelectItem>
                <SelectItem value="external">Link YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {source === "default" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari lagu romantis..."
                  className="w-full py-3.5 pl-11 pr-4 text-sm bg-white border border-slate-200 rounded-2xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 shadow-sm transition-all"
                />
              </div>

              <div className="space-y-2 max-h-62.5 overflow-y-auto pr-2 custom-scrollbar">
                {isLoading && (
                  <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin text-teal-500" />
                  </div>
                )}

                {musics.map((music, i) => {
                  const isUsed = invitation.music_url === music?.music_url;
                  const isPlayingThis = previewId === music?.id;
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${isUsed ? "bg-teal-50 border-teal-200" : "bg-white border-slate-100 hover:border-slate-300"}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handlePreview(
                              music?.id as string,
                              music?.music_url as string,
                            )
                          }
                          className={`size-10 rounded-full shrink-0 ${isPlayingThis ? "bg-teal-500 text-white hover:bg-teal-600" : "bg-slate-100 hover:bg-slate-200"}`}
                        >
                          {isPlayingThis ? (
                            <Pause className="size-4 fill-current" />
                          ) : (
                            <Play className="size-4 fill-current ml-0.5" />
                          )}
                        </Button>
                        <div className="flex flex-col truncate">
                          <span
                            className={`text-[13px] font-bold truncate ${isUsed ? "text-teal-700" : "text-slate-700"}`}
                          >
                            {music?.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {music?.author || "Koleksi Momenku"}
                          </span>
                        </div>
                      </div>
                      <Button
                        disabled={isUsed || isUpdating}
                        onClick={() =>
                          handleSaveMusic(music?.music_url as string)
                        }
                        size="sm"
                        className={`h-9 px-4 text-[11px] font-bold rounded-xl transition-all ${isUsed ? "bg-teal-600 text-white" : "border-teal-500 text-teal-600 hover:bg-teal-50"}`}
                        variant={isUsed ? "default" : "outline"}
                      >
                        {isUsed && <CheckCircle2 className="size-3.5 mr-1" />}
                        {isUsed ? "Aktif" : "Gunakan"}
                      </Button>
                    </div>
                  );
                })}
                <div
                  ref={ref}
                  className="h-10 flex items-center justify-center"
                >
                  {isFetchingNextPage && (
                    <Loader2 className="size-5 animate-spin text-teal-300" />
                  )}
                </div>
              </div>
            </div>
          )}

          {source === "upload" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="audio/mpeg,audio/wav,audio/x-m4a"
                className="hidden"
              />
              <div
                onClick={() =>
                  !isUploadingFile && fileInputRef.current?.click()
                }
                className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-teal-200 rounded-3xl bg-white hover:bg-teal-50/50 cursor-pointer transition-all group active:scale-95"
              >
                {isUploadingFile ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="size-12 text-teal-500 animate-spin mb-3" />
                    <p className="text-sm font-bold text-teal-600">
                      Sedang mengunggah...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-teal-50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="size-8 text-teal-500" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">
                      Klik untuk upload MP3
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Maksimal file 5MB
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {source === "external" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase text-slate-400 ml-1">
                  URL YouTube
                </label>
                <div className="relative">
                  <ExternalLink className="absolute left-4 top-4 size-4 text-slate-400" />
                  <textarea
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full h-24 p-4 pl-11 text-sm bg-white border border-slate-200 rounded-2xl focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 outline-none resize-none shadow-sm transition-all font-medium"
                    placeholder="Contoh: https://www.youtube.com/watch?v=..."
                  />
                </div>
              </div>
              <Button
                onClick={() => handleSaveMusic(inputUrl)}
                disabled={isUpdating || !inputUrl}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all active:scale-95"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Simpan & Terapkan"
                )}
              </Button>
            </div>
          )}
        </div>

        {currentMusicUrl && (
          <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3 overflow-hidden">
              <Button
                size="icon"
                variant="ghost"
                className={`size-10 rounded-full shrink-0 ${previewId === "current" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}`}
                onClick={() => handlePreview("current", currentMusicUrl)}
              >
                {previewId === "current" ? (
                  <Pause size={18} />
                ) : (
                  <Play size={18} className="ml-0.5" />
                )}
              </Button>
              <div className="flex flex-col truncate">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  Musik Aktif Saat Ini
                </span>
                <span className="text-[12px] font-bold text-slate-700 truncate max-w-50">
                  {isCurrentYT
                    ? "🎵 Music Now"
                    : decodeURIComponent(
                        currentMusicUrl.split("?")[0].split("/").pop() || "",
                      )}
                </span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
