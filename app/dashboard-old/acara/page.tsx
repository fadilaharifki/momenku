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
import { Save, Plus, Trash2, MapPin, Clock, CalendarDays } from "lucide-react";

interface EventData {
  id: number;
  name: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  address: string;
  mapsUrl: string;
  notes: string;
}

export default function AcaraPage() {
  const [events, setEvents] = useState<EventData[]>([
    {
      id: 1,
      name: "Akad Nikah",
      date: "",
      timeStart: "",
      timeEnd: "",
      location: "",
      address: "",
      mapsUrl: "",
      notes: "",
    },
    {
      id: 2,
      name: "Resepsi",
      date: "",
      timeStart: "",
      timeEnd: "",
      location: "",
      address: "",
      mapsUrl: "",
      notes: "",
    },
  ]);
  const [showCountdown, setShowCountdown] = useState(true);

  const updateEvent = (id: number, field: keyof EventData, value: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    );
  };

  const addEvent = () => {
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        date: "",
        timeStart: "",
        timeEnd: "",
        location: "",
        address: "",
        mapsUrl: "",
        notes: "",
      },
    ]);
  };

  const removeEvent = (id: number) => {
    if (events.length > 1) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Data Acara</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Atur jadwal dan lokasi acara pernikahan Anda
        </p>
      </div>

      {/* Countdown toggle */}
      <Card className="border-border bg-card">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-foreground">
              Tampilkan Countdown
            </p>
            <p className="text-xs text-muted-foreground">
              Tampilkan hitung mundur ke hari pernikahan di undangan
            </p>
          </div>
          <Switch checked={showCountdown} onCheckedChange={setShowCountdown} />
        </CardContent>
      </Card>

      {/* Events */}
      <div className="flex flex-col gap-6">
        {events.map((event, idx) => (
          <Card key={event.id} className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">
                    Acara {idx + 1}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Detail jadwal dan lokasi
                  </CardDescription>
                </div>
                {events.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeEvent(event.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Nama Acara</Label>
                <Input
                  placeholder="Contoh: Akad Nikah, Resepsi, dll."
                  value={event.name}
                  onChange={(e) =>
                    updateEvent(event.id, "name", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="flex items-center gap-1.5 text-foreground">
                    <CalendarDays className="size-3.5" /> Tanggal
                  </Label>
                  <Input
                    type="date"
                    value={event.date}
                    onChange={(e) =>
                      updateEvent(event.id, "date", e.target.value)
                    }
                    className="border-border bg-secondary text-foreground"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="flex items-center gap-1.5 text-foreground">
                    <Clock className="size-3.5" /> Waktu Mulai
                  </Label>
                  <Input
                    type="time"
                    value={event.timeStart}
                    onChange={(e) =>
                      updateEvent(event.id, "timeStart", e.target.value)
                    }
                    className="border-border bg-secondary text-foreground"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="flex items-center gap-1.5 text-foreground">
                    <Clock className="size-3.5" /> Waktu Selesai
                  </Label>
                  <Input
                    type="time"
                    value={event.timeEnd}
                    onChange={(e) =>
                      updateEvent(event.id, "timeEnd", e.target.value)
                    }
                    className="border-border bg-secondary text-foreground"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="flex items-center gap-1.5 text-foreground">
                  <MapPin className="size-3.5" /> Nama Tempat / Gedung
                </Label>
                <Input
                  placeholder="Contoh: Hotel Grand Mercure Jakarta"
                  value={event.location}
                  onChange={(e) =>
                    updateEvent(event.id, "location", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Alamat Lengkap</Label>
                <Textarea
                  placeholder="Jl. ..."
                  value={event.address}
                  onChange={(e) =>
                    updateEvent(event.id, "address", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  rows={2}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Link Google Maps</Label>
                <Input
                  placeholder="https://maps.google.com/..."
                  value={event.mapsUrl}
                  onChange={(e) =>
                    updateEvent(event.id, "mapsUrl", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Catatan Tambahan</Label>
                <Textarea
                  placeholder="Informasi tambahan, seperti dresscode, parkir, dll."
                  value={event.notes}
                  onChange={(e) =>
                    updateEvent(event.id, "notes", e.target.value)
                  }
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full border-dashed border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
        onClick={addEvent}
      >
        <Plus className="mr-2 size-4" />
        Tambah Acara
      </Button>

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
