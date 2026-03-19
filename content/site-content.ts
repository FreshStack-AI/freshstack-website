export type CTAConfig = {
  bookingUrl: string;
  bookingEmbedUrl: string | null;
  contactEmail: string;
  primaryLabel: string;
  secondaryLabel: string;
  bookSectionHref: `#${string}`;
  processHref: `#${string}`;
  hasLiveBookingUrl: boolean;
};

export type CaseStudy = {
  id: string;
  clientType: string;
  automationType: string;
  title: string;
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
  logoLabel: string | null;
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

export type ServiceCard = {
  title: string;
  collapsedTitle: string;
  description: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

type FAQEntry = {
  question: string;
  answer: string;
};

type CredibilityPoint = {
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
  services: SectionIntro & {
    cards: ServiceCard[];
    toolChips: string[];
  };
  caseStudies: SectionIntro & {
    disclaimer: string;
    items: CaseStudy[];
  };
  process: SectionIntro & {
    steps: ProcessStep[];
  };
  about: SectionIntro & {
    paragraphs: string[];
    credibilityPoints: CredibilityPoint[];
  };
  faq: SectionIntro & {
    items: FAQEntry[];
  };
  booking: SectionIntro & {
    desktopLabel: string;
    mobileLabel: string;
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
const PROCESS_SECTION_ID = "process";

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
    calendlyUrl.searchParams.set("background_color", "020202");
    calendlyUrl.searchParams.set("text_color", "f5f5f5");
    calendlyUrl.searchParams.set("primary_color", "ffffff");
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
      "Your operations shouldn't depend on people doing what AI can do better.",
    ogImageUrl: resolveAssetUrl(process.env.NEXT_PUBLIC_OG_IMAGE_URL, siteUrl),
  },
  navigation: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Case studies", href: "#case-studies" },
      { label: "Process", href: "#process" },
      { label: "About", href: "#about" },
      { label: "Let's Talk", href: "#book-a-call" },
    ],
  },
  hero: {
    eyebrow: "Operator-built systems",
    title: "Your AI growth partner",
    displayLines: ["Your AI", "growth partner"],
    description:
      "Your operations shouldn't depend on people doing what AI can do better.",
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
    title: "Most agency ops issues are repeat friction, not isolated fires.",
    description:
      "The work usually looks busy on the surface, but the drag shows up in the same places every week.",
    items: [
      {
        title: "Manual reporting",
        description: "Updates still depend on someone pulling numbers, formatting decks, and chasing context before clients see anything.",
      },
      {
        title: "Broken handoffs",
        description: "Account, delivery, and leadership teams are working from different assumptions and incomplete records.",
      },
      {
        title: "Inconsistent delivery",
        description: "Good work happens, but the process around it changes by person, account, or urgency level.",
      },
      {
        title: "Scattered data",
        description: "Operational signals live across spreadsheets, project boards, inboxes, and chat history with no shared source of truth.",
      },
      {
        title: "Poor visibility",
        description: "Founders and team leads do not get a clean view of delivery health, capacity, or risk until problems are already expensive.",
      },
      {
        title: "Founder bottlenecks",
        description: "Critical decisions, approvals, and context still route through the founder because the system is not carrying enough load.",
      },
    ],
  },
  founder: {
    eyebrow: "Meet the founders",
    profiles: [
      {
        name: "Baptiste",
        bio: "With over a decade working inside some of the world's largest agencies, including WPP, and delivering for brands like Binance and Adidas, Baptiste has seen how the best operations run at scale. After building and automating his own business with AI, he now helps other agency owners do the same: replace the manual, the slow, and the inconsistent with systems that actually scale.",
        imageSrc: "/founder-portrait.png",
        imageAlt: "Black-and-white portrait of Baptiste, founder of FreshStack",
      },
      {
        name: "Lara",
        bio: "With over a decade working inside some of the world's largest agencies, including WPP, and delivering for brands like Binance and Adidas, Lara has seen how the best operations run at scale. After building and automating her own business with AI, she now helps other agency owners do the same: replace the manual, the slow, and the inconsistent with systems that actually scale.",
        imageSrc: "/lara-portrait.png",
        imageAlt: "Black-and-white portrait of Lara, co-founder of FreshStack",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Built around the operating gaps agency owners actually feel.",
    description:
      "The stack matters, but the real leverage comes from tightening the way work moves through the business.",
    cards: [
      {
        title: "Internal systems & processes",
        collapsedTitle: "Processes",
        description: "Clarify the operating layer behind delivery, approvals, reporting rhythm, and recurring team responsibilities.",
      },
      {
        title: "Team workflows & handoffs",
        collapsedTitle: "Workflows",
        description: "Reduce dropped context between sales, account management, strategists, media buyers, and delivery teams.",
      },
      {
        title: "Client reporting & tracking",
        collapsedTitle: "Reporting",
        description: "Create cleaner reporting inputs, more reliable KPI flow, and clearer internal visibility before client-facing output.",
      },
      {
        title: "AI-enhanced deliverables",
        collapsedTitle: "Deliverables",
        description: "Use AI where it meaningfully improves research, QA, drafting, synthesis, and repeatable production steps.",
      },
      {
        title: "Automation stack setup",
        collapsedTitle: "Automations",
        description: "Set up the tooling, automation logic, and documentation required to make the new operating layer stick.",
      },
    ],
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
      "X / Twitter API",
      "TypeScript",
      "Cursor",
      "GitHub",
      "Postman",
      "Zapier",
      "Airtable",
      "OpenAI API",
    ],
  },
  caseStudies: {
    eyebrow: "Case studies",
    title: "Hear it from our happy clients.",
    description: "",
    disclaimer:
      "Placeholder content only. Swap in approved anonymized copy, verified metrics, and optional quote/logo text before launch.",
    items: [
      {
        id: "ops-reporting-placeholder",
        clientType: "Crypto-native service business",
        automationType: "Payment intelligence automation",
        title: "Crypto Payment Intelligence",
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
        logoLabel: null,
      },
      {
        id: "handoff-delivery-placeholder",
        clientType: "Creator marketing agency",
        automationType: "Sales-to-ops workflow automation",
        title: "Operational Hygiene",
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
        logoLabel: null,
      },
      {
        id: "qa-tracking-placeholder",
        clientType: "Social content agency",
        automationType: "X metrics reporting automation",
        title: "X Metrics",
        summary:
          "By piping X post metrics into a live internal reporting system, FreshStack replaced stale reporting with always-fresh visibility that improved renewals, upsells, and client trust.",
        serviceTags: [
          "X metrics",
          "Reporting automation",
          "Retention visibility",
        ],
        workflow: {
          inputs: [
            "Published X posts",
            "X / Twitter metrics feed",
            "Internal reporting database",
          ],
          automationLabel: "Reporting automation",
          automationSteps: [
            "Pull post metrics on a recurring schedule",
            "Log every result into the reporting layer",
            "Keep client visibility fresh without admin work",
          ],
          outputs: [
            "Live performance reporting",
            "Stronger renewal visibility",
            "Clear upsell opportunities",
          ],
        },
        challenge:
          "Clients expected real-time proof that content was performing, but the team was manually collecting post metrics every week. Reporting was outdated almost immediately, accuracy depended on repetitive admin work, and results often looked weaker than they really were.",
        intervention:
          "FreshStack built an automated workflow that pulls X post metrics directly into the internal reporting database. Metrics stay current without recollection, every post is logged accurately at scale, and client reporting reflects the full performance picture.",
        outcomes: [
          "$84K per year in revenue upside from stronger renewals and upsell opportunities.",
          "156 hours per year saved by removing weekly manual metric collection.",
          "Always-fresh performance data improved reporting accuracy, client trust, and retention conversations.",
        ],
        quote: null,
        logoLabel: null,
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "A short path from operational audit to embedded improvement.",
    description:
      "The goal is not to bolt on tools. It is to make the operating layer simpler, clearer, and easier for the team to run.",
    steps: [
      {
        title: "Audit",
        description: "Map current workflows, friction points, reporting gaps, and founder dependencies so the real operating constraints are clear.",
      },
      {
        title: "Design",
        description: "Turn the audit into a tighter operating model with clear handoffs, automation logic, ownership, and implementation priorities.",
      },
      {
        title: "Build",
        description: "Implement the workflows, automations, reporting systems, and documentation that support the agreed design.",
      },
      {
        title: "Embed & optimize",
        description: "Train the team, observe adoption, tighten weak spots, and improve the system once it is handling live agency work.",
      },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Agency-owner experience changes the quality of the solution.",
    description:
      "FreshStack is positioned for operators who need systems that fit how agencies actually deliver work, not generic automation demos.",
    paragraphs: [
      "Generic automation shops often start with tooling. Agency owners start with margin pressure, delivery consistency, client expectations, and the reality of team capacity.",
      "That difference matters. Better ops work comes from understanding the points where delivery gets delayed, reporting gets messy, founders become bottlenecks, and teams stop trusting the system around the work.",
    ],
    credibilityPoints: [
      {
        title: "Operational context first",
        description: "The build starts with how your agency runs day to day, not with a preset stack or a canned AI workflow.",
      },
      {
        title: "Closer to the commercial reality",
        description: "The work is shaped around delivery quality, team leverage, client confidence, and whether the system reduces drag where it actually costs money.",
      },
      {
        title: "Implementation that can be owned",
        description: "The goal is a cleaner operating layer your team can keep using, not a fragile setup that depends on an external specialist forever.",
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "What agency owners usually want to know before booking.",
    description:
      "The fit is generally strongest when the agency already has traction and needs cleaner operations more than another tool demo.",
    items: [
      {
        question: "What kind of agency is this best for?",
        answer:
          "FreshStack is built for agencies that already have real delivery volume and are feeling operational drag in reporting, handoffs, QA, visibility, or founder load.",
      },
      {
        question: "What does the engagement usually look like?",
        answer:
          "The work typically starts with an audit, moves into workflow and system design, then into implementation and short optimization cycles once the new setup is live.",
      },
      {
        question: "Do you only work with a fixed tool stack?",
        answer:
          "No. The tooling is flexible. n8n, Make, Notion, Claude, Codex, and model-agnostic workflows are implementation details, not the product.",
      },
      {
        question: "Who owns the implementation after launch?",
        answer:
          "The target state is shared ownership. FreshStack can build and document the system, but it should be understandable enough for your team to run and evolve.",
      },
      {
        question: "How long does this take?",
        answer:
          "Timeline depends on scope, but v1 operational improvements are usually planned in weeks, not quarters. The first call is used to size that properly.",
      },
    ],
  },
  booking: {
    eyebrow: "Let's Talk",
    title: "Let's Talk.",
    description:
      "Use the booking section to start with a practical conversation about where your operating system is slowing delivery, reporting, or visibility.",
    desktopLabel: "Book a call",
    mobileLabel: "Open Calendly",
    fallbackLabel: "Prefer email?",
    checklist: [
      "Best for agency owners who already have delivery volume and operational drag.",
      "Useful if the pain is reporting, handoffs, workflow consistency, or founder bottlenecks.",
      "The goal of the first call is clarity on fit, scope, and where the operating layer needs work first.",
    ],
  },
  footer: {
    blurb:
      "FreshStack helps agencies build a tighter operating layer across systems, workflows, reporting, deliverables, and tracking.",
    contactLabel: "Contact",
    legal: "© 2026 FreshStack. All rights reserved.",
  },
  cta: {
    bookingUrl,
    bookingEmbedUrl: buildCalendlyEmbedUrl(bookingUrl, hasLiveBookingUrl),
    contactEmail,
    primaryLabel: "Let's Talk",
    secondaryLabel: "See How We Work",
    bookSectionHref: `#${BOOK_SECTION_ID}`,
    processHref: `#${PROCESS_SECTION_ID}`,
    hasLiveBookingUrl,
  },
};
