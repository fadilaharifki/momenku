"use client";

import { useState } from "react";
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
import { Trash2, Wand2 } from "lucide-react"; // Icon tambahan

export default function LiveEditor() {
  const [htmlBody, setHtmlBody] = useState(`
    <div id="bride-section" class="p-10 text-center bg-[#fdfaf5] border rounded-xl shadow-sm animate__animated animate__fadeIn">
      <h2 id="target-title" class="editable-element cursor-pointer hover:outline-dashed p-2  text-[#c9a84c] text-4xl mb-6">The Bride</h2>
      
      <div id="target-name" class="editable-element cursor-pointer hover:outline-dashed p-2 transition-all">
        <h3 class="text-2xl font-bold">Bripda Lestari Puspita Sari</h3>
      </div>

      <div id="target-parents" class="editable-element cursor-pointer hover:outline-dashed p-2 mt-4 transition-all">
        <p class="text-gray-600">Putri dari Bapak Zaifullah, SH dan Ibu Nur Aiyni. A. S.IP</p>
      </div>
    </div>
  `);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // State untuk field di dalam modal
  const [editValue, setEditValue] = useState("");
  const [fontSize, setFontSize] = useState("14.4px");
  const [textColor, setTextColor] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("Default");

  const handleElementClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest(
      ".editable-element",
    ) as HTMLElement;
    if (target) {
      setSelectedId(target.id);
      setEditValue(target.innerHTML.replace(/<br\s*\/?>/gi, "\n").trim());

      // Mengambil style yang ada di element (jika ada)
      const style = target.style;
      setFontSize(style.fontSize || "14.4px");
      setTextColor(style.color || "#000000");
      setIsModalOpen(true);
    }
  };

  const handleSave = () => {
    if (!selectedId) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlBody, "text/html");
    const element = doc.getElementById(selectedId);

    if (element) {
      // 1. Update Teks
      element.innerHTML = editValue.replace(/\n/g, "<br />");

      // 2. Update Style (Warna, Font Size, dll)
      element.style.fontSize = fontSize;
      element.style.color = textColor;
      if (fontFamily !== "Default") {
        element.style.fontFamily = fontFamily;
      }

      setHtmlBody(doc.body.innerHTML);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus elemen ini?",
    );
    if (confirmDelete) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlBody, "text/html");
      const element = doc.getElementById(selectedId);

      if (element) {
        element.remove(); // Menghapus elemen dari struktur HTML
        setHtmlBody(doc.body.innerHTML);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10 min-h-screen">
      <div
        className="relative shadow-xl rounded-xl overflow-hidden bg-white"
        onClick={handleElementClick}
        dangerouslySetInnerHTML={{ __html: htmlBody }}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[450px] p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Edit Text</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Input Teks Utama */}
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-[100px] border-cyan-200 focus:border-cyan-400"
            />

            {/* AI Assistant Placeholder */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold">
                  Ai Assistant (BETA)
                </span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-[10px]"
                  >
                    Rewrite
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-[10px]"
                  >
                    Fix Spelling
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Input
                  placeholder="Ai can make mistakes..."
                  className="pr-10 h-9 text-sm"
                  disabled
                />
                <Wand2 className="absolute right-3 top-2.5 w-4 h-4 text-purple-500" />
              </div>
            </div>

            {/* Font & Style Row */}
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Font Family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Default">Default</SelectItem>
                    <SelectItem value="'Playfair Display', serif">
                      Font Accent (Serif)
                    </SelectItem>
                    <SelectItem value="'Dancing Script', cursive">
                      Cursive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Color & Size Row */}
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm">Warna Text</span>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 rounded-full border-none cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Ukuran</span>
                <Input
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-20 h-9 text-center"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-between sm:justify-between w-full gap-2">
            <Button
              variant="secondary"
              onClick={handleDelete}
              className="bg-gray-200 hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Element
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#489d8f] hover:bg-[#3a7e73] px-8"
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
