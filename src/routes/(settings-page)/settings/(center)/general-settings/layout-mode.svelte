<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import SettingSelect from "$lib/components/buss/settings/setting-select.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import type { SelectOption } from "$lib/components/buss/settings/setting-select.svelte";

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

<Label for="layout" class="text-label-fg">{m.layout()}</Label>

<SettingSelect name="layout" bind:value {options} />
