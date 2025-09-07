<script lang="ts">
	import sendMessageIcon from "$lib/assets/send-message.svg";
	import { m } from "$lib/paraglide/messages.js";
	import ButtonWithTooltip from "@/components/ui/button-with-tooltip.svelte";
	import { Textarea } from "@/components/ui/textarea";
	import { chatState } from "@/stores/chat-state.svelte";
	import { cn } from "@/utils";
	import mcpIcon from "@lobehub/icons-static-svg/icons/mcp.svg";
	import { Globe, Lightbulb, Settings2 } from "@lucide/svelte";
	import { AttachmentThumbnailBar, AttachmentUploader } from "../components/attachment";

	let actionDisabled = $derived(chatState.providerType !== "302ai");
	let sendMessageDisabled = $derived(
		chatState.attachments.length === 0 && chatState.inputValue.trim() === "",
	);
</script>

<div class="flex h-full flex-col items-center justify-center gap-chat-gap-y">
	<span class="text-center text-chat-slogan">{m.chat_slogan()}</span>

	<div class="w-full max-w-chat-max-w">
		<AttachmentThumbnailBar />
		<div
			class={cn(
				"transition-[color,box-shadow]",
				"flex max-h-chat-max-h min-h-chat-min-h w-full flex-col justify-between rounded-chat border p-chat-pad pb-1.5",
				"focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:outline-hidden",
				"bg-input",
			)}
		>
			<Textarea
				class={cn(
					"w-full resize-none p-0",
					"border-none shadow-none focus-within:ring-0 focus-within:outline-hidden focus-visible:ring-0",
				)}
				bind:value={chatState.inputValue}
				placeholder={m.chat_placeholder()}
			/>

			<div class="mt-1.5 flex flex-row justify-between">
				<div class="flex h-chat-bar items-center gap-chat-bar-gap">
					<AttachmentUploader />
					<ButtonWithTooltip
						class={cn(
							"hover:!bg-chat-action-hover",
							chatState.isThinkingActive && "!bg-chat-action-active hover:!bg-chat-action-active",
						)}
						tooltip={actionDisabled ? m.chat_unsupportAction() : m.chat_thinking()}
						onclick={() => chatState.handleThinkingActiveChange(!chatState.isThinkingActive)}
					>
						<Lightbulb class={cn(chatState.isThinkingActive && "!text-chat-icon-active")} />
					</ButtonWithTooltip>
					<ButtonWithTooltip
						class={cn(
							"hover:!bg-chat-action-hover",
							chatState.isOnlineSearchActive &&
								"!bg-chat-action-active hover:!bg-chat-action-active",
						)}
						tooltip={actionDisabled ? m.chat_unsupportAction() : m.chat_onlineSearch()}
						onclick={() =>
							chatState.handleOnlineSearchActiveChange(!chatState.isOnlineSearchActive)}
					>
						<Globe class={cn(chatState.isOnlineSearchActive && "!text-chat-icon-active")} />
					</ButtonWithTooltip>
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
					<ButtonWithTooltip class="hover:!bg-chat-action-hover" tooltip={m.chat_parameters()}>
						<Settings2 />
					</ButtonWithTooltip>
				</div>

				<button
					class={cn(
						"flex size-9 items-center justify-center rounded-[10px] bg-primary text-foreground hover:!bg-primary/80",
						"disabled:cursor-not-allowed disabled:bg-chat-send-message-disabled disabled:hover:!bg-chat-send-message-disabled",
					)}
					onclick={chatState.sendMessage}
					disabled={sendMessageDisabled}
				>
					<img src={sendMessageIcon} alt="plane" class="size-5" />
				</button>
			</div>
		</div>
	</div>
</div>
