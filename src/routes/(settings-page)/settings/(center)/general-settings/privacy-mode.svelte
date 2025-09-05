<script lang="ts">
	import { SettingSwitchItem } from "$lib/components/buss/settings";
	import { Label } from "$lib/components/ui/label/index.js";
	import { m } from "$lib/paraglide/messages.js";

	let autoInherit = $state(false);
</script>

<div class="flex flex-col gap-2">
	<Label id="privacy-mode" class="text-label-fg">{m.privacyMode()}</Label>
	<SettingSwitchItem label={m.autoInherit()} bind:checked={autoInherit} />
</div>
