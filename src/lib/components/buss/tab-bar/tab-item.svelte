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
		'group relative flex h-8 w-32 cursor-pointer items-center gap-2 px-3 text-sm transition-all',
		'rounded-t-md border border-b-0 hover:bg-background/80',
		isActive
			? 'bg-background text-foreground shadow-sm'
			: 'border-transparent bg-muted/50 text-muted-foreground'
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
	<span class="max-w-[200px] truncate">{tab.title}</span>
	{#if tab.closable !== false}
		<button
			class={cn(
				'opacity-0 transition-opacity group-hover:opacity-100',
				'rounded p-0.5 hover:bg-muted'
			)}
			onclick={(e) => {
				e.stopPropagation();
				onTabClose(tab);
			}}
			aria-label="Close tab"
			type="button"
		>
			<X class="h-3 w-3" />
		</button>
	{/if}
</div>
