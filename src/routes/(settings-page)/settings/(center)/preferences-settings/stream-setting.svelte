<script lang="ts">
	import { SettingSwitchItem } from "$lib/components/buss/settings";
	import { Label } from "$lib/components/ui/label/index.js";
	import { m } from "$lib/paraglide/messages.js";

	let autoStreamOutput = $state(false);
</script>

<div class="flex flex-col gap-2">
	<Label class="text-label-fg">{m.settings_streamOutputLabel()}</Label>
	<SettingSwitchItem label={m.settings_streamOutputEnable()} bind:checked={autoStreamOutput} />
</div>
