"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CarouselImage } from "@/data/hero-config";

interface HeroOrchestratorProps {
  images: CarouselImage[];
  contentNode: React.ReactNode;
  statsNode: React.ReactNode;
}

export default function HeroOrchestrator({
  images,
  contentNode,
  statsNode,
}: HeroOrchestratorProps) {
  const containerRef = useRef<HTMLElement>(null);
  const activeSlideRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const masterTl = gsap.timeline();
      const slides = gsap.utils.toArray<HTMLElement>(".carousel-slide");

      // 1. Target the classes inside the Server Components to reveal them
      masterTl.fromTo(
        ".reveal-text",
        { y: 100, skewY: 5, autoAlpha: 0 },
        {
          y: 0,
          skewY: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.1,
        },
      );

      masterTl.fromTo(
        ".reveal-fade",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=0.8",
      );

      masterTl.fromTo(
        ".hud-container",
        { y: 50, autoAlpha: 0, scale: 0.98 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: "expo.out" },
        "-=0.6",
      );

      masterTl.fromTo(
        ".stat-item",
        { y: 15, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.6",
      );

      masterTl.fromTo(
        ".pagination-indicator",
        { x: 20, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
        "-=0.8",
      );

      // 2. Reveal the FIRST Image
      masterTl.set(slides[0], { zIndex: 1 });
      masterTl.fromTo(
        slides[0],
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          scale: 1.1,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          duration: 1.4,
          ease: "expo.inOut",
        },
        "-=0.4",
      );

      // 3. Bulletproof Recursive Carousel
      masterTl.add(() => {
        const SLIDE_DURATION = 5;
        const TRANSITION_DURATION = 1.4;
        let currentIndex = 0;

        function playNextSlide() {
          const slide = slides[currentIndex];
          const nextIndex = (currentIndex + 1) % slides.length;
          const nextSlide = slides[nextIndex];
          const nextIndexText =
            nextIndex + 1 > 9 ? `${nextIndex + 1}` : `0${nextIndex + 1}`;

          const tl = gsap.timeline({
            onComplete: () => {
              currentIndex = nextIndex;
              playNextSlide();
            },
          });

          tl.fromTo(
            ".progress-line-fill",
            { scaleY: 0 },
            { scaleY: 1, duration: SLIDE_DURATION, ease: "none" },
          );
          tl.set(nextSlide, {
            zIndex: 2,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            scale: 1.15,
          });
          tl.set(activeSlideRef.current, { innerText: nextIndexText });
          tl.to(nextSlide, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            duration: TRANSITION_DURATION,
            ease: "expo.inOut",
          });
          tl.set(slide, {
            zIndex: 0,
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          tl.set(nextSlide, { zIndex: 1 });
          tl.set(".progress-line-fill", { scaleY: 0 });
        }
        playNextSlide();
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col justify-between min-h-svh w-full overflow-hidden bg-slate-950 font-dmsans"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        {images.map((img, i) => (
          <div
            key={i}
            className="carousel-slide absolute inset-0 will-change-transform origin-bottom z-0"
            style={{
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={true}
            />
          </div>
        ))}
        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/15 z-5 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/40 to-transparent w-full lg:w-3/4 z-5 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/10 h-full z-5 pointer-events-none" />
      </div>

      {/* PAGINATION */}
      <div className="pagination-indicator opacity-0 absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4">
        <span
          ref={activeSlideRef}
          className="text-sm font-bold text-white transition-colors"
        >
          01
        </span>
        <div className="w-0.5 h-28 bg-white/20 rounded-full overflow-hidden">
          <div className="progress-line-fill w-full h-full bg-primary origin-top scale-y-0 will-change-transform" />
        </div>
        <span className="text-xs font-medium tracking-widest text-white/40">
          0{images.length}
        </span>
      </div>

      {/* RENDERED SERVER COMPONENTS */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-8">
        {contentNode}
      </div>

      {statsNode}
    </section>
  );
}
