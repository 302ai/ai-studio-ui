<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-6 text-4xl font-bold">Full Width Layout</h1>
	<p class="mb-8 text-lg text-muted-foreground">
		This layout uses the entire width without a sidebar. Perfect for dashboards, data tables, and
		content-focused pages.
	</p>

	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
		<div class="rounded-lg border p-6">
			<h3 class="mb-2 text-xl font-semibold">Feature 1</h3>
			<p class="text-muted-foreground">Maximum width for content display</p>
		</div>
		<div class="rounded-lg border p-6">
			<h3 class="mb-2 text-xl font-semibold">Feature 2</h3>
			<p class="text-muted-foreground">Clean and focused interface</p>
		</div>
		<div class="rounded-lg border p-6">
			<h3 class="mb-2 text-xl font-semibold">Feature 3</h3>
			<p class="text-muted-foreground">Ideal for data visualization</p>
		</div>
	</div>

	<div class="flex gap-4">
		<Button>Get Started</Button>
		<Button variant="outline">Learn More</Button>
	</div>
</div>
