"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Save,
  Download,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageSquare,
} from "lucide-react";

const rsvpData = [
  {
    name: "Budi Santoso",
    phone: "0812xxxx",
    attendance: "hadir",
    guests: 2,
    message: "Semoga bahagia selalu!",
    time: "2 jam lalu",
  },
  {
    name: "Siti Rahayu",
    phone: "0813xxxx",
    attendance: "hadir",
    guests: 3,
    message: "InsyaAllah hadir. Selamat ya!",
    time: "5 jam lalu",
  },
  {
    name: "Dimas Prasetyo",
    phone: "0857xxxx",
    attendance: "tidak_hadir",
    guests: 0,
    message: "Maaf tidak bisa hadir, semoga langgeng!",
    time: "1 hari lalu",
  },
  {
    name: "Anisa Putri",
    phone: "0878xxxx",
    attendance: "hadir",
    guests: 1,
    message: "MasyaAllah, turut bahagia!",
    time: "1 hari lalu",
  },
  {
    name: "Rudi Hermawan",
    phone: "0856xxxx",
    attendance: "ragu",
    guests: 0,
    message: "InsyaAllah kalau tidak ada halangan.",
    time: "2 hari lalu",
  },
  {
    name: "Maya Indah",
    phone: "0819xxxx",
    attendance: "hadir",
    guests: 2,
    message: "Selamat menempuh hidup baru!",
    time: "3 hari lalu",
  },
];

const messagesData = [
  {
    name: "Budi Santoso",
    message:
      "Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah mawaddah warahmah.",
    time: "2 jam lalu",
  },
  {
    name: "Siti Rahayu",
    message:
      "Bahagia selalu ya! InsyaAllah hadir di hari bahagia kalian. Semoga dilancarkan segala urusannya.",
    time: "5 jam lalu",
  },
  {
    name: "Dimas Prasetyo",
    message:
      "Congratulations! Semoga langgeng sampai Jannah. Maaf tidak bisa hadir tapi doa terbaik menyertai.",
    time: "1 hari lalu",
  },
  {
    name: "Anisa Putri",
    message:
      "MasyaAllah, turut bahagia! Semoga sakinah mawaddah warahmah. Semoga cepat dapat momongan.",
    time: "1 hari lalu",
  },
  {
    name: "Maya Indah",
    message:
      "Selamat untuk kalian berdua! Semoga Allah selalu memberkahi pernikahan ini. Aamiin.",
    time: "3 hari lalu",
  },
];

export default function RSVPPage() {
  const [showRsvp, setShowRsvp] = useState(true);
  const [showMessages, setShowMessages] = useState(true);

  const hadirCount = rsvpData.filter((r) => r.attendance === "hadir").length;
  const tidakHadirCount = rsvpData.filter(
    (r) => r.attendance === "tidak_hadir",
  ).length;
  const raguCount = rsvpData.filter((r) => r.attendance === "ragu").length;
  const totalGuests = rsvpData.reduce((acc, r) => acc + r.guests, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Ucapan & RSVP</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola konfirmasi kehadiran dan ucapan dari tamu undangan
        </p>
      </div>

      {/* Toggle cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-foreground">Fitur RSVP</p>
              <p className="text-xs text-muted-foreground">
                Tamu bisa konfirmasi kehadiran
              </p>
            </div>
            <Switch checked={showRsvp} onCheckedChange={setShowRsvp} />
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm font-medium text-foreground">
                Kolom Ucapan
              </p>
              <p className="text-xs text-muted-foreground">
                Tamu bisa kirim ucapan & doa
              </p>
            </div>
            <Switch checked={showMessages} onCheckedChange={setShowMessages} />
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="mx-auto size-6 text-green-500" />
            <p className="mt-2 text-2xl font-bold text-foreground">
              {hadirCount}
            </p>
            <p className="text-xs text-muted-foreground">Hadir</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <XCircle className="mx-auto size-6 text-red-500" />
            <p className="mt-2 text-2xl font-bold text-foreground">
              {tidakHadirCount}
            </p>
            <p className="text-xs text-muted-foreground">Tidak Hadir</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <HelpCircle className="mx-auto size-6 text-yellow-500" />
            <p className="mt-2 text-2xl font-bold text-foreground">
              {raguCount}
            </p>
            <p className="text-xs text-muted-foreground">Ragu-ragu</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="p-4 text-center">
            <MessageSquare className="mx-auto size-6 text-primary" />
            <p className="mt-2 text-2xl font-bold text-foreground">
              {totalGuests}
            </p>
            <p className="text-xs text-muted-foreground">Total Tamu</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="rsvp">
        <TabsList className="bg-secondary">
          <TabsTrigger
            value="rsvp"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            Daftar RSVP
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            Ucapan & Doa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rsvp">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">
                    Konfirmasi Kehadiran
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {rsvpData.length} respons tamu
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground hover:bg-secondary"
                >
                  <Download className="mr-2 size-3" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">
                      Nama
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      No. HP
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Jumlah Tamu
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Waktu
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rsvpData.map((row, i) => (
                    <TableRow key={i} className="border-border">
                      <TableCell className="font-medium text-foreground">
                        {row.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.phone}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            row.attendance === "hadir"
                              ? "default"
                              : row.attendance === "tidak_hadir"
                                ? "destructive"
                                : "outline"
                          }
                          className={
                            row.attendance === "hadir"
                              ? "bg-green-500/10 text-green-500 border-green-500/20"
                              : row.attendance === "tidak_hadir"
                                ? "bg-red-500/10 text-red-500 border-red-500/20"
                                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          }
                        >
                          {row.attendance === "hadir"
                            ? "Hadir"
                            : row.attendance === "tidak_hadir"
                              ? "Tidak Hadir"
                              : "Ragu-ragu"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground">
                        {row.guests} orang
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-foreground">Ucapan & Doa</CardTitle>
              <CardDescription className="text-muted-foreground">
                {messagesData.length} ucapan dari tamu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {messagesData.map((msg, i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xs font-medium text-primary">
                            {msg.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {msg.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {msg.time}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-3">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Save className="mr-2 size-4" />
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  );
}
