<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { Switch } from '@/components/ui/switch';
</script>

<div class="flex flex-col gap-2">
	<Label class="text-label-fg">{m.privacyMode()}</Label>
	<div
		class="flex h-11 w-full items-center justify-between rounded-[10px] bg-setting px-3.5 py-2.5"
	>
		<label for="airplane-mode" class="text-sm">{m.autoInherit()}</label>
		<Switch id="airplane-mode" class="data-[state=unchecked]:border-switch-border" />
	</div>
</div>
