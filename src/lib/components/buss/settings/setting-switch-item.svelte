<script lang="ts">
	import { Switch } from "@/components/ui/switch";

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

<div
	class="flex h-settings-item-height w-full items-center justify-between rounded-settings-item bg-settings-item-bg px-settings-item-padding-x py-settings-item-padding-y"
>
	<label for={id} class="text-sm">{label}</label>
	<Switch
		{id}
		class="data-[state=unchecked]:border-settings-switch-border"
		{checked}
		onCheckedChange={handleCheckedChange}
	/>
</div>
