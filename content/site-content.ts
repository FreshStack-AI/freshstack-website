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
  title: string;
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

type ServiceCard = {
  title: string;
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
    proof: string;
    supportTitle: string;
    supportItems: string[];
  };
  painPoints: SectionIntro & {
    items: PainPoint[];
  };
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

const SITE_FALLBACK = "https://example.com";
const BOOKING_PLACEHOLDER = "https://calendly.com/your-team/automation-audit";
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
    calendlyUrl.searchParams.set("background_color", "f6f0e5");
    calendlyUrl.searchParams.set("text_color", "18211e");
    calendlyUrl.searchParams.set("primary_color", "0f5c54");
    return calendlyUrl.toString();
  } catch {
    return null;
  }
}

const siteUrl = normalizeAbsoluteUrl(process.env.NEXT_PUBLIC_SITE_URL, SITE_FALLBACK);
const rawBookingUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "";
const hasLiveBookingUrl = rawBookingUrl.length > 0;
const bookingUrl = hasLiveBookingUrl ? rawBookingUrl : BOOKING_PLACEHOLDER;
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@frehstack.com";

export const siteContent: SiteContent = {
  brandName: "FrehStack",
  siteUrl,
  meta: {
    title: "FrehStack | AI automation systems for agencies",
    description:
      "FrehStack helps agency owners improve internal systems, team workflows, reporting, deliverables, and tracking with practical AI automation systems.",
    ogImageUrl: resolveAssetUrl(process.env.NEXT_PUBLIC_OG_IMAGE_URL, siteUrl),
  },
  navigation: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Process", href: "#process" },
      { label: "About", href: "#about" },
      { label: "Book a Call", href: "#book-a-call" },
    ],
  },
  hero: {
    eyebrow: "Operator-built systems",
    title: "AI automation systems for agencies that need better operations.",
    description:
      "FrehStack helps agency owners improve internal systems, team workflows, reporting, deliverables, and tracking.",
    proof: "Built by agency owners with 10 years of firsthand operational experience.",
    supportTitle: "What the work usually tightens first",
    supportItems: [
      "Handoffs that stop living in Slack threads and scattered docs.",
      "Reporting loops leadership can actually use to make decisions.",
      "Automations the team can maintain after the first build is done.",
    ],
  },
  painPoints: {
    eyebrow: "Pain Points",
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
  services: {
    eyebrow: "Services",
    title: "Built around the operating gaps agency owners actually feel.",
    description:
      "The stack matters, but the real leverage comes from tightening the way work moves through the business.",
    cards: [
      {
        title: "Internal Systems & Processes",
        description: "Clarify the operating layer behind delivery, approvals, reporting rhythm, and recurring team responsibilities.",
      },
      {
        title: "Team Workflows & Handoffs",
        description: "Reduce dropped context between sales, account management, strategists, media buyers, and delivery teams.",
      },
      {
        title: "Client Reporting & Tracking",
        description: "Create cleaner reporting inputs, more reliable KPI flow, and clearer internal visibility before client-facing output.",
      },
      {
        title: "AI-Enhanced Deliverables",
        description: "Use AI where it meaningfully improves research, QA, drafting, synthesis, and repeatable production steps.",
      },
      {
        title: "Automation Stack Setup",
        description: "Set up the tooling, automation logic, and documentation required to make the new operating layer stick.",
      },
    ],
    toolChips: ["n8n", "Make", "Notion", "Claude", "Codex", "model-agnostic workflows"],
  },
  caseStudies: {
    eyebrow: "Case Studies",
    title: "Three proof slots are ready for approved anonymized results.",
    description:
      "The landing-page layout is final now. Replace these placeholders with verified outcomes later without touching the section structure.",
    disclaimer:
      "Placeholder content only. Swap in approved anonymized copy, verified metrics, and optional quote/logo text before launch.",
    items: [
      {
        id: "ops-reporting-placeholder",
        clientType: "Performance marketing agency",
        title: "Reporting operations placeholder",
        challenge:
          "Replace with the approved challenge summary for manual weekly reporting, fragmented KPI ownership, and low leadership visibility.",
        intervention:
          "Replace with the verified intervention summary covering audit findings, reporting workflow redesign, and automation implementation.",
        outcomes: [
          "Insert verified metric: weekly reporting prep time reduced by ___ hours.",
          "Insert verified metric: reporting inputs consolidated from ___ sources into one operating view.",
          "Insert verified metric: internal response time on account risk shortened by ___%.",
        ],
        quote: null,
        logoLabel: "Anonymized client",
      },
      {
        id: "handoff-delivery-placeholder",
        clientType: "Creative and strategy agency",
        title: "Delivery handoff placeholder",
        challenge:
          "Replace with the approved challenge summary for broken intake, inconsistent handoffs, and founder-dependent approvals.",
        intervention:
          "Replace with the verified intervention summary covering intake structure, workflow checkpoints, and team automation support.",
        outcomes: [
          "Insert verified metric: project kickoff lag reduced from ___ days to ___.",
          "Insert verified metric: approval touchpoints removed or automated by ___.",
          "Insert verified metric: delivery rework rate reduced by ___%.",
        ],
        quote: null,
        logoLabel: null,
      },
      {
        id: "qa-tracking-placeholder",
        clientType: "SEO and content agency",
        title: "Tracking and QA placeholder",
        challenge:
          "Replace with the approved challenge summary for scattered task tracking, unclear QA ownership, and inconsistent client update cadence.",
        intervention:
          "Replace with the verified intervention summary covering tracking cleanup, QA workflow design, and reporting automation.",
        outcomes: [
          "Insert verified metric: recurring QA checks automated across ___ deliverable types.",
          "Insert verified metric: client update turnaround improved by ___ hours.",
          "Insert verified metric: status visibility moved from fragmented trackers to one shared dashboard.",
        ],
        quote: null,
        logoLabel: "Case study slot",
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
        title: "Embed & Optimize",
        description: "Train the team, observe adoption, tighten weak spots, and improve the system once it is handling live agency work.",
      },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Agency-owner experience changes the quality of the solution.",
    description:
      "FrehStack is positioned for operators who need systems that fit how agencies actually deliver work, not generic automation demos.",
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
    eyebrow: "FAQ",
    title: "What agency owners usually want to know before booking.",
    description:
      "The fit is generally strongest when the agency already has traction and needs cleaner operations more than another tool demo.",
    items: [
      {
        question: "What kind of agency is this best for?",
        answer:
          "FrehStack is built for agencies that already have real delivery volume and are feeling operational drag in reporting, handoffs, QA, visibility, or founder load.",
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
          "The target state is shared ownership. FrehStack can build and document the system, but it should be understandable enough for your team to run and evolve.",
      },
      {
        question: "How long does this take?",
        answer:
          "Timeline depends on scope, but v1 operational improvements are usually planned in weeks, not quarters. The first call is used to size that properly.",
      },
    ],
  },
  booking: {
    eyebrow: "Book a Call",
    title: "Book an Automation Audit.",
    description:
      "Use the booking section to start with a practical conversation about where your operating system is slowing delivery, reporting, or visibility.",
    desktopLabel: "Desktop booking embed",
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
      "FrehStack helps agencies build a tighter operating layer across systems, workflows, reporting, deliverables, and tracking.",
    contactLabel: "Contact",
    legal: "© 2026 FrehStack. All rights reserved.",
  },
  cta: {
    bookingUrl,
    bookingEmbedUrl: buildCalendlyEmbedUrl(bookingUrl, hasLiveBookingUrl),
    contactEmail,
    primaryLabel: "Book an Automation Audit",
    secondaryLabel: "See How We Work",
    bookSectionHref: `#${BOOK_SECTION_ID}`,
    processHref: `#${PROCESS_SECTION_ID}`,
    hasLiveBookingUrl,
  },
};
