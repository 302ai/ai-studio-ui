<script lang="ts" module>
	export interface AudioViewerProps {
		src?: string;
	}
</script>

<script lang="ts">
	import ViewerBase from "./viewer-base.svelte";

	let { src }: AudioViewerProps = $props();
</script>

<ViewerBase>
	{#snippet children()}
		<div class="flex h-full items-center justify-center p-6">
			<div class="text-center">
				<p class="text-lg font-medium">Audio Viewer</p>
				<p class="mt-2 text-sm text-muted-foreground">Audio viewer will be implemented here</p>
				{#if src}
					<p class="mt-2 text-xs text-muted-foreground">Source: {src}</p>
				{/if}
			</div>
		</div>
	{/snippet}
</ViewerBase>
