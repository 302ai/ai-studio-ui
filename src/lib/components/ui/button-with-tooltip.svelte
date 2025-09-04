<script lang="ts" module>
	import type { ButtonVariant, ButtonSize } from '$lib/components/ui/button/index.js';

	export interface ButtonWithTooltipProps {
		tooltip: string;
		tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import {
		Tooltip,
		TooltipContent,
		TooltipTrigger,
		TooltipProvider
	} from '$lib/components/ui/tooltip/index.js';
	import { cn } from '$lib/utils.js';

	let {
		tooltip,
		tooltipSide = 'top',
		variant = 'ghost',
		size = 'icon',
		class: className,
		disabled,
		onclick,
		children
	}: ButtonWithTooltipProps = $props();

	const buttonClass = $derived(cn(buttonVariants({ variant, size }), className));
</script>

<TooltipProvider>
	<Tooltip>
		<TooltipTrigger class={buttonClass} {disabled} {onclick}>
			{@render children?.()}
		</TooltipTrigger>
		<TooltipContent
			side={tooltipSide}
			class="rounded-[10px] border bg-overlay px-2.5 py-1.5 text-sm/6 text-overlay-foreground"
			arrowClasses="hidden"
			sideOffset={5}
		>
			{tooltip}
		</TooltipContent>
	</Tooltip>
</TooltipProvider>
