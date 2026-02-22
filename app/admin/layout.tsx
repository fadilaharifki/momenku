"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Palette,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  Bell,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Kelola User", href: "/admin/users", icon: Users, badge: "128" },
  { title: "Kelola Template", href: "/admin/templates", icon: Palette },
  {
    title: "Transaksi",
    href: "/admin/transactions",
    icon: CreditCard,
    badge: "5",
  },
  { title: "Laporan", href: "/admin/reports", icon: BarChart3 },
];

const settingsItems = [
  { title: "Pengaturan", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="p-4">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <ShieldCheck className="size-4 text-primary-foreground" />
            </div>
            <div>
              <span className=" text-lg font-bold text-primary">MomenKu</span>
              <span className="ml-1.5 text-xs text-muted-foreground">
                Admin
              </span>
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
              Menu Utama
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span className="flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-primary/10 text-primary text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
              Sistem
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <Separator className="mb-3" />
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">
                Super Admin
              </p>
              <p className="truncate text-xs text-muted-foreground">
                admin@momenku.id
              </p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="size-4" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-sm font-medium text-foreground">Admin Panel</h1>
          </div>
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="size-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              3
            </span>
          </button>
        </header>
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
