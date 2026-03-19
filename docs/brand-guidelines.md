# FreshStack Brand Guidelines

## Overview

FreshStack is presented as a dark, premium, operator-focused AI systems brand.

Core positioning:
- Brand name: `FreshStack`
- Primary promise: `Your AI growth partner`
- Supporting line: `Your operations shouldn't depend on people doing what AI can do better.`
- Tone: credible, direct, systems-minded, founder-aware, never playful or gimmicky

The current site leans into:
- black and near-black surfaces
- white typography and white-led accents
- sharp, high-contrast UI
- glassy layered panels with restrained glow
- uppercase mono labels over bold sans-serif headlines

## Logo System

### Primary lockup

The navbar logo is a stepped six-cell brand mark plus the `FreshStack` wordmark.

Files:
- [`public/freshstack-navbar-logo.svg`](/Users/kelano/Documents/Codex/Freshstack/public/freshstack-navbar-logo.svg)
- [`public/freshstack-navbar-logo.png`](/Users/kelano/Documents/Codex/Freshstack/public/freshstack-navbar-logo.png)

### Icon-only mark

The icon-only mark is the stepped six-cell shape without the wordmark.

Files:
- [`public/freshstack-brand-mark.svg`](/Users/kelano/Documents/Codex/Freshstack/public/freshstack-brand-mark.svg)
- [`public/freshstack-brand-mark.png`](/Users/kelano/Documents/Codex/Freshstack/public/freshstack-brand-mark.png)

### Construction

