# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses pnpm as the package manager.

**Core Development:**
- `pnpm dev` - Start development server with Vite
- `pnpm build` - Build production version
- `pnpm preview` - Preview production build

**Code Quality:**
- `pnpm check` - Run Svelte type checking and sync
- `pnpm check:watch` - Run type checking in watch mode
- `pnpm lint` - Run Prettier formatting check and ESLint
- `pnpm format` - Format code with Prettier

## Architecture Overview

This is a **SvelteKit 5** application using the modern `$props()` and `{@render}` syntax. The project is configured as a static site using `@sveltejs/adapter-static`.

### Key Technologies:
- **Svelte 5** with new runes syntax (`$props()`, `$bindable()`, etc.)
- **TailwindCSS 4.0** with the new Vite plugin
- **TypeScript** for type safety
- **Paraglide JS** for internationalization (i18n) with generated messages in `src/lib/paraglide/`
- **@lucide/svelte** for icons
- **bits-ui** and custom UI components for the design system

### Project Structure:

**Route Architecture:**
- `src/routes/(with-sidebar)/` - Pages with sidebar layout (dashboard, etc.)
- `src/routes/(full-width)/` - Pages without sidebar (full-width layouts)

**Component System:**
- `src/lib/components/ui/` - Reusable UI components (button, sidebar, alert, etc.)
- `src/lib/components/buss/` - Business logic components organized by feature
- Components follow the shadcn/ui pattern with index.ts barrel exports
- Sidebar components use context pattern with `useSidebar()` hook

**Internationalization:**
- Messages are defined in `messages/en.json`, `messages/zh.json` (source files)
- Auto-generated code in `src/lib/paraglide/messages/` (DO NOT edit manually)
- Import pattern: `import { m } from '$lib/paraglide/messages.js'`
- Usage: `m.message_key({ param: 'value' })` for parameterized messages
- Locale switching: `import { setLocale } from '$lib/paraglide/runtime'`

**Styling:**
- TailwindCSS with custom CSS variables for theming
- Theme switching via `theme-switcher.svelte` component
- Uses `mode-watcher` for dark/light mode detection

### Key Patterns:

**Svelte 5 Component Pattern with Module Script:**
```svelte
<script lang="ts" module>
  // Type definitions and exports (shared across instances)
  export type Tab = {
    id: string;
    title: string;
    href: string;
    closable?: boolean;
  };

  interface Props {
    tab: Tab;
    isActive: boolean;
    onTabClick: (tab: Tab) => void;
    onTabClose: (tab: Tab) => void;
  }
</script>

<script lang="ts">
  // Component logic (instance-specific)
  import { X } from '@lucide/svelte';
  import { cn } from '$lib/utils';

  let { tab, isActive, onTabClick, onTabClose }: Props = $props();
</script>
```

**Icon Usage:**
```svelte
<script lang="ts">
  import { X, Menu, Home } from '@lucide/svelte';
</script>

<X class="h-4 w-4" />
```

**Component Organization:**
- Business components in `src/lib/components/buss/feature-name/`
- Each component folder contains:
  - Component files (e.g., `tab-item.svelte`)
  - `index.ts` for exports following this pattern:
```ts
import Root from './accordion.svelte';
import Content from './accordion-content.svelte';
import Item from './accordion-item.svelte';
import Trigger from './accordion-trigger.svelte';

export {
  Root,
  Content,
  Item,
  Trigger,
  //
  Root as Accordion,
  Content as AccordionContent,
  Item as AccordionItem,
  Trigger as AccordionTrigger
};
```

**Internationalization Pattern:**
```svelte
<script lang="ts">
  import { setLocale } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages.js';
</script>

<h1>{m.hello_world({ name: 'User' })}</h1>
<button onclick={() => setLocale('zh')}>中文</button>
```

**Path Aliases:**
- `@/*` maps to `./src/lib/*` (configured in svelte.config.js)
