import ExpertiseSection from "@/components/landingPage/expertise/ExpertiseSection";
import HeroSection from "@/components/landingPage/hero/HeroSection";
import CompanyVideoSection from "@/components/landingPage/video/CompanyVideoSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExpertiseSection />
      <CompanyVideoSection />
    </main>
  );
}
