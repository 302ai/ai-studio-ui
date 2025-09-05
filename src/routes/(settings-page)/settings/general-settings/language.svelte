<script lang="ts">
	import * as Select from "$lib/components/ui/select/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { m } from "$lib/paraglide/messages.js";

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

	const triggerContent = $derived(
		languages.find((f) => f.key === value)?.nativeName ?? m.select_language(),
	);
</script>

<Label for="language" class="text-label-fg">{m.language()}</Label>

<Select.Root type="single" name="language" bind:value>
	<Select.Trigger class="!bg-setting w-full data-[size=default]:h-settings-item-height">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		{#each languages as language (language.key)}
			<Select.Item value={language.key} label={language.nativeName} />
		{/each}
	</Select.Content>
</Select.Root>
