# A Certain Woman — Design System

A quiet, editorial style guide for a sisterhood website. The mood is reverent
and unhurried — print-magazine typography, cream paper, gold ornamentation,
and forest-deep contrast.

---

## 1. Voice & Mood

- **Editorial, not corporate.** Layouts breathe; copy is set in long measure;
  numerals and section labels behave like a slow magazine, not a SaaS dashboard.
- **Tactile, not synthetic.** Subtle radial-grain backgrounds, hairline gold
  rules, soft cream surfaces — no harsh drop shadows or chrome.
- **Reverent, not loud.** Animations rise softly (`cubic-bezier(.2,.8,.2,1)`),
  never bounce. Motion duration is generous (700–1100 ms).

---

## 2. Color

All tokens live in `:root` in [globals.css](src/app/globals.css) and are
re-exported through `@theme inline` so Tailwind utilities like
`bg-cream-1`, `text-forest`, `border-gold` are first-class.

| Token | Hex | Role |
| --- | --- | --- |
| `--acw-cream-1` | `#FAF6EE` | Page background — paper |
| `--acw-cream-2` | `#F2EADB` | Secondary surface, soft cards |
| `--acw-cream-3` | `#E6DAC2` | Tertiary tint, dividers on cream |
| `--acw-ink` | `#1F2620` | Body text, deepest content |
| `--acw-ink-2` | `#3A4138` | Long-form prose |
| `--acw-muted` | `#6F6857` | Eyebrows, captions, meta |
| `--acw-green` (forest) | `#1F3D2B` | Display headlines, CTAs, dark sections |
| `--acw-green-2` | `#2C5239` | Forest hover state |
| `--acw-gold` | `#B6914A` | Italic display accents, links, ornaments |
| `--acw-gold-2` | `#D4AE6B` | Gold on dark backgrounds |
| `--acw-rule` | `rgba(31,38,32,0.18)` | Hairline borders |

### shadcn mapping

The shadcn primitives are themed via the same tokens:

- `--background` = cream-1, `--foreground` = ink
- `--primary` = forest, `--primary-foreground` = cream-1
- `--secondary` / `--muted` = cream-2
- `--accent` = gold
- `--ring` = gold (focus rings)
- `--border` / `--input` = the hairline rule

This keeps `<Button>`, `<Card>`, `<Input>`, `<Checkbox>`, and `<Dialog>` on
brand with no per-instance overrides.

---

## 3. Typography

Two web fonts, loaded with `next/font/google`:

| Family | Variable | Use |
| --- | --- | --- |
| DM Serif Display (400 + italic) | `--font-display` | Headlines, eyebrows, blockquotes, italic accents |
| Manrope (300/400/500/600) | `--font-body` | Body, navigation, labels, inputs |

### Scale

| Class / treatment | Size | Weight | Notes |
| --- | --- | --- | --- |
| Hero mega (`.acw-tagline-mega`) | `clamp(72px, 14.5vw, 220px)` | 400 | `tracking: -0.02em`, `line-height: 0.9` |
| Hero small (`.acw-tagline-small`) | `clamp(18px, 1.8vw, 26px)` | 400 italic | DM Serif Display, muted |
| Display (`.acw-display`) | `clamp(40px, 5.6vw, 88px)` | 400 | `tracking: -0.015em`, italics → gold |
| Section title | `clamp(28px, 3.2vw, 44px)` | 400 | DM Serif Display |
| Lede / blockquote | 20px italic | 400 | DM Serif Display, color cream/ink-2 |
| Body | 15–16px | 400 | Manrope, `line-height: 1.85` |
| Eyebrow / label | 11px | 400 | Manrope, `tracking: 0.28–0.32em`, uppercase |
| Meta / caption | 10–11px | 400 | Manrope, uppercase tracking 0.3em |

**Italics carry meaning.** DM Serif Display italic is reserved for emphasis
words (`A Certain Woman`, `becoming`, `rises`). Italic spans are always
gold — `.acw-display em { color: var(--acw-gold) }`.

---

## 4. Spacing & Layout

- Page max-width: **1280–1440 px**, gutter `px-6 md:px-12`.
- Section vertical rhythm: `py-24 md:py-36` for standard sections,
  `py-32 md:py-44` for hero-class sections.
- Editorial grids use two columns with **24-rem gap** at `lg:`,
  one column below.
- Hero is always centered; everything else may be asymmetric.
- Decorative "sprigs" sit at corners with parallax (translate on `scrollY`).

---

## 5. Components

All UI primitives are shadcn `base-nova` style, themed by token.

### Button — variants & sizes

Defined in [`src/components/ui/button.tsx`](src/components/ui/button.tsx)
via `cva`. **Always prefer a `variant` + `size` pair over passing
`className`.** `className` is reserved for genuinely positional one-offs
(`w-full`, `mt-2 w-fit`, etc.) — not style.

**ACW variants** (in addition to the shadcn defaults — `default`, `outline`,
`secondary`, `ghost`, `destructive`, `link`):

