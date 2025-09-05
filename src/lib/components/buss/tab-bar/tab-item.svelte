<script lang="ts" module>
	export type Tab = {
		id: string;
		title: string;
		href: string;
		closable?: boolean;
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
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { m } from "$lib/paraglide/messages.js";

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
			stretch ? "w-auto min-w-[var(--spacing-tab-item-min-width)]" : "w-tab-item-width",
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
			{#if !isCompact}
				<span class="max-w-tab-item-max-title-width min-w-0 flex-1 truncate">{tab.title}</span>
			{/if}
			{#if tab.closable !== false}
				{#if isCompact}
					<Tooltip.Provider>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<button
									class={cn(
										"shrink-0 rounded p-tab-close-button-padding transition-colors",
										isActive
											? "hover:bg-tab-button-hover-active"
											: "hover:bg-tab-button-hover-inactive",
									)}
									onclick={(e) => {
										e.stopPropagation();
										onTabClose(tab);
									}}
									aria-label="Close tab"
									type="button"
								>
									<X class="size-tab-close-icon-size" />
								</button>
							</Tooltip.Trigger>
							<Tooltip.Content side="bottom" align="center">{tab.title}</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				{:else}
					<button
						class={cn(
							"shrink-0 rounded p-tab-close-button-padding transition-colors",
							isActive ? "hover:bg-tab-button-hover-active" : "hover:bg-tab-button-hover-inactive",
						)}
						onclick={(e) => {
							e.stopPropagation();
							onTabClose(tab);
						}}
						aria-label="Close tab"
						type="button"
					>
						<X class="size-tab-close-icon-size" />
					</button>
				{/if}
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
