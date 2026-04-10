import { InfiniteSlider } from "@/components/ui/infinite-slider";

type Logo = {
  src: string;
  alt: string;
};

const logos: Logo[] = [
  // Tier 1 — Highest recognition (appear first in scroll)
  { src: "/logos/slack.svg", alt: "Slack" },
  { src: "/logos/google-sheets.svg", alt: "Google Sheets" },
  { src: "/logos/gmail.svg", alt: "Gmail" },
  { src: "/logos/hubspot.svg", alt: "HubSpot" },
  { src: "/logos/notion.svg", alt: "Notion" },
  { src: "/logos/stripe.svg", alt: "Stripe" },
  { src: "/logos/zoom.svg", alt: "Zoom" },
  { src: "/logos/salesforce.svg", alt: "Salesforce" },
  // Tier 2 — Strong recognition
  { src: "/logos/google-drive.svg", alt: "Google Drive" },
  { src: "/logos/google-calendar.svg", alt: "Google Calendar" },
  { src: "/logos/microsoft-teams.svg", alt: "Microsoft Teams" },
  { src: "/logos/outlook.svg", alt: "Outlook" },
  { src: "/logos/airtable.svg", alt: "Airtable" },
  { src: "/logos/intercom.svg", alt: "Intercom" },
  { src: "/logos/zendesk.svg", alt: "Zendesk" },
  { src: "/logos/quickbooks.svg", alt: "QuickBooks" },
  // Tier 3 — Category specific
  { src: "/logos/calendly.svg", alt: "Calendly" },
  { src: "/logos/pipedrive.svg", alt: "Pipedrive" },
  { src: "/logos/asana.svg", alt: "Asana" },
  { src: "/logos/clickup.svg", alt: "ClickUp" },
  { src: "/logos/typeform.svg", alt: "Typeform" },
  { src: "/logos/xero.svg", alt: "Xero" },
  { src: "/logos/whatsapp.svg", alt: "WhatsApp Business" },
];

export function ToolsSectionV2() {
  return (
    <div id="tools" className="relative z-10 -mt-4">
      {/* Top rule */}
      <div className="h-px w-full bg-[rgba(245,240,232,0.07)]" />

      <div
        className="relative py-5"
        style={{
          background: "rgba(17,17,17,0.6)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <InfiniteSlider gap={48} speed={40} speedOnHover={15} reverse>
          {logos.map((logo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="pointer-events-none h-5 w-auto shrink-0 select-none opacity-50 transition-opacity duration-300 hover:opacity-90 md:h-6"
              style={{ filter: "brightness(0) invert(0.85) sepia(0.08)" }}
            />
          ))}
        </InfiniteSlider>
      </div>

      {/* Bottom rule */}
      <div className="h-px w-full bg-[rgba(245,240,232,0.07)]" />
    </div>
  );
}
