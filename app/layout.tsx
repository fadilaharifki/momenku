import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import "animate.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "MomenKu - Undangan Digital Premium",
  description:
    "Buat undangan digital pernikahan yang elegan dan mewah. Platform undangan online premium dengan desain eksklusif dan fitur lengkap.",
  keywords: [
    "undangan digital",
    "undangan online",
    "undangan pernikahan",
    "wedding invitation",
    "undangan premium",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
