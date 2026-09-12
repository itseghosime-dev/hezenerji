"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { languages } from "@/data/nav-config";

interface MobileMenuProps {
  logo: React.ReactNode;
  navLinks: React.ReactNode;
}

export default function MobileMenu({ logo, navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [mounted, setMounted] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll during open state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Master GSAP animation sequence
  useGSAP(
    () => {
      if (!mounted) return;

      const tl = gsap.timeline({ paused: true });

      // 1. Drawer background curtain drop
      tl.set(drawerRef.current, { display: "flex", pointerEvents: "auto" });
      tl.fromTo(
        drawerRef.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.85,
          ease: "expo.out",
        }
      );

      // 2. Header elements fade & drop
      tl.fromTo(
        headerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.5"
      );

      // 3. Staggered reveal of navigation items
      const links = linksContainerRef.current?.querySelectorAll("a") ?? [];
      if (links.length > 0) {
        tl.fromTo(
          links,
          { y: 40, opacity: 0, skewY: 3 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.4"
        );
      }

      // 4. Footer actions slide up
      tl.fromTo(
        footerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.4"
      );

      timelineRef.current = tl;
    },
    { scope: drawerRef, dependencies: [mounted] }
  );

  // Play / reverse controller
  useEffect(() => {
    if (!timelineRef.current) return;

    if (isOpen) {
      timelineRef.current.play();
    } else {
      timelineRef.current.reverse();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLanguageSwitch = (langCode: string) => {
    const targetLang = langCode.toLowerCase();
    setCurrentLang(langCode);

    if (targetLang === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    } else {
      document.cookie = `googtrans=/en/${targetLang}; path=/`;
      document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname}`;
    }

    const googleSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (googleSelect) {
      googleSelect.value = targetLang;
      googleSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const drawerContent = (
    <div
      ref={drawerRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-9999 bg-white flex flex-col justify-between px-8 py-10 lg:hidden min-h-dvh w-full pointer-events-none will-change-transform"
    >
      {/* Drawer Header */}
      <div ref={headerRef} className="flex justify-between items-center w-full">
        {logo}

        <button
          type="button"
          onClick={handleClose}
          className="group p-2 focus:outline-none text-slate-900 cursor-pointer"
          aria-label="Close menu"
        >
          <div className="relative w-6 h-6 transition-transform duration-500 group-hover:rotate-90">
            <span className="absolute top-1/2 left-0 h-0.5 w-6 bg-current rotate-45" />
            <span className="absolute top-1/2 left-0 h-0.5 w-6 bg-current -rotate-45" />
          </div>
        </button>
      </div>

      {/* Navigation Links with animated stagger */}
      <div
        ref={linksContainerRef}
        onClick={handleClose}
        className="w-full flex-1 flex flex-col justify-center gap-6"
      >
        {navLinks}
      </div>

      {/* Drawer Footer Actions */}
      <div
        ref={footerRef}
        className="flex flex-col gap-8 items-start w-full border-t border-slate-100 pt-8 pb-4"
      >
        <div className="flex gap-6 notranslate">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageSwitch(lang.code)}
              className={`flex items-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                currentLang === lang.code ? "text-primary" : "text-slate-400 hover:text-slate-900"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              {lang.code}
            </button>
          ))}
        </div>

        <Link
          href="#contact"
          onClick={handleClose}
          className="w-full text-center text-[13px] font-bold tracking-widest uppercase bg-slate-900 text-white py-5 rounded-full hover:bg-primary transition-colors duration-300"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* 2-Line Toggle Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group flex flex-col items-end gap-1.5 p-2 focus:outline-none text-white group-[.is-white-bg]/nav:text-slate-900 transition-colors lg:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <span className="h-0.5 w-6 bg-current transition-all duration-300" />
        <span className="h-0.5 w-4 bg-current transition-all duration-300 group-hover:w-6" />
      </button>

      {mounted ? createPortal(drawerContent, document.body) : null}
    </>
  );
}