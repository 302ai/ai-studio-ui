<script lang="ts">
	import sendMessageIcon from "$lib/assets/send-message.svg";
	import { m } from "$lib/paraglide/messages.js";
	import ModelSelect from "@/components/buss/model-select.svelte";
	import { Button } from "@/components/ui/button";
	import ButtonWithTooltip from "@/components/ui/button-with-tooltip.svelte";
	import { Separator } from "@/components/ui/separator";
	import { Textarea } from "@/components/ui/textarea";
	import { chatState } from "@/stores/chat-state.svelte";
	import { cn } from "@/utils";
	import mcpIcon from "@lobehub/icons-static-svg/icons/mcp.svg";
	import { Globe, Lightbulb, Settings2 } from "@lucide/svelte";
	import { AttachmentThumbnailBar, AttachmentUploader } from "../attachment";

	interface Props {
		onSendMessage?: () => void;
	}

	let { onSendMessage = chatState.sendMessage }: Props = $props();

	let actionDisabled = $derived(chatState.providerType !== "302ai");
	let sendMessageDisabled = $derived(
		chatState.attachments.length === 0 && chatState.inputValue.trim() === "",
	);
</script>

<div class="w-full max-w-chat-max-w" data-layoutid="chat-input-container">
	<AttachmentThumbnailBar />
	<div
		class={cn(
			"transition-[color,box-shadow]",
			"flex max-h-chat-max-h min-h-chat-min-h w-full flex-col justify-between rounded-chat border p-chat-pad pb-1.5",
			"focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:outline-hidden",
			"bg-input",
		)}
		data-layoutid="chat-input-box"
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
					<Lightbulb class={cn(chatState.isThinkingActive && "!text-chat-action-active-fg")} />
				</ButtonWithTooltip>
				<ButtonWithTooltip
					class={cn(
						"hover:!bg-chat-action-hover",
						chatState.isOnlineSearchActive && "!bg-chat-action-active hover:!bg-chat-action-active",
					)}
					tooltip={actionDisabled ? m.chat_unsupportAction() : m.chat_onlineSearch()}
					onclick={() => chatState.handleOnlineSearchActiveChange(!chatState.isOnlineSearchActive)}
				>
					<Globe class={cn(chatState.isOnlineSearchActive && "!text-chat-action-active-fg")} />
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

			<div class="flex items-center gap-2">
				<ModelSelect
					selectedModel={chatState.selectedModel}
					onModelSelect={(model) => chatState.handleSelectedModelChange(model)}
				>
					{#snippet trigger({ onclick })}
						<Button variant="ghost" class="text-xs hover:!bg-chat-action-hover" {onclick}>
							{chatState.selectedModel?.name ?? m.chat_selectModel()}
						</Button>
					{/snippet}
				</ModelSelect>

				<Separator
					orientation="vertical"
					class="rounded-2xl data-[orientation=vertical]:h-1/2 data-[orientation=vertical]:w-0.5"
				/>

				<button
					class={cn(
						"flex size-9 items-center justify-center rounded-[10px] bg-chat-send-message-button text-foreground hover:!bg-chat-send-message-button/80",
						"disabled:cursor-not-allowed disabled:bg-chat-send-message-button/50 disabled:hover:!bg-chat-send-message-button/50",
					)}
					onclick={onSendMessage}
					disabled={sendMessageDisabled}
				>
					<img src={sendMessageIcon} alt="plane" class="size-5" />
				</button>
			</div>
		</div>
	</div>
</div>
