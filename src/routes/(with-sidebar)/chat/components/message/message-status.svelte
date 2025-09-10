<script lang="ts">
	import LdrsLoader from "$lib/components/buss/ldrs-loader/ldrs-loader.svelte";
	import * as Alert from "$lib/components/ui/alert/index.js";
	import { m } from "@/paraglide/messages";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";

	interface Props {
		status: string;
	}

	let { status }: Props = $props();
</script>

{#if status === "pending"}
	<div class="flex items-center gap-2 text-sm text-muted-foreground">
		{m.chat_pending()}
		<LdrsLoader type="dot-pulse" size={16} />
	</div>
{:else if status === "error"}
	<Alert.Root variant="destructive" class="border-destructive bg-destructive/10">
		<AlertCircleIcon />
		<Alert.Title>{m.chat_error()}</Alert.Title>
		<Alert.Description>{m.chat_error_description()}</Alert.Description>
	</Alert.Root>
{:else}
	null
{/if}
