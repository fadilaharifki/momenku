"use client";

import { useState } from "react";
import {
  Settings2,
  Plus,
  Trash2,
  X,
  Sparkles,
  GripVertical,
  Pencil,
  Check,
} from "lucide-react";
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

export default function RSVPSettingEditor({
  isOpen,
  onClose,
  initialData,
  onSave,
}: any) {
  const [data, setData] = useState<any>(initialData);
  const [editingField, setEditingField] = useState<string | null>(null);

  const futureUnderDev = () => {
    toast.info("Fitur dalam pengembangan");
  };
  // --- Handlers ---
  const updateGlobalSetting = (key: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      rsvp_settings: { ...prev.rsvp_settings, [key]: value },
    }));
  };

  const addCustomInput = () => {
    futureUnderDev();
    // const newName = `pertanyaan_${Math.floor(Math.random() * 1000)}`;
    // const newField = {
    //   name: newName,
    //   type: "text",
    //   label: "Pertanyaan Baru",
    //   placeholder: "Pertanyaan Baru",
    //   required: false,
    //   is_disabled: false,
    //   is_published: true,
    //   is_custom: true,
    // };

    // setData((prev: any) => ({
    //   ...prev,
    //   rsvp_settings: {
    //     ...prev.rsvp_settings,
    //     inputs: [...prev.rsvp_settings.inputs, newField],
    //   },
    // }));
    // setEditingField(newName); // Langsung buka form edit untuk input baru
  };

  const updateFieldData = (name: string, key: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      rsvp_settings: {
        ...prev.rsvp_settings,
        inputs: prev.rsvp_settings.inputs.map((i: any) =>
          i.name === name ? { ...i, [key]: value } : i,
        ),
      },
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(data);
    }
  };

  const removeInput = (name: string) => {
    setData((prev: any) => ({
      ...prev,
      rsvp_settings: {
        ...prev.rsvp_settings,
        inputs: prev.rsvp_settings.inputs.filter((i: any) => i.name !== name),
      },
    }));
    setEditingField(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[95%] md:max-w-2xl p-0 border-none flex flex-col font-poppins bg-slate-50"
      >
        {/* HEADER */}
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
          {/* KONFIGURASI UMUM (Sesuai Gambar 2) */}
          <section className="space-y-4">
            <div className="p-5 rounded-4xl border bg-white flex items-center justify-between shadow-sm border-slate-100">
              <Label className="font-bold text-slate-700">Fitur RSVP</Label>
              <Switch
                checked={data.rsvp_status === 1}
                onCheckedChange={
                  (val) => futureUnderDev()
                  //   setData({ ...data, rsvp_status: val ? 1 : 0 })
                }
                className="data-[state=checked]:bg-[#3e938a]"
              />
            </div>
          </section>

          {/* LIST INPUTAN & CUSTOM INPUT FORM */}
          <section className="space-y-4">
            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
              Kolom Form & Custom Input
            </Label>

            <div className="grid gap-4">
              {data.rsvp_settings.inputs.map((input: any) => (
                <div key={input.name} className="space-y-3">
                  {/* Tampilan Baris Utama */}
                  <div
                    className={`p-4 bg-white border rounded-[1.5rem] flex items-center justify-between transition-all ${editingField === input.name ? "border-[#3e938a] ring-4 ring-[#3e938a]/5" : "border-slate-100"}`}
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
                          //   setEditingField(
                          //     editingField === input.name ? null : input.name,
                          //   )
                          futureUnderDev()
                        }
                      >
                        <Pencil size={14} />
                      </Button>
                      {input.name !== "name" && (
                        <Switch
                          checked={input.is_published}
                          onCheckedChange={
                            (val) => futureUnderDev()
                            // updateFieldData(input.name, "is_published", val)
                          }
                          className="scale-75 data-[state=checked]:bg-[#3e938a]"
                        />
                      )}
                    </div>
                  </div>

                  {/* FORM EDIT DETAIL (Sesuai Gambar 5) */}
                  {editingField === input.name && (
                    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
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
                          <Label className="text-xs font-bold text-slate-500">
                            Label
                          </Label>
                          <Input
                            className="col-span-2 rounded-xl"
                            value={input.label}
                            onChange={(e) =>
                              updateFieldData(
                                input.name,
                                "label",
                                e.target.value,
                              )
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
                              updateFieldData(
                                input.name,
                                "placeholder",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label className="text-xs font-bold text-slate-500">
                            Name
                          </Label>
                          <Input
                            className="col-span-2 rounded-xl bg-slate-50"
                            value={input.name}
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                          <Label className="text-xs font-bold text-slate-500">
                            Type
                          </Label>
                          <Select
                            value={input.type}
                            onValueChange={(val) =>
                              updateFieldData(input.name, "type", val)
                            }
                          >
                            <SelectTrigger className="col-span-2 rounded-xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">
                                Jawaban Singkat
                              </SelectItem>
                              <SelectItem value="textarea">Paragraf</SelectItem>
                              <SelectItem value="number">Angka</SelectItem>
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
                              updateFieldData(
                                input.name,
                                "required",
                                val === "ya",
                              )
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
                          className="w-full mt-6 text-rose-500 hover:bg-rose-50 rounded-xl font-bold text-xs"
                          onClick={() => removeInput(input.name)}
                        >
                          Hapus Pertanyaan
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <Button
            variant="outline"
            onClick={addCustomInput}
            className="w-full rounded-[1.5rem] border-dashed border-2 h-14 text-slate-500 gap-3 font-bold hover:bg-[#3e938a]/5 hover:border-[#3e938a]/30 transition-all"
          >
            <Plus size={20} /> Tambah Inputan
          </Button>
        </div>

        <div className="p-6 bg-white border-t sticky bottom-0 z-20">
          <Button
            className="w-full bg-[#3e938a] hover:bg-[#2d6e67] text-white h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl"
            onClick={handleSave}
          >
            Simpan Perubahan
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
