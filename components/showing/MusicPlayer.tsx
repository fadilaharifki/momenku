"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Play, AudioLines } from "lucide-react";

interface MusicPlayerProps {
  url: string;
  isAutoPlay: boolean;
  isMusicActive: boolean;
}

export default function MusicPlayer({
  url,
  isAutoPlay,
  isMusicActive,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Jalankan musik otomatis saat isAutoPlay berubah jadi true
  useEffect(() => {
    if (isAutoPlay && isMusicActive && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Autoplay blocked:", err));
    }
  }, [isAutoPlay, isMusicActive]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  if (!isMusicActive || !url) return null;

  return (
    <>
      <audio
        ref={audioRef}
        key={url}
        src={url}
        loop
        playsInline
        preload="auto"
      />

      {/* FLOATING CONTROL */}
      {isAutoPlay && (
        <div
          className="fixed bottom-10 right-6 group transition-all duration-700"
          style={{ zIndex: 99999 }}
        >
          <button
            onClick={toggleMusic}
            className={`
              relative flex items-center justify-center 
              w-12 h-12 rounded-full 
              transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
              backdrop-blur-md border border-white/20
              ${isPlaying ? "bg-white/10 scale-110 shadow-2xl" : "bg-black/5 scale-100 shadow-none border-white/10"}
              hover:bg-white/20 active:scale-90
            `}
          >
            {/* Vinyl Texture */}
            <div
              className={`absolute inset-0.5 rounded-full border border-white/5 ${isPlaying ? "animate-[spin_8s_linear_infinite]" : ""}`}
              style={{
                background: `repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0 1px, transparent 1px 2px)`,
              }}
            />

            <div className="relative z-10 flex items-center justify-center text-white/70">
              {isPlaying ? (
                <AudioLines size={20} />
              ) : (
                <Play size={20} fill="currentColor" />
              )}
            </div>
          </button>
        </div>
      )}
    </>
  );
}
