"use client";

const CALENDLY_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_SCRIPT_ID = "calendly-widget-script";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

let calendlyScriptPromise: Promise<void> | null = null;

function ensureHeadLink(
  rel: "preconnect" | "dns-prefetch" | "preload",
  href: string,
  options?: { as?: string; crossOrigin?: boolean },
) {
  if (typeof document === "undefined") {
    return;
  }

  const selector = `link[rel="${rel}"][href="${href}"]`;
  if (document.head.querySelector(selector)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;

  if (options?.as) {
    link.as = options.as;
  }

  if (options?.crossOrigin) {
    link.crossOrigin = "";
  }

  document.head.appendChild(link);
}

export function preconnectCalendly() {
  ensureHeadLink("dns-prefetch", "https://assets.calendly.com");
  ensureHeadLink("dns-prefetch", "https://calendly.com");
  ensureHeadLink("preconnect", "https://assets.calendly.com", {
    crossOrigin: true,
  });
  ensureHeadLink("preconnect", "https://calendly.com", {
    crossOrigin: true,
  });
}

export function preloadCalendlyScript() {
  preconnectCalendly();
  ensureHeadLink("preload", CALENDLY_SCRIPT_SRC, {
    as: "script",
    crossOrigin: true,
  });
}

export function ensureCalendlyScript() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Calendly) {
    return Promise.resolve();
  }

  preloadCalendlyScript();

  if (calendlyScriptPromise) {
    return calendlyScriptPromise;
  }

  calendlyScriptPromise = new Promise((resolve, reject) => {
    const existingScript =
      document.getElementById(CALENDLY_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolve();
        return;
      }

      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => {
          calendlyScriptPromise = null;
          reject(new Error("Failed to load Calendly widget script."));
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = CALENDLY_SCRIPT_ID;
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => {
      calendlyScriptPromise = null;
      reject(new Error("Failed to load Calendly widget script."));
    };

    document.body.appendChild(script);
  });

  return calendlyScriptPromise;
}
