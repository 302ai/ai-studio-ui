<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { ProviderList } from "@/components/buss/provider-list";
	import { ScrollArea } from "@/components/ui/scroll-area";
	import { providerState } from "$lib/stores/provider-state.svelte.js";
	import type { ModelProvider } from "@/types/provider";
	import { onMount } from "svelte";
	import Header from "./header.svelte";

	let { children } = $props();
	let activeProviderId = $state<string>();

	// Set active provider based on current route
	$effect(() => {
		const currentProvider = page.params.provider;
		if (currentProvider) {
			const provider = providerState.getProviderByNameOrId(currentProvider);
			if (provider) {
				activeProviderId = provider.id;
			}
		}
	});

	function handleProviderClick(provider: ModelProvider) {
		activeProviderId = provider.id;
		goto(`/settings/model-settings/${provider.id}`);
	}

	function handleAddProvider() {
		const newProvider = providerState.createCustomProvider();
		providerState.addProvider(newProvider);
		activeProviderId = newProvider.id;
		goto(`/settings/model-settings/${newProvider.id}`);
	}

	// TODO: 实现拖拽重排序功能
	// function handleReorderProviders(newOrder: ModelProvider[]) {
	// 	providerState.reorderProviders(newOrder);
	// }

	onMount(() => {
		// If no provider is selected, redirect to the first provider
		if (!page.params.provider && providerState.providers.length > 0) {
			goto(`/settings/model-settings/${providerState.providers[0].id}`);
		}
	});
</script>

<div class="flex size-full overflow-hidden">
	<div class="flex h-full w-80 flex-shrink-0 flex-col border-r">
		<div class="flex-shrink-0 p-4">
			<Header onClick={handleAddProvider} />
		</div>
		<div class="min-h-0 flex-1">
			<ScrollArea class="h-full">
				<div class="h-full px-4 pb-4">
					<ProviderList
						bind:providers={providerState.providers}
						bind:activeProviderId
						onProviderClick={handleProviderClick}
						class="h-full"
					/>
				</div>
			</ScrollArea>
		</div>
	</div>

	{@render children()}
</div>
