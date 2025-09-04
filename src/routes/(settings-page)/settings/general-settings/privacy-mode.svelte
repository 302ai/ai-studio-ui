<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { SettingSwitchItem } from '$lib/components/buss/settings';

	let autoInherit = $state(false);
</script>

<div class="flex flex-col gap-2">
	<Label class="text-label-fg">{m.privacyMode()}</Label>
	<SettingSwitchItem label={m.autoInherit()} bind:checked={autoInherit} />
</div>
