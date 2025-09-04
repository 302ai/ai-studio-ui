<script lang="ts" module>
	import { type Tab } from './tab-item.svelte';
	interface Props {
		tabs: Tab[];
		activeTabId: string;
		onTabClick: (tab: Tab) => void;
		onTabClose: (tab: Tab) => void;
		onNewTab: () => void;
		class?: string;
	}
</script>

<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import TabItem from './tab-item.svelte';

	let {
		tabs = $bindable<Tab[]>(),
		activeTabId = $bindable<string>(),
		onTabClick,
		onTabClose,
		onNewTab,
		class: className
	}: Props = $props();

	function handleDndConsider(e: CustomEvent) {
		tabs = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent) {
		tabs = e.detail.items;
	}
</script>

<div class={cn('flex h-10 items-end border-b bg-muted/50', className)}>
	<div
		class="flex items-end gap-0.5 overflow-x-auto px-2"
		use:dndzone={{ items: tabs, flipDurationMs: 200, dropTargetStyle: {} }}
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
	>
		{#each tabs as tab (tab.id)}
			<div animate:flip={{ duration: 200 }}>
				<TabItem {tab} isActive={activeTabId === tab.id} {onTabClick} {onTabClose} />
			</div>
		{/each}

		<button
			class="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted"
			onclick={() => onNewTab()}
		>
			<Plus class="h-4 w-4" />
		</button>
	</div>
</div>
