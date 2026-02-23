"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGetInvitationBySlug } from "@/hooks/api/useGetInvitationBySlug";
import AOS from "aos";
import "aos/dist/aos.css";

export default function InvitationPage() {
  const { slug } = useParams();
  const { data: invitation, isLoading } = useGetInvitationBySlug(
    slug as string,
  );
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Nama Tamu";

  // 1. Handle Scroll Lock
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0); // Paksa stay di atas
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 2. Event Delegation untuk menangkap klik tombol "Open Invitation"
  const handleMainClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Cek apakah element yang diklik (atau parent terdekatnya) punya class tombol open
    if (target.closest(".btn-open-invitation")) {
      setIsOpen(true);

      // Re-init AOS setelah dibuka agar animasi section selanjutnya jalan
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  };

  useEffect(() => {
    if (invitation) {
      AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 50,
        easing: "ease-in-out",
      });
    }
  }, [invitation]);

  if (isLoading) return <div className="h-screen bg-[#4a0404]" />;

  return (
    <main
      onClick={handleMainClick} // Tangkap semua klik di sini
      className="mx-auto max-w-md bg-[#4a0404] min-h-screen relative shadow-2xl"
    >
      {invitation?.sections?.map((section: any, index: number) => {
        // Ganti placeholder nama tamu
        const processedHtml = section.body.replace("[NAMA_TAMU]", guestName);

        // Section Pertama (Index 0) biasanya adalah Cover
        const isCover = index === 0;

        return (
          <section
            key={section.id}
            className={`
              w-full h-[100svh] relative overflow-hidden transition-all duration-1000 ease-in-out
              ${isCover ? "z-50" : "z-0"}
              ${isCover && isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0"}
              ${!isCover && !isOpen ? "hidden" : "block"} 
            `}
            style={{
              // Jika ini cover dan sudah terbuka, dia akan meluncur ke atas
              position: isCover && isOpen ? "fixed" : "relative",
              top: 0,
            }}
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        );
      })}

      {/* CSS Tambahan agar transisi mulus */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          background-color: #4a0404;
        }
      `}</style>
    </main>
  );
}
