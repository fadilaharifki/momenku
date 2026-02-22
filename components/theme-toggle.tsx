"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="h-10 w-10 rounded-full"
      />
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-10 w-10 rounded-full text-primary hover:bg-primary/5 hover:text-primary transition-all duration-300"
      aria-label="Toggle theme"
    >
      {/* Icon Sun (Muncul saat Dark Mode) */}
      <Sun className="h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />

      {/* Icon Moon (Muncul saat Light Mode) */}
      <Moon className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-primary" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
