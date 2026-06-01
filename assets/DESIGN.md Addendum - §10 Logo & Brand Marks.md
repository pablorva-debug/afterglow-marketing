# DESIGN.md Addendum — Section 10: Logo & Brand Marks

_Insert this as a new top-level section in DESIGN.md, between section 9 (Open Graph Image Spec) and the closing._

---

## 10. Logo & Brand Marks

The Afterglow identity is one wordmark and one mark, both built from the same chromatic afterimage idea: amber in front, rose offset behind it, violet offset behind that, all blended with `mix-blend-mode: screen` over the dark background. The name *is* the visual — a trail of light reading itself.

### 10.1 The system at a glance

| Asset | What it is | Where it lives |
|---|---|---|
| **Mark** | A single chromatic "A" on the `--black` tile (rounded square) | Favicon, iOS / Android app icon, in-app top-right, anywhere a square slot needs to be filled |
| **Wordmark** | "AFTERGLOW" set in Bebas Neue with the same chromatic offset | Footer, body copy lockups, OG image, marketing headlines |
| **Lockup** | Mark + wordmark together (horizontal for nav strips, stacked for hero / brand moments) | Main nav, hero, splash, onboarding celebration |

There is no monochrome / "simplified" alternate at MVP. The chromatic treatment is the identity — drop it and we no longer have a logo, we have a typeface choice.

---

### 10.2 Anatomy

**Mark**
- Container: rounded square at `radius = size × 0.222` (matches iOS app-icon corner).
- Tile fill: `--black` (`#07060d`).
- Glyph: capital "A" in Bebas Neue, set at `font-size = tile × 0.72`, centred.
- Three stacked layers, all with `mix-blend-mode: screen`:
  - **Back** — `--violet` `#7b4fff`, offset `-7%` on the x-axis, `opacity: 0.85`
  - **Mid** — `--rose` `#ff6b9d`, offset `-3.5%` on the x-axis, full opacity
  - **Front** — `--amber` `#f5a623`, no offset, full opacity
- Read order: violet → rose → amber. Left to right, the user's eye walks the wristband palette ending on the action colour.

**Wordmark**
- "AFTERGLOW" in Bebas Neue, 400 weight, `letter-spacing: 0.005em`, `line-height: 0.85`.
- Same three-layer chromatic offsets, scaled to the wordmark size:
  - Back violet, offset `-9%` of font-size
  - Mid rose, offset `-4.5%` of font-size
  - Front amber, no offset
- Same `mix-blend-mode: screen` blend.

The offset values are tied to the type size — they scale with the wordmark so the chromatic effect reads identically at 16 px and 160 px. Do not hard-code the offsets in absolute pixels.

**Lockup**
- Horizontal (default): mark on the left, wordmark on the right.
  - Mark size = wordmark `font-size × 1.2`.
  - Gap = wordmark `font-size × 0.36`.
- Stacked (hero / brand moments): mark on top, wordmark below, centre-aligned.
  - Mark size = wordmark `font-size × 1.6`.
  - Gap = wordmark `font-size × 0.34`.

---

### 10.3 Colour ownership — the rule that makes the system coherent

The brand has three colours. Each owns a specific role. The logo participates in this hierarchy explicitly.

| Colour | Role | Where it appears | Logo participation |
|---|---|---|---|
| **Amber** `#f5a623` | The system colour. Identity. Action. "You." | CTAs, active states, "Went" badge, accent bar (default), focus rings, logo **front** | The wordmark and mark **read as amber.** Amber is what stays in the eye. |
| **Violet** `#7b4fff` | Status colour. Forward motion, anticipation. | "Going" badge, accent bar (going), wristband stripe, logo **back trail**, passport-section glow | A trace, never a dominant colour. |
| **Rose** `#ff6b9d` | Status colour. Wishfulness, anticipation. | "Wishlist" badge, accent bar (wishlist), wristband stripe, logo **mid trail**, OG image stripe | A trace, never a dominant colour. |

**The rule:** violet and rose only ever appear (a) on a specific status badge or accent bar, (b) inside the wristband stripe motif, or (c) as trailing layers behind amber. They never carry a flat solid surface, never colour a button, never set body text. The afterimage logo is the only place all three colours sit together at full opacity, and even there amber is the front-most layer — the one the user "ends on."

This is what stops the logo from clashing with the rest of the UI: the logo reads as **amber with a warm halo**, not as a three-colour brand mark. If you ever see the violet or rose reading louder than the amber, the offset is too aggressive — pull it back.

---

### 10.4 Required clear space

Treat the wordmark's cap-height as one unit (`1×`). The minimum clear space on all sides:

