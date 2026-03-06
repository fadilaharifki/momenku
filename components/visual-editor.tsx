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
  Link as LinkIcon,
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
import { InvitationSectionInterface } from "@/type/invitation";
import { useUpdateSection } from "@/hooks/api/usePatchUpdateSection";
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
import { useUploadImage } from "@/hooks/api/usePostUploadImage";
import { useDeleteImage } from "@/hooks/api/useDeleteImage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CAMERA_PRESETS } from "@/lib/preset-camera";

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
  "BCA.webp",
  "BNI.webp",
];
interface Props {
  id: string; // invitationId
  section: InvitationSectionInterface;
  onClose?: () => void;
  onDelete?: (id: string) => void;
  backgroundUrl?: string;
}

export default function VisualLiveEditor({
  id,
  section,
  onClose,
  onDelete,
  backgroundUrl,
}: Props) {
  const { mutate, isPending: isLoading } = useUpdateSection(section.id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [htmlBody, setHtmlBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState<"text" | "image" | "link">("text");
  const [imageTab, setImageTab] = useState<"upload" | "assets">("upload");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [editValue, setEditValue] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Default");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  // Tentukan preset kamera berdasarkan order (dikurangi 1 karena index mulai 0)
  const sectionIndex = (section as any).order ? (section as any).order - 1 : 0;
  const currentCamera = CAMERA_PRESETS[sectionIndex] || CAMERA_PRESETS[0];

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

    // Aktifkan AOS
    doc.querySelectorAll("[data-aos]").forEach((el) => {
      el.classList.add("aos-animate");
      (el as HTMLElement).style.transition = "none";
    });

    const sectionPrefix = section.id.slice(0, 4);

    /* =========================
     TEXT (skip yang di dalam LINK)
  ========================= */
    const textElements = doc.querySelectorAll(".editable-text");

    textElements.forEach((el, index) => {
      const insideLink = el.closest(".editable-link");

      if (!insideLink && !el.id) {
        el.id = `txt-${sectionPrefix}-${index}`;
      }

      // kalau text di dalam link tetap diberi id tapi beda prefix
      if (insideLink && !el.id) {
        el.id = `txtlink-${sectionPrefix}-${index}`;
      }
    });

    /* =========================
     LINK
  ========================= */
    const linkElements = doc.querySelectorAll(".editable-link");

    linkElements.forEach((el, index) => {
      if (!el.id) {
        el.id = `lnk-${sectionPrefix}-${index}`;
      }
    });

    /* =========================
     BUTTON
  ========================= */
    const buttonElements = doc.querySelectorAll(".editable-button");

    buttonElements.forEach((el, index) => {
      if (!el.id) {
        el.id = `btn-${sectionPrefix}-${index}`;
      }
    });

    /* =========================
     IMAGE
  ========================= */
    const imgElements = doc.querySelectorAll(".editable-image");

    imgElements.forEach((img, index) => {
      if (!img.id) {
        img.id = `img-${sectionPrefix}-${index}`;
      }
    });

    /* =========================
     COUNTDOWN
  ========================= */
    const countdown = doc.querySelector("#countdown-target");

    if (countdown && !countdown.id) {
      countdown.id = `count-${sectionPrefix}`;
    }

    return doc.body.innerHTML;
  };

  const handleElementClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    /* =========================
     IMAGE
  ========================= */
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

    /* =========================
     BUTTON
  ========================= */
    const buttonTarget = target.closest(
      ".editable-button",
    ) as HTMLButtonElement;
    if (buttonTarget) {
      e.preventDefault();
      e.stopPropagation();

      setEditMode("text");
      setSelectedId(buttonTarget.id);
      setEditValue(buttonTarget.textContent?.trim() || "");

      setEditUrl("");

      setIsModalOpen(true);
      return;
    }

    /* =========================
     TEXT (PRIORITAS)
  ========================= */
    const textTarget = target.closest(".editable-text") as HTMLElement;

    if (textTarget) {
      e.preventDefault();
      e.stopPropagation();

      setEditMode("text");
      setSelectedId(textTarget.id);

      if (textTarget.id === "countdown-target") {
        setEditValue(
          textTarget.getAttribute("data-target") || "2025-11-30 08:00:00",
        );
      } else {
        setEditValue(textTarget.textContent?.trim() || "");

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
      const rgbMatch = rgb.match(/\d+/g);

      if (rgbMatch) {
        const hex =
          "#" +
          rgbMatch
            .map((x) => parseInt(x).toString(16).padStart(2, "0"))
            .join("");
        setTextColor(hex);
      } else {
        setTextColor("#000000");
      }

      setIsModalOpen(true);
      return;
    }

    /* =========================
     LINK (hanya jika bukan text)
  ========================= */
    const linkTarget = target.closest(".editable-link") as HTMLAnchorElement;

    if (linkTarget) {
      e.preventDefault();
      e.stopPropagation();

      setEditMode("link");
      setSelectedId(linkTarget.id);

      setEditValue("");
      setEditUrl(linkTarget.getAttribute("href") || "");

      setIsModalOpen(true);

      return;
    }
  };
  useEffect(() => {
    if (section?.body) setHtmlBody(prepareHtml(section.body));
  }, [section]);

  useEffect(() => {
    if (!selectedId || !isModalOpen) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlBody, "text/html");
    const element = doc.getElementById(selectedId) as HTMLElement;

    if (element) {
      if (editMode === "text" || editMode === "link") {
        // Handle Countdown Target
        if (element.id.includes("countdown-target")) {
          element.setAttribute("data-target", editValue.trim());
        } else {
          // Update Content
          if (editValue !== undefined) {
            element.innerHTML = editValue.replace(/\n/g, "<br />");
          }
          // Update Styles
          element.style.fontSize = fontSize;
          element.style.color = textColor;
          element.style.fontWeight = isBold ? "bold" : "normal";
          element.style.fontStyle = isItalic ? "italic" : "normal";
          if (fontFamily !== "Default") element.style.fontFamily = fontFamily;

          // Update Link if element is Anchor
          if (element.tagName === "A") {
            (element as HTMLAnchorElement).href = editUrl;
          }
        }
      } else if (editMode === "image") {
        (element as HTMLImageElement).src = imageUrl;
      }
      setHtmlBody(doc.body.innerHTML);
    }
  }, [
    editValue,
    editUrl,
    imageUrl,
    fontSize,
    textColor,
    fontFamily,
    isBold,
    isItalic,
  ]);

  const applyToDatabase = () => {
    mutate(
      { body: htmlBody },
      {
        onSuccess: () => {
          onClose?.();
          setIsModalOpen(false);
        },
      },
    );
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
    <div className="p-4 md:p-6 space-y-6 font-poppins overflow-y-auto">
      <div className="flex justify-center py-10 rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="relative w-[375px] h-[667px] shadow-[0_0_0_12px_#1e293b] rounded-[3rem] bg-black overflow-hidden">
          {/* CAMERA ROLE PREVIEW (MOMENKU) */}
          {backgroundUrl && (
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <motion.img
                src={backgroundUrl}
                alt="Camera Preview"
                initial={false}
                animate={currentCamera}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          )}

          {/* VIEWPORT: Menggunakan h-full tanpa absolute agar scroll konteksnya jelas */}
          <div
            className="preview-viewport relative z-10 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
            onClick={handleElementClick}
            style={{
              scrollBehavior: "smooth",
            }}
          >
            <div
              className="html-content-root w-full min-h-full bg-transparent"
              style={{
                fontSize: "16px",
                lineHeight: "normal",
                WebkitFontSmoothing: "antialiased",
                display: "block",
                paddingBottom: "100px",
              }}
              dangerouslySetInnerHTML={{ __html: htmlBody }}
            />
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
/* RESET INTERNAL CONTENT UNTUK EDITOR MOMENKU */
.html-content-root section,
.html-content-root .invitation-section { 
  height: 667px !important; 
  min-height: 667px !important; 
  max-height: 667px !important;
  width: 100% !important;
  position: relative !important;
  background-color: transparent !important; 
  overflow: hidden !important; 
  display: flex;
  flex-direction: column;
}

/* Perbaikan Galeri Scroll */
.html-content-root .gallery-container,
.html-content-root .scroll-area {
  overflow-y: auto !important;
  max-height: 100% !important;
}

/* ============================= */
/* EDITABLE ELEMENT HIGHLIGHT */
/* ============================= */

.editable-text:hover {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
  cursor: pointer;
}

.editable-link:hover {
  outline: 2px dashed #d4af37;
  background-color: rgba(212, 175, 55, 0.1);
  cursor: pointer;
}

.editable-button:hover {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
  cursor: pointer;
}

.editable-image:hover {
  outline: 4px solid #d4af37;
  outline-offset: -4px;
  cursor: pointer;
  filter: brightness(0.85);
}

/* ============================= */
/* COUNTDOWN EDITOR */
/* ============================= */

#countdown-target.editable-text {
  outline: 2px dashed #d4af37 !important;
  outline-offset: 4px;
  cursor: pointer;
  position: relative;
}

#countdown-target.editable-text::after {
  content: "KLIK UNTUK SET TANGGAL";
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background: #d4af37;
  color: #4a0404;
  font-size: 9px;
  padding: 3px 10px;
  border-radius: 6px;
  font-weight: 800;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 50;
}

/* ============================= */
/* MATIKAN ANIMASI AOS DI EDITOR */
/* ============================= */

.html-content-root [data-aos] {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

/* ============================= */
/* HIDE SCROLLBAR */
/* ============================= */

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`,
        }}
      />
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md max-h-screen rounded-[2.5rem] p-0 font-poppins overflow-auto">
          <DialogHeader className="p-8 bg-slate-50/80 border-b">
            <DialogTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                {editMode === "text" ? (
                  <Type size={16} className="text-[#d4af37]" />
                ) : (
                  <ImageIcon size={16} className="text-[#d4af37]" />
                )}
              </div>
              {selectedId === "countdown-target"
                ? "Set Target Waktu"
                : editMode === "link"
                  ? "Link Editor"
                  : editMode === "text"
                    ? "Text Editor"
                    : "Image Editor"}
            </DialogTitle>
          </DialogHeader>

          <div className="px-8 py-6 space-y-6">
            {editMode === "text" ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                    {selectedId === "countdown-target"
                      ? "Format: YYYY-MM-DD HH:mm:ss"
                      : "Konten Teks"}
                  </Label>
                  <Textarea
                    value={editValue}
                    onChange={(e) => {
                      setEditValue(e.target.value);
                    }}
                    placeholder={
                      selectedId === "countdown-target"
                        ? "Contoh: 2025-12-31 08:00:00"
                        : ""
                    }
                    className="rounded-2xl bg-slate-50 border-none min-h-25 p-4 focus-visible:ring-[#d4af37]"
                  />
                </div>
                {selectedId !== "countdown-target" && (
                  <>
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
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                          Jenis Font
                        </Label>
                        <Select
                          value={fontFamily}
                          onValueChange={setFontFamily}
                        >
                          <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Default">
                              Default System
                            </SelectItem>
                            <SelectItem value="Poppins">Poppins</SelectItem>
                            <SelectItem value="Great Vibes">
                              Great Vibes
                            </SelectItem>
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
                  </>
                )}
              </div>
            ) : (
              <>
                {editMode === "link" ? (
                  <div className="space-y-2 p-4 bg-[#d4af37]/5 rounded-2xl border border-[#d4af37]/20">
                    <Label className="text-[10px] font-bold uppercase text-[#d4af37] flex items-center gap-2">
                      <LinkIcon size={14} /> Tautan URL
                    </Label>
                    <Input
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="rounded-xl bg-white border-none h-11 text-[12px]"
                      placeholder="https://..."
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex bg-slate-100 p-1 rounded-2xl">
                      <button
                        onClick={() => setImageTab("upload")}
                        className={cn(
                          "flex-1 py-2 text-[10px] font-bold uppercase rounded-xl",
                          imageTab === "upload"
                            ? "bg-white text-[#d4af37]"
                            : "text-slate-400",
                        )}
                      >
                        Upload
                      </button>
                      <button
                        onClick={() => setImageTab("assets")}
                        className={cn(
                          "flex-1 py-2 text-[10px] font-bold uppercase rounded-xl",
                          imageTab === "assets"
                            ? "bg-white text-[#d4af37]"
                            : "text-slate-400",
                        )}
                      >
                        Assets
                      </button>
                    </div>
                    {imageTab === "upload" ? (
                      <div className="relative aspect-video rounded-4xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 group">
                        {imageUrl ? (
                          <>
                            <img
                              src={imageUrl}
                              className="w-full h-full object-contain"
                              alt="preview"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                onClick={() => fileInputRef.current?.click()}
                                variant="secondary"
                                className="rounded-full w-12 h-12 p-0"
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
                            <Upload size={32} />
                            <span className="text-[11px] font-bold uppercase">
                              Upload
                            </span>
                          </button>
                        )}
                        {isUploading && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <Loader2 className="animate-spin" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto scrollbar-hide">
                        {LIB_ASSETS.map((asset) => (
                          <button
                            key={asset}
                            onClick={() => setImageUrl(`/assets/${asset}`)}
                            className={cn(
                              "aspect-square rounded-2xl overflow-hidden border-2 p-1 bg-slate-50",
                              imageUrl === `/assets/${asset}`
                                ? "border-[#d4af37]"
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
              </>
            )}
          </div>

          <DialogFooter className="p-8 bg-slate-50/50">
            <Button
              onClick={applyToDatabase}
              className="w-full bg-[#4a0404] text-white h-14 rounded-2xl font-bold uppercase text-[11px] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
