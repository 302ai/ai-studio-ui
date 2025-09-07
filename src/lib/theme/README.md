Design System v1 — Tailwind v4 Theme Layer

Overview

- Non-breaking for existing shadcn components (still use their tokens).
- Introduces a clean, layered token system for buss components.
- Users can override a curated set of CSS variables from Settings using plain CSS.

Layers

- Exposed tokens (--ui-\*): Minimal, safe knobs users can change.
- Derived tokens (--ui-tab-\*): Computed from exposed tokens for component needs.
- Tailwind bridge (@theme): Maps tokens to utilities like bg-_, h-_, px-_, size-_, rounded-\*.

Exposed Tokens (stable API)

- --ui-surface, --ui-surface-muted: Base surfaces.
- --ui-text, --ui-text-muted: Base text roles.
- --ui-accent, --ui-accent-fg: Accent pair.
- --ui-ring: Focus/ring color.
- --ui-radius: Global radius baseline.
- --ui-density: Scale factor for compactness (1 = default).

Tab-specific (high-level)

- --ui-tab-radius
- --ui-tab-height, --ui-tab-padding-x, --ui-tab-gap
- --ui-tabbar-height, --ui-tabbar-padding-x
- --ui-tab-width, --ui-tab-min-width, --ui-tab-title-max-w
- --ui-tab-icon-size, --ui-tab-item-icon-size, --ui-tab-icon-mr
- --ui-tab-close-icon-size, --ui-tab-close-pad, --ui-tab-new-button-size
- --ui-tab-bg-active, --ui-tab-fg-active
- --ui-tab-bg-inactive, --ui-tab-fg-inactive
- --ui-tab-hover-bg, --ui-tab-btn-hover-active, --ui-tab-btn-hover-inactive
- --ui-tabbar-bg

Generated Utilities

- Colors: bg-tab-active, bg-tab-inactive, bg-tab-hover, text-tab-fg-active, text-tab-fg-inactive, bg-tabbar-bg, bg-tab-btn-hover-active, bg-tab-btn-hover-inactive
- Spacing: h-tab-h, w-tab-w, min-w-tab-min-w, px-tab-pad-x, gap-tab-gap, h-tabbar-h, px-tabbar-pad-x, max-w-tab-title-max-w, mr-tab-icon-mr, p-tab-close-pad
- Sizes: size-tab-icon, size-tab-item-icon, size-tab-close-icon, size-tab-new-btn
- Radius: rounded-tab

User Overrides (Settings)

- Accept only --ui-\* declarations to keep it safe and stable, e.g.:
  --ui-accent: oklch(65% 0.16 280);
  --ui-accent-fg: #fff;
  --ui-radius: 0.5rem;

API (optional helper)

- import { applyUserVars, applyRawUserCss } from "$lib/theme/user-theme";
  - applyUserVars({ "--ui-accent": "#9b59b6" })
  - applyRawUserCss("--ui-accent: oklch(65% 0.17 277);\n--ui-radius: 8px;")

Notes

- Defaults derive from existing shadcn variables to preserve appearance.
- Use Oklch where possible to maintain perceptual consistency when mixing.
- Keep the exposed surface small; add more tokens only when necessary.
