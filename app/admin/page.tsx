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
  Users,
  CreditCard,
  Palette,
  TrendingUp,
  Eye,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Clock,
} from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "1,284",
    icon: Users,
    change: "+48",
    changeType: "up",
    period: "bulan ini",
  },
  {
    label: "Total Transaksi",
    value: "Rp 42.5 jt",
    icon: DollarSign,
    change: "+12%",
    changeType: "up",
    period: "bulan ini",
  },
  {
    label: "Template Aktif",
    value: "12",
    icon: Palette,
    change: "+2",
    changeType: "up",
    period: "bulan ini",
  },
  {
    label: "Total Views",
    value: "156K",
    icon: Eye,
    change: "+28%",
    changeType: "up",
    period: "bulan ini",
  },
];

const recentTransactions = [
  {
    user: "Ahmad Rizki",
    email: "ahmad@email.com",
    plan: "Gold",
    amount: "Rp 199.000",
    status: "success",
    time: "10 menit lalu",
  },
  {
    user: "Siti Nurhaliza",
    email: "siti@email.com",
    plan: "Platinum",
    amount: "Rp 349.000",
    status: "success",
    time: "1 jam lalu",
  },
  {
    user: "Dimas Prasetyo",
    email: "dimas@email.com",
    plan: "Silver",
    amount: "Rp 99.000",
    status: "pending",
    time: "2 jam lalu",
  },
  {
    user: "Maya Indah",
    email: "maya@email.com",
    plan: "Gold",
    amount: "Rp 199.000",
    status: "success",
    time: "3 jam lalu",
  },
  {
    user: "Rudi Hermawan",
    email: "rudi@email.com",
    plan: "Gold",
    amount: "Rp 199.000",
    status: "failed",
    time: "5 jam lalu",
  },
];

const recentUsers = [
  {
    name: "Ahmad Rizki",
    email: "ahmad@email.com",
    plan: "Gold",
    registered: "10 menit lalu",
    status: "active",
  },
  {
    name: "Siti Nurhaliza",
    email: "siti@email.com",
    plan: "Platinum",
    registered: "1 jam lalu",
    status: "active",
  },
  {
    name: "Dimas Prasetyo",
    email: "dimas@email.com",
    plan: "Silver",
    registered: "3 jam lalu",
    status: "active",
  },
  {
    name: "Maya Indah",
    email: "maya@email.com",
    plan: "Free Trial",
    registered: "5 jam lalu",
    status: "trial",
  },
  {
    name: "Rudi Hermawan",
    email: "rudi@email.com",
    plan: "Gold",
    registered: "1 hari lalu",
    status: "active",
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Dashboard Admin</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ringkasan aktivitas platform MomenKu
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="size-5 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${stat.changeType === "up" ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.changeType === "up" ? (
                    <ArrowUp className="size-3" />
                  ) : (
                    <ArrowDown className="size-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.label} - {stat.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent activity grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent transactions */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Transaksi Terbaru</CardTitle>
            <CardDescription className="text-muted-foreground">
              5 transaksi terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {recentTransactions.map((tx, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-foreground">
                      {tx.user}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {tx.plan}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {tx.amount}
                    </p>
                    <Badge
                      className={
                        tx.status === "success"
                          ? "bg-green-500/10 text-green-500 border-green-500/20 text-xs"
                          : tx.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs"
                            : "bg-red-500/10 text-red-500 border-red-500/20 text-xs"
                      }
                    >
                      {tx.status === "success"
                        ? "Sukses"
                        : tx.status === "pending"
                          ? "Pending"
                          : "Gagal"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent users */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">User Terbaru</CardTitle>
            <CardDescription className="text-muted-foreground">
              User yang baru mendaftar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {recentUsers.map((user, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-medium text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary text-xs"
                    >
                      {user.plan}
                    </Badge>
                    <div className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {user.registered}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue chart placeholder */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="size-4 text-primary" /> Grafik Pendapatan
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Pendapatan 6 bulan terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-48">
            {[
              { month: "Sep", value: 65 },
              { month: "Okt", value: 80 },
              { month: "Nov", value: 55 },
              { month: "Des", value: 90 },
              { month: "Jan", value: 75 },
              { month: "Feb", value: 100 },
            ].map((bar) => (
              <div
                key={bar.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-md bg-primary/20 transition-all hover:bg-primary/40"
                  style={{ height: `${bar.value}%` }}
                >
                  <div
                    className="w-full rounded-t-md bg-primary"
                    style={{ height: `${bar.value * 0.7}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
