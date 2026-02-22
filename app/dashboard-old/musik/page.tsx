"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Music, Play, Pause, Upload, Check } from "lucide-react";

const presetSongs = [
  {
    id: 1,
    title: "A Thousand Years",
    artist: "Christina Perri",
    duration: "4:45",
  },
  { id: 2, title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
  { id: 3, title: "All of Me", artist: "John Legend", duration: "4:29" },
  {
    id: 4,
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    duration: "3:00",
  },
  {
    id: 5,
    title: "Beautiful in White",
    artist: "Shane Filan",
    duration: "3:54",
  },
  { id: 6, title: "Menikahimu", artist: "Kahitna", duration: "4:12" },
];

export default function MusikPage() {
  const [autoplay, setAutoplay] = useState(true);
  const [selectedSong, setSelectedSong] = useState(1);
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Musik Latar</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pilih musik yang akan diputar saat tamu membuka undangan
        </p>
      </div>

      {/* Autoplay toggle */}
      <Card className="border-border bg-card">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-foreground">
              Autoplay Musik
            </p>
            <p className="text-xs text-muted-foreground">
              Musik otomatis diputar saat undangan dibuka
            </p>
          </div>
          <Switch checked={autoplay} onCheckedChange={setAutoplay} />
        </CardContent>
      </Card>

      {/* Preset songs */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Pilih dari Koleksi</CardTitle>
          <CardDescription className="text-muted-foreground">
            Lagu populer untuk undangan pernikahan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {presetSongs.map((song) => (
              <button
                key={song.id}
                onClick={() => setSelectedSong(song.id)}
                className={`flex items-center gap-4 rounded-lg border p-3 transition-all ${
                  selectedSong === song.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-secondary"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaying(playing === song.id ? null : song.id);
                  }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors hover:bg-primary/20"
                >
                  {playing === song.id ? (
                    <Pause className="size-4 text-primary" />
                  ) : (
                    <Play className="size-4 text-primary" />
                  )}
                </button>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">
                    {song.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{song.artist}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {song.duration}
                </span>
                {selectedSong === song.id && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                    <Check className="size-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom upload */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">
            Upload Musik Sendiri
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Format MP3, maks 10MB
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-xl border-2 border-dashed border-border p-6">
            <Music className="size-8 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Belum ada file yang dipilih
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-secondary"
            >
              <Upload className="mr-2 size-3" />
              Pilih File
            </Button>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-foreground">Judul Lagu (opsional)</Label>
            <Input
              placeholder="Masukkan judul lagu"
              className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
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
          Simpan Musik
        </Button>
      </div>
    </div>
  );
}
