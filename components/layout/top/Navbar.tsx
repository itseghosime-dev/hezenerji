import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/data/nav-config";
import NavbarShell from "./NavbarShell";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const BrandContent = (
    <>
      <Link href="/" className="flex items-center gap-3 focus:outline-none z-50 relative">
        <Image
          src="/images/logo/hez-enerji.svg"
          alt="Hez Enerji Logo"
          height={40}
          width={120}
          className="object-contain w-auto h-9 lg:h-10 transition-all duration-500"
          draggable="false"
          priority
        />
      </Link>

      <nav className="hidden lg:flex items-center gap-12">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="relative text-[15px] font-medium tracking-wide text-white/90 group-[.is-white-bg]/nav:text-slate-600 hover:text-white group-[.is-white-bg]/nav:hover:text-primary transition-colors duration-300 py-2 group/link"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-right transition-transform duration-500 ease-out group-hover/link:scale-x-100 group-hover/link:origin-left" />
          </Link>
        ))}
      </nav>
    </>
  );

  const CtaButton = (
    <Link
      href="#contact"
      className="flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] font-bold tracking-widest uppercase transition-colors duration-300 bg-white text-slate-950 group-[.is-white-bg]/nav:bg-slate-950 group-[.is-white-bg]/nav:text-white hover:bg-primary group-[.is-white-bg]/nav:hover:bg-primary hover:text-white"
    >
      Get in Touch
    </Link>
  );

  const MobileNavTree = (
    <nav className="flex flex-col gap-8 items-start mt-10">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-4xl md:text-5xl font-heading font-light tracking-tight text-slate-900 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const DrawerLogo = (
    <Image
      src="/images/logo/hez-enerji.svg"
      alt="Hez Enerji Logo"
      height={40}
      width={120}
      className="object-contain w-auto h-9 lg:h-10"
      draggable="false"
      priority
    />
  );

  return (
    <NavbarShell
      brandContent={BrandContent}
      ctaButton={CtaButton}
      mobileMenu={<MobileMenu logo={DrawerLogo} navLinks={MobileNavTree} />}
    />
  );
}