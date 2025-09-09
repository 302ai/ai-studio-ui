<script lang="ts">
	import { ScrollArea } from "@/components/ui/scroll-area";
	import { ProviderList, type Provider } from "@/components/buss/provider-list";
	import { mockProviders } from "@/datas/providers";
	import Header from "./header.svelte";

	let { children } = $props();
	let providers = $state(mockProviders);
	let activeProviderId = $state<string>();

	function handleProviderClick(provider: Provider) {
		console.log("Selected provider:", provider);
	}
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
