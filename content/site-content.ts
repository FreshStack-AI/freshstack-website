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
      { label: "Services", href: "#services" },
      { label: "Work", href: "#case-studies" },
      { label: "Results", href: "#testimonials" },
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
    description: "Every hour your team spends on work that should be automated is an hour not spent growing the business. Here's where it shows up.",
    items: [
      {
        title: "Too much depends on too few",
        description:
          "Key people are stretched thin. When they're out, things slow. When they leave, you scramble to recover.",
      },
      {
        title: "Deals slip through the cracks",
        description:
          "Follow-ups get missed. Handoffs break down. You're losing revenue you already earned.",
      },
      {
        title: "Your team is buried in admin",
        description:
          "Talented people doing repetitive work. Not because they should, but because there's no system to do it for them.",
      },
      {
        title: "Clients leave before you see it coming",
        description:
          "No early warning signs. No health scores. By the time you notice, they've already made the decision.",
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
        id: "reporting-ops-service-biz",
        clientType: "Service Business",
        automationType: "Operations",
        title: "Real-Time Sales Reporting",
        cardDescription: "Sales and Ops working from disconnected databases. Inconsistent rates, slow proposals, and multiple versions of the truth on every deal.",
        cardMetrics: [
          { value: "$352K", label: "revenue upside" },
          { value: "650", label: "hours saved" },
          { value: "1", label: "source of truth" },
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
        id: "cross-workspace-sync-creator-agency",
        clientType: "Creator Agency",
        automationType: "Operations",
        title: "Cross-Workspace Sync Engine",
        cardDescription: "4,000+ deliverables across two workspaces with no way to keep them in sync. Every missed update risked stale data and broken visibility.",
        cardMetrics: [
          { value: "$4M", label: "revenue protected" },
          { value: "156", label: "hours saved" },
          { value: "0", label: "manual syncs" },
        ],
        summary:
          "FreshStack built a fully automated sync engine that exports deliverables, briefs, and client data from one workspace into a partner's — and keeps everything aligned on a rolling schedule.",
        serviceTags: [
          "Cross-platform sync",
          "Workflow automation",
          "Error alerting",
        ],
        workflow: {
          inputs: [
            "Deliverables database",
            "Briefs database",
            "Client records",
          ],
          automationLabel: "Cross-workspace sync engine",
          automationSteps: [
            "Match clients across workspaces automatically",
            "Export new briefs and deliverables to partner",
            "Sync statuses, dates, and permissions on schedule",
          ],
          outputs: [
            "Live deliverable mirror for partner",
            "Auto-corrected permissions",
            "Instant alerts for mismatches",
          ],
        },
        challenge:
          "The agency managed 4,000+ creator deliverables in their own workspace, but an affiliate partner needed live visibility into a filtered subset. Two separate environments had to stay in sync without anyone copying and pasting.",
        intervention:
          "We built a fully automated sync engine that keeps both workspaces aligned around the clock. Records match, deliverables export, permissions stay correct, and alerts fire the moment something needs attention — all without a single manual update.",
        outcomes: [
          "Built for the agency's largest partner. Accurate, real-time data was non-negotiable to retain the relationship.",
          "Permission enforcement ensures the right people always have access.",
        ],
        quote: null,
      },
      {
        id: "finance-automation-agency",
        clientType: "Marketing Agency",
        automationType: "Finance",
        title: "AI Finance Automation",
        cardDescription: "Invoices passed around as PDFs, payments checked by hand, no real-time visibility on what was paid vs unpaid.",
        cardMetrics: [
          { value: "0", label: "manual reconciliation" },
          { value: "100%", label: "visibility" },
          { value: "AI", label: "invoice reading" },
        ],
        summary:
          "FreshStack built a complete finance automation layer — AI reads invoices on drop, payments are detected the moment they land, and everything reconciles automatically.",
        serviceTags: [
          "AI invoice processing",
          "Payment detection",
          "Finance automation",
        ],
        workflow: {
          inputs: [
            "Invoice PDFs and images",
            "Incoming payment events",
            "Finance database records",
          ],
          automationLabel: "AI finance layer",
          automationSteps: [
            "AI extracts invoice fields from dropped files",
            "Detect payments in real-time across accounts",
            "Match payments to invoices and reconcile",
          ],
          outputs: [
            "Auto-logged invoices from AI",
            "Instant payment confirmations",
            "One-click payment links",
          ],
        },
        challenge:
          "Finance was entirely manual. Invoices arrived as PDFs and images with no structured way to log them. Payments landed but nobody knew until someone manually checked. Reconciliation meant cross-referencing spreadsheets, and there was zero real-time visibility on what was paid vs unpaid.",
        intervention:
          "We built two connected systems. First, an AI-powered invoice ingestion layer — drop a PDF or image into a chat channel and AI extracts every field, posts an interactive approval, and logs confirmed invoices instantly. Second, a real-time payment detection engine that monitors multiple accounts, matches incoming payments to open invoices, and lets the team confirm or reject with one click. Outgoing invoices get auto-generated payment links.",
        outcomes: [
          "Easy invoice logging from Slack.",
          "Real-time payment detection across multiple accounts with instant team alerts.",
          "Auto-generated payment links for every outgoing invoice.",
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
    eyebrow: "Book a Call",
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
    primaryLabel: "Book a Call",
    bookSectionHref: `#${BOOK_SECTION_ID}`,
    hasLiveBookingUrl,
  },
};
