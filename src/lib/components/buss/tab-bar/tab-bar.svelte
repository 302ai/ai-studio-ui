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
	import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import TabItem from './tab-item.svelte';

	let {
		tabs = $bindable<Tab[]>(),
		activeTabId = $bindable<string>(),
		onTabClick,
		onTabClose,
		onNewTab,
		class: className
	}: Props = $props();

	let draggedElementId = $state<string | null>(null);

	function handleDndConsider(e: CustomEvent) {
		if (e.detail.info.trigger === TRIGGERS.DRAG_STARTED) {
			draggedElementId = e.detail.info.id;
			// Auto-select the tab when dragging starts
			const draggedTab = tabs.find((tab) => tab.id === e.detail.info.id);
			if (draggedTab) {
				onTabClick(draggedTab);
			}
		}

		tabs = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent) {
		tabs = e.detail.items;
		draggedElementId = null;
	}
	function transformDraggedElement(element?: HTMLElement) {
		if (element) {
			element.style.outline = 'none';
		}
	}
</script>

<div class={cn('flex h-tab-bar-height w-full items-end border-b bg-tab-bar-bg/50', className)}>
	<div
		class="flex w-full items-end gap-tab-bar-gap overflow-x-auto px-tab-bar-padding-x"
		use:dndzone={{ items: tabs, flipDurationMs: 200, dropTargetStyle: {}, transformDraggedElement }}
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
	>
		{#each tabs as tab (tab.id)}
			<div data-id={tab.id} style={draggedElementId === tab.id ? 'visibility: hidden;' : ''}>
				<TabItem
					{tab}
					isActive={activeTabId === tab.id}
					isDragging={draggedElementId === tab.id}
					{onTabClick}
					{onTabClose}
				/>
			</div>
		{/each}

		<button
			class="flex h-tab-new-button-size w-tab-new-button-size items-center justify-center rounded transition-colors hover:bg-tab-button-hover"
			onclick={() => onNewTab()}
		>
			<Plus class="h-tab-icon-size w-tab-icon-size" />
		</button>
	</div>
</div>
