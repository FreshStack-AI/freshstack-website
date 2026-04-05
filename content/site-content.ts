export type CTAConfig = {
  bookingUrl: string;
  bookingEmbedUrl: string | null;
  contactEmail: string;
  primaryLabel: string;
  bookSectionHref: `#${string}`;
  hasLiveBookingUrl: boolean;
};

export type CaseStudy = {
  id: string;
  clientType: string;
  automationType: string;
  title: string;
  cardMetrics: Array<{
    value: string;
    label: string;
  }>;
  summary: string;
  serviceTags: string[];
  workflow: {
    inputs: string[];
    automationLabel: string;
    automationSteps: string[];
    outputs: string[];
  };
  challenge: string;
  intervention: string;
  outcomes: string[];
  quote: string | null;
};

type NavItem = {
  label: string;
  href: `#${string}`;
};

type SectionIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

type PainPoint = {
  title: string;
  description: string;
};

type FounderSectionContent = {
  eyebrow: string;
  profiles: Array<{
    name: string;
    bio: string;
    imageSrc?: string;
    imageAlt: string;
    usePlaceholder?: boolean;
  }>;
};

type ProcessStep = {
  title: string;
  description: string;
};

export type SiteContent = {
  brandName: string;
  siteUrl: string;
  meta: {
    title: string;
    description: string;
    ogImageUrl: string;
  };
  navigation: {
    links: NavItem[];
  };
  hero: SectionIntro & {
    displayLines: string[];
    proof: string;
    supportTitle: string;
    supportItems: string[];
  };
  painPoints: SectionIntro & {
    items: PainPoint[];
  };
  founder: FounderSectionContent;
  toolChips: string[];
  caseStudies: SectionIntro & {
    items: CaseStudy[];
  };
  process: SectionIntro & {
    steps: ProcessStep[];
  };
  booking: SectionIntro & {
    desktopLabel: string;
    fallbackLabel: string;
    checklist: string[];
  };
  footer: {
    blurb: string;
    contactLabel: string;
    legal: string;
  };
  cta: CTAConfig;
};

const SITE_FALLBACK = "https://freshstack.ai";
const BOOKING_PLACEHOLDER = "https://calendly.com/your-team/book-a-call";
const BOOK_SECTION_ID = "book-a-call";

function normalizeAbsoluteUrl(value: string | undefined, fallback: string) {
  const candidate = value?.trim() || fallback;

  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

function resolveAssetUrl(value: string | undefined, baseUrl: string) {
  const candidate = value?.trim() || "/og-placeholder.svg";

  try {
    return new URL(candidate, `${baseUrl}/`).toString();
  } catch {
    return new URL("/og-placeholder.svg", `${baseUrl}/`).toString();
  }
}

function buildCalendlyEmbedUrl(url: string, enabled: boolean) {
  if (!enabled) {
    return null;
  }

  try {
    const calendlyUrl = new URL(url);
    calendlyUrl.searchParams.set("hide_gdpr_banner", "1");
    calendlyUrl.searchParams.set("hide_event_type_details", "1");
    calendlyUrl.searchParams.set("background_color", "0a0a0a");
    calendlyUrl.searchParams.set("text_color", "ffffff");
    calendlyUrl.searchParams.set("primary_color", "9c9d9d");
    return calendlyUrl.toString();
  } catch {
    return null;
  }
}

const siteUrl = normalizeAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL, SITE_FALLBACK);
const rawBookingUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "";
const hasLiveBookingUrl = rawBookingUrl.length > 0;
const bookingUrl = hasLiveBookingUrl ? rawBookingUrl : BOOKING_PLACEHOLDER;
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@freshstack.ai";

