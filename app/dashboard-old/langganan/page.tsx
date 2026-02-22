"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Crown, ArrowUpRight } from "lucide-react";

const plans = [
  {
    name: "Silver",
    price: "Rp 99.000",
    current: false,
    features: [
      "1 Template Pilihan",
      "Unlimited Tamu",
      "RSVP Online",
      "Galeri 5 Foto",
      "Musik Latar",
      "Masa Aktif 3 Bulan",
    ],
  },
  {
    name: "Gold",
    price: "Rp 199.000",
    current: true,
    popular: true,
    features: [
      "Semua Template Premium",
      "Unlimited Tamu",
      "RSVP Online + Export",
      "Galeri 15 Foto",
      "Musik Custom",
      "Amplop Digital",
      "Custom Domain",
      "Masa Aktif 6 Bulan",
    ],
  },
  {
    name: "Platinum",
    price: "Rp 349.000",
    current: false,
    features: [
      "Semua Template + Exclusive",
      "Unlimited Tamu",
      "RSVP + Export + Analitik",
      "Galeri Unlimited",
      "Musik Custom",
      "Amplop Digital",
      "Custom Domain",
      "Video Undangan",
      "Priority Support",
      "Masa Aktif 12 Bulan",
    ],
  },
];

export default function LanggananPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Langganan</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola paket langganan Anda
        </p>
      </div>

      {/* Current plan */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Crown className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Paket Saat Ini: <span className="text-primary">Gold</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Aktif hingga 15 Agustus 2026
              </p>
            </div>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Aktif
          </Badge>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative border-2 transition-all ${
              plan.current
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  Paket Anda
                </Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className=" text-xl text-foreground">
                {plan.name}
              </CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold text-primary">
                  {plan.price}
                </span>
              </div>
              <CardDescription className="text-muted-foreground">
                Sekali bayar
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              {plan.current ? (
                <Button disabled className="w-full bg-primary/20 text-primary">
                  Paket Saat Ini
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  <ArrowUpRight className="mr-2 size-4" />
                  Upgrade
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment history */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Riwayat Pembayaran</CardTitle>
          <CardDescription className="text-muted-foreground">
            Daftar transaksi langganan Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Paket Gold
                </p>
                <p className="text-xs text-muted-foreground">
                  15 Februari 2026
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">Rp 199.000</p>
                <Badge className="mt-1 bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                  Lunas
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