| Variant | Use |
| --- | --- |
| `editorial` | Primary CTA. Forest fill, cream text, `hover:bg-forest-2`. |
| `editorialOutline` | Secondary CTA. Hairline forest border, fills cream-2 on hover. |
| `editorialOnDark` | Cream-on-forest pill — reserved for dark sections. |

**ACW sizes** (in addition to shadcn `default` / `xs` / `sm` / `lg` /
`icon*`):

| Size | Geometry |
| --- | --- |
| `pill` | `h-12 px-7 rounded-full gap-2`, label `text-[12px] uppercase tracking-[0.18em]` |
| `pillSm` | `h-11 px-6 rounded-full gap-2`, label `text-[11px] uppercase tracking-[0.18em]` |

```tsx
// ✅ Use variants
<Button asChild variant="editorial" size="pill">
  <Link href="#join">Join the sisterhood <ArrowRight /></Link>
</Button>

<Button asChild variant="editorialOutline" size="pill">
  <Link href="#story">Read her story</Link>
</Button>

// ✅ className only when the position is unique
<Button variant="editorial" size="pill" className="w-full">Begin</Button>

// ❌ Don't redeclare the variant by hand
<Button className="h-12 rounded-full bg-forest px-7 text-[12px] uppercase tracking-[0.18em] text-cream-1 hover:bg-forest-2">…</Button>
```

### Other primitives

- `Card` — `rounded-md`, hairline border, cream-1 surface. No drop shadow
  except the join form (`shadow-[0_30px_60px_-30px_rgba(31,61,43,0.18)]`).
- `Input` / `Label` — `h-11`, hairline border, gold focus ring at 30% opacity.
- `Checkbox` — used inside chip-style `<Label>` toggles for role selection.
- `Dialog` — full-bleed cream-1 surface for the lightbox/video player. No
  rounded corners on the image inside.
- `Separator` — hairline on dark uses `bg-cream-1/15`.

### Custom editorial primitives (in `globals.css` `@layer components`)

Type & ornament:
- `.acw-display` — the main editorial heading.
- `.acw-tagline-mega` — hero-scale `A Certain Woman.` headline.
- `.acw-tagline-small` — italicized eyebrow line above the hero mega.
- `.acw-section-label` — "I. — Who she is" pattern, gold roman numeral +
  uppercase tracked label.
- `.acw-section-label-mini` — 10 px uppercase mini-label for sub-sections
  (PROGRAM, VOICES, FILM, etc).
- `.acw-link-arrow` — inline "Read more" affordance: gap widens to 18 px on
  hover, color shifts from forest to gold.
- `.acw-dropcap` — float-left display capital, gold, 64 px.
- `.acw-rule-line` — gold-to-transparent hairline divider.

Section backgrounds (replace inline gradients):
- `.acw-bg-hero` — hero radial-cream gradient.
- `.acw-bg-cream-down` — top-down cream-1 → cream-2 gradient (Partner).
- `.acw-bg-cream-up` — bottom-up cream-2 → cream-1 gradient (Join).
- `.acw-bg-quote-glow` — gold radial highlight, used over forest sections.
- `.acw-grain` — subtle two-spot grain overlay.

Motion:
- `.acw-rise` — page-load entrance (1.1 s, soft easing).
- `.acw-rise-delay-1` / `-2` / `-3` — stagger delays (250 / 350 / 550 ms).
- `.acw-fade` — eyebrow fade-in.
- `.acw-marquee-track` — 40 s linear infinite scroll.

Layout utilities (`@layer utilities`):
- `.flex-center` — `flex items-center justify-center` shorthand.
- `.acw-diamond-spacer` — the marquee `<Diamond>` margin + opacity.

---

## 6. Motion

| Pattern | Duration | Easing |
| --- | --- | --- |
| Hero rise-in | 1100 ms staggered (250 / 350 / 550 ms delays) | `cubic-bezier(.2,.8,.2,1)` |
| Eyebrow fade | 1000 ms | `ease-out` |
| Card stagger on scroll | 700 ms with `idx * 120 ms` delay | `cubic-bezier(.2,.8,.2,1)` |
| Hover (links, buttons) | 250 ms | `ease` |
| Manifesto parallax | drives transform from scroll progress, 1:1 | linear |
| Marquee | 40 s | `linear` infinite |
| Hero sprig drift (`.acw-sway`) | 11 s, 15 s on the second sprig | `ease-in-out` infinite |
| Loading mark (`.acw-float`) | 2.6 s | `ease-in-out` infinite |
| Newsletter panel reveal | 1000 ms, fades and scales from 0.94 | `power2.out` |
| Delivery toggle thumb | 300 ms, slides and resizes | `cubic-bezier(.34,1.56,.64,1)` |
| Field swap on channel change | 350 ms, 60 ms stagger | `power2.out` |

Scroll reveals run through GSAP ScrollTrigger, wrapped by `useGsapReveal` and
the `<Reveal>` helper. Pass `batch` when the targets are spread down a long
section: without it the whole section shares one trigger and anything below the
fold finishes animating before anyone scrolls to it.

Two transforms cannot share one element. The hero sprigs keep their scroll
parallax on the outer element and their drift on a nested wrapper.

