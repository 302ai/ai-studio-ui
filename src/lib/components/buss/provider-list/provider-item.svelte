<script lang="ts" module>
	import type { Snippet } from "svelte";

	export type Provider = {
		id: string;
		name: string;
		title: string;
		description: string;
		icon?: Snippet;
	};

	interface Props {
		provider: Provider;
		isActive?: boolean;
		onProviderClick?: (provider: Provider) => void;
		class?: string;
	}
</script>

<script lang="ts">
	import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
	import { cn } from "$lib/utils";
	import { Cloud, X } from "@lucide/svelte";

	let { provider, isActive = false, onProviderClick, class: className }: Props = $props();
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class={cn(
			"relative flex h-provider-item w-full cursor-pointer items-center gap-provider-gap rounded-provider px-provider-x py-provider-y text-sm",
			isActive
				? "bg-tab-active text-tab-fg-active"
				: "bg-tab-inactive text-tab-fg-inactive hover:bg-tab-hover",
			className,
		)}
		onclick={() => onProviderClick?.(provider)}
		role="button"
		tabindex={0}
		aria-label={provider.title}
	>
		<!-- Icon -->
		<div class="flex size-provider-icon shrink-0 items-center justify-center">
			{#if provider.icon}
				{@render provider.icon()}
			{:else}
				<Cloud class="size-provider-icon-size text-current opacity-70" />
			{/if}
		</div>

		<!-- Content -->
		<div class="min-w-0 flex-1">
			<div class="truncate leading-tight font-medium">
				{provider.title}
			</div>
			<div class="mt-0.5 truncate text-xs leading-tight opacity-70">
				{provider.description}
			</div>
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-48">
		<ContextMenu.Item>
			<Cloud class="mr-2 h-4 w-4" />
			Configure
		</ContextMenu.Item>
		<ContextMenu.Item>
			<X class="mr-2 h-4 w-4" />
			Remove
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
