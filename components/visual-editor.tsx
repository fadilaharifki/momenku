"use client";

import { useState, useEffect } from "react";
import {
  Type,
  Palette,
  Save,
  Bold,
  Italic,
  Sparkles,
  Loader2,
  Trash2,
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  section: InvitationSection;
  onClose?: () => void;
  onDelete?: (id: string) => void;
}

export default function VisualLiveEditor({
  section,
  onClose,
  onDelete,
}: Props) {
  const { mutate, isPending: isLoading } = useUpdateSection(section.id);

  const [htmlBody, setHtmlBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // States Editor
  const [editValue, setEditValue] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Default");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const prepareHtml = (rawHtml: string) => {
    if (!rawHtml) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    doc.querySelectorAll("[data-aos]").forEach((el) => {
      el.classList.add("aos-animate");
      (el as HTMLElement).style.transition = "none";
    });

    // Optimasi Filter: Hanya ambil elemen yang ada teksnya
    const textElements = doc.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, b, i, a, button, div.editable-node, div.editable",
    );

    textElements.forEach((el, index) => {
      if (el.textContent?.trim()) {
        el.classList.add("editable-text-only");
        if (!el.id) {
          el.id = `txt-${section.id.slice(0, 4)}-${index}`;
        }
      }
    });

    return doc.body.innerHTML;
  };

  useEffect(() => {
    if (section?.body) {
      setHtmlBody(prepareHtml(section.body));
    }
  }, [section]);

  const handleElementClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest(
      ".editable-text-only",
    ) as HTMLElement;
    if (!target) return;

    e.preventDefault();
    e.stopPropagation();

    setSelectedId(target.id);
    setEditValue(target.innerText.trim());

    const style = window.getComputedStyle(target);
    setFontSize(style.fontSize);
    setIsBold(style.fontWeight === "bold" || parseInt(style.fontWeight) >= 700);
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
  };

  const handleApplyChanges = () => {
    if (!selectedId) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlBody, "text/html");
    const element = doc.getElementById(selectedId);

    if (element) {
      element.innerHTML = editValue.replace(/\n/g, "<br />");
      element.style.fontSize = fontSize;
      element.style.color = textColor;
      element.style.fontWeight = isBold ? "bold" : "normal";
      element.style.fontStyle = isItalic ? "italic" : "normal";
      if (fontFamily !== "Default") element.style.fontFamily = fontFamily;
      setHtmlBody(doc.body.innerHTML);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* HEADER CONTROL */}
      <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-primary/10 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-xl shadow-lg"
              >
                <Trash2 size={18} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem]">
              <AlertDialogHeader>
                <AlertDialogTitle>Hapus Section?</AlertDialogTitle>
                <AlertDialogDescription>
                  Data tidak dapat dikembalikan setelah dihapus.
                </AlertDialogDescription>
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
          <h2 className="text-sm font-black uppercase tracking-tight hidden md:block">
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
            <Save className="mr-2" size={18} />
          )}
          Simpan
        </Button>
      </div>

      {/* DEVICE PREVIEW (THE MAGIC HAPPENS HERE) */}
      <div className="flex justify-center items-center py-4 bg-slate-100/50 rounded-[3rem]">
        <div className="relative w-[375px] h-[667px] shadow-[0_0_0_12px_#1e293b] rounded-[3rem] bg-[#4a0404] overflow-hidden">
          <div
            className="preview-viewport h-full w-full overflow-y-auto overflow-x-hidden scrollbar-hide"
            onClick={handleElementClick}
            style={{ perspective: "1px" }} // Membantu rendering container tetap stabil
          >
            {/* Gunakan h-full agar mewarisi 667px dari parent utama */}
            <div className="relative h-full w-full origin-top transform contents-wrapper">
              <div
                className="html-content-root h-full"
                dangerouslySetInnerHTML={{ __html: htmlBody }}
              />
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Override CSS dari Database agar pas di bingkai kecil */
        .preview-viewport section {
            height: 667px !important; /* Paksa tinggi mengikuti frame HP */
            width: 100% !important;
            min-height: 667px !important;
            scroll-snap-align: none !important;
        }

        .preview-viewport [data-aos] { 
            opacity: 1 !important; 
            transform: none !important; 
            visibility: visible !important; 
        }

        .editable-text-only:hover { 
            outline: 2px solid #d4af37;
            outline-offset: 2px;
            background: rgba(212,175,55,0.1);
            cursor: pointer;
        }
      `,
        }}
      />

      {/* MODAL EDITING - VERSI UPGRADE */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] overflow-hidden border-none p-0 shadow-2xl">
          <DialogHeader className="p-8 bg-slate-50/80 backdrop-blur-sm border-b border-slate-100">
            <DialogTitle className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-400">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <Type className="w-4 h-4 text-[#d4af37]" />
              </div>
              Editor
            </DialogTitle>
          </DialogHeader>

          <div className="p-8 space-y-8 bg-white">
            {/* 1. INPUT TEKS */}
            <div className="space-y-3">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Konten Teks
              </Label>
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="min-h-[120px] rounded-[1.5rem] bg-slate-50 border-none shadow-inner p-4 text-slate-700 focus-visible:ring-1 focus-visible:ring-[#d4af37]/30 transition-all"
                placeholder="Ketik sesuatu di sini..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* 2. COLOR PICKER */}
              <div className="space-y-3 font-poppins">
                <Label className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400 ml-1.5">
                  Warna Teks
                </Label>

                <div className="relative group">
                  {/* Container Utama */}
                  <div className="flex items-center gap-4 bg-white p-1 rounded-[1.25rem] border border-slate-100 group-hover:border-[#d4af37]/30 group-hover:bg-slate-50/50 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    {/* Lingkaran Pratinjau Warna */}
                    <div className="relative w-10 h-10 shrink-0">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                      {/* Lingkaran yang terlihat oleh user */}
                      <div
                        className="w-full h-full rounded-full shadow-lg border-4 border-white ring-1 ring-slate-200/50 transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: textColor }}
                      />
                      {/* Icon picker kecil di pojok */}
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-100 z-10">
                        <Palette size={10} className="text-slate-400" />
                      </div>
                    </div>

                    {/* Info Hex Code */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[12px] font-black text-slate-700 tracking-tight uppercase">
                        {textColor}
                      </span>
                    </div>

                    {/* Klik Indicator */}
                    <div className="ml-auto pr-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#d4af37] transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. FONT SIZE */}
              <div className="space-y-3">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Ukuran
                </Label>
                <div className="relative">
                  <Input
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="rounded-2xl bg-slate-50 border-none h-13 pl-4 font-bold text-slate-600 shadow-sm"
                    placeholder="16px"
                  />
                </div>
              </div>
            </div>

            {/* 4. FONT FAMILY & STYLES */}
            <div className="space-y-4 pt-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                Typography & Gaya
              </Label>

              <div className="flex gap-3">
                <div className="flex-1">
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger className="rounded-2xl bg-slate-50 border-none h-14 shadow-sm font-medium">
                      <SelectValue placeholder="Pilih Font" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-2xl max-h-75">
                      {/* SANS SERIF (Modern & Clean) */}
                      <SelectItem value="Default" className="rounded-xl">
                        Default Sans
                      </SelectItem>
                      <SelectItem
                        value="'Poppins', sans-serif"
                        className="rounded-xl font-poppins"
                      >
                        Poppins (Modern)
                      </SelectItem>
                      <SelectItem
                        value="'Montserrat', sans-serif"
                        className="rounded-xl"
                      >
                        Montserrat (Clean)
                      </SelectItem>
                      <SelectItem
                        value="'Inter', sans-serif"
                        className="rounded-xl"
                      >
                        Inter (Minimalist)
                      </SelectItem>
                      <SelectItem
                        value="'Outfit', sans-serif"
                        className="rounded-xl"
                      >
                        Outfit (Geometric)
                      </SelectItem>

                      {/* SERIF (Luxury & Elegant) */}
                      <SelectItem
                        value="'Playfair Display', serif"
                        className="rounded-xl font-serif"
                      >
                        Playfair Display (Luxury)
                      </SelectItem>
                      <SelectItem
                        value="'Cinzel', serif"
                        className="rounded-xl"
                      >
                        Cinzel (Classic/Royal)
                      </SelectItem>
                      <SelectItem
                        value="'Cormorant Garamond', serif"
                        className="rounded-xl"
                      >
                        Cormorant (High-End)
                      </SelectItem>
                      <SelectItem value="'Prata', serif" className="rounded-xl">
                        Prata (Fashionable)
                      </SelectItem>
                      <SelectItem value="'Lora', serif" className="rounded-xl">
                        Lora (Soft Serif)
                      </SelectItem>

                      {/* SCRIPT / HANDWRITING (Romance) */}
                      <SelectItem
                        value="'Dancing Script', cursive"
                        className="rounded-xl"
                      >
                        Dancing Script (Elegant)
                      </SelectItem>
                      <SelectItem
                        value="'Great Vibes', cursive"
                        className="rounded-xl"
                      >
                        Great Vibes (Formal Script)
                      </SelectItem>
                      <SelectItem
                        value="'Sacramento', cursive"
                        className="rounded-xl"
                      >
                        Sacramento (Slim Script)
                      </SelectItem>
                      <SelectItem
                        value="'Parisienne', cursive"
                        className="rounded-xl"
                      >
                        Parisienne (Vintage)
                      </SelectItem>
                      <SelectItem
                        value="'Alex Brush', cursive"
                        className="rounded-xl"
                      >
                        Alex Brush (Smooth)
                      </SelectItem>
                      <SelectItem
                        value="'Satisfy', cursive"
                        className="rounded-xl"
                      >
                        Satisfy (Modern Brush)
                      </SelectItem>

                      {/* FONT LATIN / CURSIVE / SCRIPT (The Romantic Collection) */}
                      <SelectItem
                        value="'Dancing Script', cursive"
                        className="rounded-xl"
                      >
                        Dancing Script (Elegansi Modern)
                      </SelectItem>
                      <SelectItem
                        value="'Great Vibes', cursive"
                        className="rounded-xl"
                      >
                        Great Vibes (Klasik Formal)
                      </SelectItem>
                      <SelectItem
                        value="'Alex Brush', cursive"
                        className="rounded-xl"
                      >
                        Alex Brush (Luwes & Bersih)
                      </SelectItem>
                      <SelectItem
                        value="'Sacramento', cursive"
                        className="rounded-xl"
                      >
                        Sacramento (Tipis Minimalis)
                      </SelectItem>
                      <SelectItem
                        value="'Satisfy', cursive"
                        className="rounded-xl"
                      >
                        Satisfy (Gaya Brush Modern)
                      </SelectItem>
                      <SelectItem
                        value="'Parisienne', cursive"
                        className="rounded-xl"
                      >
                        Parisienne (Vintage Paris)
                      </SelectItem>
                      <SelectItem
                        value="'Allura', cursive"
                        className="rounded-xl"
                      >
                        Allura (Sangat Feminin)
                      </SelectItem>
                      <SelectItem
                        value="'Cookie', cursive"
                        className="rounded-xl"
                      >
                        Cookie (Retro Sweet)
                      </SelectItem>
                      <SelectItem
                        value="'Pinyon Script', cursive"
                        className="rounded-xl"
                      >
                        Pinyon Script (Mewah & Aristokrat)
                      </SelectItem>
                      <SelectItem
                        value="'Birthstone', cursive"
                        className="rounded-xl"
                      >
                        Birthstone (Handwriting Cantik)
                      </SelectItem>
                      <SelectItem
                        value="'Mea Culpa', cursive"
                        className="rounded-xl"
                      >
                        Mea Culpa (Ekstrem Artistik)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsBold(!isBold)}
                    className={`h-14 w-14 rounded-2xl border-none shadow-sm transition-all ${isBold ? "bg-accent text-white" : "bg-slate-50 text-slate-400"}`}
                  >
                    <Bold size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsItalic(!isItalic)}
                    className={`h-14 w-14 rounded-2xl border-none shadow-sm transition-all ${isItalic ? "bg-accent text-white" : "bg-slate-50 text-slate-400"}`}
                  >
                    <Italic size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 bg-slate-50/50">
            <Button
              onClick={handleApplyChanges}
              className="w-full  text-white h-14 rounded-3xl font-bold uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-red-950/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <Sparkles size={16} />
              Terapkan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
