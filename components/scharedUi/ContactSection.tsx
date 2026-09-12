"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaArrowRight } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useGSAP(
    () => {
      // Left Column Text Reveal
      gsap.fromTo(
        ".gsap-contact-text",
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

      // Right Column Form Stagger Reveal
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll(".gsap-form-item");
        gsap.fromTo(
          formElements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="company"
      className="bg-slate-950 py-24 lg:py-40 relative z-10 text-white border-t border-slate-900"
    >
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0">
          
          {/* LEFT COLUMN: Editorial Contact Info */}
          <div className="w-full lg:w-1/2 lg:pr-24 flex flex-col justify-between">
            <div>
              <div className="gsap-contact-text flex items-center gap-3 mb-8 opacity-0">
                <span className="w-8 h-px bg-primary" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary">
                  Get in Touch
                </span>
              </div>

              <h2 className="gsap-contact-text text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight leading-[1.1] mb-8 opacity-0">
                Let&apos;s build the <br />
                <span className="font-medium">future of energy.</span>
              </h2>

              <p className="gsap-contact-text text-[15px] leading-relaxed text-slate-400 max-w-md mb-16 opacity-0">
                Whether you are exploring investment opportunities, engineering partnerships, or media inquiries, our team is ready to connect.
              </p>
            </div>

            {/* Clean, Icon-less Information Blocks */}
            <div className="gsap-contact-text opacity-0 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
              <div>
                <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-4">
                  Headquarters
                </span>
                <address className="not-italic text-[15px] text-slate-300 leading-relaxed no-translate">
                  Moralı Mah. Tariş Küme <br />
                  Evleri Mevkii Ortaklar <br />
                  No: 118 Germencik / Aydın / Turkey
                </address>
              </div>

              <div>
                <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-4">
                  Direct Contact
                </span>
                <a
                  href="mailto:iletisim@hezenerji.com"
                  className="text-[15px] text-slate-300 hover:text-primary transition-colors duration-300 no-translate block mb-2"
                >
                  iletisim@hezenerji.com
                </a>
                <p className="text-[14px] text-slate-500">
                  Response within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Minimalist Form */}
          {/* A single architectural border separates the sections on desktop */}
          <div className="w-full lg:w-1/2 lg:pl-24 lg:border-l lg:border-slate-800 pt-10 lg:pt-0">
            <form ref={formRef} className="flex flex-col gap-10">
              
              <div className="gsap-form-item opacity-0 flex flex-col md:flex-row gap-10">
                {/* Clean Input fields with quiet placeholders */}
                <div className="w-full">
                  <label htmlFor="name" className="block text-[11px] font-mono tracking-widest text-slate-500 uppercase mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-transparent border-b border-slate-800 text-white text-[15px] pb-3 focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-slate-700"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="organization" className="block text-[11px] font-mono tracking-widest text-slate-500 uppercase mb-3">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    className="w-full bg-transparent border-b border-slate-800 text-white text-[15px] pb-3 focus:outline-none focus:border-primary transition-colors rounded-none placeholder:text-slate-700"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div className="gsap-form-item opacity-0">
                <label htmlFor="inquiry" className="block text-[11px] font-mono tracking-widest text-slate-500 uppercase mb-3">
                  Inquiry Type *
                </label>
                <div className="relative">
                  <select
                    id="inquiry"
                    className="w-full bg-transparent border-b border-slate-800 text-slate-300 text-[15px] pb-3 focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer rounded-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-slate-900 text-slate-500">
                      Please select a topic...
                    </option>
                    <option value="investment" className="bg-slate-900 text-white">Investment & Partnerships</option>
                    <option value="engineering" className="bg-slate-900 text-white">Engineering & Procurement</option>
                    <option value="media" className="bg-slate-900 text-white">Media & Press</option>
                    <option value="other" className="bg-slate-900 text-white">General Inquiry</option>
                  </select>
                  <div className="absolute right-0 top-0 pointer-events-none text-slate-600 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <div className="gsap-form-item opacity-0">
                <label htmlFor="message" className="block text-[11px] font-mono tracking-widest text-slate-500 uppercase mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-slate-800 text-white text-[15px] pb-3 focus:outline-none focus:border-primary transition-colors resize-none rounded-none placeholder:text-slate-700"
                  placeholder="How can we assist you?"
                  required
                />
              </div>

              {/* Elegant Submit Button */}
              <button
                type="submit"
                className="gsap-form-item opacity-0 mt-4 self-start bg-white text-slate-950 font-medium px-10 py-4 flex items-center justify-center gap-4 hover:bg-primary hover:text-white transition-colors duration-300 group"
              >
                Send Message
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}