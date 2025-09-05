<script lang="ts">
	let { children } = $props();
</script>

<div class="size-full overflow-hidden">
	{@render children()}
</div>
