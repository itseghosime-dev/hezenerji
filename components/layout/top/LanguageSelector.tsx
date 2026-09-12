"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { FaChevronDown, FaCheck } from "react-icons/fa6";
import { languages } from "@/data/nav-config";

interface LanguageSelectorProps {
  onDropdownToggle?: (isOpen: boolean) => void;
  className?: string;
}

export default function LanguageSelector({ onDropdownToggle, className = "" }: LanguageSelectorProps) {
  const [currentLang, setCurrentLang] = useState("EN");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync initial language preference from Google Translate cookie
  useEffect(() => {
    const cookieMatch = document.cookie.match(/(?:^|;)\s*googtrans=([^;]+)/);
    if (cookieMatch) {
      const currentCode = cookieMatch[1].split("/")[2]?.toUpperCase();
      const matched = languages.find((l) => l.code === currentCode);
      if (matched) setCurrentLang(matched.code);
    }
  }, []);

  // Sync open state with parent orchestrator
  useEffect(() => {
    onDropdownToggle?.(isOpen);
  }, [isOpen, onDropdownToggle]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on page scroll
  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageSwitch = (langCode: string) => {
    const targetLang = langCode.toLowerCase();
    setCurrentLang(langCode);
    setIsOpen(false);

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
      return;
    }

    if (targetLang === "en") {
      const bannerFrame = document.querySelector(".goog-te-banner-frame") as HTMLIFrameElement | null;
      const restoreBtn = bannerFrame?.contentDocument?.querySelector(".goog-close-link") as HTMLElement | null;
      if (restoreBtn) {
        restoreBtn.click();
      }
    }
  };

  const activeLanguage = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className={`relative notranslate ${className}`} ref={dropdownRef}>
      {/* Hidden Translate Anchor and Scripts */}
      <div
        id="google_translate_element"
        className="fixed -top-20 -left-20 opacity-0 w-0 h-0 overflow-hidden pointer-events-none"
      />
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', includedLanguages: 'en,tr', autoDisplay: false },
                'google_translate_element'
              );
            }
          `,
        }}
      />
      <Script
        id="google-translate-lib"
        strategy="afterInteractive"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-[14px] font-bold tracking-wide text-white group-[.is-white-bg]/nav:text-slate-900 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none -mt-0.5">{activeLanguage.flag}</span>
        <span>{currentLang}</span>
        <FaChevronDown
          size={10}
          className={`transition-transform duration-300 ml-0.5 ${isOpen ? "rotate-180" : "opacity-60"}`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-4 w-64 bg-white border border-slate-150 rounded-2xl shadow-2xl overflow-hidden py-2 z-50 transition-all duration-300 origin-top-right ${
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"
        }`}
      >
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageSwitch(lang.code)}
              className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg leading-none">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className={`text-sm leading-tight ${isActive ? "text-slate-900 font-bold" : "text-slate-600 font-medium"}`}>
                    {lang.label}
                  </span>
                  <span className="text-[11px] text-slate-400 leading-tight mt-0.5">
                    {lang.region}
                  </span>
                </div>
              </div>
              {isActive && <FaCheck size={12} className="text-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}