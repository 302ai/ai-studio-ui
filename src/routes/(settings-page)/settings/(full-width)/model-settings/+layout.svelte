<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { ProviderList } from "@/components/buss/provider-list";
	import { ScrollArea } from "@/components/ui/scroll-area";
	import { DEFAULT_PROVIDERS } from "@/datas/providers";
	import type { ModelProvider } from "@/types/provider";
	import { nanoid } from "nanoid";
	import { onMount } from "svelte";
	import Header from "./header.svelte";

	let { children } = $props();
	let providers = $state(DEFAULT_PROVIDERS);
	let activeProviderId = $state<string>();

	// Set active provider based on current route
	$effect(() => {
		const currentProvider = page.params.provider;
		if (currentProvider) {
			const provider = providers.find((p: ModelProvider) => p.name === currentProvider);
			if (provider) {
				activeProviderId = provider.id;
			}
		}
	});

	function handleProviderClick(provider: ModelProvider) {
		activeProviderId = provider.id;
		goto(`/settings/model-settings/${provider.name}`);
	}

	function handleAddProvider() {
		const newProvider: ModelProvider = {
			id: nanoid(),
			name: `custom-${Date.now()}`,
			apiType: "openai",
			apiKey: "",
			baseUrl: "",
			enabled: true,
			custom: true,
			status: "pending",
			websites: {
				official: "",
				apiKey: "",
				docs: "",
				models: "",
				defaultBaseUrl: "",
			},
		};

		providers = [...providers, newProvider];
		activeProviderId = newProvider.id;
		goto(`/settings/model-settings/${newProvider.name}`);
	}

	onMount(() => {
		// If no provider is selected, redirect to the first provider
		if (!page.params.provider && providers.length > 0) {
			goto(`/settings/model-settings/${providers[0].name}`);
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
						bind:providers
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
