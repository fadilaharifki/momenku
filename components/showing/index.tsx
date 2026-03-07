"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import RSVPGuestDialog from "@/components/setting/RSVPGuestForm";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { CAMERA_PRESETS } from "@/lib/preset-camera";
import { toast } from "sonner";
import { fontFamilyGlobal } from "@/lib/constants/font";
export default function InvitationPageComponent({
  slug,
  rsvpCode,
  invitation,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<any | null>(null);

  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Nama Tamu";

  // --- LOGIC COPY REKENING (Momenku Logic) ---
  useEffect(() => {
    const handleCopyClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".btn-copy-data") as HTMLElement;

      if (btn) {
        const targetId = btn.getAttribute("data-copy-target");
        if (!targetId) return;

        const elementToCopy = document.getElementById(targetId);
        const textToCopy = elementToCopy?.innerText;

        if (textToCopy) {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              const originalText = btn.innerText;
              btn.innerText = "COPIED!";
              btn.style.backgroundColor = "#00b894";
              btn.style.color = "#ffffff";
              toast.success(`Berhasil menyalin: ${textToCopy}`);

              // Reset Button setelah 2 detik
              setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = "";
                btn.style.color = "";
              }, 2000);
            })
            .catch(() => {
              toast.error("Gagal menyalin teks");
            });
        }
      }
    };

    window.addEventListener("click", handleCopyClick);
    return () => window.removeEventListener("click", handleCopyClick);
  }, []);

  // --- 2. PRESET ANIMASI ELEMEN DALAM HTML ---
  const resepGerak: any = {
    "zoom-in": { scale: 1.2, x: 0, y: 0 },
    "zoom-left": { scale: 1.3, x: "-5%", y: 0 },
    "zoom-right": { scale: 1.3, x: "5%", y: 0 },
  };

  const parseOptions = {
    replace: (domNode: any) => {
      // 1. Animasi Background tetap pakai motion (karena ini simpel)
      if (
        domNode.name === "img" &&
        domNode.attribs?.class?.includes("momenku-bg-target")
      ) {
        const arah = domNode.attribs["data-animation"] || "zoom-in";
        return (
          <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
            <motion.img
              src={domNode.attribs.src}
              initial={{ scale: 1 }}
              animate={resepGerak[arah] || resepGerak["zoom-in"]}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
              }}
              className={`${domNode.attribs.class} w-full h-full object-cover`}
            />
          </div>
        );
      }

      // 2. Suntik Class Animasi Manual ke elemen yang punya data-aos
      if (domNode.attribs?.["data-aos"]) {
        const delay = domNode.attribs["data-aos-delay"] || "0";
        const duration = domNode.attribs["data-aos-duration"] || "1000";

        // Kita tambahkan style transition inline supaya dinamis sesuai data-aos
        const currentStyle = domNode.attribs.style || "";
        const newStyle = `
        ${currentStyle}; 
        transition: all ${duration}ms ease-out ${delay}ms;
      `;

        domNode.attribs.style = newStyle;
        // Tambahkan class penanda
        domNode.attribs.className =
          `${domNode.attribs.class || ""} momenku-anim`.trim();

        return undefined; // Lanjutkan render standar tapi dengan class/style baru
      }
    },
  };

  // --- 3. SCROLL & INTERSECTION OBSERVER ---
  useEffect(() => {
    document.body.style.overflow = !isOpen ? "hidden" : "auto";
    if (!isOpen) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0",
            );
            setActiveSection(invitation.sections[index]);
            setActiveSectionIndex(index);
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = document.querySelectorAll(".invitation-section");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isOpen, invitation]);

  // --- 4. COUNTDOWN LOGIC ---
  useEffect(() => {
    if (!isOpen || !invitation) return;
    const timer = setInterval(() => {
      const targetEl = document.getElementById("countdown-target");
      const targetDateString = targetEl?.getAttribute("data-target");
      if (!targetDateString) return;

      const distance =
        new Date(targetDateString).getTime() - new Date().getTime();
      const dEl = document.getElementById("days");
      const hEl = document.getElementById("hours");
      const mEl = document.getElementById("minutes");
      const sEl = document.getElementById("seconds");

      if (dEl && hEl && mEl && sEl) {
        if (distance < 0) {
          clearInterval(timer);
          return;
        }
        dEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0");
        hEl.innerText = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )
          .toString()
          .padStart(2, "0");
        mEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0");
        sEl.innerText = Math.floor((distance % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, invitation]);

  // --- 5. EVENT HANDLERS ---
  const handleMainClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".btn-open-invitation")) {
      setIsOpen(true);

      setTimeout(() => {
        AOS.refreshHard();
      }, 1000);
    }

    if (target.closest(".btn-wishes-trigger")) setIsRSVPModalOpen(true);
  };

  useEffect(() => {
    if (invitation) {
      AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 50,
        easing: "ease-in-out",
        startEvent: "DOMContentLoaded",
      });

      setTimeout(() => {
        AOS.refreshHard();
      }, 500);
    }
  }, [invitation]);

  // --- TRIGGER AOS SAAT DIBUKA ---
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        AOS.refresh();
        // Paksa browser sadar ada konten baru
        window.dispatchEvent(new Event("resize"));
      }, 500);
    }
  }, [isOpen]);

  return (
    <main
      onClick={handleMainClick}
      className="mx-auto max-w-md min-h-screen relative shadow-2xl"
    >
      {/* BACKGROUND UTAMA */}
      {(invitation?.background_url || invitation.themes.background_url) && (
        <motion.div
          className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none max-w-md mx-auto"
          transition={{ duration: 1 }}
        >
          <motion.img
            src={invitation.background_url || invitation.themes.background_url}
            alt="Main Background Camera"
            initial={false}
            animate={CAMERA_PRESETS[activeSectionIndex] || CAMERA_PRESETS[5]}
            transition={{
              duration: 2.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="w-full h-full object-cover shadow-inner"
            style={{
              objectPosition: "50% 30%",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "75%",
              background:
                "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.98) 12%, rgba(0,0,0,0.85) 28%, rgba(0,0,0,0.5) 48%, rgba(0,0,0,0.15) 70%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 2,
              opacity:
                activeSection?.title === "Bridge 3d" ||
                activeSection?.title === "Groom 3d"
                  ? 1
                  : 0,
              transition: "opacity 1.5s ease-in-out",
            }}
          />
        </motion.div>
      )}

      {/* RENDER SECTIONS */}
      <div className="relative z-10">
        {invitation?.sections?.map((section: any, index: number) => {
          const processedHtml = section.body.replace("[Nama_Tamu]", guestName);

          const isCover = index === 0;

          return (
            <section
              key={section.id}
              data-index={index}
              className={`invitation-section w-full min-h-svh relative overflow-hidden transition-all duration-1000 ease-in-out
                ${isCover ? "z-50" : "z-0"}
                ${isCover && isOpen ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0"}
                ${!isCover && !isOpen ? "hidden" : "block"} 
                bg-transparent
              `}
              style={{
                position: isCover && isOpen ? "fixed" : "relative",
                top: 0,
                maxWidth: "448px",
              }}
            >
              {parse(processedHtml, parseOptions)}
            </section>
          );
        })}
      </div>

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
        ${fontFamilyGlobal}
        html {
          scroll-behavior: smooth;
        }
        [data-aos] {
          opacity: 0;
          transition-property: transform, opacity !important;
        }

        [data-aos].aos-animate {
          opacity: 1 !important;
          transform: translate(0) scale(1) !important;
        }

        /* Khusus Mobile: Kadang AOS butuh bantuan anchor-placement */
        .invitation-section {
          overflow: visible !important; /* Coba ganti ini sementara */
        }
      `}</style>
    </main>
  );
}
