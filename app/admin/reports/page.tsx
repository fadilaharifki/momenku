"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Download,
  TrendingUp,
  Users,
  CreditCard,
  Palette,
  Eye,
  ArrowUp,
} from "lucide-react";

const monthlyData = [
  {
    month: "Sep 2025",
    users: 82,
    revenue: "Rp 12.8 jt",
    invitations: 65,
    views: "18K",
  },
  {
    month: "Okt 2025",
    users: 105,
    revenue: "Rp 18.2 jt",
    invitations: 88,
    views: "24K",
  },
  {
    month: "Nov 2025",
    users: 93,
    revenue: "Rp 15.5 jt",
    invitations: 72,
    views: "20K",
  },
  {
    month: "Des 2025",
    users: 148,
    revenue: "Rp 28.3 jt",
    invitations: 120,
    views: "38K",
  },
  {
    month: "Jan 2026",
    users: 124,
    revenue: "Rp 22.1 jt",
    invitations: 98,
    views: "32K",
  },
  {
    month: "Feb 2026",
    users: 156,
    revenue: "Rp 42.5 jt",
    invitations: 134,
    views: "56K",
  },
];

const topTemplates = [
  { name: "Modern Luxury", usage: 312, percentage: 42 },
  { name: "Elegant Gold", usage: 245, percentage: 33 },
  { name: "Rustic Garden", usage: 189, percentage: 25 },
];

const topPlans = [
  { name: "Gold", users: 520, revenue: "Rp 103.4 jt", percentage: 52 },
  { name: "Platinum", users: 284, revenue: "Rp 99.1 jt", percentage: 40 },
  { name: "Silver", users: 312, revenue: "Rp 30.8 jt", percentage: 8 },
];

export default function AdminReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className=" text-2xl font-bold text-foreground">Laporan</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Analisis dan laporan performa platform
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px] border-border bg-secondary text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="30days">30 Hari Terakhir</SelectItem>
              <SelectItem value="3months">3 Bulan Terakhir</SelectItem>
              <SelectItem value="6months">6 Bulan Terakhir</SelectItem>
              <SelectItem value="1year">1 Tahun</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-border text-foreground hover:bg-secondary"
          >
            <Download className="mr-2 size-4" /> Export
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Pendapatan",
            value: "Rp 139.4 jt",
            icon: TrendingUp,
            change: "+92%",
            color: "text-primary",
          },
          {
            label: "Total User",
            value: "1,284",
            icon: Users,
            change: "+65%",
            color: "text-green-500",
          },
          {
            label: "Template Terpopuler",
            value: "Modern Luxury",
            icon: Palette,
            change: "312 pengguna",
            color: "text-primary",
          },
          {
            label: "Total Pageviews",
            value: "188K",
            icon: Eye,
            change: "+45%",
            color: "text-primary",
          },
        ].map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <stat.icon className={`size-5 ${stat.color}`} />
                <span className="flex items-center gap-1 text-xs text-green-500">
                  <ArrowUp className="size-3" /> {stat.change}
                </span>
              </div>
              <p className="mt-3 text-xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Data Bulanan</CardTitle>
          <CardDescription className="text-muted-foreground">
            Performa per bulan selama 6 bulan terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left font-medium text-muted-foreground">
                    Bulan
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    User Baru
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    Pendapatan
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    Undangan Dibuat
                  </th>
                  <th className="pb-3 text-right font-medium text-muted-foreground">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row) => (
                  <tr key={row.month} className="border-b border-border">
                    <td className="py-3 font-medium text-foreground">
                      {row.month}
                    </td>
                    <td className="py-3 text-right text-foreground">
                      {row.users}
                    </td>
                    <td className="py-3 text-right font-semibold text-primary">
                      {row.revenue}
                    </td>
                    <td className="py-3 text-right text-foreground">
                      {row.invitations}
                    </td>
                    <td className="py-3 text-right text-foreground">
                      {row.views}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bottom grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top templates */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">
              Template Terpopuler
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Berdasarkan jumlah pengguna
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {topTemplates.map((tpl, i) => (
              <div key={tpl.name} className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {tpl.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {tpl.usage} users
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${tpl.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Plan distribution */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Distribusi Paket</CardTitle>
            <CardDescription className="text-muted-foreground">
              Berdasarkan pendapatan
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {topPlans.map((plan) => (
              <div
                key={plan.name}
                className="flex items-center gap-4 rounded-lg border border-border p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <CreditCard className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {plan.name}
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {plan.revenue}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {plan.users} users ({plan.percentage}% dari revenue)
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
