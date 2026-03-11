import { MobileBookBar } from "@/components/marketing/mobile-book-bar";
import {
  AboutSection,
  BookingSection,
  CaseStudiesSection,
  FAQSection,
  HeroSection,
  PainPointsSection,
  ProcessSection,
  ServicesSection,
} from "@/components/marketing/sections";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { siteContent } from "@/content/site-content";

export default function Home() {
  return (
    <>
      <SiteHeader
        brandName={siteContent.brandName}
        links={siteContent.navigation.links}
        cta={siteContent.cta}
      />

      <main className="pb-28 md:pb-0">
        <HeroSection hero={siteContent.hero} cta={siteContent.cta} />
        <PainPointsSection painPoints={siteContent.painPoints} />
        <ServicesSection services={siteContent.services} />
        <CaseStudiesSection caseStudies={siteContent.caseStudies} />
        <ProcessSection process={siteContent.process} />
        <AboutSection about={siteContent.about} />
        <FAQSection faq={siteContent.faq} />
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
