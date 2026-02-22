"use client";

import {
  Search,
  Filter,
  MoreVertical,
  Image as ImageIcon,
  Plus,
  AlertCircle,
  Pencil,
  Users,
  Eye,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Shadcn UI Components
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function InvitationsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-poppins">
      {/* Alert Banner menggunakan Shadcn Alert */}
      <Alert className="bg-primary/10 border-primary/20 rounded-2xl shadow-sm">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm font-semibold text-primary flex justify-between items-center w-full">
          <span>
            Segera lengkapi informasi profil Kamu untuk fitur maksimal.
          </span>
          <Button
            variant="link"
            className="text-primary font-bold p-0 h-auto underline"
            onClick={() => router.push("/dashboard/profile")}
          >
            Klik Disini!
          </Button>
        </AlertDescription>
      </Alert>

      {/* Filter & Search Section */}
      <div className="w-full">
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-2 w-full shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
          {/* Label Filter */}
          <div className="flex items-center gap-2 border-r border-border pr-4 shrink-0">
            <Filter size={18} className="text-primary" />
            <span className="text-sm font-bold text-foreground hidden md:inline">
              Filter
            </span>
          </div>

          {/* Input Pencarian Full Width */}
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Cari undangan Anda berdasarkan nama atau kategori..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-medium h-10 w-full pl-0 pr-10"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-secondary/50 rounded-lg text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Invitation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Undangan */}
        <Card className="bg-card border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden rounded-3xl">
          <CardContent className="p-6">
            {/* Decorative Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />

            <div className="flex items-start gap-5">
              {/* Thumbnail */}
              <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 shadow-inner shrink-0">
                <ImageIcon size={28} strokeWidth={1.5} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-lg tracking-tight truncate group-hover:text-primary transition-colors">
                  Undangan Pernikahan
                </h3>
                <p className="text-[11px] font-bold text-muted-foreground mt-1 tracking-widest uppercase italic">
                  21 Februari 2026
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-0 text-[10px] font-extrabold px-2 py-0.5"
                  >
                    BABY ELEPHANT
                  </Badge>
                  <Badge className="bg-accent/10 text-accent border-0 text-[10px] font-extrabold px-2 py-0.5 hover:bg-accent/20">
                    ACTIVE
                  </Badge>
                </div>
              </div>

              {/* Dropdown Menu Shadcn */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <MoreVertical size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-xl w-48 font-poppins"
                >
                  <DropdownMenuLabel className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    Opsi Undangan
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 cursor-pointer font-semibold py-2">
                    <Eye size={16} /> Lihat Undangan
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer font-semibold py-2">
                    <Pencil size={16} /> Edit Detail
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 cursor-pointer font-semibold py-2 text-red-500 focus:text-red-500">
                    <Trash2 size={16} /> Hapus Undangan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Quick Actions Buttons */}
            <div className="mt-8 flex gap-3">
              <Button
                variant="secondary"
                className="flex-1 h-9 text-[11px] font-bold rounded-xl gap-2 transition-all hover:bg-primary hover:text-white"
              >
                <Pencil size={14} /> Edit Desain
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-9 text-[11px] font-bold rounded-xl gap-2 border-border text-muted-foreground hover:bg-secondary"
              >
                <Users size={14} /> Lihat Tamu
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Empty State Card */}
        <Card
          className="group border-2 border-dashed border-border bg-transparent rounded-3xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer min-h-[220px]"
          onClick={() => router.push("/#template")}
        >
          <CardContent className="h-full flex flex-col items-center justify-center p-6 gap-3">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
              <Plus size={24} />
            </div>
            <p className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
              Tambah Undangan Baru
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
