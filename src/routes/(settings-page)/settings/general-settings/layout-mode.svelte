<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { m } from '$lib/paraglide/messages.js';

	const layouts = [
		{
			key: 'default',
			label: '默认',
			value: 'default'
		},
		{
			key: 'wide',
			label: '宽',
			value: 'wide'
		},
		{
			key: 'ultraWide',
			label: '超宽',
			value: 'ultra-wide'
		}
	];

	let value = $state('default');

	function getLabel(val: string) {
		return layouts.find((l) => l.value === val)?.label || val;
	}
</script>

<Label for="layout" class="text-label-fg">{m.layout()}</Label>

<Select.Root type="single" name="layout" bind:value>
	<Select.Trigger class="w-full">{getLabel(value)}</Select.Trigger>
	<Select.Content>
		{#each layouts as layout (layout.key)}
			<Select.Item value={layout.value} label={layout.label} />
		{/each}
	</Select.Content>
</Select.Root>
