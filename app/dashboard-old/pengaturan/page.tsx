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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Globe, Lock, Bell } from "lucide-react";

export default function PengaturanPage() {
  const [settings, setSettings] = useState({
    slug: "rizki-haliza",
    password: "",
    passwordProtected: false,
    notifyEmail: true,
    notifyWhatsapp: true,
    showGuestCount: true,
    allowScreenshot: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Pengaturan</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Atur konfigurasi undangan digital Anda
        </p>
      </div>

      {/* URL Settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="size-4" /> URL Undangan
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Atur slug / alamat undangan Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Custom URL</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">momenku.id/</span>
              <Input
                value={settings.slug}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, slug: e.target.value }))
                }
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Gunakan huruf kecil, angka, dan tanda hubung saja
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lock className="size-4" /> Keamanan
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Proteksi undangan Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Password Undangan
              </p>
              <p className="text-xs text-muted-foreground">
                Tamu harus memasukkan password untuk membuka undangan
              </p>
            </div>
            <Switch
              checked={settings.passwordProtected}
              onCheckedChange={(v) =>
                setSettings((s) => ({ ...s, passwordProtected: v }))
              }
            />
          </div>
          {settings.passwordProtected && (
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Password</Label>
              <Input
                type="password"
                value={settings.password}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, password: e.target.value }))
                }
                className="border-border bg-secondary text-foreground"
                placeholder="Masukkan password"
              />
            </div>
          )}
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Izinkan Screenshot
              </p>
              <p className="text-xs text-muted-foreground">
                Tamu bisa screenshot undangan Anda
              </p>
            </div>
            <Switch
              checked={settings.allowScreenshot}
              onCheckedChange={(v) =>
                setSettings((s) => ({ ...s, allowScreenshot: v }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="size-4" /> Notifikasi
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Atur notifikasi saat ada respons dari tamu
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Notifikasi Email
              </p>
              <p className="text-xs text-muted-foreground">
                Kirim email saat ada RSVP atau ucapan baru
              </p>
            </div>
            <Switch
              checked={settings.notifyEmail}
              onCheckedChange={(v) =>
                setSettings((s) => ({ ...s, notifyEmail: v }))
              }
            />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Notifikasi WhatsApp
              </p>
              <p className="text-xs text-muted-foreground">
                Kirim WA saat ada RSVP atau ucapan baru
              </p>
            </div>
            <Switch
              checked={settings.notifyWhatsapp}
              onCheckedChange={(v) =>
                setSettings((s) => ({ ...s, notifyWhatsapp: v }))
              }
            />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Tampilkan Jumlah Tamu
              </p>
              <p className="text-xs text-muted-foreground">
                Tampilkan jumlah tamu yang sudah RSVP di undangan
              </p>
            </div>
            <Switch
              checked={settings.showGuestCount}
              onCheckedChange={(v) =>
                setSettings((s) => ({ ...s, showGuestCount: v }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary"
        >
          Batal
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="mr-2 size-4" />
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
}
