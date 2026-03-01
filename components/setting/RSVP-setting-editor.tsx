"use client";

import { useState } from "react";
import { Settings2, Plus, Trash2, X, GripVertical, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useUpdateInvitation } from "@/hooks/api/usePatchUpdateInvitation";
import { RSVPDataSetting } from "@/type/rsvp";

export interface RSVPSettingEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: RSVPDataSetting;
  id: string;
}

export default function RSVPSettingEditor({
  isOpen,
  onClose,
  initialData,
  id,
}: RSVPSettingEditorProps) {
  const [data, setData] = useState<RSVPDataSetting>(initialData);
  const [editingField, setEditingField] = useState<string | null>(null);
  const { mutate, isPending: isLoading } = useUpdateInvitation();

  const addCustomInput = () => {
    const uniqueId = Date.now();
    const newName = `custom_${uniqueId}`;
    const newField = {
      name: newName,
      type: "text",
      label: "Pertanyaan Baru",
      placeholder: "Ketik di sini...",
      required: false,
      is_disabled: false,
      is_published: true,
      is_custom: true,
    };

    setData((prev) => ({
      ...prev,
      rsvp_settings: {
        ...prev.rsvp_settings,
        custom_inputs: [...(prev.rsvp_settings.custom_inputs || []), newField],
      },
    }));
    setEditingField(newName);
  };

  const updateFieldData = (name: string, key: string, value: any) => {
    setData((prev) => {
      const isCustom = prev.rsvp_settings.custom_inputs?.some(
        (i: any) => i.name === name,
      );

      if (isCustom) {
        return {
          ...prev,
          rsvp_settings: {
            ...prev.rsvp_settings,
            custom_inputs: (prev.rsvp_settings.custom_inputs || []).map(
              (i: any) => (i.name === name ? { ...i, [key]: value } : i),
            ),
          },
        };
      }

      return {
        ...prev,
        rsvp_settings: {
          ...prev.rsvp_settings,
          inputs: prev.rsvp_settings.inputs.map((i: any) =>
            i.name === name ? { ...i, [key]: value } : i,
          ),
        },
      };
    });
  };

  const removeInput = (name: string) => {
    setData((prev) => ({
      ...prev,
      rsvp_settings: {
        ...prev.rsvp_settings,
        custom_inputs: (prev.rsvp_settings.custom_inputs || []).filter(
          (i: any) => i.name !== name,
        ),
      },
    }));
    setEditingField(null);
    toast.success("Pertanyaan dihapus");
  };

  const handleSave = () => {
    mutate({
      payload: { settings: data },
      id,
    });
  };

  const renderFieldItem = (input: any) => (
    <div key={input.name} className="space-y-3">
      <div
        className={`p-4 bg-white border rounded-3xl flex items-center justify-between transition-all ${
          editingField === input.name
            ? "border-[#3e938a] ring-4 ring-[#3e938a]/5"
            : "border-slate-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <GripVertical size={16} className="text-slate-300" />
          <span className="text-sm font-bold text-slate-700">
            {input.label}
          </span>
          {input.is_custom && (
            <Badge className="bg-emerald-50 text-emerald-600 border-none text-[9px]">
              Custom
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() =>
              setEditingField(editingField === input.name ? null : input.name)
            }
          >
            <Pencil size={14} />
          </Button>
          {input.name !== "name" && (
            <Switch
              checked={input.is_published}
              onCheckedChange={(val) =>
                updateFieldData(input.name, "is_published", val)
              }
              className="scale-75 data-[state=checked]:bg-[#3e938a]"
            />
          )}
        </div>
      </div>

      {editingField === input.name && (
        <div className="bg-white border border-slate-100 rounded-4xl p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-slate-400">
              <GripVertical size={16} />
              <span className="text-sm font-bold text-slate-800">
                {input.label}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400"
              onClick={() => setEditingField(null)}
            >
              <X size={18} />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-xs font-bold text-slate-500">Label</Label>
              <Input
                className="col-span-2 rounded-xl"
                value={input.label}
                onChange={(e) =>
                  updateFieldData(input.name, "label", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-xs font-bold text-slate-500">
                Placeholder
              </Label>
              <Input
                className="col-span-2 rounded-xl"
                value={input.placeholder}
                onChange={(e) =>
                  updateFieldData(input.name, "placeholder", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-xs font-bold text-slate-500">Type</Label>
              <Select
                value={input.type}
                onValueChange={(val) =>
                  updateFieldData(input.name, "type", val)
                }
              >
                <SelectTrigger className="col-span-2 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100">
                  <SelectItem value="text">Jawaban Singkat</SelectItem>
                  <SelectItem value="textarea">Paragraf</SelectItem>
                  <SelectItem value="number">Angka</SelectItem>
                  <SelectItem value="phone">Nomor WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="select">Pilihan Ganda</SelectItem>
                  <SelectItem value="guest_count">Jumlah Tamu</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-xs font-bold text-slate-500">
                Wajib Diisi
              </Label>
              <Select
                value={input.required ? "ya" : "tidak"}
                onValueChange={(val) =>
                  updateFieldData(input.name, "required", val === "ya")
                }
              >
                <SelectTrigger className="col-span-2 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ya">Ya</SelectItem>
                  <SelectItem value="tidak">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {input.is_custom && (
            <Button
              variant="ghost"
              className="w-full mt-6 text-rose-500 hover:bg-rose-50 rounded-xl font-bold text-xs gap-2"
              onClick={() => removeInput(input.name)}
            >
              <Trash2 size={14} /> Hapus Pertanyaan
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[95%] md:max-w-2xl p-0 border-none flex flex-col font-poppins bg-slate-50"
      >
        <SheetHeader className="p-6 border-b bg-white sticky top-0 z-20">
          <SheetTitle className="flex items-center justify-between text-[#3e938a]">
            <div className="flex items-center gap-3 uppercase tracking-widest text-xs font-black">
              <Settings2 size={18} /> RSVP Settings: Momenku
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full"
            >
              <X size={20} />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          <section className="space-y-4">
            <div className="p-5 rounded-4xl border bg-white flex items-center justify-between shadow-sm border-slate-100">
              <Label className="font-bold text-slate-700">Fitur RSVP</Label>
              <Switch
                checked={data.rsvp_settings.rsvp_status === 1}
                onCheckedChange={(val) =>
                  setData({
                    ...data,
                    rsvp_settings: {
                      ...data.rsvp_settings,
                      rsvp_status: val ? 1 : 0,
                    },
                  })
                }
                className="data-[state=checked]:bg-[#3e938a]"
              />
            </div>
          </section>

          <section className="space-y-4">
            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
              Kolom Form Bawaan
            </Label>
            <div className="grid gap-4">
              {data.rsvp_settings.inputs.map(renderFieldItem)}
            </div>
          </section>

          <section className="space-y-4">
            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
              Kolom Form Kustom
            </Label>
            <div className="grid gap-4">
              {(data.rsvp_settings.custom_inputs || []).map(renderFieldItem)}
            </div>
            <Button
              variant="outline"
              onClick={addCustomInput}
              className="w-full rounded-3xl border-dashed border-2 h-14 text-slate-500 gap-3 font-bold hover:bg-[#3e938a]/5 hover:border-[#3e938a]/30 transition-all"
            >
              <Plus size={20} /> Tambah Pertanyaan Kustom
            </Button>
          </section>
        </div>

        <div className="p-6 bg-white border-t sticky bottom-0 z-20">
          <Button
            className="w-full bg-[#3e938a] hover:bg-[#2d6e67] text-white h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl disabled:opacity-50"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