- **Mark alone**: `0.3×` the mark's height on all sides.
- **Wordmark alone**: `0.5×` the cap-height (≈ the height of one Bebas character at that size).
- **Lockup**: `0.5×` the wordmark cap-height around the bounding box of the lockup.

Inside that clear space, nothing else may sit — no nav items, no badges, no body copy.

---

### 10.5 Sizing rules

| Context | Wordmark size | Mark size | Layout |
|---|---|---|---|
| Webapp / landing nav | 20 px | 26 px | Horizontal lockup |
| Mobile app nav (top-right) | n/a — mark only | 28 px | Mark only |
| Hero / splash | 56 px (mobile: 38 px) | 90 px (mobile: 60 px) | Stacked lockup |
| Footer | 17 px | n/a — wordmark only | Wordmark only |
| Body copy inline | match line-height | n/a | Wordmark only |
| Favicon | n/a | 16 / 32 px | Mark only |
| iOS app icon | n/a | 60 / 87 / 120 / 180 px (system-set) | Mark only |
| Open Graph card | 24 px (handle line) + 32 px (footer wordmark) | n/a | Wordmark only |

Below 16 px, do not render the chromatic effect — the offsets compress and the logo reads as a smudge. Use the solid-amber A fallback (`assets/favicon-16.png`) for any context that needs sub-16-px presence (Android task switcher, some browser histories).

---

### 10.6 Backgrounds

The mark is designed for `--black` and `--deep`. The wordmark works on `--black`, `--deep`, and any dark photograph or video frame where the amber front layer has at least 4.5:1 contrast with the underlying pixel.

The logo **must not** appear on:
- Amber or any warm-yellow background — the front layer disappears.
- Violet, rose, or any saturated brand colour — the chromatic offsets fight the background.
- White or light cream surfaces — see "On light" below.

**On light** (press kit, business cards, single-colour print, partner co-branding): use the **mark on its tile** — the dark rounded square preserves the chromatic effect against any light surface. Do not use the bare chromatic wordmark on a light background; the amber front layer becomes painful and the mix-blend-mode screen blend turns muddy.

---

### 10.7 Don't

- Don't separate the layers and use violet, rose, or amber as a single-colour logo. The wordmark is always the full chromatic stack or it doesn't appear.
- Don't recolour the offsets. The trail order is fixed: violet → rose → amber. Reversing it is not a different version, it is a wrong version.
- Don't animate the chromatic offsets. The effect is read as a still photograph of motion — once it starts shimmering it becomes a kinetic logo, which is a different brand.
- Don't add a tagline below the wordmark. The wordmark is the headline. Taglines that need to sit near the logo go on a separate line with at least `1×` cap-height of separation.
- Don't outline the mark or add a stroke to the wordmark.
- Don't replace Bebas Neue with a substitute. If Bebas Neue fails to load, fall back to `sans-serif` and the chromatic offset still reads — better that than a substitute display face.
- Don't pair the logo with other display typefaces. Bebas Neue is the identity face.

---

### 10.8 Asset files

All assets live in `assets/` at the project root. Filename → use:

| File | Size / format | Use for |
|---|---|---|
| `afterglow-mark.svg` | Vector, 200×200 viewBox | Any web context that supports SVG |
| `afterglow-wordmark.svg` | Vector, 600×120 viewBox | Hero, OG, headline lockups in HTML / email |
| `afterglow-lockup-horizontal.svg` | Vector, 800×200 viewBox | Nav strips, business cards (horizontal) |
| `afterglow-lockup-stacked.svg` | Vector, 400×460 viewBox | Hero, splash, business cards (square) |
| `favicon.svg` | Vector | Modern browser favicon |
| `favicon-16.png` | 16×16, solid-amber A fallback | Sub-16-px browser tabs |
| `favicon-32.png` | 32×32, chromatic | Standard browser favicon |
| `apple-touch-icon.png` | 180×180, chromatic | iOS home screen |
| `android-chrome-192.png` | 192×192, chromatic | Android home screen |
| `android-chrome-512.png` | 512×512, chromatic | Android splash, structured-data logo |
| `og-image.png` | 1200×630, chromatic wordmark on dark with wristband | Open Graph card for social shares |
| `app-store-icon.png` | 1024×1024, chromatic | App Store / Play Store submission |

The SVG sources are the canonical files — regenerate the PNGs from them if the colour tokens or offsets ever change.

---

### 10.9 The story (for copy, decks, and pitches)

> The wordmark is the night, held in a single frame. Three layers of light, slightly out of register. Violet for the anticipation. Rose for the show itself. Amber for what stays with you on the walk home. Read it left to right and you've walked through the whole product.

Use this verbatim or paraphrased when the brand needs explaining.
