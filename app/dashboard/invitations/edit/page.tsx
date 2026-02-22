"use client";

import {
  Settings,
  Palette,
  Music,
  Image as ImageIcon,
  MailCheck,
  Tv,
  Eye,
  Send,
  Trophy,
  ChevronLeft,
  AlertCircle,
  GripVertical,
  Plus,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import VisualLiveEditor from "@/components/visual-editor";
import { useState } from "react";

const mainTools = [
  { name: "Pengaturan", icon: Settings, color: "text-blue-500" },
  { name: "Tema", icon: Palette, color: "text-green-500" },
  { name: "Music", icon: Music, color: "text-orange-500" },
  { name: "Background", icon: ImageIcon, color: "text-pink-500" },
  { name: "RSVP", icon: MailCheck, color: "text-sky-500" },
  { name: "Layar Sapa", icon: Tv, color: "text-red-400" },
  { name: "Preview", icon: Eye, color: "text-amber-500" },
  { name: "Kirim", icon: Send, color: "text-emerald-500" },
  { name: "Lucky Draw", icon: Trophy, color: "text-purple-500" },
];

const sectionList = [
  { id: "opening", name: "Opening", status: true },
  { id: "acara", name: "Acara", status: true },
  { id: "maps", name: "Maps", status: true },
  { id: "rsvp", name: "RSVP", status: true },
  { id: "gift", name: "Gift", status: true },
  { id: "thanks", name: "Thanks", status: false },
];

export default function ManageInvitationPage() {
  const router = useRouter();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleOpenEditor = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsEditorOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Header Navigation */}
      <div className="flex items-center gap-4 mb-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-foreground">
          Undangan Pernikahan
        </h1>
      </div>

      {/* Expiry Banner */}
      <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/10 rounded-2xl overflow-hidden">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
              Aktif Sampai
            </p>
            <p className="text-sm font-bold text-foreground">
              24 February 2026 at 14.50
            </p>
          </div>
          <Button
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-xl px-4"
          >
            Perpanjang
          </Button>
        </CardContent>
      </Card>

      {/* Admin Help Banner (Promo) */}
      <div className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/1] bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/10">
        <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
          <div className="text-white">
            <h3 className="text-lg font-black leading-tight">
              Bingung Bikin Sendiri?
            </h3>
            <p className="text-xs font-medium opacity-90">
              Sini Kami Bantu Bikin Undangan
            </p>
          </div>
          <Button
            size="sm"
            className="bg-white text-emerald-600 font-bold rounded-full hover:bg-white/90"
          >
            WhatsApp Admin
          </Button>
        </div>
        {/* Simple Decorative Circles */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Grid Menu Tools */}
      <div className="grid grid-cols-3 gap-3">
        {mainTools.map((tool) => (
          <Card
            key={tool.name}
            className="group hover:border-primary/50 transition-all cursor-pointer rounded-2xl"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center space-y-2 text-center">
              <div
                className={`p-2 rounded-xl bg-secondary/50 group-hover:scale-110 transition-transform`}
              >
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                {tool.name}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status & Type Settings */}
      <div className="space-y-3">
        <Card className="rounded-2xl bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                Status Undangan
              </span>
              <Badge
                variant="secondary"
                className="bg-primary text-white text-[9px] font-black h-5"
              >
                AKTIF
              </Badge>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-primary"
            />
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Notification */}
      <Alert className="bg-white dark:bg-card border-red-200 rounded-2xl flex gap-4 p-4 shadow-sm">
        <div className="h-10 w-10 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">
            Bikin undangan dengan fitur terlengkap. Upgrade paket
          </p>
          <Button
            variant="link"
            className="text-red-500 p-0 h-auto font-bold underline text-xs"
          >
            Klik Disini
          </Button>
        </div>
      </Alert>

      {/* Draggable Section Management */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">
          Atur Urutan & Konten
        </p>

        <div className="space-y-2">
          {sectionList.map((item) => (
            <div key={item.id} className="flex items-center gap-3 group">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-grab active:cursor-grabbing text-muted-foreground"
              >
                <GripVertical size={20} />
              </Button>

              <Card className="flex-1 rounded-2xl border-border hover:border-primary/30 transition-all overflow-hidden">
                <CardContent className="p-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={item.status}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Button
                      onClick={() => handleOpenEditor(item.id)}
                      variant="secondary"
                      size="sm"
                      className="h-8 rounded-xl font-bold text-xs bg-secondary hover:bg-primary hover:text-white transition-all"
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Page Button */}
      <Button className="w-full h-12 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all">
        <Plus className="mr-2 h-5 w-5" /> Tambah Halaman
      </Button>

      <Sheet open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[90%] md:max-w-175 p-0 border-l border-primary/20"
        >
          <SheetHeader className="p-6 border-b bg-white">
            <SheetTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              Visual Editor: {activeSection}
            </SheetTitle>
          </SheetHeader>

          {/* ScrollArea agar editor bisa di-scroll jika konten panjang */}
          <div className="h-[calc(100vh-80px)] overflow-y-auto bg-secondary/5">
            <VisualLiveEditor />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
