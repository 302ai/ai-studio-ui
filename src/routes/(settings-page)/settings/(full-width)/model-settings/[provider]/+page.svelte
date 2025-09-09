<script lang="ts">
	import { page } from "$app/state";

	let provider = $derived(page.params.provider);
</script>

<div class="flex-1 p-4">
	<div class="space-y-4">
		<h2 class="text-xl font-medium">Provider Configuration: {provider}</h2>
		<div class="rounded-lg border p-4">
			<p class="text-muted-foreground">
				Configuration settings for {provider} provider will be shown here.
			</p>
		</div>
	</div>
</div>
