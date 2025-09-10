<script lang="ts">
	import type { SelectOption } from "$lib/components/buss/settings/setting-select.svelte";
	import SettingSelect from "$lib/components/buss/settings/setting-select.svelte";
	import { Label } from "$lib/components/ui/label/index.js";
	import { m } from "$lib/paraglide/messages.js";
	import { getLocale, setLocale } from "$lib/paraglide/runtime";

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
		// {
		// 	key: "ja",
		// 	nativeName: "日本語",
		// 	prefix: "🇯🇵",
		// },
	];

	// let value = $state(m.hello_world());

	const options: SelectOption[] = languages.map((lang) => ({
		key: lang.key,
		label: lang.nativeName,
		value: lang.key,
	}));

	function handleLanguageChange(selectedValue: string) {
		// value = selectedValue;
		setLocale(selectedValue as "zh" | "en");
	}
</script>

<div class="flex flex-col gap-settings-gap">
	<Label id="language" class="text-label-fg">{m.language()}</Label>
	<SettingSelect
		name="language"
		value={getLocale()}
		{options}
		placeholder={m.select_language()}
		onValueChange={handleLanguageChange}
	/>
</div>
