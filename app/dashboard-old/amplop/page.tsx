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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Save, Plus, Trash2, Wallet, CreditCard, Building } from "lucide-react";

interface BankAccount {
  id: number;
  bank: string;
  accountNumber: string;
  accountName: string;
}

const donationHistory = [
  {
    name: "Budi Santoso",
    amount: "Rp 500.000",
    method: "Transfer BCA",
    time: "2 jam lalu",
    confirmed: true,
  },
  {
    name: "Siti Rahayu",
    amount: "Rp 300.000",
    method: "Transfer Mandiri",
    time: "5 jam lalu",
    confirmed: true,
  },
  {
    name: "Dimas Prasetyo",
    amount: "Rp 200.000",
    method: "Transfer BCA",
    time: "1 hari lalu",
    confirmed: false,
  },
  {
    name: "Anisa Putri",
    amount: "Rp 1.000.000",
    method: "Transfer BNI",
    time: "2 hari lalu",
    confirmed: true,
  },
];

export default function AmplopPage() {
  const [enableDigitalEnvelope, setEnableDigitalEnvelope] = useState(true);
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: 1,
      bank: "BCA",
      accountNumber: "123456789",
      accountName: "Ahmad Rizki Pratama",
    },
    {
      id: 2,
      bank: "Mandiri",
      accountNumber: "987654321",
      accountName: "Siti Nurhaliza",
    },
  ]);

  const addAccount = () => {
    setAccounts((prev) => [
      ...prev,
      { id: Date.now(), bank: "", accountNumber: "", accountName: "" },
    ]);
  };

  const removeAccount = (id: number) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  const updateAccount = (
    id: number,
    field: keyof BankAccount,
    value: string,
  ) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    );
  };

  const totalReceived = "Rp 2.000.000";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className=" text-2xl font-bold text-foreground">Amplop Digital</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola rekening penerima dan lihat riwayat amplop digital
        </p>
      </div>

      {/* Toggle */}
      <Card className="border-border bg-card">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-foreground">
              Aktifkan Amplop Digital
            </p>
            <p className="text-xs text-muted-foreground">
              Tamu bisa mengirim hadiah secara digital
            </p>
          </div>
          <Switch
            checked={enableDigitalEnvelope}
            onCheckedChange={setEnableDigitalEnvelope}
          />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Wallet className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Diterima</p>
              <p className="text-xl font-bold text-foreground">
                {totalReceived}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <CreditCard className="size-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Terkonfirmasi</p>
              <p className="text-xl font-bold text-foreground">3 transaksi</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">
              <Building className="size-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rekening Aktif</p>
              <p className="text-xl font-bold text-foreground">
                {accounts.length} rekening
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bank accounts */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Rekening Penerima</CardTitle>
          <CardDescription className="text-muted-foreground">
            Rekening bank yang akan ditampilkan di undangan
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="flex gap-4 rounded-lg border border-border p-4"
            >
              <div className="flex-1 grid gap-3 md:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">Bank</Label>
                  <Input
                    placeholder="BCA, Mandiri, BNI..."
                    value={acc.bank}
                    onChange={(e) =>
                      updateAccount(acc.id, "bank", e.target.value)
                    }
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Nomor Rekening
                  </Label>
                  <Input
                    placeholder="123456789"
                    value={acc.accountNumber}
                    onChange={(e) =>
                      updateAccount(acc.id, "accountNumber", e.target.value)
                    }
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Atas Nama
                  </Label>
                  <Input
                    placeholder="Nama pemilik rekening"
                    value={acc.accountName}
                    onChange={(e) =>
                      updateAccount(acc.id, "accountName", e.target.value)
                    }
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="mt-5 text-muted-foreground hover:text-destructive"
                onClick={() => removeAccount(acc.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
            onClick={addAccount}
          >
            <Plus className="mr-2 size-4" /> Tambah Rekening
          </Button>
        </CardContent>
      </Card>

      {/* History */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Riwayat Amplop</CardTitle>
          <CardDescription className="text-muted-foreground">
            Daftar hadiah digital yang diterima
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">
                  Pengirim
                </TableHead>
                <TableHead className="text-muted-foreground">Jumlah</TableHead>
                <TableHead className="text-muted-foreground">Metode</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Waktu</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donationHistory.map((row, i) => (
                <TableRow key={i} className="border-border">
                  <TableCell className="font-medium text-foreground">
                    {row.name}
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    {row.amount}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.method}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        row.confirmed
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                      }
                    >
                      {row.confirmed ? "Terkonfirmasi" : "Pending"}
                    </Badge>
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
