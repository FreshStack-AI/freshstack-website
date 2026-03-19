import {
  siAirtable,
  siAlchemy,
  siClaude,
  siCursor,
  siGithub,
  siGooglesheets,
  siMake,
  siN8n,
  siNotion,
  siPostman,
  siPython,
  siReact,
  siSupabase,
  siTelegram,
  siTypescript,
  siVite,
  siX,
  siZapier,
} from "simple-icons";

export const toolIconMap = {
  n8n: siN8n,
  make: siMake,
  notion: siNotion,
  claude: siClaude,
  supabase: siSupabase,
  telegram: siTelegram,
  "google sheets": siGooglesheets,
  alchemy: siAlchemy,
  x: siX,
  typescript: siTypescript,
  cursor: siCursor,
  github: siGithub,
  postman: siPostman,
  zapier: siZapier,
  airtable: siAirtable,
  python: siPython,
  react: siReact,
  vite: siVite,
} as const;

const toolIconAliases: Record<string, keyof typeof toolIconMap> = {
  "claude code": "claude",
  "x / twitter api": "x",
};

export function getToolIcon(label: string) {
  const normalized = label.toLowerCase();
  const key =
    toolIconAliases[normalized] ??
    (normalized as keyof typeof toolIconMap);

  return toolIconMap[key];
}
