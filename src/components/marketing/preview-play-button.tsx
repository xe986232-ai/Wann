"use client";

import { PauseIcon, PlayIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "loading" | "playing";

export function PreviewPlayButton({ previewUrl }: { previewUrl?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function toggle() {
    if (!previewUrl) return;

    if (status === "playing" || status === "loading") {
      audioRef.current?.pause();
      setStatus("idle");
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener("ended", () => setStatus("idle"));
    }

    const audio = audioRef.current;
    setStatus("loading");

    const handlePlaying = () => {
      setStatus("playing");
      audio.removeEventListener("playing", handlePlaying);
    };
    audio.addEventListener("playing", handlePlaying);

    audio.src = previewUrl;
    audio.currentTime = 0;
    audio.play().catch(() => {
      setStatus("idle");
      audio.removeEventListener("playing", handlePlaying);
    });
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <button
      type="button"
      aria-label={
        status === "playing" ? "Pause" : status === "loading" ? "Loading" : "Play"
      }
      onClick={toggle}
      className="flex h-[52px] w-[52px] shrink-0 touch-manipulation select-none items-center justify-center rounded-full bg-surface-2 text-muted transition-all duration-200 ease-in-out hover:text-foreground active:scale-90"
    >
      {status === "loading" ? (
        <svg
          className="h-6 w-6 animate-spin"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            cx="22"
            cy="22"
            r="19"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.25"
          />
          <path
            d="M41 22c0-10.493-8.507-19-19-19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : status === "playing" ? (
        <PauseIcon className="h-6 w-6" />
      ) : (
        <PlayIcon className="h-6 w-6" />
      )}
    </button>
  );
}
