<script lang="ts" module>
	import { type Tab } from "./tab-item.svelte";
	interface Props {
		tabs: Tab[];
		activeTabId: string;
		onTabClick: (tab: Tab) => void;
		onTabClose: (tab: Tab) => void;
		onTabCloseAll: () => void;
		onNewTab: () => void;
		class?: string;
		autoStretch?: boolean;
	}

	const ANIMATION_CONSTANTS = {
		TAB_APPEAR_DELAY: 120,
		BOUNCE_INTENSITY: 20,
		BOUNCE_DURATION: 200,
		SPRING_CONFIG: { stiffness: 0.2, damping: 0.7 },
	};
</script>

<script lang="ts">
	import ButtonWithTooltip from "$lib/components/ui/button-with-tooltip.svelte";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { m } from "$lib/paraglide/messages.js";
	import { cn } from "$lib/utils";
	import { Plus } from "@lucide/svelte";
	import { dndzone, TRIGGERS } from "svelte-dnd-action";
	import { flip } from "svelte/animate";
	import { Spring } from "svelte/motion";
	import { scale } from "svelte/transition";
	import TabItem from "./tab-item.svelte";

	let {
		tabs = $bindable<Tab[]>(),
		activeTabId = $bindable<string>(),
		onTabClick,
		onTabClose,
		onTabCloseAll,
		onNewTab,
		class: className,
		autoStretch = false,
	}: Props = $props();

	let draggedElementId = $state<string | null>(null);
	let buttonSpring = new Spring({ opacity: 1, x: 0 }, { stiffness: 0.2, damping: 0.8 });
	let buttonBounceSpring = new Spring({ x: 0 }, ANIMATION_CONSTANTS.SPRING_CONFIG);

	let previousTabsLength = $state(tabs.length);
	let isAnimating = $state(false);
	let isDndFinalizing = $state(false);

	function handleNewTab() {
		if (isAnimating) return;

		isAnimating = true;

		onNewTab();

		setTimeout(() => {
			buttonBounceSpring.target = { x: 12 };

			setTimeout(() => {
				buttonBounceSpring.target = { x: 0 };
				setTimeout(() => {
					isAnimating = false;
				}, ANIMATION_CONSTANTS.BOUNCE_DURATION);
			}, 80);
		}, ANIMATION_CONSTANTS.TAB_APPEAR_DELAY - 20);
	}

	$effect(() => {
		const tabsCountDiff = tabs.length - previousTabsLength;

		if (tabsCountDiff < 0 && !isAnimating) {
			buttonBounceSpring.target = { x: -10 };
			setTimeout(() => {
				buttonBounceSpring.target = { x: 0 };
			}, 100);
		}

		previousTabsLength = tabs.length;
	});

	function handleDndConsider(e: CustomEvent) {
		if (e.detail.info.trigger === TRIGGERS.DRAG_STARTED) {
			draggedElementId = e.detail.info.id;
			buttonSpring.target = { opacity: 0, x: 10 };
			const draggedTab = tabs.find((tab) => tab.id === e.detail.info.id);
			if (draggedTab) {
				onTabClick(draggedTab);
			}
		}

		const newItems = e.detail.items;
		const hasOrderChanged = newItems.some(
			(item: Tab, index: number) => item.id !== tabs[index]?.id,
		);
		if (hasOrderChanged) {
			tabs = newItems;
		}
	}
	function handleDndFinalize(e: CustomEvent) {
		isDndFinalizing = true;

		draggedElementId = null;
		tabs = e.detail.items;
		buttonSpring.target = { opacity: 1, x: 0 };
		setTimeout(() => {
			isDndFinalizing = false;
		}, 0);
	}
	function transformDraggedElement(element?: HTMLElement) {
		if (element) {
			element.style.outline = "none";
			const tabElement = element.querySelector('div[role="button"]') as HTMLElement;
			if (tabElement) {
				tabElement.classList.remove("hover:bg-tab-item-hover");
				tabElement.classList.add("bg-tab-item-bg", "text-tab-item-text", "shadow-sm");
				tabElement.classList.remove("bg-tab-item-bg-inactive", "text-tab-item-text-inactive");
			}
		}
	}
</script>

<div class={cn("flex h-tab-bar-height w-full items-center border-b bg-tab-bar-bg/50", className)}>
	<div
		class="flex w-full min-w-0 items-center gap-tab-bar-gap overflow-x-hidden px-tab-bar-padding-x"
		use:dndzone={{
			items: tabs,
			flipDurationMs: 200,
			dropTargetStyle: {},
			transformDraggedElement,
			morphDisabled: true,
		}}
		onconsider={handleDndConsider}
		onfinalize={handleDndFinalize}
	>
		{#each tabs as tab, index (tab.id)}
			{@const isCurrentActive = tab.id === activeTabId}
			{@const nextTab = tabs[index + 1]}
			{@const isNextActive = nextTab?.id === activeTabId}
			{@const isLastTab = index === tabs.length - 1}
			{@const shouldShowSeparator = !isLastTab && !isCurrentActive && !isNextActive}
			<div
				class={cn("flex min-w-0 items-center", autoStretch && "flex-1 basis-0")}
				data-id={tab.id}
				animate:flip={{ duration: 200 }}
				in:scale={draggedElementId || isDndFinalizing
					? { duration: 0 }
					: { duration: 250, start: 0.8, delay: ANIMATION_CONSTANTS.TAB_APPEAR_DELAY }}
				out:scale={draggedElementId || isDndFinalizing
					? { duration: 0 }
					: { duration: 200, start: 0.8 }}
			>
				<TabItem
					{tab}
					isActive={isCurrentActive}
					isDragging={draggedElementId === tab.id}
					stretch={autoStretch}
					{onTabClick}
					{onTabClose}
					{onTabCloseAll}
				/>
				<div class="mx-0.5 shrink-0">
					<Separator
						orientation="vertical"
						class="!h-[20px] !w-0.5 transition-opacity duration-200 {shouldShowSeparator
							? 'opacity-30'
							: 'opacity-0'}"
					/>
				</div>
			</div>
		{/each}

		<div
			class="flex shrink-0 items-center"
			style="opacity: {buttonSpring.current.opacity}; transform: translateX({buttonSpring.current
				.x + buttonBounceSpring.current.x}px);"
		>
			<Separator
				orientation="vertical"
				class={cn("mx-0.5 !h-[20px] !w-0.5", tabs.length === 0 ? "opacity-0" : "opacity-100")}
			/>
			<ButtonWithTooltip
				tooltip={m.tab_new()}
				tooltipSide="bottom"
				variant="ghost"
				size="icon"
				class="h-tab-new-button-size w-tab-new-button-size bg-transparent transition-colors hover:bg-tab-button-hover-inactive hover:text-current"
				onclick={handleNewTab}
			>
				<Plus class="h-tab-icon-size w-tab-icon-size" />
			</ButtonWithTooltip>
		</div>
	</div>
</div>
