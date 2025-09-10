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
	<div>{m.text_model_settings_title()}</div>

	<ButtonWithTooltip
		tooltip={m.title_button_add_provider()}
		class="h-[30px] w-[76px] shrink-0"
		variant="default"
		onclick={onClick}
	>
		{m.text_button_add_provider()}
	</ButtonWithTooltip>
</div>
