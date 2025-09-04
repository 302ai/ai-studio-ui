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
		onTabClick: (tab: Tab) => void;
		onTabClose: (tab: Tab) => void;
		onTabCloseAll: () => void;
		class?: string;
	}
</script>

<script lang="ts">
	import { X, XCircle } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import { m } from '$lib/paraglide/messages.js';

	let {
		tab,
		isActive,
		isDragging: _isDragging = false,
		onTabClick,
		onTabClose,
		onTabCloseAll,
		class: className
	}: Props = $props();
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class={cn(
			'relative flex h-tab-item-height w-tab-item-width cursor-pointer items-center justify-between gap-2 px-tab-item-padding-x text-sm',
			isActive
				? 'bg-tab-item-bg text-tab-item-text'
				: 'border-transparent bg-tab-item-bg-inactive text-tab-item-text-inactive hover:bg-tab-item-hover',
			className
		)}
		style="border-radius: 0.375rem !important;"
		onclick={() => onTabClick(tab)}
		role="button"
		tabindex={0}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onTabClick(tab);
			}
		}}
	>
		<span class="max-w-tab-item-max-title-width truncate">{tab.title}</span>
		{#if tab.closable !== false}
			<button
				class={cn(
					'rounded p-tab-close-button-padding transition-colors',
					isActive ? 'hover:bg-tab-button-hover-active' : 'hover:bg-tab-button-hover-inactive'
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
