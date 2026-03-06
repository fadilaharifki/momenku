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
  ChevronLeft,
  GripVertical,
  Plus,
  Sparkles,
  Calendar,
} from "lucide-react";

import { InvitationSectionInterface } from "@/type/invitation";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import { useToggleSectionActive } from "@/hooks/api/usePatchToggleSectionActive";
import { useChangeInvitationStatus } from "@/hooks/api/usePatchChangeInvitationStatus";
import RSVPSettingEditor from "@/components/setting/RSVP-setting-editor";
import { toast } from "sonner";
import { RSVPDataSetting } from "@/type/rsvp";

export default function ManageInvitationPage() {
  const router = useRouter();
  const { id } = useParams();

  const changeStatus = useChangeInvitationStatus(id as string);
  const toggleActive = useToggleSectionActive(id as string);
  const { data: response, isLoading } = useGetInvitationById(id as string);

  const invitation = response?.data;
  const sections = useMemo(() => invitation?.sections || [], [invitation]);

  const [selectSectionId, setSelectSectionId] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isRSVPEditorOpen, setIsRSVPEditorOpen] = useState(false);
  const [selectedSection, setSelectedSection] =
    useState<InvitationSectionInterface | null>(null);
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);

  const futureUnderDev = () => {
    toast.info("Fitur dalam pengembangan");
  };

  const mainTools = useMemo(
    () => [
      {
        name: "Settings",
        icon: Settings,
        color: "text-blue-500",
        bg: "bg-blue-50",
        onClick: () => futureUnderDev(),
      },
      {
        name: "Tema",
        icon: Palette,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
        onClick: () => futureUnderDev(),
      },
      {
        name: "Music",
        icon: Music,
        color: "text-amber-500",
        bg: "bg-amber-50",
        onClick: () => futureUnderDev(),
      },
      {
        name: "Background",
        icon: ImageIcon,
        color: "text-rose-500",
        bg: "bg-rose-50",
        onClick: () => futureUnderDev(),
      },
      {
        name: "RSVP",
        icon: MailCheck,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
        onClick: () => setIsRSVPEditorOpen(true),
      },
      {
        name: "Layar Sapa",
        icon: Tv,
        color: "text-violet-500",
        bg: "bg-violet-50",
        onClick: () => futureUnderDev(),
      },
      {
        name: "Preview",
        icon: Eye,
        color: "text-sky-500",
        bg: "bg-sky-50",
        onClick: () => {
          window.open(`/${invitation?.domain}`, "_blank");
        },
      },
      {
        name: "Kirim",
        icon: Send,
        color: "text-orange-500",
        bg: "bg-orange-50",
        onClick: () => futureUnderDev(),
      },
    ],
    [response],
  );

  const handleOpenEditor = (section: InvitationSectionInterface) => {
    setSelectedSection(section);
    setIsEditorOpen(true);
  };

  if (isLoading) return <ManageInvitationSkeleton />;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-poppins px-4">
      {/* 1. Header & Quick Info */}
      <div className="flex flex-col gap-6 pt-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="rounded-2xl border-border/40 bg-white/50 backdrop-blur-sm shadow-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
            {invitation?.domain}{" "}
            <Sparkles size={20} className="text-amber-400 fill-amber-400" />
          </h1>
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <Calendar size={14} />
              Dibuat{" "}
              {new Date(invitation?.created_at as Date).toLocaleDateString(
                "id-ID",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <Badge
              variant="outline"
              className="text-[10px] font-bold border-emerald-100 text-emerald-600 bg-emerald-50"
            >
              Premium Plan
            </Badge>
          </div>
        </div>
      </div>

      {/* 2. Bento Style Tools Grid */}
      <div className="grid grid-cols-4 gap-3">
        {mainTools.map((tool) => (
          <div
            onClick={tool?.onClick}
            key={tool.name}
            className="group flex flex-col items-center gap-2 cursor-pointer"
          >
            <div
              className={`h-14 w-14 rounded-[1.25rem] ${tool.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95 group-hover:shadow-md`}
            >
              <tool.icon className={`h-6 w-6 ${tool.color} stroke-[2.5]`} />
            </div>
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest text-center">
              {tool.name}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Global Status Card */}
      <Card className="rounded-4xl bg-gradient-to-br from-slate-900 to-slate-800 border-none shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px]" />
        <CardContent className="p-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-white font-bold text-sm">Status Undangan</p>
            <p className="text-slate-400 text-xs font-medium">
              Aktifkan untuk akses publik
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`text-[10px] font-black tracking-widest ${invitation?.is_active ? "text-emerald-400" : "text-slate-500"}`}
            >
              {invitation?.is_active ? "ONLINE" : "OFFLINE"}
            </span>

            <Switch
              checked={invitation?.is_active === 1}
              disabled={changeStatus.isPending}
              className="data-[state=checked]:bg-emerald-500 scale-110"
              onCheckedChange={(checked) => {
                changeStatus.mutate(checked ? 1 : 0);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* 4. Section Management - Slim Version */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground">
              Struktur Halaman
            </h3>
            <Badge
              variant="outline"
              className="h-5 rounded-md text-[9px] px-2 font-bold bg-secondary/30 border-none"
            >
              {sections.length}
            </Badge>
          </div>
          <button className="text-[10px] font-bold text-primary hover:underline">
            Reorder
          </button>
        </div>

        <div className="space-y-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center gap-2 group bg-white border border-border/50 p-2 rounded-2xl hover:border-primary/30 transition-all shadow-sm"
            >
              {/* Handle Drag Slim */}
              <div className="p-1 text-muted-foreground/30 group-hover:text-primary/50 transition-colors">
                <GripVertical size={16} />
              </div>

              {/* Icon & Title Compact */}
              <div className="flex-1 flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Sparkles size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 leading-none">
                    {section.title}
                  </span>
                  {section.is_premium === 1 && (
                    <span className="text-[8px] text-amber-500 font-black mt-1 uppercase tracking-tighter">
                      Premium
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Slim */}
              <div className="flex items-center gap-2 border-l pl-2 border-border/50">
                <Switch
                  checked={section.is_active === 1}
                  onCheckedChange={(checked) => {
                    setSelectSectionId(section.id);
                    toggleActive.mutate({
                      id: section.id,
                      is_active: checked ? 1 : 0,
                    });
                  }}
                  disabled={
                    section.id === selectSectionId
                      ? toggleActive.isPending
                      : false
                  }
                  className="scale-75 data-[state=checked]:bg-emerald-500"
                />
                <Button
                  onClick={() => handleOpenEditor(section)}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 rounded-xl font-bold text-[10px] uppercase hover:bg-primary hover:text-white transition-all"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Floating Action Button Container */}
      {/* <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50">
        <Button
          onClick={() => {
            // setIsLayoutModalOpen(true);
            futureUnderDev();
          }}
          className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-[2rem] font-black shadow-2xl shadow-primary/40 transition-all active:scale-95 group"
        >
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.15em]">
            <div className="p-1.5 bg-white/20 rounded-lg group-hover:rotate-90 transition-transform duration-300">
              <Plus size={20} strokeWidth={3} />
            </div>
            Tambah Halaman Baru
          </div>
        </Button>
      </div> */}

      {/* Visual Editor Sheet */}
      <Sheet open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[95%] md:max-w-2xl p-0 border-none shadow-2xl"
        >
          <SheetHeader className="p-6 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                Live Editor:{" "}
                <span className="text-slate-500">{selectedSection?.title}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditorOpen(false)}
                className="rounded-full font-bold text-xs uppercase text-muted-foreground"
              >
                Close
              </Button>
            </SheetTitle>
          </SheetHeader>

          <div className="h-[calc(100vh-80px)] overflow-hidden bg-slate-50/50 flex flex-col">
            {selectedSection && (
              <VisualLiveEditor
                id={id as string}
                section={selectedSection}
                backgroundUrl={invitation?.theme?.background_url as string}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      <LayoutPicker
        isOpen={isLayoutModalOpen}
        onClose={() => setIsLayoutModalOpen(false)}
        onSelect={(layout) => console.log("Layout Selected:", layout)}
      />

      <RSVPSettingEditor
        isOpen={isRSVPEditorOpen}
        onClose={() => setIsRSVPEditorOpen(false)}
        initialData={invitation?.settings as RSVPDataSetting}
        id={invitation?.id as string}
      />
    </div>
  );
}
