<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="container mx-auto p-8">
	<h1 class="text-4xl font-bold mb-6">Full Width Layout</h1>
	<p class="text-lg text-muted-foreground mb-8">
		This layout uses the entire width without a sidebar. Perfect for dashboards, data tables, and content-focused pages.
	</p>
	
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
		<div class="p-6 border rounded-lg">
			<h3 class="text-xl font-semibold mb-2">Feature 1</h3>
			<p class="text-muted-foreground">Maximum width for content display</p>
		</div>
		<div class="p-6 border rounded-lg">
			<h3 class="text-xl font-semibold mb-2">Feature 2</h3>
			<p class="text-muted-foreground">Clean and focused interface</p>
		</div>
		<div class="p-6 border rounded-lg">
			<h3 class="text-xl font-semibold mb-2">Feature 3</h3>
			<p class="text-muted-foreground">Ideal for data visualization</p>
		</div>
	</div>
	
	<div class="flex gap-4">
		<Button>Get Started</Button>
		<Button variant="outline">Learn More</Button>
	</div>
</div>