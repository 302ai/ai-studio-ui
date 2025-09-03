<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import ThemeSwitcher from "$lib/components/ui/theme-switcher.svelte";
</script>

<div class="container mx-auto p-8">
	<h1 class="text-4xl font-bold mb-4">Welcome to AI Studio</h1>
	<p class="text-lg text-muted-foreground mb-8">
		Choose a layout from the tabs above to see different layout options
	</p>
	
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
		<div class="p-6 border rounded-lg">
			<h2 class="text-2xl font-semibold mb-3">With Sidebar Layout</h2>
			<p class="text-muted-foreground mb-4">
				Navigate to the Dashboard tab to see a layout with a collapsible sidebar
			</p>
			<Button onclick={() => window.location.href = '/dashboard'}>
				Go to Dashboard
			</Button>
		</div>
		
		<div class="p-6 border rounded-lg">
			<h2 class="text-2xl font-semibold mb-3">Full Width Layout</h2>
			<p class="text-muted-foreground mb-4">
				Navigate to the Full Width tab to see a layout without sidebar
			</p>
			<Button onclick={() => window.location.href = '/full'}>
				Go to Full Width
			</Button>
		</div>
	</div>
	
	<div class="flex items-center gap-4">
		<span class="text-sm text-muted-foreground">Theme:</span>
		<ThemeSwitcher />
	</div>
</div>