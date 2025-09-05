<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import { m } from "$lib/paraglide/messages.js";
	import { SettingSwitchItem } from "$lib/components/buss/settings";
	import { Button } from "$lib/components/ui/button/index.js";
	let autoInherit = $state(false);
</script>

<div class="flex flex-col gap-2">
	<Label class="text-label-fg">{m.versionUpdate()}</Label>
	<SettingSwitchItem label={m.autoUpdate()} bind:checked={autoInherit} />
	<div class="flex h-11 w-full items-center justify-between rounded-[10px] bg-setting px-3 py-2.5">
		<div class="flex items-center gap-2">
			<Label class="text-sm">{m.versionInformation()}</Label>
			<Label class="text-sm text-muted-foreground">25.35.4</Label>
		</div>
		<Button size="sm">{m.checkUpdate()}</Button>
	</div>
</div>
