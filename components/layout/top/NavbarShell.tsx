"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import LanguageSelector from "./LanguageSelector";

interface NavbarShellProps {
  brandContent: React.ReactNode;
  ctaButton: React.ReactNode;
  mobileMenu: React.ReactNode;
}

export default function NavbarShell({
  brandContent,
  ctaButton,
  mobileMenu,
}: NavbarShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [hasCursor, setHasCursor] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const stateRef = useRef({
    langOpen: isLangOpen,
    hovered: isHovered,
    timer: null as NodeJS.Timeout | null,
  });

  stateRef.current.langOpen = isLangOpen;
  stateRef.current.hovered = isHovered;

  const clearHideTimer = useCallback(() => {
    if (stateRef.current.timer) {
      clearTimeout(stateRef.current.timer);
      stateRef.current.timer = null;
    }
  }, []);

  const startHideTimer = useCallback(() => {
    clearHideTimer();
    stateRef.current.timer = setTimeout(() => {
      setIsHovered(false);
    }, 40000);
  }, [clearHideTimer]);

  useEffect(() => {
    setHasCursor(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setPastHero(y > window.innerHeight - 80);

      if (y <= 40) setIsWhiteTheme(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        clearHideTimer();
        setIsHovered(true);
      } else {
        if (
          !stateRef.current.langOpen &&
          stateRef.current.hovered &&
          !stateRef.current.timer
        ) {
          startHideTimer();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearHideTimer();
    };
  }, [clearHideTimer, startHideTimer]);

  useEffect(() => {
    if (isLangOpen) {
      clearHideTimer();
    } else if (isHovered && !stateRef.current.timer) {
      startHideTimer();
    }
  }, [isLangOpen, isHovered, clearHideTimer, startHideTimer]);

  let isVisible = true;
  if (hasCursor) {
    if (scrolled) isVisible = isHovered || isLangOpen;
  } else {
    if (scrolled && !pastHero) {
      isVisible = false;
    } else if (pastHero) {
      isVisible = true;
    }
  }

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!isVisible && scrolled) {
      setIsWhiteTheme(true);
    }
  };

  return (
    <header
      onTransitionEnd={handleTransitionEnd}
      className={`group/nav fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] font-dmsans ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isWhiteTheme ? "bg-white shadow-sm py-4 is-white-bg" : "bg-transparent py-6"}`}
    >
      <div className="max-w-360 mx-auto px-6 md:px-12 flex items-center justify-between">
        {brandContent}

        <div className="hidden lg:flex items-center gap-8">
          <LanguageSelector onDropdownToggle={setIsLangOpen} />
          {ctaButton}
        </div>

        {mobileMenu}
      </div>
    </header>
  );
}
