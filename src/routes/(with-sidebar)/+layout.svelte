<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import AppSidebar from "./app-sidebar.svelte";

	let { children } = $props();
</script>

<Sidebar.Provider class="h-full min-h-fit">
	<AppSidebar />
	<Sidebar.Inset class="flex-1">
		<div class="flex h-8 items-center border-b bg-background px-4">
			<Sidebar.Trigger />
		</div>
		<div class="flex-1 overflow-auto p-6">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
