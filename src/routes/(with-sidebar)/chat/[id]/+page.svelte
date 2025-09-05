<script lang="ts">
	import { Textarea } from "@/components/ui/textarea";
	import { m } from "$lib/paraglide/messages.js";
	import { cn } from "@/utils";
	import { Globe, Lightbulb, Settings2 } from "@lucide/svelte";
	import ButtonWithTooltip from "@/components/ui/button-with-tooltip.svelte";
	import { chatState } from "@/stores/chat-state.svelte";
	import mcpIcon from "@lobehub/icons-static-svg/icons/mcp.svg";
	import { AttachmentThumbnailBar, AttachmentUploader } from "../components";

	let disabled = $derived(chatState.providerType !== "302ai");
	let isThinkingActive = $state(false);
	let isOnlineSearchActive = $state(false);
</script>

<div class="flex h-full flex-col items-center justify-center gap-chat-container-gap-y">
	<span class="text-center text-chat-slogan">{m.chat_slogan()}</span>

	<div class="w-full max-w-chat-container-max-width">
		<AttachmentThumbnailBar />
		<div
			class={cn(
				"transition-[color,box-shadow]",
				"flex max-h-chat-container-max-height min-h-chat-container-min-height w-full flex-col gap-y-1 rounded-chat-container border p-chat-container-padding pb-0",
				"focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:outline-hidden",
				"bg-input",
			)}
		>
			<Textarea
				class={cn(
					"max-h-chat-container-max-height w-full resize-none p-0",
					"border-none shadow-none focus-within:ring-0 focus-within:outline-hidden focus-visible:ring-0",
				)}
				placeholder={m.chat_placeholder()}
			/>

			<div class="flex h-chat-button-bar-height items-center gap-chat-button-bar-gap">
				<AttachmentUploader />
				<ButtonWithTooltip
					class={cn(
						"hover:!bg-chat-action-hover",
						isThinkingActive && "!bg-chat-action-active hover:!bg-chat-action-active",
					)}
					tooltip={disabled ? m.chat_unsupportAction() : m.chat_thinking()}
					onclick={() => (isThinkingActive = !isThinkingActive)}
				>
					<Lightbulb class={cn(isThinkingActive && "!text-chat-icon-active")} />
				</ButtonWithTooltip>
				<ButtonWithTooltip
					class={cn(
						"hover:!bg-chat-action-hover",
						isOnlineSearchActive && "!bg-chat-action-active hover:!bg-chat-action-active",
					)}
					tooltip={disabled ? m.chat_unsupportAction() : m.chat_onlineSearch()}
					onclick={() => (isOnlineSearchActive = !isOnlineSearchActive)}
				>
					<Globe class={cn(isOnlineSearchActive && "!text-chat-icon-active")} />
				</ButtonWithTooltip>
				<ButtonWithTooltip class="hover:!bg-chat-action-hover" tooltip={m.chat_mcpServers()}>
					<img
						src={mcpIcon}
						alt="MCP"
						class="size-chat-icon-size group-hover:[filter:brightness(0)_saturate(100%)_invert(35%)_sepia(84%)_saturate(2329%)_hue-rotate(244deg)_brightness(92%)_contrast(96%)] dark:invert"
					/>
				</ButtonWithTooltip>
				<ButtonWithTooltip class="hover:!bg-chat-action-hover" tooltip={m.chat_parameters()}>
					<Settings2 />
				</ButtonWithTooltip>
			</div>
		</div>
	</div>
</div>
