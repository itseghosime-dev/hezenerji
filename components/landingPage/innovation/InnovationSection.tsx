"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaArrowRight } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Minimalist, Patent-Style Technical Schematics (Flat 1px lines, zero glow)
function PatentSchematic({ type }: { type: "dle" | "h2" | "cascade" }) {
  if (type === "dle") {
    return (
      <svg viewBox="0 0 340 100" fill="none" className="w-full h-20 text-slate-400">
        {/* Main Flow Rail */}
        <line x1="10" y1="50" x2="330" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Adsorption Sieve Columns */}
        {[70, 130, 190].map((x, i) => (
          <g key={i}>
            <rect x={x} y="20" width="36" height="60" stroke="#475569" strokeWidth="1" fill="#020617" />
            <line x1={x + 6} y1="35" x2={x + 30} y2="35" stroke="#334155" strokeWidth="0.75" />
            <line x1={x + 6} y1="50" x2={x + 30} y2="50" stroke="#334155" strokeWidth="0.75" />
            <line x1={x + 6} y1="65" x2={x + 30} y2="65" stroke="#334155" strokeWidth="0.75" />
            <text x={x + 9} y="30" fill="#64748b" className="text-[7px] font-mono">COL-{i + 1}</text>
          </g>
        ))}

        {/* Input / Output Taps */}
        <path d="M 20 50 L 60 50" stroke="#64748b" strokeWidth="1.2" />
        <path d="M 236 50 L 320 50" stroke="#2EB67D" strokeWidth="1.2" />
        
        {/* Technical Callouts */}
        <text x="15" y="42" fill="#64748b" className="text-[8px] font-mono tracking-wider">BRINE IN</text>
        <text x="245" y="42" fill="#2EB67D" className="text-[8px] font-mono tracking-wider font-semibold">BATTERY Li+ [99.5%]</text>
      </svg>
    );
  }

  if (type === "h2") {
    return (
      <svg viewBox="0 0 340 100" fill="none" className="w-full h-20 text-slate-400">
        {/* Steam Feed Line */}
        <line x1="20" y1="50" x2="100" y2="50" stroke="#475569" strokeWidth="1" />
        
        {/* Heat Exchanger Unit */}
        <rect x="100" y="24" width="56" height="52" stroke="#475569" strokeWidth="1" fill="#020617" />
        <path d="M 112 36 L 144 64 M 144 36 L 112 64" stroke="#334155" strokeWidth="0.8" />
        <text x="106" y="20" fill="#64748b" className="text-[7px] font-mono">HEX-160°C</text>

        {/* Electrolyzer Stack */}
        <line x1="156" y1="50" x2="190" y2="50" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
        <rect x="190" y="18" width="70" height="64" stroke="#475569" strokeWidth="1" fill="#020617" />
        <line x1="225" y1="18" x2="225" y2="82" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
        <text x="200" y="32" fill="#64748b" className="text-[7px] font-mono">PEM STACK</text>
        <text x="196" y="54" fill="#94a3b8" className="text-[8px] font-mono font-medium">H₂O → H₂ + O₂</text>

        {/* Output */}
        <path d="M 260 50 L 320 50" stroke="#2EB67D" strokeWidth="1.2" />
        <text x="272" y="42" fill="#2EB67D" className="text-[8px] font-mono tracking-wider font-semibold">GREEN H₂</text>
      </svg>
    );
  }

  // Thermal Cascade
  return (
    <svg viewBox="0 0 340 100" fill="none" className="w-full h-20 text-slate-400">
      {/* Cascade Stepped Rule */}
      <path d="M 20 28 L 100 28 L 100 52 L 200 52 L 200 76 L 310 76" stroke="#475569" strokeWidth="1" />
      
      {/* Stage Indicators */}
      <circle cx="100" cy="28" r="3" fill="#020617" stroke="#64748b" strokeWidth="1.5" />
      <circle cx="200" cy="52" r="3" fill="#020617" stroke="#64748b" strokeWidth="1.5" />
      <circle cx="310" cy="76" r="3" fill="#020617" stroke="#2EB67D" strokeWidth="1.5" />

      {/* Stage Readouts */}
      <text x="25" y="22" fill="#94a3b8" className="text-[8px] font-mono">ORC BASELOAD [24 MWe]</text>
      <text x="110" y="46" fill="#94a3b8" className="text-[8px] font-mono">BORON SEPARATION [65°C]</text>
      <text x="205" y="70" fill="#2EB67D" className="text-[8px] font-mono font-semibold">HYDROPONIC AGRO LOOP</text>
      
      {/* Return Loop */}
      <path d="M 310 76 C 330 90, 310 94, 260 94 L 40 94 C 20 94, 15 80, 20 28" stroke="#334155" strokeWidth="0.75" strokeDasharray="3 3" />
      <text x="130" y="91" fill="#475569" className="text-[7px] font-mono">100% REINJECTION</text>
    </svg>
  );
}

