<script lang="ts">
	import type { SelectOption } from "$lib/components/buss/settings/setting-select.svelte";
	import SettingSelect from "$lib/components/buss/settings/setting-select.svelte";
	import { Label } from "$lib/components/ui/label/index.js";
	import { m } from "$lib/paraglide/messages.js";

	const layouts = [
		{
			key: "default",
			label: "默认",
			value: "default",
		},
		{
			key: "wide",
			label: "宽",
			value: "wide",
		},
		{
			key: "ultraWide",
			label: "超宽",
			value: "ultra-wide",
		},
	];

	let value = $state("default");

	const options: SelectOption[] = layouts.map((layout) => ({
		key: layout.key,
		label: layout.label,
		value: layout.value,
	}));
</script>

<Label id="layout" class="text-label-fg">{m.layout()}</Label>

<SettingSelect name="layout" bind:value {options} />
