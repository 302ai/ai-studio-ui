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
		class?: string;
	}
</script>

<script lang="ts">
	import { X } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	let {
		tab,
		isActive,
		isDragging: _isDragging = false,
		onTabClick,
		onTabClose,
		class: className
	}: Props = $props();
</script>

<div
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
	tabindex="0"
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
</div>
