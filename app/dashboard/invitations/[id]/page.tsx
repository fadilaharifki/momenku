"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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

import { InvitationSection } from "@/type/invitation";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import VisualLiveEditor from "@/components/visual-editor";
import { LayoutPicker } from "@/components/layout-picker";
import { useGetInvitationById } from "@/hooks/api/useGetInvitationById";
import ManageInvitationSkeleton from "@/components/skeleton/manage-invitation-skeleton";

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

export default function ManageInvitationPage() {
  const router = useRouter();
  const { id } = useParams(); // Ambil ID dari URL

  // 1. Fetch Data Asli dari Database
  const { data: response, isLoading } = useGetInvitationById(id as string);
  const invitation = response?.data;
  const sections = useMemo(() => invitation?.sections || [], [invitation]);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedSection, setSelectedSection] =
    useState<InvitationSection | null>(null);
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);

  const handleOpenEditor = (section: InvitationSection) => {
    setSelectedSection(section);
    setIsEditorOpen(true);
  };

  if (isLoading) return <ManageInvitationSkeleton />;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Header */}
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
          {invitation?.domain || "Detail Undangan"}
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
              {invitation?.created_at
                ? new Date(invitation.created_at).toLocaleDateString()
                : "-"}
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

      {/* Grid Menu Tools */}
      <div className="grid grid-cols-3 gap-3">
        {mainTools.map((tool) => (
          <Card
            key={tool.name}
            className="group hover:border-primary/50 transition-all cursor-pointer rounded-2xl"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center space-y-2 text-center">
              <div className="p-2 rounded-xl bg-secondary/50 group-hover:scale-110 transition-transform">
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                {tool.name}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Invitation */}
      <Card className="rounded-2xl bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">
              Status Undangan
            </span>
            <Badge
              variant="secondary"
              className={`${invitation?.is_active ? "bg-primary" : "bg-gray-400"} text-white text-[9px] font-black h-5`}
            >
              {invitation?.is_active ? "AKTIF" : "NON-AKTIF"}
            </Badge>
          </div>
          <Switch
            checked={invitation?.is_active === 1}
            className="data-[state=checked]:bg-primary"
          />
        </CardContent>
      </Card>

      {/* Dynamic Section Management */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">
          Atur Urutan & Konten
        </p>

        <div className="space-y-2">
          {sections.map((section) => (
            <div key={section.id} className="flex items-center gap-3 group">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-grab active:cursor-grabbing text-muted-foreground"
              >
                <GripVertical size={20} />
              </Button>

              <Card className="flex-1 rounded-2xl border-border hover:border-primary/30 transition-all overflow-hidden">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">
                      {section.title}
                    </span>
                    {section.is_premium === 1 && (
                      <span className="text-[8px] text-amber-500 font-bold">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={section.is_active === 1}
                      className="data-[state=checked]:bg-primary"
                    />
                    <Button
                      onClick={() => handleOpenEditor(section)}
                      variant="secondary"
                      size="sm"
                      className="h-8 rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all"
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
      <Button
        onClick={() => setIsLayoutModalOpen(true)}
        className="w-full h-12 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20"
      >
        <Plus className="mr-2 h-5 w-5" /> Tambah Halaman
      </Button>

      {/* Visual Editor Sheet */}
      <Sheet open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[90%] md:max-w-175 p-0 border-l border-primary/20"
        >
          <SheetHeader className="p-6 border-b bg-white">
            <SheetTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              Visual Editor: {selectedSection?.title}
            </SheetTitle>
          </SheetHeader>

          <div className="h-[calc(100vh-80px)] overflow-y-auto bg-secondary/5">
            <VisualLiveEditor section={selectedSection as InvitationSection} />
          </div>
        </SheetContent>
      </Sheet>

      <LayoutPicker
        isOpen={isLayoutModalOpen}
        onClose={() => setIsLayoutModalOpen(false)}
        onSelect={(layout) => console.log("Layout Selected:", layout)}
      />
    </div>
  );
}
