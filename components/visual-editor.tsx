"use client";

import { useState, useEffect, useRef } from "react";
import {
  Type,
  Sparkles,
  Loader2,
  Trash2,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  AlignLeft,
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
import { useUploadImage } from "@/hooks/api/usePostUploadImage";
import { useDeleteImage } from "@/hooks/api/useDeleteImage";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CAMERA_PRESETS } from "@/lib/preset-camera";
import { fontFamilyGlobal } from "@/lib/constants/font";

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
  id: string;
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

    doc.querySelectorAll("[data-aos]").forEach((el) => {
      el.classList.add("aos-animate");
      (el as HTMLElement).style.transition = "none";
    });

    const sectionPrefix = section.id.slice(0, 4);

    // Identifikasi Link Terlebih Dahulu
    const linkElements = doc.querySelectorAll(".editable-link");
    linkElements.forEach((el, index) => {
      if (!el.id) el.id = `lnk-${sectionPrefix}-${index}`;
    });

    // Identifikasi Text (Hanya yang bukan bagian dari editable-link)
    const textElements = doc.querySelectorAll(".editable-text");
    textElements.forEach((el, index) => {
      if (!el.closest(".editable-link") && !el.id) {
        el.id = `txt-${sectionPrefix}-${index}`;
      }
    });

    const imgElements = doc.querySelectorAll(".editable-image");
    imgElements.forEach((img, index) => {
      if (!img.id) img.id = `img-${sectionPrefix}-${index}`;
    });

    const countdown = doc.querySelector("#countdown-target");
    if (countdown && !countdown.id) countdown.id = `count-${sectionPrefix}`;

    return doc.body.innerHTML;
  };

  const handleElementClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // 1. IMAGE
    const imgTarget = target.closest(".editable-image") as HTMLImageElement;
    if (imgTarget) {
      e.preventDefault();
      setEditMode("image");
      setSelectedId(imgTarget.id);
      setImageUrl(imgTarget.src);
      setIsModalOpen(true);
      return;
    }

    // 2. LINK (Gabungan Teks & URL)
    const linkTarget = target.closest(".editable-link") as HTMLAnchorElement;
    if (linkTarget) {
      e.preventDefault();
      setEditMode("link");
      setSelectedId(linkTarget.id);

      // Ambil teks bersih dari innerText (tanpa HTML/SVG)
      setEditValue(linkTarget.innerText?.trim() || "");
      setEditUrl(linkTarget.getAttribute("href") || "");

      // Ambil style dari span di dalamnya jika ada
      const innerSpan = linkTarget.querySelector("span") || linkTarget;
      const style = window.getComputedStyle(innerSpan);
      setFontSize(style.fontSize);
      setTextColor(rgbToHex(style.color));
      setIsBold(
        style.fontWeight === "bold" || parseInt(style.fontWeight) >= 700,
      );
      setIsModalOpen(true);
      return;
    }

    // 3. TEXT (Standar)
    const textTarget = target.closest(".editable-text") as HTMLElement;
    if (textTarget) {
      e.preventDefault();
      setEditMode("text");
      setSelectedId(textTarget.id);

      if (textTarget.id === "countdown-target") {
        setEditValue(textTarget.getAttribute("data-target") || "");
      } else {
        setEditValue(textTarget.textContent?.trim() || "");
      }

      const style = window.getComputedStyle(textTarget);

      const cleanFont = style.fontFamily
        .split(",")[0]
        .replace(/['"]/g, "")
        .trim();

      console.log(cleanFont, "cleanFont");

      setFontFamily(cleanFont || "Default");
      setFontSize(style.fontSize);
      setTextColor(rgbToHex(style.color));
      setIsBold(
        style.fontWeight === "bold" || parseInt(style.fontWeight) >= 700,
      );
      setIsItalic(style.fontStyle === "italic");
      setIsModalOpen(true);
      return;
    }
  };

  const rgbToHex = (rgb: string) => {
    const match = rgb.match(/\d+/g);
    if (!match) return "#000000";
    return (
      "#" + match.map((x) => parseInt(x).toString(16).padStart(2, "0")).join("")
    );
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
      // HANDLE TEXT & LINK
      if (editMode === "text" || editMode === "link") {
        if (element.id.includes("countdown-target")) {
          element.setAttribute("data-target", editValue.trim());
        } else {
          // Update Teks Tanpa Merusak Struktur
          const updateTextContent = (el: HTMLElement, val: string) => {
            const span = el.querySelector("span");
            if (span) {
              span.textContent = val;
              // Apply styles to span
              span.style.fontSize = fontSize;
              span.style.color = textColor;
              span.style.fontWeight = isBold ? "bold" : "normal";
            } else {
              // Jika text node langsung
              el.textContent = val;
              el.style.fontSize = fontSize;
              el.style.color = textColor;
              el.style.fontWeight = isBold ? "bold" : "normal";
            }
          };

          updateTextContent(element, editValue);

          if (editMode === "link") {
            (element as HTMLAnchorElement).href = editUrl;
          }

          if (fontFamily !== "Default") {
            const fallback = [
              "Cinzel",
              "Playfair Display",
              "Cormorant Garamond",
            ].includes(fontFamily)
              ? "serif"
              : "cursive";

            element.style.fontFamily = `'${fontFamily}', ${fallback}`;
          }
          element.style.fontStyle = isItalic ? "italic" : "normal";
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
          setFontFamily("Default");
        },
      },
    );
  };

  return (
    <div className="p-4 space-y-6 font-poppins overflow-y-auto flex justify-center">
      <div className="relative w-93.75 h-166.75 shadow-[0_0_0_12px_#1e293b] rounded-[3rem] bg-black overflow-hidden border-[8px] border-black">
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

        <div
          className="preview-viewport relative z-10 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
          onClick={handleElementClick}
          style={{ scrollBehavior: "smooth" }}
        >
          <div
            className="html-content-root w-full bg-transparent"
            style={{ display: "block", paddingBottom: "150px" }}
            dangerouslySetInnerHTML={{ __html: htmlBody }}
          />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        ${fontFamilyGlobal}
        .html-content-root { display: block !important; width: 100% !important; min-height: 100% !important; overflow: visible !important; }
        .html-content-root section { height: auto !important; min-height: 667px !important; overflow: visible !important; display: flex !important; flex-direction: column !important; }
        .html-content-root [style*="height: 100vh"] { height: 100% !important; min-height: 667px !important; }
        .editable-text:hover, .editable-link:hover, .editable-button:hover { outline: 2px solid #d4af37; outline-offset: 2px; cursor: pointer; }
        .editable-image:hover { outline: 4px solid #d4af37; outline-offset: -4px; cursor: pointer; filter: brightness(0.85); }
        .html-content-root [data-aos] { opacity: 1 !important; transform: none !important; transition: none !important; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }

      `,
        }}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] p-0 font-poppins overflow-hidden">
          <DialogHeader className="p-8 bg-slate-50/80 border-b">
            <DialogTitle className="text-[11px] font-black uppercase tracking-widest flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                {editMode === "image" ? (
                  <ImageIcon size={16} className="text-[#d4af37]" />
                ) : (
                  <Type size={16} className="text-[#d4af37]" />
                )}
              </div>
              {editMode === "link"
                ? "Link & Button Editor"
                : editMode === "text"
                  ? "Text Editor"
                  : "Image Editor"}
            </DialogTitle>
          </DialogHeader>

          <div className="px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {(editMode === "text" || editMode === "link") && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                    Label / Teks
                  </Label>
                  <Textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="rounded-2xl bg-slate-50 border-none min-h-20 p-4 focus-visible:ring-[#d4af37]"
                  />
                </div>

                {editMode === "link" && (
                  <div className="space-y-2 p-4 bg-[#d4af37]/5 rounded-2xl border border-[#d4af37]/20">
                    <Label className="text-[10px] font-bold uppercase text-[#d4af37] flex items-center gap-2">
                      <LinkIcon size={14} /> URL Tujuan
                    </Label>
                    <Input
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="rounded-xl bg-white border-none h-11 text-[12px]"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                )}

                {selectedId !== "countdown-target" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase text-slate-400 ml-1">
                          Ukuran (px)
                        </Label>
                        <Input
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
                            className="w-full h-8 rounded-lg border-none bg-transparent cursor-pointer"
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
                            <SelectValue placeholder="Pilih Font" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl max-h-80 font-poppins">
                            {/* --- SANS SERIF (Modern & Mudah Dibaca) --- */}
                            <SelectItem value="Default">
                              System Default
                            </SelectItem>
                            <SelectItem value="Poppins">
                              Poppins (Modern)
                            </SelectItem>
                            <SelectItem value="Montserrat">
                              Montserrat
                            </SelectItem>

                            {/* --- LATIN / SCRIPT (Aesthetic & Romantis) --- */}
                            <SelectItem value="Great Vibes">
                              <span
                                style={{
                                  fontFamily: "'Great Vibes', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Great Vibes
                              </span>
                            </SelectItem>

                            <SelectItem value="Dancing Script">
                              <span
                                style={{
                                  fontFamily: "'Dancing Script', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Dancing Script
                              </span>
                            </SelectItem>

                            <SelectItem value="Alex Brush">
                              <span
                                style={{
                                  fontFamily: "'Alex Brush', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Alex Brush
                              </span>
                            </SelectItem>

                            <SelectItem value="Parisienne">
                              <span
                                style={{
                                  fontFamily: "'Parisienne', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Parisienne
                              </span>
                            </SelectItem>

                            <SelectItem value="Sacramento">
                              <span
                                style={{
                                  fontFamily: "'Sacramento', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Sacramento (Slim)
                              </span>
                            </SelectItem>

                            <SelectItem value="Allura">
                              <span
                                style={{
                                  fontFamily: "'Allura', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Allura (Soft)
                              </span>
                            </SelectItem>

                            <SelectItem value="Birthstone">
                              <span
                                style={{
                                  fontFamily: "'Birthstone', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Birthstone (Luxury)
                              </span>
                            </SelectItem>

                            <SelectItem value="Monsieur La Doulaise">
                              <span
                                style={{
                                  fontFamily: "'Monsieur La Doulaise', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Monsieur La Doulaise
                              </span>
                            </SelectItem>

                            <SelectItem value="Pinyon Script">
                              <span
                                style={{
                                  fontFamily: "'Pinyon Script', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Pinyon (Luxurious)
                              </span>
                            </SelectItem>

                            <SelectItem value="Herr Von Muellerhoff">
                              <span
                                style={{
                                  fontFamily: "'Herr Von Muellerhoff', cursive",
                                  fontSize: "18px",
                                }}
                              >
                                Traditional Calligraphy
                              </span>
                            </SelectItem>

                            {/* --- SERIF (Elegan, Mewah & Formal) --- */}
                            <SelectItem value="Playfair Display">
                              <span
                                style={{
                                  fontFamily: "'Playfair Display', serif",
                                }}
                              >
                                Playfair Display (Mewah)
                              </span>
                            </SelectItem>

                            <SelectItem value="Cinzel">
                              <span style={{ fontFamily: "'Cinzel', serif" }}>
                                Cinzel (Royal Serif)
                              </span>
                            </SelectItem>

                            <SelectItem value="Cormorant Garamond">
                              <span
                                style={{
                                  fontFamily: "'Cormorant Garamond', serif",
                                }}
                              >
                                Cormorant (Vintage)
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant={isBold ? "default" : "outline"}
                          onClick={() => setIsBold(!isBold)}
                          className={cn(
                            "flex-1 rounded-xl h-11 text-[11px] font-bold uppercase",
                            isBold &&
                              "bg-[#d4af37] text-white hover:bg-[#d4af37]",
                          )}
                        >
                          Bold
                        </Button>
                        <Button
                          variant={isItalic ? "default" : "outline"}
                          onClick={() => setIsItalic(!isItalic)}
                          className={cn(
                            "flex-1 rounded-xl h-11 text-[11px] font-bold uppercase",
                            isItalic &&
                              "bg-[#d4af37] text-white hover:bg-[#d4af37]",
                          )}
                        >
                          Italic
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {editMode === "image" && (
              <div className="space-y-6">
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  {["upload", "assets"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setImageTab(t as any)}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-bold uppercase rounded-xl",
                        imageTab === t
                          ? "bg-white text-[#d4af37]"
                          : "text-slate-400",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {imageTab === "upload" ? (
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200">
                    {imageUrl ? (
                      <>
                        <img
                          src={imageUrl}
                          className="w-full h-full object-contain"
                          alt="preview"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
                          <Button
                            onClick={() => fileInputRef.current?.click()}
                            size="sm"
                            variant="secondary"
                          >
                            <Upload size={16} />
                          </Button>
                          <Button
                            onClick={() => setImageUrl("")}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex flex-col items-center justify-center text-slate-400"
                      >
                        <Upload size={32} />
                        <span className="text-[10px] font-bold mt-2">
                          PILIH GAMBAR
                        </span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {LIB_ASSETS.map((asset) => (
                      <button
                        key={asset}
                        onClick={() => setImageUrl(`/assets/${asset}`)}
                        className={cn(
                          "aspect-square rounded-xl border-2 overflow-hidden",
                          imageUrl === `/assets/${asset}`
                            ? "border-[#d4af37]"
                            : "border-transparent",
                        )}
                      >
                        <img
                          src={`/assets/${asset}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadImage({ file, invitationId: id });
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            )}
          </div>

          <DialogFooter className="p-8 bg-slate-50/50">
            <Button
              onClick={applyToDatabase}
              disabled={isLoading || isUploading}
              className="w-full bg-[#4a0404] text-white h-14 rounded-2xl font-bold uppercase text-[11px] gap-2"
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
