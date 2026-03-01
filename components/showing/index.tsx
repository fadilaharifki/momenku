"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGetInvitationBySlug } from "@/hooks/api/useGetInvitationBySlug";
import AOS from "aos";
import "aos/dist/aos.css";
import RSVPGuestDialog from "@/components/setting/RSVPGuestForm";

export default function InvitationPageComponent({
  slug,
  rsvpCode,
  invitation,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Nama Tamu";

  // 1. Handle Scroll Lock
  useEffect(() => {
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
    if (!isOpen) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // 2. LOGIC COUNTDOWN (UPDATED)
  useEffect(() => {
    if (!isOpen || !invitation) return;

    const timer = setInterval(() => {
      // Ambil elemen wrapper utama
      const targetEl = document.getElementById("countdown-target");
      if (!targetEl) return;

      // UPDATE: Ambil dari atribut 'data-target', bukan innerText
      const targetDateString = targetEl.getAttribute("data-target");
      if (!targetDateString) return;

      const targetDate = new Date(targetDateString).getTime();
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Seleksi elemen angka tampilan
      const dEl = document.getElementById("days");
      const hEl = document.getElementById("hours");
      const mEl = document.getElementById("minutes");
      const sEl = document.getElementById("seconds");

      if (dEl && hEl && mEl && sEl) {
        if (distance < 0) {
          clearInterval(timer);
          [dEl, hEl, mEl, sEl].forEach((el) => (el.innerText = "00"));
          return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        dEl.innerText = d.toString().padStart(2, "0");
        hEl.innerText = h.toString().padStart(2, "0");
        mEl.innerText = m.toString().padStart(2, "0");
        sEl.innerText = s.toString().padStart(2, "0");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, invitation]);

  // 3. Event Delegation
  const handleMainClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.closest(".btn-open-invitation")) {
      setIsOpen(true);
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }

    if (target.closest(".btn-rsvp-trigger")) {
      setIsRSVPModalOpen(true);
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

  return (
    <main
      onClick={handleMainClick}
      className="mx-auto max-w-md bg-[#4a0404] min-h-screen relative shadow-2xl"
    >
      {invitation?.sections?.map((section: any, index: number) => {
        const processedHtml = section.body.replace("[NAMA_TAMU]", guestName);
        const isCover = index === 0;

        return (
          <section
            key={section.id}
            className={`w-full h-svh relative overflow-hidden transition-all duration-1000 ease-in-out
              ${isCover ? "z-50" : "z-0"}
              ${isCover && isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0"}
              ${!isCover && !isOpen ? "hidden" : "block"} 
            `}
            style={{
              position: isCover && isOpen ? "fixed" : "relative",
              top: 0,
            }}
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        );
      })}

      {invitation && (
        <RSVPGuestDialog
          invitationId={invitation.id}
          isOpen={isRSVPModalOpen}
          onClose={() => setIsRSVPModalOpen(false)}
          rsvpData={invitation.settings}
          rsvpCode={rsvpCode}
        />
      )}

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
