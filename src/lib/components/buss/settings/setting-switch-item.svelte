<script lang="ts">
	import { Switch } from '@/components/ui/switch';

	interface Props {
		label: string;
		id?: string;
		checked?: boolean;
	}

	let { label, id = crypto.randomUUID(), checked = $bindable(false) }: Props = $props();

	function handleCheckedChange(newChecked: boolean) {
		checked = newChecked;
	}
</script>

<div class="flex h-11 w-full items-center justify-between rounded-[10px] bg-setting px-3.5 py-2.5">
	<label for={id} class="text-sm">{label}</label>
	<Switch
		{id}
		class="data-[state=unchecked]:border-switch-border"
		{checked}
		onCheckedChange={handleCheckedChange}
	/>
</div>
