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
  cardDescription?: string;
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
      { label: "Work", href: "#case-studies" },
      { label: "Testimonials", href: "#testimonials" },
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
    eyebrow: "Still doing it manually?",
    title: "This is what it's costing you.",
    description: "Every hour your team spends on work that should be automated is an hour not spent growing the business. Here's where it shows up first.",
    items: [
      {
        title: "Sales & Pipeline",
        description:
          "Your pipeline lives in someone's head. Deals move slowly, handoffs break down, and nothing gets followed up consistently. You're losing revenue you already earned.",
      },
      {
        title: "Client Onboarding",
        description:
          "Every new client means the same manual work. Folders, forms, emails, access. It takes days when it should take minutes. And the client notices.",
      },
      {
        title: "Finance Operations",
        description:
          "Invoices go out late. Payments get missed. Reconciliation happens at month end when the damage is already done. Cash flow suffers because the admin can't keep up.",
      },
      {
        title: "Reporting & Visibility",
        description:
          "Nobody knows where things stand until someone builds a report. By then the data is already old. Decisions get delayed. Clients lose confidence.",
      },
    ],
  },
  founder: {
    eyebrow: "Who we are",
    profiles: [
      {
        name: "Baptiste",
        bio: "Baptiste spent over a decade inside some of the world's largest agencies, delivering work for brands like Shell, Ferrari, and Adidas. He's seen first-hand how operational infrastructure determines whether a growing business scales cleanly or collapses under its own weight. Before FreshStack, he built and exited two AI-powered businesses. Proof the systems work. Now he builds them for others.",
        imageSrc: "/optimized/founder-portrait.jpg",
        imageAlt: "Black-and-white portrait of Baptiste, founder of FreshStack",
      },
      {
        name: "Lara",
        bio: "Lara spent five years selling operational technology infrastructure to enterprise businesses at a FTSE 250 company in the UK. She knows what it takes for organisations to run without chaos, and what it costs when they don't. She now builds those same systems for growing service businesses that want enterprise-grade operations without the enterprise price tag.",
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
    eyebrow: "Our Work",
    title: "Results from real operations.",
    description: "Three builds. Three different problems. Each one with a measurable return from day one.",
    items: [
      {
        id: "sales-ops-creator-agency",
        clientType: "Creator Agency",
        automationType: "Sales",
        title: "Data Duplication",
        cardDescription: "One person. Two systems. Manually synced every week. That single bottleneck was holding together 50% of monthly revenue.",
        cardMetrics: [
          { value: "$4M", label: "revenue protected" },
          { value: "156", label: "hours saved" },
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
        id: "reporting-ops-service-biz",
        clientType: "Service Business",
        automationType: "Reports",
        title: "Manual Reporting",
        cardDescription: "Content analytics collected manually several times a week, outdated metrics. Underreported results costs renewal and upsell opportunities.",
        cardMetrics: [
          { value: "$84K", label: "revenue upside" },
          { value: "92", label: "hours saved" },
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
        id: "finance-ops-marketing-agency",
        clientType: "Marketing Agency",
        automationType: "Finance",
        title: "No Payment Visibility",
        cardDescription: "Daily manual checks matching transactions to invoices. No automatic payment visibility, accounting delayed and visibility on cash flows stalled.",
        cardMetrics: [
          { value: "$28K", label: "revenue upside" },
          { value: "52", label: "hours saved" },
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
    title: "How we work.",
    description: "",
    steps: [
      {
        title: "Audit",
        description: "We map where your operations are breaking down. Time lost, errors made, handoffs failing. We find the leverage points before we build anything.",
      },
      {
        title: "Design",
        description: "We turn the findings into a system architecture. What gets automated, in what order, connected to which tools. You approve before we build.",
      },
      {
        title: "Build",
        description: "We build, test, and deploy. Every automation is documented so your team understands what runs and why.",
      },
      {
        title: "Maintain",
        description: "We don't hand over and disappear. We monitor, fix, and improve the system as your business changes. This is where the retainer begins.",
      },
    ],
  },
  booking: {
    eyebrow: "Let’s Talk",
    title: "No pitch. No fluff.",
    description:
      "Book a free 30-minute audit. We’ll identify where your operations are holding the business back and tell you exactly where to leverage automations.",
    desktopLabel: "Book a call",
    fallbackLabel: "Prefer email?",
    checklist: [],
  },
  footer: {
    blurb:
      "FreshStack helps agencies use AI to build a stronger operating layer across systems, workflows, reporting, deliverables, and tracking.",
    contactLabel: "Contact",
    legal: "© 2026 FreshStack. All rights reserved. FreshStack is a subsidiary of The Mighty Bean LLC. Registered in the United Arab Emirates, 2023. Licence number 2326490.01.",
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
