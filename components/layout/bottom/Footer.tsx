import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-slate-900 pt-24 pb-8 relative overflow-hidden border-t border-slate-200">
      
      {/* 
        SUPERGRAPHIC BACKGROUND TEXT 
        Replicates the massive "Heliora" text from your reference, 
        adapted for a light background (ultra-faint slate-50).
      */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none select-none flex justify-center pt-8 z-0">
        <span className="text-[18vw] md:text-[14vw] font-heading font-black text-slate-50 tracking-tighter uppercase whitespace-nowrap">
          HEZ ENERJI<span className="text-[4vw] align-top relative top-8 md:top-12">™</span>
        </span>
      </div>

      <div className="max-w-360 mx-auto px-6 md:px-12 relative z-10">
        
        {/* MAIN LAYOUT SPLIT */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-24 pt-10">
          
          {/* LEFT COLUMN: Newsletter & Socials */}
          <div className="w-full lg:w-4/12">
            <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-4">
              Newsletter
            </span>
            <h3 className="text-2xl md:text-3xl font-heading font-light text-slate-900 mb-4">
              Stay Ahead of the <br />
              <span className="font-medium">Energy Transition.</span>
            </h3>
            <p className="text-[14px] text-slate-500 leading-relaxed max-w-sm mb-8">
              Stay updated on renewable energy, sustainability trends, and clean tech innovations from HEZ Enerji.
            </p>

            {/* Pill-Shaped Newsletter Input (Matched to reference) */}
            <form className="flex items-center border border-slate-200 rounded-full p-1.5 max-w-sm bg-white hover:border-slate-300 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent pl-4 pr-2 py-2.5 text-[14px] w-full outline-none text-slate-900 placeholder:text-slate-400"
                required
              />
              <button
                type="submit"
                className="bg-primary text-slate-950 rounded-full px-6 py-2.5 text-[13px] font-bold tracking-wide uppercase hover:bg-slate-900 hover:text-white transition-colors duration-300 shrink-0"
              >
                Subscribe <MdOutlineArrowOutward />
              </button>
            </form>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-primary transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-primary transition-colors" aria-label="Twitter">
                <FaXTwitter size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-primary transition-colors" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Multi-Column Links Grid */}
          <div className="w-full lg:w-8/12 grid grid-cols-2 md:grid-cols-4 gap-10">
            
            {/* Column 1 */}
            <div>
              <h4 className="text-[10px] font-mono tracking-widest text-slate-900 uppercase mb-6 font-semibold">
                Platform
              </h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="#geothermal" className="text-[14px] text-slate-500 hover:text-primary transition-colors">Core Expertise</Link></li>
                <li><Link href="#project" className="text-[14px] text-slate-500 hover:text-primary transition-colors">Aydın GPP-1</Link></li>
                <li><Link href="#technology" className="text-[14px] text-slate-500 hover:text-primary transition-colors">R&D Innovation</Link></li>
                <li><Link href="#impact" className="text-[14px] text-slate-500 hover:text-primary transition-colors">ESG Impact</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-[10px] font-mono tracking-widest text-slate-900 uppercase mb-6 font-semibold">
                Corporate
              </h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-[14px] text-slate-500 hover:text-primary transition-colors">Investor Relations</a></li>
                <li><a href="#" className="text-[14px] text-slate-500 hover:text-primary transition-colors">Media & Press</a></li>
                <li><a href="#" className="text-[14px] text-slate-500 hover:text-primary transition-colors">Careers</a></li>
                <li><a href="https://margunenerji.com.tr" target="_blank" rel="noreferrer" className="text-[14px] text-slate-500 hover:text-primary transition-colors flex items-center gap-1">Margun Enerji <MdOutlineArrowOutward /></a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="text-[10px] font-mono tracking-widest text-slate-900 uppercase mb-6 font-semibold">
                Contact
              </h4>
              <ul className="flex flex-col gap-4">
                <li><a href="mailto:iletisim@hezenerji.com" className="text-[14px] text-slate-500 hover:text-primary transition-colors">iletisim@hezenerji.com</a></li>
                <li><a href="tel:+903120000000" className="text-[14px] text-slate-500 hover:text-primary transition-colors">+90 (312) 000 00 00</a></li>
                <li className="text-[14px] text-slate-500 mt-2">
                  Çankaya / Ankara, <br /> Türkiye
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="text-[10px] font-mono tracking-widest text-slate-900 uppercase mb-6 font-semibold">
                Legal
              </h4>
              <ul className="flex flex-col gap-4">
                <li><a href="#" className="text-[14px] text-slate-500 hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-[14px] text-slate-500 hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-[14px] text-slate-500 hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200 gap-4">
          <div className="flex items-center gap-4">
             <Image
                src="/images/logo/hez-enerji.svg" 
                alt="Hez Enerji Logo"
                width={100}
                height={24}
                className="object-contain h-5 w-auto opacity-80"
              />
            <p className="text-[11px] font-mono text-slate-500">
              &copy; {currentYear} HEZ Enerji A.Ş. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse"></span>
            Engineered for a Cleaner Tomorrow.
          </div>
        </div>

      </div>
    </footer>
  );
}