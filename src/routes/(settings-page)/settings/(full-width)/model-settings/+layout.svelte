<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { ProviderList, type Provider } from "@/components/buss/provider-list";
	import { ScrollArea } from "@/components/ui/scroll-area";
	import { mockProviders } from "@/datas/providers";
	import { onMount } from "svelte";
	import Header from "./header.svelte";

	let { children } = $props();
	let providers = $state(mockProviders);
	let activeProviderId = $state<string>();

	// Set active provider based on current route
	$effect(() => {
		const currentProvider = page.params.provider;
		if (currentProvider) {
			const provider = providers.find((p) => p.name === currentProvider);
			if (provider) {
				activeProviderId = provider.id;
			}
		}
	});

	function handleProviderClick(provider: Provider) {
		activeProviderId = provider.id;
		goto(`/settings/model-settings/${provider.name}`);
	}

	onMount(() => {
		// If no provider is selected, redirect to the first provider
		if (!page.params.provider && providers.length > 0) {
			goto(`/settings/model-settings/${providers[0].name}`);
		}
	});
</script>

<div class="flex size-full overflow-hidden">
	<ScrollArea class="h-full w-80 flex-shrink-0 border-r p-4">
		<div class="space-y-4">
			<Header />
			<ProviderList bind:providers bind:activeProviderId onProviderClick={handleProviderClick} />
		</div>
	</ScrollArea>

	{@render children()}
</div>
