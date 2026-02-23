"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Trash2,
  Type,
  Palette,
  Type as FontSizeIcon,
  Save,
  Bold,
  Italic,
  Sparkles,
  Loader2,
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
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUpdateSection } from "@/hooks/api/useUpdateSection";

interface Props {
  section: InvitationSection;
  onClose?: () => void;
}

export default function VisualLiveEditor({ section, onClose }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending: isLoading } = useUpdateSection(section.id);

  // State Utama untuk HTML
  const [htmlBody, setHtmlBody] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // States untuk Form Editing
  const [editValue, setEditValue] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Default");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  /**
   * Fungsi untuk menyuntikkan class & ID ke HTML mentah agar bisa diedit
   */
  const prepareHtml = (rawHtml: string) => {
    if (!rawHtml) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, "text/html");

    // Targetkan elemen yang mengandung teks
    const elements = doc.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span, b, i, div",
    );

    elements.forEach((el, index) => {
      // Tambahkan class agar terdeteksi click handler
      if (!el.classList.contains("editable-element")) {
        el.classList.add("editable-element");
      }
      // Tambahkan ID unik jika belum ada (wajib untuk getElementById saat save)
      if (!el.id) {
        el.id = `el-${section.id.slice(0, 4)}-${index}`;
      }
    });

    return doc.body.innerHTML;
  };

  // Sinkronisasi saat section berubah (pertama kali load)
  useEffect(() => {
    if (section?.body) {
      setHtmlBody(prepareHtml(section.body));
    }
  }, [section]);

  const handleElementClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = (e.target as HTMLElement).closest(
      ".editable-element",
    ) as HTMLElement;

    if (target) {
      setSelectedId(target.id);
      setEditValue(target.innerText.trim());

      // Ambil Computed Style asli dari elemen
      const style = window.getComputedStyle(target);
      setFontSize(style.fontSize);
      setIsBold(
        style.fontWeight === "bold" || parseInt(style.fontWeight) >= 700,
      );
      setIsItalic(style.fontStyle === "italic");

      // Konversi RGB ke HEX untuk input color
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
      // Update Konten (Support line breaks)
      element.innerHTML = editValue.replace(/\n/g, "<br />");

      // Update Styling Inline
      element.style.fontSize = fontSize;
      element.style.color = textColor;
      element.style.fontWeight = isBold ? "bold" : "normal";
      element.style.fontStyle = isItalic ? "italic" : "normal";

      if (fontFamily !== "Default") {
        element.style.fontFamily = fontFamily;
      }

      setHtmlBody(doc.body.innerHTML);
    }
    setIsModalOpen(false);
  };

  const handleSaveToDatabase = async () => {
    // Tinggal panggil mutate dari hook
    mutate(
      { body: htmlBody },
      {
        onSuccess: () => {
          if (onClose) onClose();
        },
      },
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Action Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-primary/10 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-tight">
              Visual Editor
            </h2>
            <p className="text-[10px] text-muted-foreground font-medium">
              Klik teks pada preview untuk mengedit
            </p>
          </div>
        </div>
        <Button
          onClick={handleSaveToDatabase}
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 rounded-2xl gap-2 shadow-lg shadow-primary/20 px-6"
        >
          {isLoading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Save size={18} />
          )}
          {isLoading ? "Saving..." : "Simpan"}
        </Button>
      </div>

      {/* Mobile Preview Container */}
      <div className="relative mx-auto max-w-95 min-h-[500px] shadow-2xl rounded-[3rem] overflow-hidden bg-white border-[12px] border-secondary p-1">
        <div
          className="preview-container h-full w-full overflow-y-auto scrollbar-hide p-4"
          onClick={handleElementClick}
          dangerouslySetInnerHTML={{ __html: htmlBody }}
        />
      </div>

      {/* Editor Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .editable-element { position: relative; transition: all 0.2s; cursor: pointer; }
        .editable-element:hover { 
          outline: 2px dashed #52735f !important; 
          outline-offset: 4px; 
          background-color: rgba(82, 115, 95, 0.05);
        }
        .editable-element:hover::after { 
          content: 'KLIK UNTUK EDIT'; 
          position: absolute; 
          top: -22px; 
          left: 50%; 
          transform: translateX(-50%);
          background: #52735f; 
          color: white; 
          font-size: 8px; 
          padding: 2px 8px; 
          border-radius: 4px; 
          font-weight: 900;
          z-index: 50;
        }
      `,
        }}
      />

      {/* Edit Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none rounded-[2.5rem] shadow-2xl">
          <DialogHeader className="p-6 bg-secondary/30">
            <DialogTitle className="text-sm font-black flex items-center gap-2 text-primary uppercase tracking-widest">
              <Type className="w-4 h-4" /> Sesuaikan Teks
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Konten
              </Label>
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="min-h-25 rounded-2xl border-none bg-secondary/20 font-medium focus-visible:ring-primary shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={isBold ? "default" : "outline"}
                onClick={() => setIsBold(!isBold)}
                className={`rounded-2xl font-bold h-12 ${isBold ? "bg-primary text-white" : "bg-white"}`}
              >
                <Bold size={16} className="mr-2" /> Bold
              </Button>
              <Button
                variant={isItalic ? "default" : "outline"}
                onClick={() => setIsItalic(!isItalic)}
                className={`rounded-2xl font-bold h-12 ${isItalic ? "bg-primary text-white italic" : "bg-white italic"}`}
              >
                <Italic size={16} className="mr-2" /> Italic
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Font
                </Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="rounded-2xl h-11 bg-secondary/20 border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="Default">Modern Sans</SelectItem>
                    <SelectItem value="'Playfair Display', serif">
                      Luxury Serif
                    </SelectItem>
                    <SelectItem value="'Dancing Script', cursive">
                      Elegant Script
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Ukuran
                </Label>
                <div className="relative">
                  <FontSizeIcon className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="pl-10 h-11 rounded-2xl bg-secondary/20 border-none font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                <Palette className="w-4 h-4" /> Warna
              </div>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 h-10 rounded-xl border-2 border-white shadow-sm cursor-pointer"
              />
            </div>
          </div>

          <DialogFooter className="p-6 pt-0">
            <Button
              onClick={handleApplyChanges}
              className="w-full bg-primary text-white h-14 rounded-2xl font-black shadow-lg shadow-primary/20 uppercase tracking-widest text-xs"
            >
              Terapkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
