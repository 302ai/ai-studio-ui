<script lang="ts" module>
	export type Tab = {
		id: string;
		title: string;
		href: string;
		closable?: boolean;
		icon?: Snippet;
	};

	interface Props {
		tab: Tab;
		isActive: boolean;
		isDragging?: boolean;
		stretch?: boolean;
		onTabClick: (tab: Tab) => void;
		onTabClose: (tab: Tab) => void;
		onTabCloseAll: () => void;
		class?: string;
	}
</script>

<script lang="ts">
	import { X, XCircle } from "@lucide/svelte";
	import { cn } from "$lib/utils";
	import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
	import ButtonWithTooltip from "$lib/components/ui/button-with-tooltip.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import type { Snippet } from "svelte";

	let {
		tab,
		isActive,
		isDragging: _isDragging = false,
		stretch = false,
		onTabClick,
		onTabClose,
		onTabCloseAll,
		class: className,
	}: Props = $props();

	let triggerRef = $state<HTMLElement | null>(null);
	let isCompact = $state(false);
	const COMPACT_THRESHOLD_PX = 64;

	$effect(() => {
		if (!triggerRef || !triggerRef.parentElement) return;
		const ro = new ResizeObserver(() => {
			const width = triggerRef?.parentElement?.clientWidth ?? 0;
			isCompact = width < COMPACT_THRESHOLD_PX;
		});
		ro.observe(triggerRef.parentElement);
		return () => ro.disconnect();
	});
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class={cn(
			"relative flex h-tab-item-height cursor-pointer items-center px-tab-item-padding-x text-sm",
			isCompact ? "justify-center" : "justify-between gap-2",
			stretch ? "w-auto min-w-tab-item-min-width" : "w-tab-item-width",
			isActive
				? "bg-tab-item-bg text-tab-item-text"
				: "border-transparent bg-tab-item-bg-inactive text-tab-item-text-inactive hover:bg-tab-item-hover",
			"overflow-hidden",
			className,
		)}
		style="border-radius: 0.375rem !important;"
		onclick={() => onTabClick(tab)}
		role="button"
		tabindex={0}
		onkeydown={(e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onTabClick(tab);
			}
		}}
	>
		<div bind:this={triggerRef} class="contents">
			{#if tab.icon && !isCompact}
				<div
					class="mr-tab-item-icon-margin-right flex size-tab-item-icon-size shrink-0 items-center justify-center"
				>
					{@render tab.icon()}
				</div>
			{/if}
			{#if !isCompact}
				<span class="max-w-tab-item-max-title-width min-w-0 flex-1 truncate">{tab.title}</span>
			{/if}
			{#if tab.closable !== false}
				<ButtonWithTooltip
					tooltip={isCompact ? tab.title : m.tab_context_close()}
					tooltipSide="bottom"
					variant="ghost"
					size="icon"
					class={cn(
						"h-auto w-auto shrink-0 rounded bg-transparent p-tab-close-button-padding transition-colors hover:bg-transparent",
						isActive ? "hover:!bg-tab-button-hover-active" : "hover:!bg-tab-button-hover-inactive",
					)}
					onclick={(e) => {
						e.stopPropagation();
						onTabClose(tab);
					}}
				>
					<X class="size-tab-close-icon-size" />
				</ButtonWithTooltip>
			{/if}
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-48">
		<ContextMenu.Item onclick={() => onTabClose(tab)}>
			<X class="mr-2 h-4 w-4" />
			{m.tab_context_close()}
		</ContextMenu.Item>
		<ContextMenu.Item onclick={() => onTabCloseAll()}>
			<XCircle class="mr-2 h-4 w-4" />
			{m.tab_context_close_all()}
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
