import ExpertiseSection from "@/components/landingPage/expertise/ExpertiseSection";
import HeroSection from "@/components/landingPage/hero/HeroSection";
import InnovationSection from "@/components/landingPage/innovation/InnovationSection";
import FlagshipProject from "@/components/landingPage/project/FlagshipProject";
import CompanyVideoSection from "@/components/landingPage/video/CompanyVideoSection";
import ContactSection from "@/components/scharedUi/ContactSection";
import SustainabilitySection from "@/components/scharedUi/SustainabilitySection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExpertiseSection />
      <CompanyVideoSection />
      <FlagshipProject />
      <InnovationSection />
      <SustainabilitySection />
      <ContactSection />
    </main>
  );
}
