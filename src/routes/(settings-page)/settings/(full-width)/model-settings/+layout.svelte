<script lang="ts">
	import { ScrollArea } from "@/components/ui/scroll-area";
	import Header from "./header.svelte";

	let { children } = $props();
</script>

<div class="flex size-full overflow-hidden">
	<ScrollArea class="h-full w-80 flex-shrink-0 border-r p-4">
		<Header />
	</ScrollArea>

	{@render children()}
</div>
