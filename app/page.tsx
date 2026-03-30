import { MobileBookBar } from "@/components/marketing/mobile-book-bar";
import {
  BookingSection,
  CaseStudiesSection,
  FounderSection,
  HeroSection,
  PainPointsSection,
  ProcessSection,
} from "@/components/marketing/sections";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { PanelGlowController } from "@/components/ui/panel-glow-controller";
import { SiteWebglBackground } from "@/components/ui/site-webgl-background";
import { siteContent } from "@/content/site-content";

export default function Home() {
  return (
    <>
      <SiteHeader
        brandName={siteContent.brandName}
        links={siteContent.navigation.links}
        cta={siteContent.cta}
      />

      <SiteWebglBackground />
      <div className="pointer-events-none fixed inset-0 z-[1] bento-mask opacity-20" />

      <main className="relative z-10 overflow-x-hidden pb-28 md:pb-0">
        <HeroSection
          hero={siteContent.hero}
          cta={siteContent.cta}
          toolLabels={siteContent.toolChips}
        />
        <PanelGlowController />
        <PainPointsSection
          painPoints={siteContent.painPoints}
          toolLabels={siteContent.toolChips}
        />
        <CaseStudiesSection caseStudies={siteContent.caseStudies} />
        <FounderSection founder={siteContent.founder} />
        <ProcessSection process={siteContent.process} />
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
