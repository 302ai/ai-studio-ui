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
		onTabClick: (tab: Tab) => void;
		onTabClose: (tab: Tab) => void;
	}
</script>

<script lang="ts">
	import { X } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	let { tab, isActive, onTabClick, onTabClose }: Props = $props();
</script>

<div
	class={cn(
		'group relative flex h-tab-item-height w-tab-item-width cursor-pointer items-center gap-2 px-tab-item-padding-x text-sm transition-all',
		'rounded-t-md border border-b-0 hover:bg-tab-item-hover/80',
		isActive
			? 'bg-tab-item-bg text-tab-item-text shadow-sm'
			: 'border-transparent bg-tab-item-bg-inactive/50 text-tab-item-text-inactive'
	)}
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
				'opacity-0 transition-opacity group-hover:opacity-100',
				'rounded p-tab-close-button-padding hover:bg-tab-button-hover'
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
