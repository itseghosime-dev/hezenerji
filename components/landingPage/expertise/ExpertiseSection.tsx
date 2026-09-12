"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger safely for Next.js SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const expertiseData = [
  {
    id: "01",
    tagline: "BASELOAD GENERATION",
    title: "Geothermal Power",
    description:
      "Harnessing high-enthalpy subsurface reservoirs to deliver continuous, zero-carbon baseload electricity. Unaffected by weather, providing 24/7 grid stability.",
    metrics: ["24/7 Dispatchable", "Zero Surface Emissions"],
    href: "#geothermal",
  },
  {
    id: "02",
    tagline: "CHEMICAL SYNTHESIS",
    title: "Green Hydrogen",
    description:
      "Utilizing dedicated geothermal electricity to power closed-loop electrolysis, producing industrial-scale green hydrogen without fossil fuel dependency.",
    metrics: ["100% Green Powered", "High-Yield Electrolysis"],
    href: "#hydrogen",
  },
  {
    id: "03",
    tagline: "RESOURCE EXTRACTION",
    title: "Sustainable Lithium",
    description:
      "Deploying Direct Lithium Extraction (DLE) technology to recover battery-grade lithium from geothermal brine, eliminating the need for massive evaporation ponds.",
    metrics: ["Battery-Grade Yield", "Minimal Land Footprint"],
    href: "#lithium",
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Create a master timeline attached to the scroll position of this section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Triggers when the top of the section is 75% down the viewport
          toggleActions: "play none none none", // Plays once and stays
        },
      });

      // 1. Header elements slide up and fade in sequentially
      tl.fromTo(
        ".gsap-header-elem",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // 2. The structural grid fades in slightly
      tl.fromTo(
        ".gsap-grid-container",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.4" // Start slightly before the header finishes
      );

      // 3. The individual cards stagger up with a slight skew for a mechanical feel
      tl.fromTo(
        ".gsap-card",
        { y: 50, opacity: 0, skewY: 1 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.2"
      );
    },
    { scope: sectionRef } // Scoping ensures we only animate elements inside this section
  );

  return (
    <section ref={sectionRef} id="expertise" className="bg-white py-24 lg:py-32 relative z-10 overflow-hidden">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        
        {/* HEADER AREA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 lg:mb-24">
          <div className="max-w-3xl">
            {/* Added 'gsap-header-elem' for targeting */}
            <div className="gsap-header-elem flex items-center gap-3 mb-6 opacity-0">
              <span className="w-8 h-px bg-primary"></span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                Core Competencies
              </span>
            </div>
            <h2 className="gsap-header-elem text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight text-slate-900 leading-[1.1] opacity-0">
              Transforming subsurface energy into{" "}
              <span className="font-medium">industrial power.</span>
            </h2>
          </div>
          <div className="max-w-md lg:text-right gsap-header-elem opacity-0">
            <p className="text-[15px] leading-relaxed text-slate-600 font-medium">
              We engineer advanced geothermal infrastructure to provide 
              zero-carbon electricity, while simultaneously harvesting 
              battery-grade commodities from subsurface brine.
            </p>
          </div>
        </div>

        {/* BENTO GRID */}
        {/* Added 'gsap-grid-container' */}
        <div className="gsap-grid-container grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden opacity-0">
          
          {expertiseData.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              // Added 'gsap-card' and 'opacity-0' initial state
              className="gsap-card opacity-0 group relative bg-white p-10 md:p-14 flex flex-col justify-between hover:bg-slate-50 transition-colors duration-500 min-h-105"
            >
              {/* Card Header */}
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span className="text-sm font-mono font-medium text-slate-400 group-hover:text-primary transition-colors duration-500">
                    {item.id}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                    {item.tagline}
                  </span>
                </div>
                
                <h3 className="text-3xl font-heading font-light text-slate-900 mb-6">
                  {item.title}
                </h3>
                
                <p className="text-[15px] leading-relaxed text-slate-600 mb-10">
                  {item.description}
                </p>
              </div>

              {/* Card Footer (Metrics & Interaction) */}
              <div className="mt-auto border-t border-slate-100 pt-8 flex items-end justify-between relative overflow-hidden">
                <ul className="flex flex-col gap-2">
                  {item.metrics.map((metric, i) => (
                    <li key={i} className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
                      <span className="w-1 h-1 rounded-full bg-primary/40 transition-colors duration-500 group-hover:bg-primary"></span>
                      {metric}
                    </li>
                  ))}
                </ul>

                {/* Animated Arrow Icon */}
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 -rotate-45 group-hover:rotate-0">
                  <FaArrowRight size={14} />
                </div>
              </div>
              
              {/* Subtle hover accent line at the bottom */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
            </Link>
          ))}
          
        </div>
      </div>
    </section>
  );
}