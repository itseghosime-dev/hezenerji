"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaPlus, FaMinus, FaArrowDown } from "react-icons/fa6";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const esgPillars = [
  {
    id: "01",
    title: "Environmental Stewardship",
    content:
      "At full commercial load, our facilities offset roughly 70,000 tons of CO2 emissions annually compared to fossil-fuel generation. Our strict 100% reinjection policy guarantees zero surface emissions and infinite reservoir longevity.",
  },
  {
    id: "02",
    title: "Corporate Governance & Compliance",
    content:
      "Engineered with an initial $100M capital requirement, our frameworks are heavily backed by domestic development banks and fully satisfy stringent World Bank environmental and social compliance standards.",
  },
  {
    id: "03",
    title: "National Energy Independence",
    content:
      "By securing electricity sales under Türkiye's YEKDEM renewable support scheme, we provide localized, 24/7 baseload power that actively reduces the nation's reliance on imported fossil fuels.",
  },
  {
    id: "04",
    title: "The Margun Enerji Synergy",
    content:
      "Following our 2026 100% equity share transfer, HEZ Enerji operates as a core foundational asset within Margun Enerji's expanded green portfolio, accelerating the regional transition to a zero-carbon economy.",
  },
];

export default function SustainabilitySection() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-esg-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="impact"
      className="bg-white py-24 lg:py-40 relative z-10 text-slate-900 border-t border-slate-200"
    >
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: The Vision Statement & Imagery */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-40">
            <div className="gsap-esg-fade flex items-center gap-3 mb-6 opacity-0">
              <span className="w-8 h-px bg-primary" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                Corporate ESG
              </span>
            </div>

            <h2 className="gsap-esg-fade text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight leading-[1.1] mb-8 opacity-0">
              Committed to a <br />
              <span className="font-medium">Zero-Carbon Economy.</span>
            </h2>

            <p className="gsap-esg-fade text-[15px] leading-relaxed text-slate-600 font-medium max-w-md mb-12 opacity-0">
              At HEZ Enerji, we do not just generate power; we take absolute responsibility for the future. Through pure geothermal baseloads and next-generation chemical R&D, we are driving systemic decarbonization.
            </p>

            {/* Industrial/Nature Hybrid Image (Placeholder) */}
            <div className="gsap-esg-fade relative w-full h-75 lg:h-100 opacity-0 overflow-hidden bg-slate-100">
              {/* Note: Replace this src with a real image from their site/assets */}
              <Image
                src="/images/carousel/3.jpg"
                alt="Clean Energy Environment"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Minimalist overlay badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 border border-slate-200">
                <span className="text-[10px] font-mono tracking-widest text-slate-900 uppercase font-semibold">
                  ISO 14001 COMPLIANT
                </span>
              </div>
            </div>
          </div>

 {/* RIGHT COLUMN: The Compressed Accordion & Footer Metrics */}
          <div className="w-full lg:w-7/12 flex flex-col pt-4">
            <div className="gsap-esg-fade opacity-0 border-t border-slate-200">
              {esgPillars.map((pillar, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={pillar.id}
                    className="border-b border-slate-200 group"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between py-8 text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-6 md:gap-10">
                        <span className="text-sm font-mono font-medium text-slate-400 group-hover:text-primary transition-colors">
                          {pillar.id}
                        </span>
                        <h3
                          className={`text-xl md:text-2xl font-heading transition-colors duration-300 ${
                            isOpen
                              ? "text-primary font-medium"
                              : "text-slate-900 font-light group-hover:text-primary"
                          }`}
                        >
                          {pillar.title}
                        </h3>
                      </div>
                      <div
                        className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "border-primary text-primary bg-primary/5"
                            : "border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary"
                        }`}
                      >
                        {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                      </div>
                    </button>

                    <div
                      className="grid transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-[15px] leading-relaxed text-slate-600 pb-8 pl-14 md:pl-20 max-w-2xl">
                          {pillar.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
 
            <div className="gsap-esg-fade opacity-0 mt-auto pt-12">
              <div className="grid grid-cols-2 gap-8 mb-8 pl-4 border-l border-slate-200">
                <div>
                  <span className="block text-3xl font-heading font-light text-slate-900 mb-1">
                    200.5M
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
                    Target Annual kWh
                  </span>
                </div>
                <div>
                  <span className="block text-3xl font-heading font-light text-slate-900 mb-1">
                    $105.5M
                  </span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
                    Baseline Valuation
                  </span>
                </div>
              </div>

              {/* Download CTA Box */}
              <div className="bg-slate-50 p-6 md:p-8 border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-slate-300 hover:bg-slate-100 transition-all duration-300">
                <div>
                  <h4 className="text-lg font-heading font-medium text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    2026 Corporate ESG Dossier
                  </h4>
                  <p className="text-[13px] text-slate-500 font-medium">
                    Download the full compliance & environmental impact report.
                  </p>
                </div>
                <div className="w-12 h-12 shrink-0 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
                  <FaArrowDown size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}