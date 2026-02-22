"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Eye, Edit, Trash2, MoreHorizontal, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const templatesData = [
  {
    id: 1,
    name: "Elegant Gold",
    slug: "elegant-gold",
    image: "/images/template-elegant.jpg",
    category: "Premium",
    usedBy: 245,
    status: "active",
    created: "10 Jan 2026",
  },
  {
    id: 2,
    name: "Rustic Garden",
    slug: "rustic-garden",
    image: "/images/template-rustic.jpg",
    category: "Premium",
    usedBy: 189,
    status: "active",
    created: "15 Jan 2026",
  },
  {
    id: 3,
    name: "Modern Luxury",
    slug: "modern-luxury",
    image: "/images/template-modern.jpg",
    category: "Exclusive",
    usedBy: 312,
    status: "active",
    created: "20 Jan 2026",
  },
];

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState(templatesData);

  const toggleStatus = (id: number) => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "active" ? "inactive" : "active" }
          : t,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className=" text-2xl font-bold text-foreground">
            Kelola Template
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola semua template undangan digital
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 size-4" /> Tambah Template
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Tambah Template Baru
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Tambahkan template undangan baru ke platform
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Nama Template</Label>
                <Input
                  placeholder="Contoh: Romantic Blush"
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Slug</Label>
                <Input
                  placeholder="romantic-blush"
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Kategori</Label>
                <Select>
                  <SelectTrigger className="border-border bg-secondary text-foreground">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="exclusive">Exclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Thumbnail</Label>
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary">
                  <p className="text-sm text-muted-foreground">
                    Klik atau drag untuk upload
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-secondary"
              >
                Batal
              </Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Template grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((tpl) => (
          <Card
            key={tpl.id}
            className="group overflow-hidden border-border bg-card"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={tpl.image}
                alt={tpl.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className=" text-lg font-bold text-cream">{tpl.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <Badge className="bg-primary/90 text-primary-foreground text-xs">
                    {tpl.category}
                  </Badge>
                  <Badge
                    className={
                      tpl.status === "active"
                        ? "bg-green-500/90 text-white text-xs"
                        : "bg-red-500/90 text-white text-xs"
                    }
                  >
                    {tpl.status === "active" ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-black/30 text-white hover:bg-black/50 hover:text-white"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-card border-border"
                  >
                    <DropdownMenuItem className="text-foreground focus:bg-secondary focus:text-foreground">
                      <Eye className="mr-2 size-3" /> Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground focus:bg-secondary focus:text-foreground">
                      <Edit className="mr-2 size-3" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                      <Trash2 className="mr-2 size-3" /> Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="size-3.5" />
                  <span>{tpl.usedBy} pengguna</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {tpl.status === "active" ? "Aktif" : "Nonaktif"}
                  </span>
                  <Switch
                    checked={tpl.status === "active"}
                    onCheckedChange={() => toggleStatus(tpl.id)}
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Dibuat: {tpl.created}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
