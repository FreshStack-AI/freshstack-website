import { MobileBookBar } from "@/components/marketing/mobile-book-bar";
import {
  BookingSection,
  CaseStudiesSection,
  FounderSection,
  HeroSection,
  ProcessSection,
} from "@/components/marketing/sections";
import { PainPointsSectionV2 } from "@/components/marketing/pain-points-section-v2";
import { ServicesSectionV2 } from "@/components/marketing/services-section-v2";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { ToolsSectionV2 } from "@/components/marketing/tools-section-v2";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { DeferredPanelGlowController } from "@/components/ui/deferred-panel-glow-controller";
import { siteContent } from "@/content/site-content";

export default function Home() {
  return (
    <>
      <SiteHeader
        brandName={siteContent.brandName}
        links={siteContent.navigation.links}
        cta={siteContent.cta}
      />

      <main className="relative z-10 overflow-x-hidden pb-28 md:pb-0">
        <HeroSection
          hero={siteContent.hero}
          cta={siteContent.cta}
        />
        <ToolsSectionV2 />
        <DeferredPanelGlowController />
        <PainPointsSectionV2 />
        <ServicesSectionV2 />
        <CaseStudiesSection caseStudies={siteContent.caseStudies} />
        <TestimonialsSection />
        <ProcessSection process={siteContent.process} />
        <FounderSection founder={siteContent.founder} />
        <BookingSection booking={siteContent.booking} cta={siteContent.cta} />
      </main>

      <SiteFooter
        brandName={siteContent.brandName}
        footer={siteContent.footer}
        links={siteContent.navigation.links}
        cta={siteContent.cta}
      />

      <MobileBookBar
        href={siteContent.cta.bookSectionHref}
        label={siteContent.cta.primaryLabel}
      />
    </>
  );
}
