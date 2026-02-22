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
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Eye,
  MessageSquareHeart,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  CalendarHeart,
  ImageIcon,
  Music,
  Gift,
  Palette,
} from "lucide-react";

const stats = [
  {
    label: "Total Dilihat",
    value: "1,248",
    icon: Eye,
    change: "+12% minggu ini",
  },
  {
    label: "Ucapan Masuk",
    value: "87",
    icon: MessageSquareHeart,
    change: "+5 hari ini",
  },
  {
    label: "Tamu RSVP",
    value: "142",
    icon: Users,
    change: "dari 200 undangan",
  },
];

const setupSteps = [
  {
    title: "Pilih Template",
    href: "/dashboard/template",
    icon: Palette,
    done: true,
  },
  {
    title: "Data Mempelai",
    href: "/dashboard/mempelai",
    icon: Users,
    done: true,
  },
  {
    title: "Data Acara",
    href: "/dashboard/acara",
    icon: CalendarHeart,
    done: false,
  },
  {
    title: "Galeri Foto",
    href: "/dashboard/galeri",
    icon: ImageIcon,
    done: false,
  },
  { title: "Musik", href: "/dashboard/musik", icon: Music, done: false },
  {
    title: "Amplop Digital",
    href: "/dashboard/amplop",
    icon: Gift,
    done: false,
  },
];

const recentMessages = [
  {
    name: "Budi Santoso",
    message: "Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah...",
    time: "5 menit lalu",
  },
  {
    name: "Siti Rahayu",
    message: "Bahagia selalu ya! InsyaAllah hadir di hari bahagia kalian.",
    time: "1 jam lalu",
  },
  {
    name: "Dimas Prasetyo",
    message: "Congratulations! Semoga langgeng sampai Jannah.",
    time: "3 jam lalu",
  },
  {
    name: "Anisa Putri",
    message: "MasyaAllah, turut bahagia! Semoga sakinah mawaddah...",
    time: "5 jam lalu",
  },
];

export default function DashboardPage() {
  const completedSteps = setupSteps.filter((s) => s.done).length;
  const progressPercent = (completedSteps / setupSteps.length) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className=" text-2xl font-bold text-foreground">
              Selamat Datang, Ahmad!
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Undangan pernikahan kamu sudah aktif. Lengkapi semua data untuk
              hasil maksimal.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <Link href="/dashboard/preview">
                <Eye className="mr-2 size-4" />
                Preview
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Bagikan Undangan
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-primary">{stat.change}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="size-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Setup progress + recent messages */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Setup progress */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">
                  Kelengkapan Undangan
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {completedSteps} dari {setupSteps.length} langkah selesai
                </CardDescription>
              </div>
              <span className="text-2xl font-bold text-primary">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <Progress value={progressPercent} className="mt-2 h-2" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {setupSteps.map((step) => (
                <Link
                  key={step.title}
                  href={step.href}
                  className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-secondary"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      step.done ? "bg-primary/20" : "bg-secondary"
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle2 className="size-4 text-primary" />
                    ) : (
                      <step.icon className="size-4 text-muted-foreground" />
                    )}
                  </div>
                  <span
                    className={`flex-1 text-sm ${
                      step.done
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.done ? (
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary text-xs"
                    >
                      Selesai
                    </Badge>
                  ) : (
                    <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent messages */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">
                  Ucapan Terbaru
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Ucapan dan doa dari tamu undangan
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary hover:bg-primary/10"
                asChild
              >
                <Link href="/dashboard/rsvp">Lihat Semua</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {recentMessages.map((msg, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs font-medium text-primary">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {msg.name}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {msg.time}
                      </div>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick info */}
      <Card className="border-border bg-card">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Tips: Lengkapi semua data undangan
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Undangan yang lengkap dengan foto, musik, dan informasi acara
                akan mendapat lebih banyak respons dari tamu. Jangan lupa untuk
                mengaktifkan fitur RSVP agar memudahkan pendataan tamu.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
