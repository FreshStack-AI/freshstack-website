type Tool = {
  name: string;
  icon?: string; // simpleicons.org slug
};

const TOOLS: Tool[] = [
  { name: "n8n",           icon: "n8n" },
  { name: "Make",          icon: "make" },
  { name: "Claude",        icon: "anthropic" },
  { name: "Notion",        icon: "notion" },
  { name: "HubSpot",       icon: "hubspot" },
  { name: "Airtable",      icon: "airtable" },
  { name: "Slack",         icon: "slack" },
  { name: "OpenAI",        icon: "openai" },
  { name: "Fireflies" },
  { name: "GitHub",        icon: "github" },
  { name: "Zapier",        icon: "zapier" },
  { name: "Supabase",      icon: "supabase" },
  { name: "Google Sheets", icon: "googlesheets" },
  { name: "TypeScript",    icon: "typescript" },
  { name: "React",         icon: "react" },
  { name: "Python",        icon: "python" },
  { name: "Telegram",      icon: "telegram" },
  { name: "Postman",       icon: "postman" },
];

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 px-6">
      {tool.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${tool.icon}`}
          alt={tool.name}
          width={16}
          height={16}
          className="h-4 w-4 shrink-0"
          style={{ filter: "brightness(0) invert(1)", opacity: 0.45 }}
          aria-hidden="true"
        />
      ) : (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8c0b0]/40" />
      )}
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
      className="relative z-10 bg-[#0a0a0a] px-5 pb-24 pt-4 sm:px-8 lg:px-10 lg:pb-32 lg:pt-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <div className="mb-10 text-center">
          <p className="section-label mb-3">
            <span className="mr-2 opacity-50">//</span>
            Built on the tools you already use
          </p>
        </div>
      </div>

      {/* Strip — slightly lighter bg to create depth */}
      <div className="relative bg-[#111111]">
        {/* Top rule */}
        <div className="h-px w-full bg-[rgba(245,240,232,0.07)]" />

        <div className="relative overflow-hidden py-6">
          {/* Left edge fade */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40"
            style={{ background: "linear-gradient(to right, #111111 20%, transparent 100%)" }}
          />
          {/* Right edge fade */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40"
            style={{ background: "linear-gradient(to left, #111111 20%, transparent 100%)" }}
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
