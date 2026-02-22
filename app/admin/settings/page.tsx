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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Globe, CreditCard, Mail, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "MomenKu",
    siteDescription: "Platform Undangan Digital Premium",
    siteUrl: "https://momenku.id",
    supportEmail: "support@momenku.id",
    supportWhatsapp: "081234567890",
    maintenanceMode: false,
    registrationOpen: true,
    trialDays: "7",
    midtransServerKey: "SB-Mid-server-xxxx",
    midtransClientKey: "SB-Mid-client-xxxx",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpEmail: "noreply@momenku.id",
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">
          Pengaturan Sistem
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Konfigurasi umum platform MomenKu
        </p>
      </div>

      {/* General settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="size-4" /> Pengaturan Umum
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Informasi dasar platform
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Nama Situs</Label>
              <Input
                value={settings.siteName}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, siteName: e.target.value }))
                }
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">URL Situs</Label>
              <Input
                value={settings.siteUrl}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, siteUrl: e.target.value }))
                }
                className="border-border bg-secondary text-foreground"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Deskripsi Situs</Label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) =>
                setSettings((s) => ({ ...s, siteDescription: e.target.value }))
              }
              className="border-border bg-secondary text-foreground"
              rows={2}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Email Support</Label>
              <Input
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, supportEmail: e.target.value }))
                }
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">WhatsApp Support</Label>
              <Input
                value={settings.supportWhatsapp}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    supportWhatsapp: e.target.value,
                  }))
                }
                className="border-border bg-secondary text-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access control */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="size-4" /> Kontrol Akses
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Kelola akses dan mode situs
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Mode Maintenance
              </p>
              <p className="text-xs text-muted-foreground">
                Menonaktifkan situs untuk pemeliharaan
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(v) =>
                setSettings((s) => ({ ...s, maintenanceMode: v }))
              }
            />
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Registrasi Terbuka
              </p>
              <p className="text-xs text-muted-foreground">
                Izinkan user baru untuk mendaftar
              </p>
            </div>
            <Switch
              checked={settings.registrationOpen}
              onCheckedChange={(v) =>
                setSettings((s) => ({ ...s, registrationOpen: v }))
              }
            />
          </div>
          <Separator className="bg-border" />
          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Masa Trial (Hari)</Label>
            <Input
              value={settings.trialDays}
              onChange={(e) =>
                setSettings((s) => ({ ...s, trialDays: e.target.value }))
              }
              className="w-32 border-border bg-secondary text-foreground"
              type="number"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment gateway */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CreditCard className="size-4" /> Payment Gateway
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Konfigurasi Midtrans
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Server Key</Label>
              <Input
                value={settings.midtransServerKey}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    midtransServerKey: e.target.value,
                  }))
                }
                className="border-border bg-secondary text-foreground font-mono text-xs"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Client Key</Label>
              <Input
                value={settings.midtransClientKey}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    midtransClientKey: e.target.value,
                  }))
                }
                className="border-border bg-secondary text-foreground font-mono text-xs"
                type="password"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email settings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Mail className="size-4" /> Pengaturan Email
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Konfigurasi SMTP untuk pengiriman email
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">SMTP Host</Label>
              <Input
                value={settings.smtpHost}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, smtpHost: e.target.value }))
                }
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">SMTP Port</Label>
              <Input
                value={settings.smtpPort}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, smtpPort: e.target.value }))
                }
                className="border-border bg-secondary text-foreground"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Email Pengirim</Label>
              <Input
                value={settings.smtpEmail}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, smtpEmail: e.target.value }))
                }
                className="border-border bg-secondary text-foreground"
              />
            </div>
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
