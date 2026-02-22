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
  CalendarHeart,
  ImageIcon,
  Music,
  MessageSquareHeart,
  Gift,
  Settings,
  LogOut,
  Eye,
  Palette,
  CreditCard,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Pilih Template", href: "/dashboard/template", icon: Palette },
  { title: "Data Mempelai", href: "/dashboard/mempelai", icon: Users },
  { title: "Data Acara", href: "/dashboard/acara", icon: CalendarHeart },
  { title: "Galeri Foto", href: "/dashboard/galeri", icon: ImageIcon },
  { title: "Musik", href: "/dashboard/musik", icon: Music },
  { title: "Ucapan & RSVP", href: "/dashboard/rsvp", icon: MessageSquareHeart },
  { title: "Amplop Digital", href: "/dashboard/amplop", icon: Gift },
  { title: "Preview", href: "/dashboard/preview", icon: Eye },
];

const settingsItems = [
  { title: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
  { title: "Langganan", href: "/dashboard/langganan", icon: CreditCard },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                M
              </span>
            </div>
            <span className=" text-lg font-bold text-primary">MomenKu</span>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
              Undangan Saya
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
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
              Akun
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
                AR
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">
                Ahmad Rizki
              </p>
              <p className="truncate text-xs text-muted-foreground">
                ahmad@email.com
              </p>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="size-4" />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b border-border px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-sm font-medium text-foreground">Dashboard</h1>
        </header>
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
