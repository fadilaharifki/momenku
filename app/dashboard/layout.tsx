"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  UserCircle,
  LogOut,
  Sparkles,
  Plus,
  Menu,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useLogoutUser } from "@/hooks/api/useLogoutUser";

const menuItems = [
  {
    group: "MAIN MENU",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Undangan Saya", href: "/dashboard/invitations", icon: Mail },
    ],
  },
  {
    group: "ACCOUNT",
    items: [
      { name: "Edit Profil", href: "/dashboard/profile", icon: UserCircle },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();

  const { mutate } = useLogoutUser();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    mutate();
    router.push("/home");
    router.refresh();
  };

  const userInitial =
    user?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase() || "MK";

  // Komponen Sidebar Content agar bisa di-reuse di Desktop & Mobile
  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card">
      <div className="flex h-20 items-center px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Momen<span className="text-primary">Ku</span>
          </span>
        </Link>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-8">
          {menuItems.map((group) => (
            <div key={group.group} className="space-y-2">
              <p className="px-4 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                {group.group}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Button
                      key={item.name}
                      asChild
                      variant={isActive ? "default" : "ghost"}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "w-full justify-start gap-3 rounded-xl font-semibold transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
                          : "text-muted-foreground hover:text-primary hover:bg-secondary",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                        {item.name}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-border mt-auto">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl font-semibold transition-colors"
        >
          <LogOut size={18} />
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background font-poppins">
      {/* SIDEBAR DESKTOP */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-border lg:block z-40">
        <SidebarContent />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-background/80 px-4 md:px-8 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-4">
            {/* TRIGGER MOBILE DRAWER */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-none">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <h1 className="text-lg md:text-xl font-bold text-foreground capitalize">
              {menuItems
                .flatMap((g) => g.items)
                .find((i) => i.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Separator orientation="vertical" className="h-8 hidden sm:block" />

            <Button
              onClick={() => router.push("/home#template")}
              size="sm"
              className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/10 hover:bg-primary/90 active:scale-95 transition-all"
            >
              <Plus size={18} />
              Buat Undangan
            </Button>

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 md:gap-3 group"
            >
              <Avatar className="h-8 w-8 md:h-10 md:w-10 border-2 border-primary/20 transition-all group-hover:border-primary">
                <AvatarImage
                  src={user?.avatar_url || ""}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="bg-secondary text-primary font-bold text-xs md:text-sm">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left max-w-30">
                <p className="text-xs font-bold text-foreground leading-none truncate">
                  {user?.full_name}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-medium">
                  {user?.provider || "Free Member"}
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-4 md:p-8 min-h-[calc(100vh-5rem)]">{children}</div>
      </main>
    </div>
  );
}