const innovations = [
  {
    id: "01",
    tag: "CRITICAL MINERAL RECOVERY",
    title: "Direct Lithium Extraction (DLE)",
    description:
      "Selective adsorption columns positioned directly on post-turbine brine. Recovers battery-grade lithium carbonate (Li₂CO₃) without evaporative yield loss or environmental disturbance.",
    metricValue: "99.5%",
    metricLabel: "Target Chemical Purity",
    schematic: "dle" as const,
  },
  {
    id: "02",
    tag: "HIGH-ENTHALPY SYNTHESIS",
    title: "Geothermal Green Hydrogen",
    description:
      "Integrating continuous geothermal baseload power with high-temperature electrolyzers to sustain green hydrogen output at 95%+ capacity factors impossible via intermittent solar or wind.",
    metricValue: "24/7",
    metricLabel: "Baseload Electrolysis",
    schematic: "h2" as const,
  },
  {
    id: "03",
    tag: "CIRCULAR INDUSTRIAL MODEL",
    title: "Boron Capture & Regional Agro",
    description:
      "A thermodynamic cascade extracting commercial boron crystals while channeling residual 60°C–80°C effluent into regional high-efficiency hydroponic greenhouse systems.",
    metricValue: "100%",
    metricLabel: "Thermal Utilization",
    schematic: "cascade" as const,
  },
];

export default function InnovationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-inno-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".gsap-inno-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="technology"
      className="bg-slate-950 py-24 lg:py-40 relative z-10 text-white"
    >
      <div className="max-w-360 mx-auto px-6 md:px-12">
        
        {/* HEADER AREA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 lg:mb-24">
          <div className="max-w-3xl">
            <div className="gsap-inno-header flex items-center gap-3 mb-6 opacity-0">
              <span className="w-8 h-px bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                The Next Frontier
              </span>
            </div>

            <h2 className="gsap-inno-header text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight text-white leading-[1.1] opacity-0">
              Transforming thermal brine into{" "}
              <span className="font-medium text-slate-400">
                strategic assets.
              </span>
            </h2>
          </div>

          <div className="max-w-sm gsap-inno-header opacity-0">
            <p className="text-[15px] leading-relaxed text-slate-400 font-medium">
              We engineer beyond electricity generation. By extracting
              high-value critical minerals, we unlock the full thermodynamic
              value of subsurface assets.
            </p>
          </div>
        </div>

        {/* SWISS ENGINEERING GRID
          Razor-sharp 1px borders, quiet dark cards, no glowing shadows
        */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-slate-800/60 border border-slate-800/60"
        >
          {innovations.map((item) => (
            <div
              key={item.id}
              className="gsap-inno-card opacity-0 group bg-slate-950 p-10 lg:p-12 flex flex-col justify-between hover:bg-slate-900/80 transition-colors duration-500 min-h-130"
            >
              <div>
                {/* Top Number + Tag */}
                <div className="flex items-center justify-between mb-10">
                  <span className="text-sm font-mono font-medium text-slate-500 group-hover:text-primary transition-colors duration-500">
                    {item.id}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-heading font-light text-white mb-6">
                  {item.title}
                </h3>

                {/* PATENT SCHEMATIC (Quiet, restrained, 1px lines) */}
                <div className="my-6 py-4 border-y border-slate-900">
                  <PatentSchematic type={item.schematic} />
                </div>

                <p className="text-[14px] leading-relaxed text-slate-400 font-light">
                  {item.description}
                </p>
              </div>

              {/* Bottom Metrics */}
              <div className="mt-12 pt-6 border-t border-slate-800/60 flex items-end justify-between">
                <div>
                  <span className="block text-3xl font-heading font-light text-white mb-1">
                    {item.metricValue}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500">
                    {item.metricLabel}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500 -rotate-45 group-hover:rotate-0">
                  <FaArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}