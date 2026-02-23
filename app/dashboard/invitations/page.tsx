"use client";

import { useState } from "react";
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
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

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
import { useGetInvitations } from "@/hooks/api/useGetInvitations";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useDebounce } from "@/hooks/use-debounce";

export default function InvitationsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const { data: response, isLoading } = useGetInvitations({
    keyword: debouncedSearch,
    limit: "all",
  });

  const invitations = response?.data || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-poppins">
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

      {/* Search Bar */}
      <div className="w-full">
        <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-2 w-full shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
          <div className="flex items-center gap-2 border-r border-border pr-4 shrink-0">
            <Filter size={18} className="text-primary" />
            <span className="text-sm font-bold text-foreground hidden md:inline">
              Filter
            </span>
          </div>

          <div className="relative flex-1">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari undangan Anda berdasarkan link atau judul..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-medium h-10 w-full pl-0 pr-10"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-lg text-muted-foreground transition-colors">
              {isLoading ? (
                <Loader2 size={18} className="animate-spin text-primary" />
              ) : (
                <Search size={18} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render List Undangan */}
        {invitations.map((item) => (
          <Card
            key={item.id}
            className="bg-card border-border hover:border-primary/40 hover:shadow-md transition-all group relative overflow-hidden rounded-2xl p-0" // Rounded dikecilkan ke 2xl
          >
            <CardContent className="p-2">
              {" "}
              {/* Padding dikurangi dari p-6 ke p-4 */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-full -mr-6 -mt-6 group-hover:bg-primary/10 transition-colors" />
              <div className="flex items-center gap-4">
                {" "}
                {/* Start gap dikurangi */}
                {/* Thumbnail Tema Lebih Kecil */}
                <div className="h-12 w-12 rounded-xl bg-secondary overflow-hidden flex items-center justify-center shadow-inner shrink-0 border border-border">
                  {item.cover_url ? (
                    <img
                      src={item.cover_url}
                      alt={item.domain}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      size={20} // Ikon lebih kecil
                      className="text-muted-foreground"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-base tracking-tight truncate group-hover:text-primary transition-colors">
                    {item.heading || item.domain}
                  </h3>

                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase italic">
                      {format(new Date(item.created_at), "dd MMM yyyy", {
                        locale: id,
                      })}
                    </p>
                    <span className="text-muted-foreground/30">•</span>
                    <Badge
                      className={`${item.is_active ? "text-accent" : "text-muted-foreground"} bg-transparent p-0 border-0 text-[9px] font-black uppercase`}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground shrink-0"
                    >
                      <MoreVertical size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl w-44 font-poppins"
                  >
                    <DropdownMenuItem
                      onClick={() => window.open(`/${item.domain}`, "_blank")}
                      className="gap-2 cursor-pointer text-sm py-2"
                    >
                      <Eye size={14} /> Lihat
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/dashboard/invitations/${item.id}`)
                      }
                      className="gap-2 cursor-pointer text-sm py-2"
                    >
                      <Pencil size={14} /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 cursor-pointer text-sm py-2 text-red-500">
                      <Trash2 size={14} /> Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {" "}
                {/* Link ditaruh di atas tombol */}
                <div className="bg-secondary/30 rounded-lg px-3 py-1.5 flex items-center justify-between border border-border/50">
                  <span className="text-[10px] font-medium text-muted-foreground truncate">
                    momenku.com/{item.domain}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[8px] h-4 px-1.5 uppercase font-bold border-primary/20 text-primary"
                  >
                    Link
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/invitations/${item.id}`)
                    }
                    variant="secondary"
                    className="flex-1 hover:bg-accent text-[10px] font-bold rounded-lg gap-2"
                  >
                    <Pencil size={12} /> Edit Desain
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-[10px] font-bold rounded-lg gap-2 border-border"
                  >
                    <Users size={12} /> Tamu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Card (Selalu muncul di akhir) */}
        {!isLoading && (
          <Card
            className="group border-2 border-dashed border-border bg-transparent rounded-3xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
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
        )}
      </div>
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-55 rounded-3xl bg-secondary/50 animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
}
