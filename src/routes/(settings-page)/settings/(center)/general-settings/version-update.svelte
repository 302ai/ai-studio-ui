<script lang="ts">
	import { SettingInfoItem, SettingSwitchItem } from "$lib/components/buss/settings";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { m } from "$lib/paraglide/messages.js";
	let autoInherit = $state(false);

	function handleCheckUpdate() {
		console.log("Checking for updates...");
	}
</script>

<div class="flex flex-col gap-settings-gap">
	<Label class="text-label-fg">{m.versionUpdate()}</Label>
	<SettingSwitchItem label={m.autoUpdate()} bind:checked={autoInherit} />
	{#snippet updateButton()}
		<Button size="sm" onclick={handleCheckUpdate}>{m.checkUpdate()}</Button>
	{/snippet}

	<SettingInfoItem label={m.versionInformation()} value="25.35.4" action={updateButton} />
</div>
