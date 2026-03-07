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
import {
  Search,
  Play,
  Pause,
  Loader2,
  Music as MusicIcon,
  CheckCircle2,
} from "lucide-react";
import { InvitationInterface } from "@/type/invitation";
import { useUpdateInvitation } from "@/hooks/api/usePatchUpdateInvitation";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "@/hooks/use-debounce";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetMusics } from "@/hooks/api/useGetMusics";

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
  const [inputUrl, setInputUrl] = React.useState(invitation.music_url || "");

  const audioPreviewRef = React.useRef<HTMLAudioElement | null>(null);
  const { ref, inView } = useInView();
  const { mutate, isPending: isUpdating } = useUpdateInvitation();

  // Infinite Query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetMusics({
      keyword: debouncedSearch,
      limit: 10,
    });

  const musics = data?.pages.flatMap((page) => page.data) || [];

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handlePreview = (id: string, url: string) => {
    if (previewId === id) {
      audioPreviewRef.current?.pause();
      setPreviewId(null);
    } else {
      if (audioPreviewRef.current) {
        audioPreviewRef.current.src = url;
        audioPreviewRef.current
          .play()
          .catch(() => console.error("Preview blocked"));
        setPreviewId(id);
      }
    }
  };

  const handleSaveMusic = (url: string, id: string | null = null) => {
    mutate({
      id: invitation.id,
      payload: {
        music_url: url,
        music_status: 1,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden max-w-md gap-0 border-none">
        <audio
          ref={audioPreviewRef}
          onEnded={() => setPreviewId(null)}
          className="hidden"
        />

        <DialogHeader className="p-6 pb-4 border-b bg-white">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <MusicIcon className="size-5 text-teal-600" />
            Pengaturan Musik
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6 bg-slate-50/50 max-h-[75vh] overflow-y-auto">
          {/* TOGGLE STATUS */}
          <div className="flex items-center justify-between p-4 border rounded-xl bg-white shadow-sm">
            <span className="text-sm font-bold">Musik Latar</span>
            <Switch
              checked={invitation.music_status === 1}
              onCheckedChange={(checked) => {
                mutate({
                  id: invitation.id,
                  payload: { music_status: checked ? 1 : 0 },
                });
              }}
            />
          </div>

          {/* SELECT SOURCE */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase text-muted-foreground ml-1">
              Pilih Sumber
            </label>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="w-full h-12 bg-white rounded-xl shadow-sm">
                <SelectValue placeholder="Pilih Sumber Musik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Koleksi Momenku</SelectItem>
                <SelectItem value="external">
                  Link YouTube / MP3 External
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {source === "default" ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari lagu..."
                  className="w-full py-3 pl-11 pr-4 text-sm bg-white border rounded-xl outline-none focus:border-teal-500 shadow-sm"
                />
              </div>

              <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                {isLoading && (
                  <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin text-teal-500" />
                  </div>
                )}

                {musics.map((music, i) => {
                  const isUsed = invitation.music_url === music?.music_url;
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isUsed ? "bg-teal-50 border-teal-200" : "bg-white border-slate-100"}`}
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
                          className={`size-9 rounded-full ${previewId === music?.id ? "bg-teal-500 text-white" : "bg-slate-100"}`}
                        >
                          {previewId === music?.id ? (
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
                          <span className="text-[10px] text-slate-400 truncate">
                            {music?.author || "Original Audio"}
                          </span>
                        </div>
                      </div>

                      <Button
                        disabled={isUsed || isUpdating}
                        onClick={() =>
                          handleSaveMusic(music?.music_url as string, music?.id)
                        }
                        size="sm"
                        className={`h-8 px-4 text-[10px] font-bold rounded-lg ${isUsed ? "bg-teal-600 text-white" : "border-teal-500 text-teal-600 hover:bg-teal-50"}`}
                        variant={isUsed ? "default" : "outline"}
                      >
                        {isUsed ? (
                          <CheckCircle2 className="size-3" />
                        ) : (
                          "Gunakan"
                        )}
                      </Button>
                    </div>
                  );
                })}
                <div
                  ref={ref}
                  className="h-10 flex items-center justify-center"
                >
                  {isFetchingNextPage && (
                    <Loader2 className="size-4 animate-spin text-slate-300" />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">
                  Link URL (YouTube/MP3)
                </label>
                <textarea
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full h-28 p-4 text-sm bg-white border rounded-xl focus:border-teal-500 outline-none resize-none shadow-sm transition-all"
                  placeholder="Contoh: https://www.youtube.com/watch?v=..."
                />
              </div>
              <Button
                onClick={() => handleSaveMusic(inputUrl, null)}
                disabled={isUpdating || !inputUrl}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Simpan Link"
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
