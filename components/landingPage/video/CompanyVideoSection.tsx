"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaPlay, FaPause, FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CompanyVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Use a ref to track playing state inside GSAP callbacks without React closure staleness
  const playingStateRef = useRef(false);

  // GSAP: Sharp Magnetic Scroll Effect (Desktop Only - Untouched)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
              const isFullscreen = self.progress > 0.3 && self.progress < 0.7;

              if (isFullscreen && !playingStateRef.current) {
                if (videoRef.current) {
                  videoRef.current.muted = false;
                  const playPromise = videoRef.current.play();

                  if (playPromise !== undefined) {
                    playPromise
                      .then(() => {
                        setIsPlaying(true);
                        setIsMuted(false);
                        playingStateRef.current = true;
                      })
                      .catch(() => {
                        if (videoRef.current) {
                          videoRef.current.muted = true;
                          videoRef.current.play();
                          setIsPlaying(true);
                          setIsMuted(true);
                          playingStateRef.current = true;
                        }
                      });
                  }
                }
              } else if (!isFullscreen && playingStateRef.current) {
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.muted = true;
                  setIsPlaying(false);
                  setIsMuted(true);
                  playingStateRef.current = false;
                }
              }
            },
          },
        });

        tl.to(videoWrapperRef.current, {
          width: "100vw",
          height: "100vh",
          duration: 1,
          ease: "power2.inOut",
        })
          .to({}, { duration: 1.5 })
          .to(videoWrapperRef.current, {
            width: "85vw",
            height: "75vh",
            duration: 1,
            ease: "power2.inOut",
          });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Manual Video Controls
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      setIsPlaying(!isPlaying);
      playingStateRef.current = !isPlaying;
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && progressRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressRef.current.style.width = `${progress}%`;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="company"
      className="relative w-full bg-white flex items-center justify-center py-20 lg:py-0 lg:h-screen z-20"
    >
      <div
        ref={videoWrapperRef}
        className="relative w-full h-[50vh] lg:w-[85vw] lg:h-[75vh] bg-slate-950 group overflow-hidden"
      >
        <video
          ref={videoRef}
          src="https://www.hezenerji.com/media/hez-enerji.mp4"
          poster="/images/assets/poster.png"
          aria-label="Hez Enerji video"
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            playingStateRef.current = false;
          }}
          muted={isMuted}
          playsInline
          loop
        />

        {/* CENTER PLAY INDICATOR (Visible when paused - flawless mobile feedback) */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${
            isPlaying ? "scale-110 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center pl-1">
            <FaPlay className="text-white text-xl md:text-2xl" />
          </div>
        </div>

        {/* 
          STRICT CORPORATE UI OVERLAY 
          Logic: 
          - If paused: 100% visible everywhere.
          - If playing: 100% visible on mobile, 0% on desktop (unless hovered).
        */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 flex flex-col justify-between ${
            !isPlaying
              ? "opacity-100"
              : "opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          }`}
        >
          {/* Clickable transparent body (Tap anywhere here to play/pause) */}
          <div className="flex-1 cursor-pointer" onClick={togglePlay} />

          <div className="w-full px-6 py-6 md:px-10 flex flex-col gap-4 pointer-events-none">
            {/* Metadata and Controls Row */}
            <div className="flex items-end justify-between pointer-events-auto">
              {/* Left: Enterprise Labelling */}
              <div className="flex flex-col gap-1 cursor-default">
                <span className="text-white text-[10px] font-mono tracking-[0.2em] uppercase opacity-70">
                  Infrastructure
                </span>
                <span className="text-white text-sm md:text-base font-bold tracking-wide uppercase">
                  Hez Enerji Operations Reel
                </span>
              </div>

              {/* Right: Minimalist Controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-primary transition-colors focus:outline-none p-2 -mr-2 md:p-0 md:mr-0"
                  aria-label="Toggle Mute"
                >
                  {isMuted ? (
                    <FaVolumeXmark size={18} />
                  ) : (
                    <FaVolumeHigh size={18} />
                  )}
                </button>
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-primary transition-colors focus:outline-none p-2 -mr-2 md:p-0 md:mr-0"
                  aria-label="Toggle Play"
                >
                  {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Edge Progress Bar (Razor Thin) */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20">
            <div
              ref={progressRef}
              className="h-full bg-primary transition-all duration-75 ease-linear"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
