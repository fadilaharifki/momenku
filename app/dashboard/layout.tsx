"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  UserCircle,
  LogOut,
  Plus,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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

  return (
    <div className="flex min-h-screen bg-background font-poppins">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-border bg-card lg:block">
        <div className="flex h-20 items-center px-6">
          <Link
            href="/"
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

        <ScrollArea className="h-[calc(100vh-10rem)] px-4 py-6">
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
                        className={cn(
                          "w-full justify-start gap-3 rounded-xl font-semibold transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90"
                            : "text-muted-foreground hover:text-primary hover:bg-secondary",
                        )}
                      >
                        <Link href={item.href}>
                          <item.icon
                            size={18}
                            strokeWidth={isActive ? 2.5 : 2}
                          />
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

        <div className="absolute bottom-0 w-full p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl font-semibold"
          >
            <LogOut size={18} />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-background/80 px-8 backdrop-blur-md border-b border-border">
          <h1 className="text-xl font-bold text-foreground">
            {menuItems.flatMap((g) => g.items).find((i) => i.href === pathname)
              ?.name || "Dashboard"}
          </h1>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Separator orientation="vertical" className="h-8 hidden sm:block" />

            <Button
              onClick={() => router.push("/#template")}
              className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/10 hover:bg-primary/90 active:scale-95 transition-all"
            >
              <Plus size={18} />
              Buat Undangan
            </Button>

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 group"
            >
              <Avatar className="h-10 w-10 border-2 border-primary/20 transition-all group-hover:border-primary">
                <AvatarImage src="" /> {/* Masukkan URL foto jika ada */}
                <AvatarFallback className="bg-secondary text-primary font-bold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-foreground leading-none">
                  John Doe
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Premium Member
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 min-h-[calc(100vh-5rem)]">{children}</div>
      </main>
    </div>
  );
}
