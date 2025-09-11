<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import { ButtonWithTooltip } from "@/components/buss/button-with-tooltip";
	import { chatState } from "@/stores/chat-state.svelte";
	import { cn } from "@/utils";
	import mcpIcon from "@lobehub/icons-static-svg/icons/mcp.svg";
	import { Globe, Lightbulb, Settings2 } from "@lucide/svelte";
	import { AttachmentUploader } from "../attachment";

	let actionDisabled = $derived(chatState.providerType !== "302ai");
</script>

{#snippet actionThinking()}
	<ButtonWithTooltip
		class={cn(
			"hover:!bg-chat-action-hover",
			chatState.isThinkingActive && "!bg-chat-action-active hover:!bg-chat-action-active",
		)}
		tooltip={actionDisabled ? m.title_unsupport_action() : m.title_thinking()}
		onclick={() => chatState.handleThinkingActiveChange(!chatState.isThinkingActive)}
	>
		<Lightbulb class={cn(chatState.isThinkingActive && "!text-chat-action-active-fg")} />
	</ButtonWithTooltip>
{/snippet}

{#snippet actionOnlineSearch()}
	<ButtonWithTooltip
		class={cn(
			"hover:!bg-chat-action-hover",
			chatState.isOnlineSearchActive && "!bg-chat-action-active hover:!bg-chat-action-active",
		)}
		tooltip={actionDisabled ? m.title_unsupport_action() : m.title_online_search()}
		onclick={() => chatState.handleOnlineSearchActiveChange(!chatState.isOnlineSearchActive)}
	>
		<Globe class={cn(chatState.isOnlineSearchActive && "!text-chat-action-active-fg")} />
	</ButtonWithTooltip>
{/snippet}

{#snippet actionMCP()}
	<ButtonWithTooltip
		class={cn(
			"hover:!bg-chat-action-hover",
			chatState.isMCPActive && "!bg-chat-action-active hover:!bg-chat-action-active",
		)}
		tooltip={m.chat_mcpServers()}
		onclick={() => chatState.handleMCPActiveChange(!chatState.isMCPActive)}
	>
		<img
			src={mcpIcon}
			alt="MCP"
			class={cn(
				"size-chat-icon group-hover:[filter:brightness(0)_saturate(100%)_invert(35%)_sepia(84%)_saturate(2329%)_hue-rotate(244deg)_brightness(92%)_contrast(96%)] dark:invert",
				chatState.isMCPActive &&
					"[filter:brightness(0)_saturate(100%)_invert(35%)_sepia(84%)_saturate(2329%)_hue-rotate(244deg)_brightness(92%)_contrast(96%)] dark:[filter:brightness(0)_saturate(100%)_invert(35%)_sepia(84%)_saturate(2329%)_hue-rotate(244deg)_brightness(92%)_contrast(96%)]",
			)}
		/>
	</ButtonWithTooltip>
{/snippet}

{#snippet actionSettings()}
	<ButtonWithTooltip class="hover:!bg-chat-action-hover" tooltip={m.chat_parameters()}>
		<Settings2 />
	</ButtonWithTooltip>
{/snippet}

{#snippet actionUploadAttachment()}
	<AttachmentUploader />
{/snippet}

<div class="flex h-chat-bar items-center gap-chat-bar-gap">
	{@render actionUploadAttachment()}
	{@render actionThinking()}
	{@render actionOnlineSearch()}
	{@render actionMCP()}
	{@render actionSettings()}
</div>
