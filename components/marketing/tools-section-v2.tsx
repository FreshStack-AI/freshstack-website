type Tool = {
  name: string;
  icon?: string; // simple-icons slug (served via jsdelivr)
};

const CDN = "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons";

const TOOLS: Tool[] = [
  { name: "HubSpot",              icon: "hubspot" },
  { name: "Notion",               icon: "notion" },
  { name: "Asana",                icon: "asana" },
  { name: "Slack",                icon: "slack" },
  { name: "Gmail",                icon: "gmail" },
  { name: "Microsoft Teams",      icon: "microsoftteams" },
  { name: "Outlook",              icon: "microsoftoutlook" },
  { name: "Google Sheets",        icon: "googlesheets" },
  { name: "Airtable",             icon: "airtable" },
  { name: "Stripe",               icon: "stripe" },
  { name: "Google Calendar",      icon: "googlecalendar" },
  { name: "Outlook Calendar",     icon: "microsoftoutlook" },
  { name: "Zoom",                 icon: "zoom" },
  { name: "Calendly",             icon: "calendly" },
  { name: "Mailchimp",            icon: "mailchimp" },
  { name: "Typeform",             icon: "typeform" },
  { name: "Intercom",             icon: "intercom" },
  { name: "Zendesk",              icon: "zendesk" },
  { name: "Dropbox",              icon: "dropbox" },
  { name: "Google Drive",         icon: "googledrive" },
  { name: "OneDrive",             icon: "microsoftonedrive" },
  { name: "DocuSign",             icon: "docusign" },
  { name: "LinkedIn",             icon: "linkedin" },
  { name: "Telegram",             icon: "telegram" },
  { name: "WhatsApp Business",    icon: "whatsapp" },
  { name: "Twilio",               icon: "twilio" },
  { name: "ClickUp",              icon: "clickup" },
  { name: "Trello",               icon: "trello" },
];

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 px-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${CDN}/${tool.icon}.svg`}
        alt={tool.name}
        width={16}
        height={16}
        className="h-4 w-4 shrink-0"
        style={{ filter: "brightness(0) invert(1)", opacity: 0.45 }}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#c8c0b0]/60">
        {tool.name}
      </span>
      <span className="ml-4 h-3 w-px shrink-0 bg-[rgba(245,240,232,0.1)]" />
    </span>
  );
}

export function ToolsSectionV2() {
  return (
    <section
      id="tools"
      className="relative z-10 px-5 pb-24 pt-0 sm:px-8 lg:px-10 lg:pb-32 lg:pt-0"
    >
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div className="mb-10">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            Integrations
          </p>
          <h2 className="section-title text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-[3rem]">
            Your stack. Connected.
          </h2>
        </div>
      </div>

      {/* Ticker strip */}
      <div className="relative">
        {/* Top rule */}
        <div className="h-px w-full bg-[rgba(245,240,232,0.07)]" />

        <div className="relative overflow-hidden py-6" style={{ background: "rgba(17,17,17,0.6)" }}>
          {/* Left edge fade */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40"
            style={{ background: "linear-gradient(to right, rgba(10,10,10,0.95) 5%, transparent 100%)" }}
          />
          {/* Right edge fade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40"
            style={{ background: "linear-gradient(to left, rgba(10,10,10,0.95) 5%, transparent 100%)" }}
          />

          {/* Marquee — two copies for seamless loop */}
          <div className="animate-marquee flex w-max items-center">
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <ToolItem key={`${tool.name}-${i}`} tool={tool} />
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="h-px w-full bg-[rgba(245,240,232,0.07)]" />
      </div>
    </section>
  );
}
