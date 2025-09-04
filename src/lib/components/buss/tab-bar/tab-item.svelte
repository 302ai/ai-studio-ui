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
		isDragging = false,
		onTabClick,
		onTabClose,
		class: className
	}: Props = $props();

	let isHovered = $state(false);

	$effect(() => {
		if (isDragging) {
			isHovered = false;
		}
	});
</script>

<div
	class={cn(
		'relative flex h-tab-item-height w-tab-item-width cursor-pointer items-center justify-between gap-2 px-tab-item-padding-x text-sm',
		'border border-b-0',
		isActive
			? 'bg-tab-item-bg text-tab-item-text shadow-sm'
			: 'border-transparent bg-tab-item-bg-inactive/50 text-tab-item-text-inactive',
		isHovered && !isActive && !isDragging && 'bg-tab-item-hover/80',
		className
	)}
	style="border-radius: 0.375rem 0.375rem 0 0 !important;"
	onclick={() => onTabClick(tab)}
	onmouseenter={() => !isDragging && (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
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
			class={cn('rounded p-tab-close-button-padding hover:bg-tab-button-hover')}
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
