# A Certain Woman

A faith-rooted women's movement based in Freetown, Sierra Leone — restoring hearts, reclaiming crowns. This repository contains the public website.

**Tagline:** _Restoring Hearts. Reclaiming Crowns._

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19, TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with `@theme inline` design tokens
- [shadcn/ui](https://ui.shadcn.com) (base-nova style) on top of Radix and `@base-ui/react`
- DM Serif Display + Manrope via `next/font/google`

## Getting started

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

Set the canonical site URL so absolute metadata, canonical links, OG images, `robots.txt`, and `sitemap.xml` all resolve correctly:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://acertainwoman.org
```

If unset, the code falls back to `https://acertainwoman.org`.

## Project layout

```
src/
  app/                      # Routes (App Router)
    layout.tsx              # Root layout: fonts, root metadata, viewport
    page.tsx                # Home (the 11-section homepage)
    robots.ts               # robots.txt
    sitemap.ts              # sitemap.xml
    globals.css             # Tailwind v4 layers + ACW design tokens

    about/                  # /about
    our-work/               # /our-work
    programs/               # /programs
    partner/                # /partner
    events/                 # /events
    gallery/                # /gallery
    stories/                # /stories — server page + client grid
    contact/                # /contact — server page + client form

  components/
    site/                   # Nav, Footer, PageHero, icons
    sections/               # Hero, Welcome, WhoWeServe, Pillars,
                            # Experiences, Manifesto, Founder,
                            # Events, StoriesPreview, Anthem, Join
    ui/                     # shadcn primitives (button, ...)

  lib/                      # data + utilities

public/
  assets/
    logo.svg                # Brand favicon (referenced from metadata.icons.icon)
    apple-icon.png          # 180×180 Apple touch icon
    og-image.png            # 1200×630 OpenGraph / Twitter card
    logo.png, logo_full.png # Brand marks for nav/footer use
    anthem.mp3              # Audio anthem (Naimbana Street)
  photos/                   # Editorial photography
```

### Server vs client pages

Most pages are Server Components so they can export `metadata`. The two interactive pages (`/contact`, `/stories`) split the interactive surface into a `"use client"` child (`contact-form.tsx`, `stories-grid.tsx`) and keep `page.tsx` as a server component that owns the SEO metadata.

## Design system

The full visual language lives in [`DESIGN.md`](./DESIGN.md). At a glance:

- **Palette:** cream `#faf6ee`, ink `#1f2620`, forest `#1f3d2b`, gold `#b6914a` / gold-2 `#d4ae6b`
- **Type:** DM Serif Display (display, italic) + Manrope (body)
- **Layout primitives:** `acw-row` (editorial persona/pillar rows), `acw-twoup`, `acw-checklist`, `acw-value-card`, `acw-section-label`, `acw-page-hero`, `acw-footer-grand`
- **Surfaces:** stacked cream gradients, `acw-bg-forest` for the dark tab block, gold radial glow for the anthem disc

Tokens live in `:root` and are re-exported through `@theme inline` in `src/app/globals.css`, which makes them usable as Tailwind utilities (`text-forest`, `bg-cream-1`, `border-gold-2/15`, etc.).

## SEO

- Rich metadata in `src/app/layout.tsx` — title template, description, keywords, OG, Twitter card, robots, canonical, `theme-color` (light + dark), and `icons` pointing at the brand assets in `public/assets/`
- Per-page `metadata` on every route — each sets its own `title`, `description`, and `alternates.canonical`
- `app/robots.ts` and `app/sitemap.ts` generate `robots.txt` and `sitemap.xml` at build
- Social cards use `public/assets/og-image.png` (1200×630)
- Favicon uses `public/assets/logo.svg`; iOS home-screen uses `public/assets/apple-icon.png`

To deploy, set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical URLs and the sitemap resolve correctly.

## Deploy

The recommended host is [Vercel](https://vercel.com). Push the repo, set `NEXT_PUBLIC_SITE_URL` in project settings, and ship.

For other hosts, any platform that runs `next build` + `next start` (or static export) will work.

## Conventions

- Tailwind v4: prefer utility classes; reach for `globals.css` `@layer components` only for cross-page primitives (`acw-*` classes).
- `@apply` only references built-in utilities and theme tokens — Tailwind v4 cannot `@apply` custom component classes.
- Keep `page.tsx` files Server Components so they can export `metadata`. Push interactivity (`useState`, event handlers) into colocated `"use client"` child components.
- The site is single-locale (English) and content-driven — most pages render static arrays defined at the top of the file.
