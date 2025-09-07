<script lang="ts">
	import { cn } from "@/utils";
	import { onMount } from "svelte";
	import { type Icon as IconType } from "@lucide/svelte";

	interface SegmentedOption {
		key: string;
		icon?: typeof IconType;
		label: string;
		iconSize?: number;
	}

	// Props
	export let options: SegmentedOption[] = [];
	export let selectedKey: string | null = null;
	export let onSelect: (key: string) => void;

	// State
	let thumbStyle: { left: string; width: string } = { left: "", width: "" };
	let itemElements: HTMLElement[] | null = [];
	let containerElement: HTMLElement | null = null;

	// Reactive statements
	$: selectedIndex = options.findIndex((o) => o.key === selectedKey);

	// Function to update thumb position
	async function updateThumbPosition() {
		if (selectedIndex === -1) return;

		const item = itemElements?.[selectedIndex];
		const container = containerElement;
		if (!item || !container) return;

		const containerRect = container.getBoundingClientRect();
		const itemRect = item.getBoundingClientRect();

		thumbStyle = {
			left: `${itemRect.left - containerRect.left}px`,
			width: `${itemRect.width}px`,
		};
	}

	// Update thumb position when selectedIndex changes
	$: if (selectedIndex !== -1) {
		updateThumbPosition();
	}

	// Initialize on mount
	onMount(() => {
		updateThumbPosition();
	});

	function handleSelect(key: string) {
		onSelect(key);
	}
</script>

<div
	bind:this={containerElement}
	class="relative flex h-seg-button-container-height items-center rounded-seg-button-container bg-settings-item-bg px-seg-button-container-padding-x"
>
	{#if thumbStyle.left}
		<div
			class="absolute z-1 h-seg-button-thumb-height rounded-md bg-accent transition-all duration-400 ease-in-out"
			style="left: {thumbStyle.left}; width: {thumbStyle.width};"
		></div>
	{/if}

	<div class="flex w-full gap-2">
		{#each options as option, index (option.key)}
			{@const isActive = selectedKey === option.key}
			<button
				bind:this={itemElements[index]}
				class={cn(
					"relative z-2 flex h-seg-button-thumb-height flex-1 cursor-pointer items-center justify-center gap-1 rounded-md text-sm",
					isActive ? "text-accent-foreground" : "text-secondary-foreground hover:bg-tab-hover z-1",
				)}
				type="button"
				on:mousedown={() => handleSelect(option.key)}
				aria-pressed={isActive}
			>
				{#if option.icon}
					<!-- {@html option.icon} -->
					<option.icon size={option.iconSize} />
				{/if}
				<span>{option.label}</span>
			</button>
		{/each}
	</div>
</div>
