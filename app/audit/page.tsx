import type { Metadata } from "next";
import { siteContent } from "@/content/site-content";
import { AuditForm } from "@/components/marketing/audit-form";

export const metadata: Metadata = {
  title: `AI & Automation Readiness Audit | ${siteContent.brandName}`,
  description:
    "10 questions. Instant diagnosis. Find out how much time and revenue your business could reclaim with AI and automation.",
};

export default function AuditPage() {
  return (
    <main className="relative min-h-screen">
      <AuditForm bookingUrl={siteContent.cta.bookingUrl} />
    </main>
  );
}
