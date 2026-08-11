# A Certain Woman

A faith-rooted women's movement based in Freetown, Sierra Leone — restoring hearts, reclaiming crowns. This repository contains the public website.

**Tagline:** _Restoring Hearts. Reclaiming Crowns._

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19, TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with `@theme inline` design tokens
- [shadcn/ui](https://ui.shadcn.com) (base-nova style) on top of Radix and `@base-ui/react`
- [GSAP](https://gsap.com) + ScrollTrigger for scroll reveals
- [Resend](https://resend.com) for contact and newsletter email
- [Zod](https://zod.dev) for API input validation
- DM Serif Display + Manrope + Caveat via `next/font/google`

## Getting started

This project uses [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
pnpm build   # Production build
pnpm start   # Run the production build
pnpm lint    # ESLint
```

## Environment

Copy the keys below into `.env.local`. The contact and newsletter routes need Resend credentials; everything else runs without them.

```bash
# Canonical origin. Absolute metadata, canonical links, OG images,
# robots.txt, sitemap.xml, and llms.txt all resolve against this.
NEXT_PUBLIC_SITE_URL=https://www.acertainwoman.org

# Email delivery for /api/contact and /api/newsletter
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@your-verified-domain
CONTACT_TO_EMAIL=where-alerts-land@example.com
```

If `NEXT_PUBLIC_SITE_URL` is unset the code falls back to `https://www.acertainwoman.org`.

## Project layout

```
src/
  app/                      # Routes (App Router)
    layout.tsx              # Root layout: fonts, root metadata, viewport
    page.tsx                # Home
    not-found.tsx           # 404, with a nearest-page suggestion
    loading.tsx             # Route-level loading fallback
    globals.css             # Tailwind v4 layers + ACW design tokens
    robots.ts               # robots.txt
    sitemap.ts              # sitemap.xml
    llms.txt/               # llms.txt — plain-text site summary for models

    about/                  # /about
    founder/                # /founder — the founder's letter
    programs/               # /programs
    events/                 # /events — server page + client browser
    gallery/                # /gallery
    partner/                # /partner
    contact/                # /contact — server page + client form
    api/
      contact/              # POST — contact form, sends via Resend
      newsletter/           # POST — newsletter signup

  components/
    site/                   # Nav, Footer, PageHero, Reveal, icons,
                            # announcement banner, 404 suggestion
    sections/               # Hero, WhoWeServe, Manifesto, Impact, Founder,
                            # Anthem, Join, Events, EventDetail, Gallery,
                            # Programs, WomenPrograms, MenWhoStand, OurWork, Faq
    ui/                     # shadcn primitives + phone field, lightbox

  config/                   # site constants, metadata, JSON-LD
  hooks/                    # useGsapReveal
  lib/
    data/                   # events + programs content
    email/                  # Resend email templates
    hooks/                  # useDebouncedValue
    routes.ts               # public route list + nearest-match for the 404
    shuffle.ts              # seeded, hydration-safe shuffling
    utils.ts                # shadcn `cn()`

public/
  assets/                   # logos, icons, OG image, anthem audio, portraits
  media/                    # event photography and films, one folder per event
```

### Server vs client pages

Most pages are Server Components so they can export `metadata`. Interactive pages split the interactive surface into a `"use client"` child — `/contact` has `contact-form.tsx`, `/events` has `events-browser.tsx` — and keep `page.tsx` as a server component that owns the SEO metadata.

### Content

Events and programs are plain TypeScript data in `src/lib/data/`. Adding a gathering means adding an entry to `EVENTS` and dropping its photographs into `public/media/<event>/`. There is no CMS.

Gallery order is shuffled per event, seeded by event id, so a set reads as a mix rather than a run of consecutive frames off the camera while staying identical between server and client.

### Media

Photographs are resampled to **2560px on the long edge at quality 85** before being committed. Source files from the camera are 6000×4000 and roughly 25× larger than anything the site ever serves. Films are re-encoded when the source is far above what the player needs.

## Design system

The full visual language lives in [`DESIGN.md`](./DESIGN.md). At a glance:

- **Palette:** cream `#faf6ee`, ink `#1f2620`, forest `#1f3d2b`, gold `#b6914a` / gold-2 `#d4ae6b`
- **Type:** DM Serif Display (display, italic) + Manrope (body) + Caveat (accent)
- **Layout primitives:** `acw-twoup`, `acw-checklist`, `acw-value-card`, `acw-section-label`, `acw-page-hero`, `acw-footer-grand`
- **Surfaces:** stacked cream gradients, `acw-bg-forest` for the dark block, gold radial glow for the anthem disc

Tokens live in `:root` and are re-exported through `@theme inline` in `src/app/globals.css`, which makes them usable as Tailwind utilities (`text-forest`, `bg-cream-1`, `border-gold-2/15`, etc.).

## SEO

- Rich metadata in `src/app/layout.tsx` — title template, description, keywords, OG, Twitter card, robots, canonical, `theme-color`, and `icons`
- Per-page `metadata` on every route, each with its own `title`, `description`, and `alternates.canonical`
- JSON-LD in `src/config/jsonld.ts`, including per-event structured data on `/events`
- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` and `sitemap.xml` at build
- `app/llms.txt/route.ts` serves a plain-text summary of the site for language models, generated from the same event data the pages use
- The 404 sets `robots: { index: false }` and suggests the nearest real page instead of redirecting, so a mistyped URL never answers `200`
- Known URL variants (`/contacts`, `/donate`, `/programme`, …) are real redirects in `next.config.ts` rather than runtime guesses

Set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs, the sitemap, and `llms.txt` resolve correctly.

## Deploy

The recommended host is [Vercel](https://vercel.com). Push the repo, set the environment variables above in project settings, and ship.

Any platform that runs `next build` + `next start` will work. Note the repository carries its own photography in `public/media`, so a shallow clone is the fastest way to build.

## Conventions

- Tailwind v4: prefer utility classes; reach for `globals.css` `@layer components` only for cross-page primitives (`acw-*` classes).
- `@apply` only references built-in utilities and theme tokens — Tailwind v4 cannot `@apply` custom component classes.
- Keep `page.tsx` files Server Components so they can export `metadata`. Push interactivity into colocated `"use client"` children.
- Anything that differs between server and client — a URL hash, a random order — must be seeded or deferred to an effect, or it becomes a hydration mismatch. `src/lib/shuffle.ts` exists for this reason.
- Animation respects `prefers-reduced-motion`; reveal helpers already honour it.
- The site is single-locale (English) and content-driven.

## Not currently shipped

`/stories` is shelved until there are real stories to tell. The route and its components were removed rather than left half-built; `/stories`, `/story`, and `/testimonials` temporarily (307) redirect to `/gallery`, so the URL can be reclaimed when the page returns. The previous implementation is in git history.
