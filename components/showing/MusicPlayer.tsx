"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import ReactPlayer from "react-player";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isAutoPlay && isMusicActive && hasMounted) {
      setIsPlaying(true);
    }
  }, [isAutoPlay, isMusicActive, hasMounted]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  if (!isMusicActive || !url || !hasMounted) return null;

  return (
    <>
      <div className="hidden" aria-hidden="true">
        <ReactPlayer
          src={url}
          playing={isPlaying}
          loop={true}
          volume={0.8}
          width="0px"
          height="0px"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      <div className="fixed bottom-10 right-6 z-99999">
        <button
          onClick={toggleMusic}
          className={`
            relative flex items-center justify-center 
            w-12 h-12 rounded-full backdrop-blur-md border border-white/20
            transition-all duration-700
            ${isPlaying ? "bg-white/10 scale-110 shadow-2xl" : "bg-black/20 scale-100 shadow-none"}
          `}
        >
          <div
            className={`absolute inset-0.5 rounded-full border border-white/5 ${isPlaying ? "animate-[spin_8s_linear_infinite]" : ""}`}
            style={{
              background: `repeating-radial-gradient(circle, rgba(255,255,255,0.05) 0 1px, transparent 1px 2px)`,
            }}
          />
          <div className="relative z-10 text-white/70">
            {isPlaying ? (
              <div className="flex items-end gap-0.75 h-4">
                <span className="w-0.5 bg-white/70 rounded-full animate-music-bar-1 h-full" />
                <span className="w-0.5 bg-white/70 rounded-full animate-music-bar-2 h-full" />
                <span className="w-0.5 bg-white/70 rounded-full animate-music-bar-3 h-full" />
                <span className="w-0.5 bg-white/70 rounded-full animate-music-bar-4 h-full" />
              </div>
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </div>
        </button>
      </div>
    </>
  );
}
