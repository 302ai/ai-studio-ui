<script lang="ts" module>
	interface Props {
		message: ChatMessage;
	}
</script>

<script lang="ts">
	import ButtonWithTooltip from "@/components/buss/button-with-tooltip.svelte";
	import CopyButton from "@/components/buss/copy-button.svelte";
	import { m } from "@/paraglide/messages";
	import type { ChatMessage } from "@/types/chat";
	import { RefreshCcw, SquarePen } from "@lucide/svelte";

	let { message }: Props = $props();
</script>

{#snippet actionCopy()}
	<CopyButton content={message.content} />
{/snippet}

{#snippet actionRegenerate()}
	<ButtonWithTooltip
		tooltipSide="bottom"
		class="text-muted-foreground hover:!bg-chat-action-hover"
		tooltip={m.title_regenerate()}
	>
		<RefreshCcw />
	</ButtonWithTooltip>
{/snippet}

{#snippet actionEdit()}
	<ButtonWithTooltip
		tooltipSide="bottom"
		class="text-muted-foreground hover:!bg-chat-action-hover"
		tooltip={m.title_edit()}
	>
		<SquarePen />
	</ButtonWithTooltip>
{/snippet}

<div class="flex items-center gap-2">
	{@render actionCopy()}
	{@render actionRegenerate()}
	{@render actionEdit()}
</div>