The live logo mark is defined in [`components/marketing/primitives.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/primitives.tsx) and styled in [`app/globals.css`](/Users/kelano/Documents/Codex/Freshstack/app/globals.css):
- 6 rounded square cells
- 3-column by 3-row stepped arrangement
- cell size: `0.36rem`
- cell gap: `0.16rem`
- cell radius: `0.12rem`
- wordmark gap from mark: `0.75rem`

### Logo usage rules

Do:
- use the white logo on black or dark charcoal backgrounds
- use the icon-only mark for avatars, favicons, app tiles, and compact placements
- keep generous breathing room around the lockup

Do not:
- recolor the logo with gradients
- add shadows, outlines, or glows to the logo itself
- stretch or rotate the stepped mark
- place the white logo on light backgrounds without switching to a dark version

## Color Palette

The brand is essentially monochrome with subtle opacity-driven hierarchy.

Primary tokens from [`app/globals.css`](/Users/kelano/Documents/Codex/Freshstack/app/globals.css):

| Token | Value | Usage |
| --- | --- | --- |
| `--color-paper` | `#020202` | page background, hero base |
| `--color-white` | `#ffffff` | absolute white |
| `--color-void` | `#020202` | supporting black token |
| `--color-obsidian` | `#0a0a0a` | deeper panel tone |
| `--color-accent` | `#ffffff` | primary accent |
| `--color-accent-strong` | `rgba(255,255,255,0.78)` | stronger white accent |
| `--color-accent-tint` | `rgba(255,255,255,0.04)` | subtle tinted fill |
| `--color-ink` | `#ffffff` | primary text |
| `--color-muted` | `rgba(255,255,255,0.58)` | secondary text |
| `--color-border` | `rgba(255,255,255,0.08)` | default borders |
| `--color-border-strong` | `rgba(255,255,255,0.18)` | stronger borders |

### Background treatment

The default page background is not flat black. It uses:
- a black base
- a soft white radial glow near the top center
- a faint vertical wash
- a subtle grid mask overlay in some hero layers

Guideline:
- stay in black, charcoal, smoke, and white
- if adding new color, do it through transparency or grayscale first
- avoid introducing saturated brand colors unless the whole system is intentionally redefined

## Typography

### Primary font

FreshStack currently uses a system grotesk stack:

```css
"Helvetica Neue", Helvetica, Arial, sans-serif
```

This is used for:
- headlines
- wordmark
- body copy
- major UI text

### Secondary font

FreshStack uses a mono stack for labels and utility UI:

```css
ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace
```

This is used for:
- section labels
- navigation items
- buttons
- chips
- small metadata and system cues

### Typographic character

Headlines:
- heavy, compressed-feeling through tracking rather than a condensed font
- mostly white
- often uppercase in the hero
- negative tracking is intentional

Body:
- readable and relaxed
- `line-height: 1.7` globally
- muted white by default

Labels:
- uppercase mono
- wide tracking
- low contrast
- system-like, not decorative

### Key text sizes in the current site

Common live sizes:
- hero display: `clamp(3.5rem, 9.5vw, 11.5rem)`
- section titles: `text-3xl`, `sm:text-4xl`, `lg:text-[4.25rem]`
- card headings: around `text-2xl` to `2.15rem`
- body copy: `text-sm` to `text-lg`
- mono labels: `11px` to `0.875rem`

### Typography rules

Do:
- keep headings bold and high contrast
- use mono labels sparingly to structure the page
- preserve the current uppercase utility rhythm

Do not:
- introduce soft editorial serif fonts
- mix in multiple display fonts
- use low-contrast body text on dark surfaces
- overuse uppercase in long paragraphs

## Radius, Borders, and Corners

### Global radius tokens

From [`app/globals.css`](/Users/kelano/Documents/Codex/Freshstack/app/globals.css):
- global shadcn radius token: `--radius: 1rem`

Common live radii:
- glass panels: `1.4rem`
- modal shell: `1.25rem`
- internal cards and sub-panels: around `1rem` to `1.1rem`
- buttons and nav pills: `rounded-full`
- logo cells: `0.12rem`

### Border system

Primary border treatments:
- default border: `1px solid rgba(255,255,255,0.08)`
- stronger border: `rgba(255,255,255,0.18)` or `0.20` to `0.25` in CTA contexts

Guideline:
- most surfaces should feel lightly outlined, not borderless
- white borders should stay translucent rather than pure white
- reserve stronger borders for hover, active, or CTA emphasis

## Surface Style

The current visual style is dark glass, not flat brutalism.

Base surface recipe from [`app/globals.css`](/Users/kelano/Documents/Codex/Freshstack/app/globals.css):
- layered semi-transparent black surface
- faint white top-to-bottom gradient
- `backdrop-filter: blur(24px)`
- inset highlight
- long dark shadow
- soft animated edge glow on hover-capable devices

Primary surface class:
- `.glass-panel`

Panel specs:
- border: `1px solid rgba(255,255,255,0.08)`
- background blend:
  - `linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.03))`
  - `rgba(10,10,10,0.72)`
- shadow:
  - `inset 0 1px 0 rgba(255,255,255,0.04)`
  - `0 24px 80px rgba(0,0,0,0.45)`

Guideline:
- new cards should generally inherit the same panel language
- use stronger local shadows for expanded or active states
- avoid flat gray boxes that break the premium depth

## Layout and Spacing

### Container width

The main marketing container is:
- `max-w-6xl`

### Section padding

From [`components/marketing/primitives.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/primitives.tsx):
- horizontal padding: `px-5`, `sm:px-6`, `lg:px-8`
- vertical padding: `py-[4.5rem]`, `lg:py-24`

### Header sizing

From [`app/globals.css`](/Users/kelano/Documents/Codex/Freshstack/app/globals.css):
- `--header-height: 5rem`

Use this for:
- sticky header offset
- anchor scroll padding
- modal positioning logic when needed

### Spacing rhythm

The site generally uses:
- `mt-4`, `mt-5`, `mt-6`, `mt-8`, `mt-10`
- card padding around `p-6` and `p-7`
- larger section spacing over smaller gap density

Guideline:
- keep layouts airy
- avoid cramming copy into dense compact blocks unless explicitly intentional

## Motion

### Motion style

FreshStack motion should feel:
- smooth
- low-noise
- premium
- responsive to pointer input

It should not feel:
- bouncy
- playful
- overly elastic
- constant or distracting

### Current motion tokens and timings

From [`app/globals.css`](/Users/kelano/Documents/Codex/Freshstack/app/globals.css):
- standard ease: `cubic-bezier(0.22, 1, 0.36, 1)`
- reveal animation duration: `720ms`

Common motion timings in components:
- button transitions: `300ms`
- panel glow opacity: `220ms`
- hero reveal: `1.7s`
- services rail transitions: `500ms`

### Reduced motion

Reduced motion is implemented globally:
- smooth scrolling turns off
- animations collapse to near-zero duration
- panel glow decoration is disabled

Rule:
- every new decorative motion pattern should degrade cleanly under `prefers-reduced-motion`

## Core Components

### Navbar

Reference:
- [`components/marketing/site-header.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/site-header.tsx)

Traits:
- sticky
- blurred translucent black background
- thin white bottom border
- white lockup on the left
- mono uppercase nav on desktop
- pill-scrolling mobile nav
- pill CTA with white icon capsule

### Hero

Reference:
- [`components/ui/experience-hero.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/ui/experience-hero.tsx)

Traits:
- full-screen black hero
- oversized headline
- outlined second line in the display lockup
- floating abstract orb shape
- magnetic CTA interaction
- supporting system card on mobile
- rotating tool cloud on desktop

### Buttons

Reference:
- [`components/marketing/primitives.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/primitives.tsx)

Primary button:
- white fill
- black text
- fully pill-shaped
- mono uppercase text

Secondary button:
- transparent dark fill
- white border and text
- inverts to white on hover

Ghost button:
- text only
- no visible border

### Cards and panels

Use `.glass-panel` for:
- founder blocks
- service cards
- process cards
- FAQ items
- booking panel
- case study cards and dialog shell

### Services rail

Reference:
- [`components/marketing/services-expand-rail.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/services-expand-rail.tsx)

Desktop behavior:
- one active service expands
- inactive services compress into tall narrow columns
- hover and focus both activate the panel

Mobile behavior:
- collapses to a standard vertical card grid

### Case study cards and dialog

Reference:
- [`components/marketing/case-studies-dialog-grid.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/case-studies-dialog-grid.tsx)

Card rules:
- compact summary card
- client type label
- title
- automation type line
- `View case study` affordance

Dialog rules:
- full-screen overlay on top of all site chrome
- rounded shell with thin white border
- close button in header row
- internal scroll area
- focus trapped while open
- focus returns to trigger on close

## Imagery

Current imagery patterns:
- founder portraits are grayscale
- decorative visuals stay abstract and tonal
- product/UI visuals are rendered as structured workflow diagrams rather than screenshot-heavy compositions

Guideline:
- use black-and-white or very muted imagery
- avoid stock-photo color casts
- prefer systems diagrams, architecture visuals, and clean product-like layouts over generic AI art

## Copy and Voice

### Voice characteristics

FreshStack copy should sound:
- practical
- founder-aware
- operationally credible
- direct
- non-hype

Use:
- short, assertive lines
- operations language
- concrete pain points
- business outcome framing

Avoid:
- fluffy innovation language
- exaggerated futurism
- emoji-heavy or casual-startup voice
- neon AI buzzword phrasing

### Writing patterns on the site

Common patterns:
- section labels as system markers: `// Services`
- headlines focused on operational pain and systems outcomes
- body copy that explains workflow drag clearly
- CTA language that feels like a working session, not a hype funnel

## Accessibility Rules

Current baseline rules to preserve:
- strong contrast on text and controls
- visible focus rings on interactive elements
- keyboard-accessible dialogs and navigation
- reduced-motion support
- readable body line-height

When extending the brand:
- never lower contrast to get a more "premium" look
- never remove focus rings without replacing them
- keep interactive hit areas generous

## Breakpoints

The site follows Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Current QA breakpoints used for validation:
- `320`
- `390`
- `768`
- `1024`
- `1440`

## Implementation Sources

Use these files as the source of truth:
- [`app/globals.css`](/Users/kelano/Documents/Codex/Freshstack/app/globals.css)
- [`components/marketing/primitives.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/primitives.tsx)
- [`components/marketing/site-header.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/site-header.tsx)
- [`components/marketing/site-footer.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/site-footer.tsx)
- [`components/ui/experience-hero.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/ui/experience-hero.tsx)
- [`components/marketing/services-expand-rail.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/services-expand-rail.tsx)
- [`components/marketing/case-studies-dialog-grid.tsx`](/Users/kelano/Documents/Codex/Freshstack/components/marketing/case-studies-dialog-grid.tsx)
- [`content/site-content.ts`](/Users/kelano/Documents/Codex/Freshstack/content/site-content.ts)

## Quick Build Checklist

When creating a new page or section for FreshStack, make sure it follows this checklist:
- black or charcoal base with white-led contrast
- Helvetica Neue style sans for headlines and body
- mono uppercase system labels
- soft glass panel treatment with thin translucent borders
- rounded corners, generally `1rem` to `1.4rem`
- pill CTAs and pills
- strong headline hierarchy
- restrained motion with reduced-motion fallback
- operator-focused copy, not hype copy
- logo used in white on dark backgrounds
