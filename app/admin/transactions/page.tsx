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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Download,
  MoreHorizontal,
  Eye,
  CheckCircle2,
  XCircle,
  DollarSign,
  TrendingUp,
  CreditCard,
  Clock,
} from "lucide-react";

const transactions = [
  {
    id: "INV-001",
    user: "Ahmad Rizki",
    email: "ahmad@email.com",
    plan: "Gold",
    amount: "Rp 199.000",
    method: "BCA Transfer",
    status: "success",
    date: "21 Feb 2026",
    time: "10:30",
  },
  {
    id: "INV-002",
    user: "Siti Nurhaliza",
    email: "siti@email.com",
    plan: "Platinum",
    amount: "Rp 349.000",
    method: "Mandiri Transfer",
    status: "success",
    date: "21 Feb 2026",
    time: "09:15",
  },
  {
    id: "INV-003",
    user: "Dimas Prasetyo",
    email: "dimas@email.com",
    plan: "Silver",
    amount: "Rp 99.000",
    method: "GoPay",
    status: "pending",
    date: "20 Feb 2026",
    time: "18:45",
  },
  {
    id: "INV-004",
    user: "Maya Indah",
    email: "maya@email.com",
    plan: "Gold",
    amount: "Rp 199.000",
    method: "DANA",
    status: "success",
    date: "20 Feb 2026",
    time: "14:20",
  },
  {
    id: "INV-005",
    user: "Rudi Hermawan",
    email: "rudi@email.com",
    plan: "Gold",
    amount: "Rp 199.000",
    method: "BNI Transfer",
    status: "failed",
    date: "19 Feb 2026",
    time: "11:00",
  },
  {
    id: "INV-006",
    user: "Anisa Putri",
    email: "anisa@email.com",
    plan: "Platinum",
    amount: "Rp 349.000",
    method: "BCA Transfer",
    status: "success",
    date: "19 Feb 2026",
    time: "08:30",
  },
  {
    id: "INV-007",
    user: "Budi Santoso",
    email: "budi@email.com",
    plan: "Silver",
    amount: "Rp 99.000",
    method: "OVO",
    status: "success",
    date: "18 Feb 2026",
    time: "16:15",
  },
  {
    id: "INV-008",
    user: "Dewi Lestari",
    email: "dewi@email.com",
    plan: "Gold",
    amount: "Rp 199.000",
    method: "Mandiri Transfer",
    status: "pending",
    date: "18 Feb 2026",
    time: "10:00",
  },
];

export default function AdminTransactionsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");

  const filtered = transactions.filter((tx) => {
    const matchSearch =
      tx.user.toLowerCase().includes(search.toLowerCase()) ||
      tx.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || tx.status === filterStatus;
    const matchPlan = filterPlan === "all" || tx.plan === filterPlan;
    return matchSearch && matchStatus && matchPlan;
  });

  const totalRevenue = "Rp 42.5 jt";
  const successCount = transactions.filter(
    (t) => t.status === "success",
  ).length;
  const pendingCount = transactions.filter(
    (t) => t.status === "pending",
  ).length;
  const failedCount = transactions.filter((t) => t.status === "failed").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Transaksi</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola semua transaksi pembayaran pengguna
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <DollarSign className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {totalRevenue}
              </p>
              <p className="text-xs text-muted-foreground">Total Pendapatan</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
              <CheckCircle2 className="size-5 text-green-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {successCount}
              </p>
              <p className="text-xs text-muted-foreground">Sukses</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
              <Clock className="size-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {pendingCount}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
              <XCircle className="size-5 text-red-500" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{failedCount}</p>
              <p className="text-xs text-muted-foreground">Gagal</p>
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
                placeholder="Cari ID transaksi atau nama user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-border bg-secondary pl-9 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[150px] border-border bg-secondary text-foreground">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="success">Sukses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Gagal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-full md:w-[150px] border-border bg-secondary text-foreground">
                <SelectValue placeholder="Paket" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Semua Paket</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Platinum">Platinum</SelectItem>
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

      {/* Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Daftar Transaksi</CardTitle>
          <CardDescription className="text-muted-foreground">
            {filtered.length} transaksi ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Paket</TableHead>
                <TableHead className="text-muted-foreground">Jumlah</TableHead>
                <TableHead className="text-muted-foreground">Metode</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Tanggal</TableHead>
                <TableHead className="text-muted-foreground sr-only">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((tx) => (
                <TableRow key={tx.id} className="border-border">
                  <TableCell className="font-mono text-xs text-primary">
                    {tx.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {tx.user}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tx.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-primary text-xs"
                    >
                      {tx.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {tx.amount}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {tx.method}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {tx.date} {tx.time}
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
                          <Eye className="mr-2 size-3" /> Detail
                        </DropdownMenuItem>
                        {tx.status === "pending" && (
                          <>
                            <DropdownMenuItem className="text-green-500 focus:bg-green-500/10 focus:text-green-500">
                              <CheckCircle2 className="mr-2 size-3" />{" "}
                              Konfirmasi
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500">
                              <XCircle className="mr-2 size-3" /> Tolak
                            </DropdownMenuItem>
                          </>
                        )}
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
