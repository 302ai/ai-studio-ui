<script lang="ts" module>
	import type { ModelProvider } from "$lib/types/provider.js";
	import type { Snippet } from "svelte";

	export type Provider = {
		id: string;
		name: string;
		title: string;
		description: string;
		icon?: Snippet;
	};

	interface Props {
		provider: ModelProvider;
		isActive?: boolean;
		onProviderClick?: (provider: ModelProvider) => void;
		class?: string;
	}
</script>

<script lang="ts">
	import { ModelIcon } from "$lib/components/buss/model-icon/index.js";
	import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
	import { providerState } from "$lib/stores/provider-state.svelte.js";
	import { cn } from "$lib/utils";
	import { AlertCircle, Cloud, X } from "@lucide/svelte";
	import { m } from "$lib/paraglide/messages.js";

	let { provider, isActive = false, onProviderClick, class: className }: Props = $props();

	// Create a description based on provider data
	const description = $derived.by(() => {
		// Check for error status first
		if (provider.status === "error") {
			return m.provider_error();
		}

		// Check if not configured (no API key)
		if (!provider.apiKey || provider.apiKey.trim() === "") {
			return m.provider_not_configured();
		}

		// If configured, show real model count from store
		const modelCount = providerState.models.filter((m) => m.providerId === provider.id).length;
		return m.provider_models_count({ count: modelCount.toString() });
	});
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
		aria-label={provider.name}
	>
		<!-- Icon -->
		<div class="flex size-provider-icon shrink-0 items-center justify-center">
			<ModelIcon modelName={provider.apiType} className="h-6 w-6" />
		</div>

		<!-- Content -->
		<div class="min-w-0 flex-1">
			<div class="truncate leading-tight font-medium">
				{provider.name}
			</div>
			<div
				class={cn(
					"mt-0.5 flex items-baseline gap-1 text-xs leading-tight",
					provider.status === "error" ? "text-red-600 dark:text-red-400" : "opacity-70",
				)}
			>
				{#if provider.status === "error"}
					<AlertCircle class="h-3 w-3 shrink-0" />
				{/if}
				<span class="truncate">{description}</span>
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
