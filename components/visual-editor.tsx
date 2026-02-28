"use client";

import { useState, useEffect, useRef } from "react";
import {
  Type,
  Save,
  Bold,
  Italic,
  Sparkles,
  Loader2,
  Trash2,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon, // Tambahkan icon link
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { InvitationSection } from "@/type/invitation";
import { useUpdateSection } from "@/hooks/api/useUpdateSection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUploadImage } from "@/hooks/api/useUploadImage";
import { useDeleteImage } from "@/hooks/api/useDeleteImage";
import { cn } from "@/lib/utils";

const LIB_ASSETS = [
  "cartoon_bride.webp",
  "cartoon_groom_black.webp",
  "cartoon_groom_white.webp",
  "cartoon_muslim_bride.webp",
  "cartoon_muslim_groom.webp",
  "faceless_bride.webp",
  "faceless_groom.webp",
  "faceless_muslim_couple.webp",
  "maps.webp",
  "muslim_bride_faceless.webp",
  "muslim_groom_faceless.webp",
  "gunung-wayang.webp",
];

interface Props {
  id: string;
  section: InvitationSection;
  onClose?: () => void;
  onDelete?: (id: string) => void;
}

export default function VisualLiveEditor({
  id,
  section,
  onClose,
  onDelete,
}: Props) {
  const { mutate, isPending: isLoading } = useUpdateSection(section.id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [htmlBody, setHtmlBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"text" | "image">("text");
  const [imageTab, setImageTab] = useState<"upload" | "assets">("upload");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // States Text & Link Editor
  const [editValue, setEditValue] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editLink, setEditLink] = useState(false);
  const [fontSize, setFontSize] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Default");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  // States Image Editor
  const [imageUrl, setImageUrl] = useState("");

  const { mutate: uploadImage, isPending: isUploading } = useUploadImage({
    onSuccess: (res) => {
      if (imageUrl && !imageUrl.startsWith("/assets/")) {
        const oldFileName = imageUrl.split("/").pop();
        if (oldFileName)
          deleteImage({ fileName: oldFileName, invitationId: id });
      }
      setImageUrl(res?.data?.url as string);
    },
    onError: (err) => alert("Gagal upload: " + err.message),
  });

  const { mutate: deleteImage } = useDeleteImage();

  const prepareHtml = (rawHtml: string) => {
    if (!rawHtml) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    doc.querySelectorAll("[data-aos]").forEach((el) => {
      el.classList.add("aos-animate");
      (el as HTMLElement).style.transition = "none";
    });

    const textElements = doc.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, b, i, a, button, div.editable-node",
    );
    textElements.forEach((el, index) => {
      if (el.textContent?.trim() || el.tagName === "A") {
        el.classList.add("editable-text-only");
        // Beri tanda khusus jika elemen adalah Link
        if (el.tagName === "A") el.classList.add("editable-link");

        if (!el.id) el.id = `txt-${section.id.slice(0, 4)}-${index}`;
      }
    });

    const imgElements = doc.querySelectorAll("img");
    imgElements.forEach((img, index) => {
      img.classList.add("editable-image");
      if (!img.id) img.id = `img-${section.id.slice(0, 4)}-${index}`;
    });

    return doc.body.innerHTML;
  };

  useEffect(() => {
    if (section?.body) setHtmlBody(prepareHtml(section.body));
  }, [section]);

  const handleElementClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Detect Image
    const imgTarget = target.closest(".editable-image") as HTMLImageElement;
    if (imgTarget) {
      e.preventDefault();
      e.stopPropagation();
      setEditMode("image");
      setSelectedId(imgTarget.id);
      setImageUrl(imgTarget.src);
      setIsModalOpen(true);
      return;
    }

    // Detect Text or Link
    const textTarget = target.closest(".editable-text-only") as HTMLElement;
    if (textTarget) {
      e.preventDefault();
      e.stopPropagation();
      setEditMode("text");
      setSelectedId(textTarget.id);
      setEditValue(textTarget.innerText.trim());

      // Ambil URL jika target adalah Link <a>
      if (textTarget.tagName === "A") {
        setEditUrl((textTarget as HTMLAnchorElement).href);
        setEditLink(true);
      } else {
        setEditLink(false);
        setEditUrl("");
      }

      const style = window.getComputedStyle(textTarget);
      setFontSize(style.fontSize);
      setFontFamily(style.fontFamily.replace(/['"]/g, ""));
      setIsBold(
        style.fontWeight === "bold" || parseInt(style.fontWeight) >= 700,
      );
      setIsItalic(style.fontStyle === "italic");

      const rgb = style.color;
      const hex =
        "#" +
        rgb
          .match(/\d+/g)
          ?.map((x) => parseInt(x).toString(16).padStart(2, "0"))
          .join("");
      setTextColor(hex || "#000000");
      setIsModalOpen(true);
    }
  };

  const handleApplyChanges = () => {
    if (!selectedId) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlBody, "text/html");
    const element = doc.getElementById(selectedId);

    if (element) {
      if (editMode === "text") {
        element.innerHTML = editValue.replace(/\n/g, "<br />");
        element.style.fontSize = fontSize;
        element.style.color = textColor;
        element.style.fontWeight = isBold ? "bold" : "normal";
        element.style.fontStyle = isItalic ? "italic" : "normal";
        if (fontFamily !== "Default") element.style.fontFamily = fontFamily;

        // Simpan URL jika elemen adalah Link
        if (element.tagName === "A" && editUrl) {
          (element as HTMLAnchorElement).href = editUrl;
        }
      } else {
        (element as HTMLImageElement).src = imageUrl;
      }
      setHtmlBody(doc.body.innerHTML);
    }
    setIsModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadImage({ file, invitationId: id });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = () => {
    if (imageUrl && !imageUrl.startsWith("/assets/")) {
      const fileName = imageUrl.split("/").pop();
      if (fileName) deleteImage({ fileName, invitationId: id });
    }
    setImageUrl("");
  };

  return (
    <div className="p-4 md:p-6 space-y-6 font-poppins">
      {/* HEADER */}
      <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-primary/10 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" className="rounded-xl">
                <Trash2 size={18} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-4xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Section?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete?.(section.id)}
                  className="bg-red-600 rounded-xl"
                >
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <h2 className="text-sm font-black uppercase tracking-tight hidden md:block text-slate-700">
            Visual Editor
          </h2>
        </div>
        <Button
          onClick={() => mutate({ body: htmlBody }, { onSuccess: onClose })}
          disabled={isLoading}
          className="bg-[#d4af37] text-white rounded-2xl px-8"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save size={18} className="mr-2" />
          )}{" "}
          Simpan
        </Button>
      </div>

      {/* DEVICE PREVIEW */}
      <div className="flex justify-center py-10 bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="relative w-[375px] h-[667px] shadow-[0_0_0_12px_#1e293b] rounded-[3rem] bg-[#4a0404] overflow-hidden">
          <div
            className="preview-viewport h-full w-full overflow-y-auto scrollbar-hide"
            onClick={handleElementClick}
          >
            <div
              className="html-content-root h-full"
              dangerouslySetInnerHTML={{ __html: htmlBody }}
            />
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .preview-viewport section { height: 667px !important; min-height: 667px !important; }
        .editable-text-only:hover { outline: 2px solid #d4af37; outline-offset: 2px; cursor: pointer; }
        .editable-link:hover { outline: 2px dashed #d4af37 !important; background-color: rgba(212, 175, 55, 0.1) !important; cursor: pointer; }
        .editable-image:hover { outline: 4px solid #d4af37 !important; outline-offset: -4px; cursor: pointer; filter: brightness(0.8); }
      `,
        }}
      />

      {/* MODAL EDITOR */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] p-0 overflow-hidden font-poppins">
          <DialogHeader className="p-8 bg-slate-50/80 border-b">
            <DialogTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                {editMode === "text" ? (
                  <Type size={16} className="text-[#d4af37]" />
                ) : (
                  <ImageIcon size={16} className="text-[#d4af37]" />
                )}
              </div>
              {editMode === "text"
                ? editUrl
                  ? "Link & Text Editor"
                  : "Text Editor"
                : "Image Editor"}
            </DialogTitle>
          </DialogHeader>

          <div className="px-8 py-6 space-y-6">
            {editMode === "text" ? (
              <div className="space-y-6">
                {/* Teks Content */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                    Konten Teks
                  </Label>
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="rounded-2xl bg-slate-50 border-none min-h-25 p-4 focus-visible:ring-[#d4af37]"
                  />
                </div>

                {/* Input URL (Hanya muncul jika elemen adalah <a>) */}
                {editLink && (
                  <div className="space-y-2 p-4 bg-[#d4af37]/5 rounded-2xl border border-[#d4af37]/20 animate-in fade-in slide-in-from-top-2">
                    <Label className="text-[10px] font-bold uppercase text-[#d4af37] flex items-center gap-2">
                      <LinkIcon size={14} /> Tautan URL
                    </Label>
                    <Input
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="rounded-xl bg-white border-none h-11 text-[12px] font-mono text-blue-600"
                      placeholder="https://..."
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                      Ukuran (px)
                    </Label>
                    <Input
                      type="text"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="rounded-xl bg-slate-50 border-none h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                      Warna
                    </Label>
                    <div className="flex gap-2 items-center bg-slate-50 p-1 rounded-xl h-11">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border-none bg-transparent cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-slate-50 uppercase">
                        {textColor}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                      Jenis Font
                    </Label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Default">Default System</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Great Vibes">Great Vibes</SelectItem>
                        <SelectItem value="Playfair Display">
                          Playfair Display
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={isBold ? "default" : "outline"}
                      onClick={() => setIsBold(!isBold)}
                      className={cn(
                        "flex-1 rounded-xl h-11",
                        isBold && "bg-[#d4af37]",
                      )}
                    >
                      Bold
                    </Button>
                    <Button
                      variant={isItalic ? "default" : "outline"}
                      onClick={() => setIsItalic(!isItalic)}
                      className={cn(
                        "flex-1 rounded-xl h-11",
                        isItalic && "bg-[#d4af37]",
                      )}
                    >
                      Italic
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  <button
                    onClick={() => setImageTab("upload")}
                    className={cn(
                      "flex-1 py-2 text-[10px] font-bold uppercase rounded-xl transition-all",
                      imageTab === "upload"
                        ? "bg-white shadow-sm text-[#d4af37]"
                        : "text-slate-400",
                    )}
                  >
                    Upload
                  </button>
                  <button
                    onClick={() => setImageTab("assets")}
                    className={cn(
                      "flex-1 py-2 text-[10px] font-bold uppercase rounded-xl transition-all",
                      imageTab === "assets"
                        ? "bg-white shadow-sm text-[#d4af37]"
                        : "text-slate-400",
                    )}
                  >
                    Assets
                  </button>
                </div>

                {imageTab === "upload" ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-4xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 group">
                      {imageUrl ? (
                        <>
                          <img
                            src={imageUrl}
                            className="w-full h-full object-contain"
                            alt="preview"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 md:opacity-0 md:group-hover:opacity-100 opacity-100">
                            <Button
                              onClick={() => fileInputRef.current?.click()}
                              variant="secondary"
                              className="rounded-full w-12 h-12 p-0 bg-white/20 backdrop-blur-md border-white/30 text-white"
                            >
                              <Upload size={20} />
                            </Button>
                            <Button
                              onClick={handleRemoveImage}
                              variant="destructive"
                              className="rounded-full w-12 h-12 p-0"
                            >
                              <Trash2 size={20} />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-[#d4af37]"
                        >
                          <div className="p-4 bg-white rounded-2xl shadow-sm">
                            <Upload size={32} />
                          </div>
                          <span className="text-[11px] font-bold uppercase tracking-wider">
                            Klik untuk Upload
                          </span>
                        </button>
                      )}
                      {isUploading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
                          <Loader2
                            className="animate-spin text-[#d4af37]"
                            size={32}
                          />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Processing WebP...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
                    {LIB_ASSETS.map((asset) => (
                      <button
                        key={asset}
                        onClick={() => setImageUrl(`/assets/${asset}`)}
                        className={cn(
                          "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all p-1 bg-slate-50",
                          imageUrl === `/assets/${asset}`
                            ? "border-[#d4af37] bg-white ring-2 ring-[#d4af37]/20"
                            : "border-transparent",
                        )}
                      >
                        <img
                          src={`/assets/${asset}`}
                          className="w-full h-full object-contain"
                          alt={asset}
                        />
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}
          </div>

          <DialogFooter className="p-8 bg-slate-50/50">
            <Button
              onClick={handleApplyChanges}
              className="w-full bg-[#4a0404] text-white h-14 rounded-2xl font-bold uppercase text-[11px] flex items-center justify-center gap-2"
            >
              <Sparkles size={16} /> Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