Everything infinite is disabled under `prefers-reduced-motion`, and
`useGsapReveal` returns early when it is set.

---

## 7. Imagery

- Always served via `next/image` from `/public/media/*`, one folder per event.
- Committed at **2560px on the long edge, quality 85**. Camera originals are
  6000×4000 and far past anything the site serves; the difference is invisible
  at display size and enormous on the wire.
- Order is shuffled in two places, both through `src/lib/shuffle.ts` and both
  seeded, because an unseeded shuffle would give the server and the client
  different orders and break hydration:
  - **Event galleries** shuffle that event's photos with a seed derived from
    the event id (`src/lib/data/events.ts`), so a set reads as a mix rather
    than a run of near-identical frames and holds still between builds.
  - **`/gallery`** shuffles the combined media of every event with a
    `Date.now()` seed generated on the server and handed to `<Gallery>`.
    `revalidate = 3600` means the mix changes at most hourly, and the cached
    HTML keeps one order within each window.
- Gallery uses a `2×2 → 4×n` asymmetric grid with `wide` (col-span-2) and
  `tall` (row-span-2) tiles; the video tile is `2×2`.
- Event films lay out by count: one keeps the wide hero ratio at half width,
  two split the row, three or more go 3-up and wrap. Single column on mobile.
  Give every film its own `poster`, or they all fall back to the event cover.
- Hover state: photo zooms 1.03–1.04 over 700 ms; a forest gradient overlay
  with caption fades in at the bottom.
- Inset borders (`absolute inset-3 border border-cream-1/30`) add a print-frame
  feel on portraits.

---

## 8. Accessibility

- `next/font` self-hosts and preloads — no layout shift.
- All interactive elements use real `<button>` / `<a>` with `aria-label`s
  on icon-only controls.
- Focus rings are visible — gold at 50% opacity (`outline-ring/50`).
- Lightbox / video dialog uses shadcn `Dialog` with `DialogTitle` (sr-only).
- Keyboard nav: `ArrowLeft` / `ArrowRight` cycle photos in event lightboxes;
  `Esc` closes.

---

## 9. File map

```text
src/
├── app/
│   ├── layout.tsx          ← fonts, root <html>, root metadata
│   ├── globals.css         ← all design tokens + .acw-* primitives
│   ├── page.tsx            ← homepage composition
│   ├── not-found.tsx       ← 404 with nearest-page suggestion
│   ├── loading.tsx         ← route-level loading fallback
│   ├── events/             ← /events (server page + client browser)
│   └── gallery/page.tsx    ← /gallery
├── components/
│   ├── ui/                 ← shadcn primitives, lightbox, phone field
│   ├── site/
│   │   ├── nav.tsx
│   │   ├── footer.tsx
│   │   ├── page-hero.tsx
│   │   ├── reveal.tsx      ← client wrapper for GSAP scroll reveals
│   │   └── icons.tsx       ← Crown, Sprig, Diamond, PillarIcon, Play
│   └── sections/
│       ├── hero.tsx
│       ├── who-we-serve.tsx
│       ├── manifesto.tsx
│       ├── impact.tsx
│       ├── founder.tsx
│       ├── anthem.tsx
│       ├── events.tsx
│       ├── event-detail.tsx
│       ├── gallery.tsx
│       ├── programs.tsx / women-programs.tsx / men-who-stand.tsx
│       ├── our-work.tsx
│       ├── faq.tsx
│       └── join.tsx
├── hooks/use-gsap-reveal.ts
└── lib/
    ├── data/events.ts      ← single source for event + photo content
    ├── data/programs.ts    ← programs content
    ├── routes.ts           ← public routes + nearest match for the 404
    ├── shuffle.ts          ← seeded, hydration-safe shuffling
    └── utils.ts            ← shadcn `cn()`
```

The homepage composes Hero, WhoWeServe, Manifesto, Impact, Founder, Anthem,
and Join. Programs, events, and the men's work each have their own section
components reused across the inner pages.

---

## 10. Rules of thumb

1. **Italics are gold.** Never use bold for emphasis — use DM Serif Display
   italic in the gold accent color.
2. **Tracking matters.** Anything uppercase ≥ `0.18em`. Numerals stay at 0.
3. **No filled buttons except primary.** Secondary actions are pill outlines
   (`variant="editorialOutline"`) or `.acw-link-arrow`.
4. **Cream is paper; forest is ink.** Inverting that pairing (forest section
   with cream type) is reserved for the Quotes and Footer sections.
5. **No rounded-2xl.** Cards are `rounded-md`; pills are `rounded-full`.
   Everything else is square.
6. **Reach for a variant before a `className`.** If you find yourself typing
   the same Tailwind chain twice, it belongs in `buttonVariants` or in a
   `.acw-*` class in `globals.css`. `className` is for one-off positioning,
   not style.
7. **No inline `style` for static values.** Gradient backgrounds, font-size
   clamps, animation delays, and ornament spacing all live in CSS classes.
   The only acceptable inline `style` is JS-driven (scroll-linked parallax
   transforms in `hero.tsx` / `manifesto.tsx`).