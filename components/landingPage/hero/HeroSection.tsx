import { heroCarouselImages } from "@/data/hero-config";
import HeroOrchestrator from "./HeroOrchestrator";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";

export default function HeroSection() {
  return (
    <HeroOrchestrator
      images={heroCarouselImages}
      contentNode={<HeroContent />}
      statsNode={<HeroStats />}
    />
  );
}
