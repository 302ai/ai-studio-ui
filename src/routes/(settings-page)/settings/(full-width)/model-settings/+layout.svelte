<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { ProviderList } from "@/components/buss/provider-list";
	import { ScrollArea } from "@/components/ui/scroll-area";
	import { providerState } from "$lib/stores/provider-state.svelte.js";
	import type { ModelProvider } from "@/types/provider";
	import { onMount } from "svelte";
	import { toast } from "svelte-sonner";
	import { m } from "$lib/paraglide/messages.js";
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

	function handleReorderProviders(newOrder: ModelProvider[]) {
		providerState.reorderProviders(newOrder);
	}

	function handleConfigureProvider(provider: ModelProvider) {
		goto(`/settings/model-settings/${provider.id}`);
	}

	function handleRemoveProvider(provider: ModelProvider) {
		if (!provider.custom) {
			toast.error(m.text_provider_remove_builtin_error());
			return;
		}

		// 删除供应商
		providerState.removeProvider(provider.id);
		// 删除该供应商的所有模型
		const removedModelCount = providerState.removeModelsByProvider(provider.id);

		toast.success(
			`${m.text_context_remove_provider()}: ${provider.name}${removedModelCount > 0 ? ` (${removedModelCount} models removed)` : ""}`,
		);

		// 如果删除的是当前活跃的供应商，跳转到第一个可用供应商
		if (provider.id === activeProviderId && providerState.providers.length > 0) {
			goto(`/settings/model-settings/${providerState.providers[0].id}`);
		}
	}

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
						onReorder={handleReorderProviders}
						onConfigure={handleConfigureProvider}
						onRemove={handleRemoveProvider}
						class="h-full"
					/>
				</div>
			</ScrollArea>
		</div>
	</div>

	{@render children()}
</div>
