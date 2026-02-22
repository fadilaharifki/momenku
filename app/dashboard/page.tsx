"use client";

import { Users, MousePointer2, MailCheck, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Undangan",
      value: "12",
      color: "bg-blue-500",
      icon: MailCheck,
    },
    {
      label: "Total Pengunjung",
      value: "1,240",
      color: "bg-primary", // Sage Green
      icon: MousePointer2,
    },
    {
      label: "Total RSVP",
      value: "856",
      color: "bg-accent", // Gold
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Message */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Ringkasan Statistik
          </h2>
          <p className="text-sm text-muted-foreground font-medium">
            Pantau performa undangan digital Anda secara real-time.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden bg-card p-6 rounded-3xl border border-border shadow-sm transition-all hover:shadow-md hover:border-primary/30"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-bold text-muted-foreground tracking-tight mb-1 uppercase">
                  {stat.label}
                </p>
                <p className="text-3xl font-extrabold text-foreground tracking-tighter">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 text-foreground`}
              >
                <stat.icon
                  size={20}
                  className={
                    stat.label === "Total RSVP" ? "text-accent" : "text-primary"
                  }
                />
              </div>
            </div>

            {/* Decorative Bar */}
            <div className="relative h-1.5 w-full bg-secondary rounded-full mt-6 overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full w-2/3 rounded-full ${stat.color} opacity-80`}
              />
            </div>
          </div>
        ))}

        {/* Chart Placeholder */}
        <div className="md:col-span-3 bg-card p-8 rounded-3xl border border-border min-h-[350px] flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
          <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-foreground font-bold italic">
              Grafik Analitik Kunjungan
            </p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Data statistik kunjungan harian Anda akan divisualisasikan di sini
              dalam bentuk grafik interaktif.
            </p>
          </div>

          {/* Mockup Line Decor */}
          <div className="w-full max-w-lg h-24 flex items-end gap-2 px-4 opacity-20">
            {[40, 70, 45, 90, 65, 80, 50, 85, 100, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-primary rounded-t-md"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
