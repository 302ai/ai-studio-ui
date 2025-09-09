<script lang="ts" module>
	export interface HeaderProps {
		onClick?: () => void;
	}
</script>

<script lang="ts">
	import ButtonWithTooltip from "$lib/components/ui/button-with-tooltip.svelte";
	import { m } from "$lib/paraglide/messages.js";

	let { onClick }: HeaderProps = $props();
</script>

<div class="flex items-center justify-between">
	<div>{m.model_settings_title()}</div>

	<ButtonWithTooltip
		tooltip={m.model_settings_add_tooltip()}
		class="h-[30px] w-[76px] shrink-0"
		variant="default"
		onclick={onClick}
	>
		{m.model_settings_add()}
	</ButtonWithTooltip>
</div>
