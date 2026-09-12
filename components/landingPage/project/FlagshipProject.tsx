"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaPlus } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projectSpecs = [
  {
    id: "01",
    category: "CAPACITY & GENERATION",
    title: "24 MWe Base Output",
    description:
      "The facility operates a 24 MWe Organic Rankine Cycle (ORC) binary power plant. It is engineered to produce a projected gross 200.5 million kWh of clean electricity annually.",
    dataHash: "SYS.CAP.2400",
  },
  {
    id: "02",
    category: "CORE TECHNOLOGY",
    title: "Radial Outflow Turbines",
    description:
      "Hardware procurement was secured with green-tech provider Exergy International to install two highly efficient 12 MWe Radial Outflow Turbines (ROT).",
    dataHash: "EXG.ROT.12X2",
  },
  {
    id: "03",
    category: "SUBSURFACE INFRASTRUCTURE",
    title: "12-Well Network",
    description:
      "The plant utilizes a closed-loop network of 12 drilled wells. Seven wells are dedicated to active steam and hot water extraction, while five are utilized for eco-friendly resource reinjection back into the bedrock.",
    dataHash: "WELL.NET.7E5R",
  },
  {
    id: "04",
    category: "MINERAL DIVERSIFICATION",
    title: "Lithium & Boron Recovery",
    description:
      "Maximizing the chemical properties of the thermal brine, the facility framework includes investments in Direct Lithium Extraction (DLE) and boron recovery directly from plant wastewater.",
    dataHash: "CHEM.DLE.B10",
  },
  {
    id: "05",
    category: "ENVIRONMENTAL IMPACT",
    title: "70,000 Tons CO2 Offset",
    description:
      "At full commercial load, the Hez Moralı plant offsets roughly 70,000 tons of CO2 emissions annually compared to traditional fossil-fuel generation.",
    dataHash: "ENV.CO2.70K",
  },
];

export default function FlagshipProject() {
  const containerRef = useRef<HTMLElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Sticky Header Elements Fade In
      gsap.fromTo(
        ".gsap-project-header",
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

      // 2. Individual Card Mechanics
      gsap.utils.toArray(".gsap-spec-wrapper").forEach((wrapper: any) => {
        const innerCard = wrapper.querySelector(".gsap-spec-card-inner");
        const line = wrapper.querySelector(".gsap-card-line");
        const crosshair = wrapper.querySelector(".gsap-crosshair");

        // A) Wrapper Entrance: fires once cleanly on enter
        gsap.fromTo(
          wrapper,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );

        // B) Scrubbed Focus Line & Crosshair
        if (line && crosshair) {
          const scrubTl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top 60%",
              end: "bottom 55%",
              scrub: true,
            },
          });

          scrubTl.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0);
          scrubTl.to(crosshair, { rotation: 90, color: "#2EB67D", ease: "none" }, 0);
        }

        // C) Focus Dim / Restore (Bidirectional)
        // Dims as it exits past the top, smoothly restores to 1.0 when scrolling back down
        if (innerCard) {
          gsap.fromTo(
            innerCard,
            { opacity: 1, scale: 1 },
            {
              opacity: 0.25,
              scale: 0.985,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 12%", // Starts dimming when approaching top of viewport
                end: "bottom 2%",  // Fully dimmed right before leaving view
                scrub: true,       // Ensures exact reverse-playback when scrolling back up
              },
            }
          );
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="project"
      className="bg-[#F8F9FA] py-20 lg:py-40 relative z-10 border-t border-slate-200"
    >
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-start relative">
          
          {/* MOBILE TIMELINE LINE (Hidden on Desktop) */}
          <div className="absolute left-5.75 top-0 bottom-0 w-px bg-slate-200 lg:hidden z-0"></div>

          {/* LEFT COLUMN: Sticky Context */}
          <div className="w-full lg:w-4/12 self-start lg:sticky lg:top-40 z-10 bg-[#F8F9FA] lg:bg-transparent py-4 lg:py-0">
            <div className="gsap-project-header flex items-center gap-3 mb-6 opacity-0">
              <span className="w-8 h-px bg-primary lg:hidden"></span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                Flagship Asset
              </span>
            </div>

            <h2 className="gsap-project-header text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight text-slate-900 leading-[1.1] mb-8 opacity-0">
              Hez Moralı <br />
              <span className="font-medium">GPP-1.</span>
            </h2>

            <p className="gsap-project-header text-[15px] leading-relaxed text-slate-600 font-medium max-w-sm opacity-0">
              Constructed with an initial capital requirement estimated at USD 100 million and backed by domestic and World Bank frameworks, the Hez Moralı Geothermal Power Plant stands as a turnkey, high-efficiency power-producing asset.
            </p>

            {/* Industrial Accent Metric */}
            <div className="gsap-project-header mt-12 pt-12 border-t border-slate-200 opacity-0">
              <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">
                License Area Footprint
              </p>
              <p className="text-4xl font-heading font-light text-slate-900">
                9,055 <span className="text-lg text-slate-400 font-medium">Hectares</span>
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <p className="text-[12px] text-slate-500 font-mono tracking-wide uppercase">
                  Germencik, Aydın [37.86° N, 27.66° E]
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Scrolling Specifications */}
          <div ref={rightColRef} className="w-full lg:w-8/12 flex flex-col gap-6 lg:gap-12 pb-20 lg:pb-0 z-10 relative">
            {projectSpecs.map((spec) => (
              <div
                key={spec.id}
                className="gsap-spec-wrapper opacity-0 relative ml-4 lg:ml-0"
              >
                {/* Mobile Timeline Node */}
                <div className="absolute top-12 -left-5.25 w-2.25 h-2.25 bg-white border-2 border-primary rounded-full lg:hidden z-20"></div>

                {/* Inner Card (Controlled by scrub dimming/brightening) */}
                <div className="gsap-spec-card-inner group relative bg-white border border-slate-200/80 p-8 md:p-12 lg:p-16 overflow-hidden shadow-sm transition-colors duration-300 hover:border-slate-300">
                  
                  {/* Card Left Line (Scrubbed independently per card) */}
                  <div className="hidden lg:block absolute top-0 left-0 w-0.5 h-full bg-slate-100"></div>
                  <div
                    className="gsap-card-line hidden lg:block absolute top-0 left-0 w-0.5 h-full bg-primary origin-top"
                    style={{ transform: "scaleY(0)" }}
                  ></div>

                  {/* Crosshair (Rotates & highlights with scrub) */}
                  <div className="gsap-crosshair absolute top-8 right-8 text-slate-300">
                    <FaPlus size={14} />
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono font-medium text-slate-400">
                        {spec.id}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 bg-slate-50 px-3 py-1.5 border border-slate-100">
                        {spec.category}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-300 hidden md:block">
                      {spec.dataHash}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-slate-900 mb-5">
                    {spec.title}
                  </h3>

                  <p className="text-[15px] lg:text-base leading-relaxed text-slate-600 max-w-2xl">
                    {spec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}