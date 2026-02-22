"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Upload, Save } from "lucide-react";

export default function MempelaiPage() {
  const [form, setForm] = useState({
    groomFullName: "",
    groomNickname: "",
    groomFatherName: "",
    groomMotherName: "",
    groomChildOrder: "",
    groomBio: "",
    brideFullName: "",
    brideNickname: "",
    brideFatherName: "",
    brideMotherName: "",
    brideChildOrder: "",
    brideBio: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Data Mempelai</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Lengkapi informasi mempelai pria dan wanita
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Mempelai Pria */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Mempelai Pria</CardTitle>
            <CardDescription className="text-muted-foreground">
              Informasi calon pengantin pria
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary">
                <Upload className="size-6 text-muted-foreground" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-secondary"
              >
                Upload Foto
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Nama Lengkap</Label>
              <Input
                placeholder="Contoh: Ahmad Rizki Pratama, S.Kom"
                value={form.groomFullName}
                onChange={(e) => handleChange("groomFullName", e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Nama Panggilan</Label>
              <Input
                placeholder="Contoh: Rizki"
                value={form.groomNickname}
                onChange={(e) => handleChange("groomNickname", e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Nama Ayah</Label>
                <Input
                  placeholder="Bapak ..."
                  value={form.groomFatherName}
                  onChange={(e) =>
                    handleChange("groomFatherName", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Nama Ibu</Label>
                <Input
                  placeholder="Ibu ..."
                  value={form.groomMotherName}
                  onChange={(e) =>
                    handleChange("groomMotherName", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Anak ke-</Label>
              <Input
                placeholder="Contoh: Pertama"
                value={form.groomChildOrder}
                onChange={(e) =>
                  handleChange("groomChildOrder", e.target.value)
                }
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Bio / Deskripsi Singkat</Label>
              <Textarea
                placeholder="Tuliskan deskripsi singkat tentang mempelai pria..."
                value={form.groomBio}
                onChange={(e) => handleChange("groomBio", e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Mempelai Wanita */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Mempelai Wanita</CardTitle>
            <CardDescription className="text-muted-foreground">
              Informasi calon pengantin wanita
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary">
                <Upload className="size-6 text-muted-foreground" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-secondary"
              >
                Upload Foto
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Nama Lengkap</Label>
              <Input
                placeholder="Contoh: Siti Nurhaliza, S.Pd"
                value={form.brideFullName}
                onChange={(e) => handleChange("brideFullName", e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Nama Panggilan</Label>
              <Input
                placeholder="Contoh: Haliza"
                value={form.brideNickname}
                onChange={(e) => handleChange("brideNickname", e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Nama Ayah</Label>
                <Input
                  placeholder="Bapak ..."
                  value={form.brideFatherName}
                  onChange={(e) =>
                    handleChange("brideFatherName", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Nama Ibu</Label>
                <Input
                  placeholder="Ibu ..."
                  value={form.brideMotherName}
                  onChange={(e) =>
                    handleChange("brideMotherName", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Anak ke-</Label>
              <Input
                placeholder="Contoh: Kedua"
                value={form.brideChildOrder}
                onChange={(e) =>
                  handleChange("brideChildOrder", e.target.value)
                }
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Bio / Deskripsi Singkat</Label>
              <Textarea
                placeholder="Tuliskan deskripsi singkat tentang mempelai wanita..."
                value={form.brideBio}
                onChange={(e) => handleChange("brideBio", e.target.value)}
                className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary"
        >
          Batal
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="mr-2 size-4" />
          Simpan Data
        </Button>
      </div>
    </div>
  );
}