export const siteContent: SiteContent = {
  brandName: "FreshStack",
  siteUrl,
  meta: {
    title: "FreshStack | Your AI growth partner",
    description:
      "FreshStack helps agencies replace operational drag with AI systems that increase leverage, speed delivery, and reduce founder dependency.",
    ogImageUrl: resolveAssetUrl(process.env.NEXT_PUBLIC_OG_IMAGE_URL, siteUrl),
  },
  navigation: {
    links: [
      { label: "Services", href: "#pain-points" },
      { label: "Case studies", href: "#case-studies" },
      { label: "Process", href: "#process" },
    ],
  },
  hero: {
    eyebrow: "Operator-built systems",
    title: "Your AI growth partner",
    displayLines: ["Your AI", "growth partner"],
    description: "Manual work should not slow growth",
    proof: "Built by agency owners with 10 years of firsthand operational experience.",
    supportTitle: "What the work usually tightens first",
    supportItems: [
      "Handoffs that stop living in Slack threads and scattered docs.",
      "Reporting loops leadership can actually use to make decisions.",
      "Automations the team can maintain after the first build is done.",
    ],
  },
  painPoints: {
    eyebrow: "Pain points",
    title: "Are you busy with the wrong stuff?",
    description: "",
    items: [
      {
        title: "Sales",
        description:
          "Too much sales activity still runs on manual follow-up, scattered notes, and inconsistent handoff into delivery.",
      },
      {
        title: "Delivery",
        description:
          "Weak handoffs and inconsistent execution reduce delivery capacity and create expensive rework.",
      },
      {
        title: "Reporting",
        description:
          "Manual reporting wastes time, delays decisions, and weakens client confidence.",
      },
      {
        title: "Operations",
        description:
          "Disconnected systems and repetitive admin work drag down efficiency, margin, and scalability.",
      },
    ],
  },
  founder: {
    eyebrow: "Meet the founders",
    profiles: [
      {
        name: "Baptiste",
        bio: "With over a decade inside some of the world's largest agencies, including WPP, and work delivered for brands like Binance and Adidas, Baptiste has seen how strong operations create speed, leverage, and commercial headroom. After building and automating his own business with AI, he now helps agency owners replace slow manual work with systems that scale delivery, free up leadership time, and create more room to grow.",
        imageSrc: "/optimized/founder-portrait.jpg",
        imageAlt: "Black-and-white portrait of Baptiste, founder of FreshStack",
      },
      {
        name: "Lara",
        bio: "With over a decade in high-pressure agency environments, Lara has seen first-hand how delivery, profitability, and client confidence suffer when the operating layer cannot keep up. She now helps agency owners build clearer systems, tighter workflows, and stronger reporting so growth does not come with more chaos.",
        imageSrc: "/optimized/lara-portrait.jpg",
        imageAlt: "Black-and-white portrait of Lara, co-founder of FreshStack",
      },
    ],
  },
  toolChips: [
    "n8n",
    "Make",
    "Notion",
    "Claude",
    "Claude Code",
    "Codex",
    "Python",
    "OpenClaw",
    "React",
    "Vite",
    "Supabase",
    "Slack",
    "Telegram",
    "Google Sheets",
    "Alchemy",
    "X API",
    "TypeScript",
    "Cursor",
    "GitHub",
    "Postman",
    "Zapier",
    "Airtable",
    "OpenAI API",
  ],
  caseStudies: {
    eyebrow: "Case studies",
    title: "Hear it from our happy clients.",
    description: "",
    items: [
      {
        id: "ops-reporting-placeholder",
        clientType: "Crypto-native service business",
        automationType: "Payment intelligence automation",
        title: "Crypto Payment Intelligence",
        cardMetrics: [
          { value: "$28K", label: "upside" },
          { value: "52 hrs", label: "saved" },
        ],
        summary:
          "By turning wallet scans, invoice matching, and finance alerts into one automated workflow, FreshStack gave the team real-time visibility on stablecoin payments without manual reconciliation.",
        serviceTags: [
          "Payment intelligence",
          "Invoice matching",
          "Finance alerts",
        ],
        workflow: {
          inputs: [
            "Stablecoin payments",
            "Wallet transaction data",
            "Invoice records in Notion",
          ],
          automationLabel: "Payment intelligence layer",
          automationSteps: [
            "Scan the wallet for incoming payments",
            "Match each transaction to the right invoice",
            "Alert finance the moment a payment lands",
          ],
          outputs: [
            "Slack finance notification",
            "Invoice marked paid faster",
            "Real-time payment visibility",
          ],
        },
        challenge:
          "The business received multiple stablecoin payments every day, but payment confirmations were scattered across Telegram chats and manual wallet checks. Finance had to reconcile payments by hand, which slowed accounting, obscured cash flow, and created awkward client follow-ups for invoices that had already been paid.",
        intervention:
          "FreshStack built an automated payment intelligence workflow that scans the wallet for incoming stablecoin transactions, matches them against invoice records in Notion, and alerts finance in Slack with the payer, amount, and a direct action to mark the invoice as paid.",
        outcomes: [
          "$28K per year in revenue upside unlocked through faster payment visibility and cleaner accounting.",
          "52 hours per year saved by removing manual wallet checks and invoice matching.",
          "Zero client chasing once paid transactions were detected and surfaced to finance in real time.",
        ],
        quote: null,
      },
      {
        id: "handoff-delivery-placeholder",
        clientType: "Creator marketing agency",
        automationType: "Sales-to-ops workflow automation",
        title: "Sales-to-Ops System",
        cardMetrics: [
          { value: "$352K", label: "upside" },
          { value: "650 hrs", label: "saved" },
        ],
        summary:
          "By replacing disconnected databases and manual proposal building with one connected workflow, FreshStack eliminated rate errors, sped up handoffs, and gave sales and operations a shared source of truth.",
        serviceTags: [
          "Proposal generation",
          "Sales ops",
          "Operational hygiene",
        ],
        workflow: {
          inputs: [
            "Sales brief and deal data",
            "Creator rate database",
            "Client proposal requirements",
          ],
          automationLabel: "Sales-to-ops workflow",
          automationSteps: [
            "Sync every deal into one source of truth",
            "Generate proposals from live rate data",
            "Hand off clean records into operations",
          ],
          outputs: [
            "Client-safe proposal draft",
            "Accurate creator pricing",
            "Ops-ready deal record",
          ],
        },
        challenge:
          "Sales and Operations were working from disconnected databases for every deal. That duplication created inconsistent rates, slow proposal turnaround, mispayments, and multiple versions of the truth across the process.",
        intervention:
          "FreshStack replaced the fragmented workflow with a fully connected system from Sales to Operations. Proposal data now flows from a single source of truth, creator rates sync automatically, and client-safe proposals can be generated instantly without copy-paste or cross-checking.",
        outcomes: [
          "$352K per year in revenue upside from faster proposals and fewer operational mistakes.",
          "650 hours per year saved by removing duplicate data entry and repetitive proposal assembly.",
          "One shared workflow eliminated rate inconsistencies, mispayments, and handoff friction between Sales and Ops.",
        ],
        quote: null,
      },
      {
        id: "crm-tracker-movimentum",
        clientType: "Sales organization",
        automationType: "CRM workflow automation",
        title: "Multilayer CRM Tracker",
        cardMetrics: [
          { value: "0 manual", label: "data entry" },
          { value: "Daily", label: "follow-ups" },
        ],
        summary:
          "FreshStack connected Google Calendar, Fireflies, Notion, and Slack into one CRM workflow that auto-logs calls, surfaces follow-ups, and updates weekly sales scorecards with zero manual data entry.",
        serviceTags: [
          "CRM tracker",
          "Follow-up automation",
          "Sales scorecards",
        ],
        workflow: {
          inputs: [
            "Google Calendar events",
            "Notion leads and calls databases",
            "Fireflies transcripts and summaries",
          ],
          automationLabel: "CRM operating layer",
          automationSteps: [
            "Log every new call into Notion automatically",
            "Sync setters, follow-up dates, and Fireflies summaries",
            "Push reminders and scorecards into Slack on schedule",
          ],
          outputs: [
            "Auto-updated call records",
            "Daily follow-up reminders",
            "Weekly rep scorecards",
          ],
        },
        challenge:
          "Sales activity was spread across Google Calendar, Notion, Fireflies, and Slack. New calls had to be logged manually, setter attribution could break, follow-ups were easy to miss, and weekly reporting depended on admin work instead of a live CRM layer.",
        intervention:
          "FreshStack built a suite of five connected automations that poll three Google Calendars, create and update call records in Notion, propagate setters from linked leads, attach Fireflies summaries and transcript links, post daily follow-up reminders in Slack, and refresh weekly scorecards for every sales rep.",
        outcomes: [
          "Zero manual data entry for logging new calls into the CRM.",
          "Daily Slack digests now surface overdue and due-today follow-ups automatically.",
          "Weekly rep scorecards update with calls, no-shows, closes, and revenue without manual reporting.",
          "Fireflies summaries are attached automatically, with a scheduled backfill acting as a safety net if the webhook misses.",
        ],
        quote: null,
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "A clear timeline",
    description: "",
    steps: [
      {
        title: "Audit",
        description: "Map the operational bottlenecks slowing delivery, visibility, and growth so we know exactly where the leverage is.",
      },
      {
        title: "Design",
        description: "Turn the findings into a leaner operating model with clearer handoffs, smarter automation, and sharper implementation priorities.",
      },
      {
        title: "Build",
        description: "Implement the workflows, automations, reporting systems, and documentation that make the new operating layer real.",
      },
      {
        title: "Embed & optimize",
        description: "Train the team, watch adoption, and optimize until the system is improving delivery, capacity, and visibility in live work.",
      },
    ],
  },
  booking: {
    eyebrow: "Let's Talk",
    title: "Let's Talk.",
    description:
      "Start with a focused conversation about where your operating layer is slowing delivery, limiting visibility, or capping growth.",
    desktopLabel: "Book a call",
    fallbackLabel: "Prefer email?",
    checklist: [
      "Book a free 30-minute working session. We’ll audit your operating layer, identify the main bottlenecks, and show you where AI can create the most leverage first.",
    ],
  },
  footer: {
    blurb:
      "FreshStack helps agencies use AI to build a stronger operating layer across systems, workflows, reporting, deliverables, and tracking.",
    contactLabel: "Contact",
    legal: "© 2026 FreshStack. All rights reserved.",
  },
  cta: {
    bookingUrl,
    bookingEmbedUrl: buildCalendlyEmbedUrl(bookingUrl, hasLiveBookingUrl),
    contactEmail,
    primaryLabel: "Let's Talk",
    bookSectionHref: `#${BOOK_SECTION_ID}`,
    hasLiveBookingUrl,
  },
};
