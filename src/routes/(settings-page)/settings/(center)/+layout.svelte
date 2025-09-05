<script lang="ts">
	let { children } = $props();
</script>

<div
	class="mx-auto flex h-full max-w-settings-layout-max-width min-w-settings-layout-min-width flex-col gap-4 pt-settings-layout-padding-top"
>
	{@render children()}
</div>
