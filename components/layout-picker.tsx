"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetLayouts } from "@/hooks/api/useGetLayouts";

interface LayoutPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (layout: any) => void;
}

export function LayoutPicker({ isOpen, onClose, onSelect }: LayoutPickerProps) {
  const { data, isLoading } = useGetLayouts({ limit: "all" });
  const [selectedCategory, setSelectedCategory] = useState("Semua Layout");

  const filteredLayouts = data?.data?.filter((layout: any) => {
    if (selectedCategory === "Semua Layout") return true;
    return layout.title === selectedCategory;
  });

  const categories = [
    "Semua Layout",
    ...new Set(data?.data?.map((l: any) => l.title) || []),
  ] as string[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[85vh] flex flex-col p-0 overflow-hidden rounded-t-3xl sm:rounded-3xl border-none shadow-2xl">
        <DialogHeader className="p-6 border-b bg-white">
          <DialogTitle className="text-xl font-bold text-center">
            Pilih Layout Halaman
          </DialogTitle>
        </DialogHeader>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-[9/16] rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {filteredLayouts?.map((layout: any) => (
                <div
                  key={layout.id}
                  className="space-y-3 group cursor-pointer"
                  onClick={() => onSelect(layout)}
                >
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-primary group-hover:shadow-lg transition-all duration-300">
                    <img
                      src={layout.image_url}
                      alt={layout.title}
                      className="w-full h-full object-cover"
                    />
                    {layout.is_premium === 1 && (
                      <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600 border-none">
                        Premium
                      </Badge>
                    )}
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <div className="bg-white text-primary font-bold px-4 py-2 rounded-full shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Gunakan
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {layout.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Footer Filter */}
        <div className="p-6 border-t bg-white flex items-center gap-4">
          <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">
            Kategori
          </span>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full rounded-xl border-slate-200 h-12 focus:ring-primary">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
}
