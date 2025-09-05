<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import SettingSelect from "$lib/components/buss/settings/setting-select.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import type { SelectOption } from "$lib/components/buss/settings/setting-select.svelte";

	const languages = [
		{
			key: "zh",
			nativeName: "中文",
			prefix: "🇨🇳",
		},
		{
			key: "en",
			nativeName: "English",
			prefix: "🇺🇸",
		},
		{
			key: "ja",
			nativeName: "日本語",
			prefix: "🇯🇵",
		},
	];

	let value = $state("zh");

	const options: SelectOption[] = languages.map((lang) => ({
		key: lang.key,
		label: lang.nativeName,
		value: lang.key,
	}));
</script>

<Label for="language" class="text-label-fg">{m.language()}</Label>

<SettingSelect name="language" bind:value {options} placeholder={m.select_language()} />
