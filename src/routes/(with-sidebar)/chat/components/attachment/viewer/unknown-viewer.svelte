<script lang="ts" module>
	export interface UnknownViewerProps {
		fileName?: string;
		fileType?: string;
	}
</script>

<script lang="ts">
	import ViewerBase from "./viewer-base.svelte";

	let { fileName, fileType }: UnknownViewerProps = $props();
</script>

<ViewerBase>
	{#snippet children()}
		<div class="flex h-[40vh] items-center justify-center p-6">
			<div class="text-center">
				<p class="text-lg font-medium">Unsupported File Type</p>
				<p class="mt-2 text-sm text-muted-foreground">Cannot preview this file type</p>
				{#if fileName}
					<p class="mt-2 text-xs text-muted-foreground">File: {fileName}</p>
				{/if}
				{#if fileType}
					<p class="text-xs text-muted-foreground">Type: {fileType}</p>
				{/if}
			</div>
		</div>
	{/snippet}
</ViewerBase>
