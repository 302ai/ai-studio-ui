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

- **TailwindCSS 4.0** with `@theme` directive for custom variables
- Custom CSS variables for component theming and user customization
- Theme switching via `theme-switcher.svelte` component
- Uses `mode-watcher` for dark/light mode detection

**TailwindCSS 4 Theme Variables:**

- Use `@theme` directive to define custom variables in `app.css`
- Variable naming follows namespace conventions:
  - `--spacing-*` for sizing (width, height, padding, margin, gap, etc.)
  - `--color-*` for colors and theming
  - `--radius-*` for border radius values
- Component-specific variable naming: `--spacing-component-property`
  - Example: `--spacing-tab-item-height`, `--color-tab-item-bg`
- Reference other variables using `var()`: `--color-tab-bg: var(--color-muted)`
- Always provide comments indicating original Tailwind class equivalents

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
	import { X } from "@lucide/svelte";
	import { cn } from "$lib/utils";

	let { tab, isActive, onTabClick, onTabClose }: Props = $props();
</script>
```

**Icon Usage:**

```svelte
<script lang="ts">
	import { X, Menu, Home } from "@lucide/svelte";
</script>

<!-- Standard fixed sizes -->
<X class="h-4 w-4" />

<!-- Using custom size variables for customizable components -->
<X class="size-tab-close-icon-size" />
<Plus class="h-tab-icon-size w-tab-icon-size" />
```

**Component Organization:**

- Business components in `src/lib/components/buss/feature-name/`
- Each component folder contains:
  - Component files (e.g., `tab-item.svelte`)
  - `index.ts` for exports following this pattern:

```ts
import Root from "./accordion.svelte";
import Content from "./accordion-content.svelte";
import Item from "./accordion-item.svelte";
import Trigger from "./accordion-trigger.svelte";

export {
	Root,
	Content,
	Item,
	Trigger,
	//
	Root as Accordion,
	Content as AccordionContent,
	Item as AccordionItem,
	Trigger as AccordionTrigger,
};
```

**Internationalization Pattern:**

```svelte
<script lang="ts">
	import { setLocale } from "$lib/paraglide/runtime";
	import { m } from "$lib/paraglide/messages.js";
</script>

<h1>{m.hello_world({ name: "User" })}</h1>
<button onclick={() => setLocale("zh")}>中文</button>
```

**Customizable Component Pattern (Tab Bar Example):**

```svelte
<!-- tab-item.svelte -->
<script lang="ts" module>
	export type Tab = {
		id: string;
		title: string;
		href: string;
		closable?: boolean;
	};
</script>

<script lang="ts">
	import { X } from "@lucide/svelte";
	import { cn } from "$lib/utils";

	let { tab, isActive, onTabClick, onTabClose }: Props = $props();
</script>

<div
	class={cn(
		"group relative flex h-tab-item-height w-tab-item-width cursor-pointer items-center gap-2 px-tab-item-padding-x text-sm transition-all",
		"rounded-t-md border border-b-0 hover:bg-tab-item-hover/80",
		isActive
			? "bg-tab-item-bg text-tab-item-text shadow-sm"
			: "border-transparent bg-tab-item-bg-inactive/50 text-tab-item-text-inactive",
	)}
	onclick={() => onTabClick(tab)}
>
	<span class="max-w-tab-item-max-title-width truncate">{tab.title}</span>
	{#if tab.closable !== false}
		<button
			class={cn(
				"opacity-0 transition-opacity group-hover:opacity-100",
				"hover:bg-tab-button-hover rounded p-tab-close-button-padding",
			)}
			onclick={(e) => {
				e.stopPropagation();
				onTabClose(tab);
			}}
		>
			<X class="size-tab-close-icon-size" />
		</button>
	{/if}
</div>
```

**Path Aliases:**

- `@/*` maps to `./src/lib/*` (configured in svelte.config.js)

## Component Customization Guidelines

### Creating Customizable Components

**Best Practices:**

1. **Extract all hardcoded styles** to CSS variables for complex/reusable components
2. **Define variables in `@theme` blocks** in `app.css`
3. **Use descriptive variable names** following the component-property pattern
4. **Replace hardcoded Tailwind classes** with custom variable-based classes
5. **Group related variables** with comments for organization

**CSS Variable Definition Example:**

```css
@theme {
	/* Tab Bar Sizing */
	--spacing-tab-bar-height: 2.5rem; /* h-10 */
	--spacing-tab-item-height: 2rem; /* h-8 */
	--spacing-tab-item-width: 8rem; /* w-32 */
	--spacing-tab-icon-size: 1rem; /* h-4 w-4 */

	/* Tab Bar Colors */
	--color-tab-bar-bg: var(--color-muted);
	--color-tab-item-bg: var(--color-background);
	--color-tab-item-text: var(--color-foreground);
}
```

**Component Implementation:**

```svelte
<!-- Instead of hardcoded classes -->
<div class="h-8 w-32 bg-background text-foreground">

<!-- Use custom variable classes -->
<div class="h-tab-item-height w-tab-item-width bg-tab-item-bg text-tab-item-text">
```

**User Customization:**
Users can customize components by overriding CSS variables:

```css
@theme {
	--spacing-tab-item-height: 3rem; /* Taller tabs */
	--color-tab-item-bg: var(--color-blue-500); /* Blue active tabs */
}
```
