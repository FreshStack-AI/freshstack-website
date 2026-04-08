type Tool = {
  name: string;
  icon?: string; // simple-icons slug (served via jsdelivr)
};

const CDN = "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons";

const TOOLS: Tool[] = [
  // Niche / less common — scroll in later
  { name: "Twilio",               icon: "twilio" },
  { name: "DocuSign",             icon: "docusign" },
  { name: "Intercom",             icon: "intercom" },
  { name: "Zendesk",              icon: "zendesk" },
  { name: "Typeform",             icon: "typeform" },
  { name: "Dropbox",              icon: "dropbox" },
  { name: "OneDrive",             icon: "microsoftonedrive" },
  { name: "Telegram",             icon: "telegram" },
  { name: "Trello",               icon: "trello" },
  { name: "Outlook Calendar",     icon: "microsoftoutlook" },
  // Mid-tier — recognisable but not headliners
  { name: "ClickUp",              icon: "clickup" },
  { name: "Mailchimp",            icon: "mailchimp" },
  { name: "Asana",                icon: "asana" },
  { name: "LinkedIn",             icon: "linkedin" },
  { name: "Calendly",             icon: "calendly" },
  { name: "Airtable",             icon: "airtable" },
  { name: "WhatsApp Business",    icon: "whatsapp" },
  { name: "Microsoft Teams",      icon: "microsoftteams" },
  { name: "Outlook",              icon: "microsoftoutlook" },
  // Most prominent — visible first on screen
  { name: "Google Drive",         icon: "googledrive" },
  { name: "Google Calendar",      icon: "googlecalendar" },
  { name: "Zoom",                 icon: "zoom" },
  { name: "Stripe",               icon: "stripe" },
  { name: "Gmail",                icon: "gmail" },
  { name: "Google Sheets",        icon: "googlesheets" },
  { name: "HubSpot",              icon: "hubspot" },
  { name: "Notion",               icon: "notion" },
  { name: "Slack",                icon: "slack" },
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
    <div id="tools" className="relative z-10 -mt-4">
      {/* Top rule */}
      <div className="h-px w-full bg-[rgba(245,240,232,0.07)]" />

      <div className="relative overflow-hidden py-4" style={{ background: "rgba(17,17,17,0.6)" }}>
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

        {/* Marquee */}
        <div className="animate-marquee flex w-max items-center">
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <ToolItem key={`${tool.name}-${i}`} tool={tool} />
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="h-px w-full bg-[rgba(245,240,232,0.07)]" />
    </div>
  );
}
