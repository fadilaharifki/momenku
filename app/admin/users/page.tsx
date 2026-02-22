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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  Trash2,
  Download,
  Users,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const usersData = [
  {
    id: 1,
    name: "Ahmad Rizki",
    email: "ahmad@email.com",
    phone: "081234567890",
    plan: "Gold",
    status: "active",
    invitations: 1,
    registered: "15 Feb 2026",
    lastLogin: "Hari ini",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti@email.com",
    phone: "081234567891",
    plan: "Platinum",
    status: "active",
    invitations: 2,
    registered: "10 Feb 2026",
    lastLogin: "Kemarin",
  },
  {
    id: 3,
    name: "Dimas Prasetyo",
    email: "dimas@email.com",
    phone: "081234567892",
    plan: "Silver",
    status: "active",
    invitations: 1,
    registered: "8 Feb 2026",
    lastLogin: "3 hari lalu",
  },
  {
    id: 4,
    name: "Maya Indah",
    email: "maya@email.com",
    phone: "081234567893",
    plan: "Free Trial",
    status: "trial",
    invitations: 0,
    registered: "5 Feb 2026",
    lastLogin: "1 minggu lalu",
  },
  {
    id: 5,
    name: "Rudi Hermawan",
    email: "rudi@email.com",
    phone: "081234567894",
    plan: "Gold",
    status: "active",
    invitations: 1,
    registered: "1 Feb 2026",
    lastLogin: "2 hari lalu",
  },
  {
    id: 6,
    name: "Anisa Putri",
    email: "anisa@email.com",
    phone: "081234567895",
    plan: "Gold",
    status: "suspended",
    invitations: 1,
    registered: "28 Jan 2026",
    lastLogin: "2 minggu lalu",
  },
  {
    id: 7,
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "081234567896",
    plan: "Silver",
    status: "active",
    invitations: 1,
    registered: "20 Jan 2026",
    lastLogin: "Kemarin",
  },
  {
    id: 8,
    name: "Dewi Lestari",
    email: "dewi@email.com",
    phone: "081234567897",
    plan: "Platinum",
    status: "active",
    invitations: 3,
    registered: "15 Jan 2026",
    lastLogin: "Hari ini",
  },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = usersData.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "all" || u.plan === filterPlan;
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchPlan && matchStatus;
  });

  const activeCount = usersData.filter((u) => u.status === "active").length;
  const trialCount = usersData.filter((u) => u.status === "trial").length;
  const suspendedCount = usersData.filter(
    (u) => u.status === "suspended",
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Kelola User</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola semua pengguna terdaftar di platform MomenKu
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Users className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {usersData.length}
              </p>
              <p className="text-xs text-muted-foreground">Total User</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
              <UserCheck className="size-5 text-green-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{activeCount}</p>
              <p className="text-xs text-muted-foreground">Aktif</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
              <UserPlus className="size-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{trialCount}</p>
              <p className="text-xs text-muted-foreground">Trial</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
              <UserX className="size-5 text-red-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {suspendedCount}
              </p>
              <p className="text-xs text-muted-foreground">Suspended</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-border bg-secondary pl-9 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-full md:w-[150px] border-border bg-secondary text-foreground">
                <SelectValue placeholder="Paket" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Semua Paket</SelectItem>
                <SelectItem value="Free Trial">Free Trial</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[150px] border-border bg-secondary text-foreground">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground hover:bg-secondary"
            >
              <Download className="mr-2 size-3" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Daftar User</CardTitle>
          <CardDescription className="text-muted-foreground">
            {filtered.length} user ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Paket</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">
                  Undangan
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Terdaftar
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Login Terakhir
                </TableHead>
                <TableHead className="text-muted-foreground sr-only">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-xs font-medium text-primary">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary text-xs"
                    >
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === "active"
                          ? "bg-green-500/10 text-green-500 border-green-500/20 text-xs"
                          : user.status === "trial"
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs"
                            : "bg-red-500/10 text-red-500 border-red-500/20 text-xs"
                      }
                    >
                      {user.status === "active"
                        ? "Aktif"
                        : user.status === "trial"
                          ? "Trial"
                          : "Suspended"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {user.invitations}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {user.registered}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-card border-border"
                      >
                        <DropdownMenuItem className="text-foreground focus:bg-secondary focus:text-foreground">
                          <Eye className="mr-2 size-3" /> Detail User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem className="text-yellow-500 focus:bg-yellow-500/10 focus:text-yellow-500">
                          <Ban className="mr-2 size-3" /> Suspend
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                          <Trash2 className="mr-2 size-3" /> Hapus User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
