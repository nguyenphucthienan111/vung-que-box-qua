import React from "react";
import { HeroSection } from "@/sections/HeroSection";
import { RegionExplorerSection } from "@/sections/RegionExplorerSection";
import { ProductShowcaseSection } from "@/sections/ProductShowcaseSection";
import { BuildYourBoxTeaser } from "@/sections/BuildYourBoxTeaser";
import { BrandStorySection } from "@/sections/BrandStorySection";
import { WhyChooseUsSection } from "@/sections/WhyChooseUsSection";
import { CinematicVideoSection } from "@/sections/CinematicVideoSection";
import { SocialProofSection } from "@/sections/SocialProofSection";
import { JournalPreviewSection } from "@/sections/JournalPreviewSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero with TRUE 3D Box & Food Flying Transition */}
      <HeroSection />

      {/* 2. Interactive Region Explorer */}
      <RegionExplorerSection />

      {/* 3. Featured Product Showcase */}
      <ProductShowcaseSection />

      {/* 4. Build Your Box Interactive Configurator Teaser */}
      <BuildYourBoxTeaser />

      {/* 5. Brand Story: Không chỉ là quà tặng, mà là cả một hành trình */}
      <BrandStorySection />

      {/* 6. Why Choose Us with Animated Features */}
      <WhyChooseUsSection />

      {/* 7. Cinematic Video Section */}
      <CinematicVideoSection />

      {/* 8. Social Proof & Customer Unboxing */}
      <SocialProofSection />

      {/* 9. Journal & Culinary Stories */}
      <JournalPreviewSection />
    </>
  );
}
