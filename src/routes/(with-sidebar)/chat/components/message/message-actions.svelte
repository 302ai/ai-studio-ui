<script lang="ts" module>
	type ActionType = "copy" | "regenerate" | "edit";

	interface Props {
		message: ChatMessage;
		enabledActions?: ActionType[];
	}
</script>

<script lang="ts">
	import { ButtonWithTooltip } from "@/components/buss/button-with-tooltip";
	import { CopyButton } from "@/components/buss/copy-button";
	import { m } from "@/paraglide/messages";
	import type { ChatMessage } from "@/types/chat";
	import { RefreshCcw, SquarePen } from "@lucide/svelte";

	let { message, enabledActions = ["copy", "regenerate", "edit"] }: Props = $props();
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
	{#each enabledActions as action (action)}
		{#if action === "copy"}
			{@render actionCopy()}
		{:else if action === "regenerate"}
			{@render actionRegenerate()}
		{:else if action === "edit"}
			{@render actionEdit()}
		{/if}
	{/each}
</div>
