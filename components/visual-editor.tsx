"use client";

import { useState } from "react";
import {
  Trash2,
  Wand2,
  Type,
  Palette,
  Type as FontSizeIcon,
  Save,
  Sparkles,
  Bold,
  Italic,
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
import { Toggle } from "@/components/ui/toggle"; // Gunakan toggle shadcn jika ada

export default function VisualLiveEditor() {
  const [htmlBody, setHtmlBody] = useState(`
    <div id="bride-section" class="p-12 text-center bg-[#fdfaf5] border-2 border-dashed border-primary/20 rounded-[2rem] shadow-sm font-poppins">
      <h2 id="target-title" class="editable-element cursor-pointer hover:bg-primary/5 rounded-xl p-2 transition-all text-[#c9a84c] text-4xl mb-6 italic tracking-tight">The Bride</h2>
      <div id="target-name" class="editable-element cursor-pointer hover:bg-primary/5 rounded-xl p-2 transition-all">
        <h3 class="text-3xl font-black text-foreground">Bripda Lestari Puspita Sari</h3>
      </div>
      <div id="target-parents" class="editable-element cursor-pointer hover:bg-primary/5 rounded-xl p-2 mt-4 transition-all">
        <p class="text-muted-foreground italic font-medium">Putri dari Bapak Zaifullah, SH dan Ibu Nur Aiyni. A. S.IP</p>
      </div>
    </div>
  `);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // States for Editing
  const [editValue, setEditValue] = useState("");
  const [fontSize, setFontSize] = useState("16px");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Default");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleElementClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest(
      ".editable-element",
    ) as HTMLElement;
    if (target) {
      setSelectedId(target.id);
      setEditValue(target.innerText.trim());

      const style = window.getComputedStyle(target);
      setFontSize(style.fontSize);

      // Cek Bold & Italic
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

  const handleSave = () => {
    if (!selectedId) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlBody, "text/html");
    const element = doc.getElementById(selectedId);

    if (element) {
      element.innerHTML = editValue.replace(/\n/g, "<br />");
      element.style.fontSize = fontSize;
      element.style.color = textColor;

      // Simpan Bold & Italic
      element.style.fontWeight = isBold ? "bold" : "normal";
      element.style.fontStyle = isItalic ? "italic" : "normal";

      if (fontFamily !== "Default") element.style.fontFamily = fontFamily;
      setHtmlBody(doc.body.innerHTML);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen font-poppins">
      {/* ... (Header tetap sama) ... */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Editor</h1>
          <p className="text-sm text-muted-foreground">
            Klik elemen untuk mengubah konten.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl gap-2 shadow-lg shadow-primary/20">
          <Save size={18} /> Simpan Draft
        </Button>
      </div>

      <div
        className="relative shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border-8 border-secondary p-1 cursor-default"
        onClick={handleElementClick}
        dangerouslySetInnerHTML={{ __html: htmlBody }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .editable-element:hover { outline: 2px dashed #52735f !important; outline-offset: 4px; position: relative; }
        .editable-element:hover::after { content: 'Klik untuk Edit'; position: absolute; top: -25px; right: 0; background: #52735f; color: white; font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
      `,
        }}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none rounded-[2rem]">
          <DialogHeader className="p-6 bg-secondary/30">
            <DialogTitle className="text-lg font-black flex items-center gap-2 text-primary uppercase">
              <Type className="w-5 h-5" /> Penyesuaian Elemen
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Konten Teks
              </Label>
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="min-h-[100px] rounded-2xl border-border bg-secondary/10 font-medium"
              />
            </div>

            {/* Formatting Row (Bold & Italic) */}
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Format Teks
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={isBold ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsBold(!isBold)}
                  className={`flex-1 rounded-xl font-bold gap-2 ${isBold ? "bg-primary text-white" : "border-border"}`}
                >
                  <Bold size={16} /> Bold
                </Button>
                <Button
                  variant={isItalic ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsItalic(!isItalic)}
                  className={`flex-1 rounded-xl font-bold gap-2 ${isItalic ? "bg-primary text-white" : "border-border italic"}`}
                >
                  <Italic size={16} /> Italic
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Font Style
                </Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="rounded-xl h-10 bg-secondary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
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
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Ukuran
                </Label>
                <div className="relative">
                  <FontSizeIcon className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="pl-10 h-10 rounded-xl bg-secondary/20 border-none font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-secondary/10 border border-border">
              <div className="flex items-center gap-3 text-sm font-bold">
                <Palette className="w-4 h-4 text-primary" /> Warna Elemen
              </div>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110"
              />
            </div>
          </div>

          <DialogFooter className="p-6 bg-secondary/20 flex gap-3 sm:justify-between items-center">
            <Button
              variant="ghost"
              className="text-red-500 font-bold rounded-xl"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Hapus
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary text-white px-10 rounded-xl font-bold shadow-lg shadow-primary/20"
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
