<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div>
	<h1 class="text-3xl font-bold mb-4">Dashboard</h1>
	<p class="text-muted-foreground mb-6">
		This page has a sidebar layout. The sidebar is persistent across all pages in this route group.
	</p>
	
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
		<div class="p-4 border rounded-lg">
			<h3 class="font-semibold mb-2">Stats Card 1</h3>
			<p class="text-2xl font-bold">1,234</p>
		</div>
		<div class="p-4 border rounded-lg">
			<h3 class="font-semibold mb-2">Stats Card 2</h3>
			<p class="text-2xl font-bold">5,678</p>
		</div>
		<div class="p-4 border rounded-lg">
			<h3 class="font-semibold mb-2">Stats Card 3</h3>
			<p class="text-2xl font-bold">9,012</p>
		</div>
	</div>
	
	<div class="mt-6 flex gap-4">
		<Button>View Reports</Button>
		<Button variant="outline">Export Data</Button>
	</div>
</div>