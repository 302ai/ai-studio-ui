<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import { chatState } from "@/stores/chat-state.svelte";
	import { ChatInputBox } from "../components/chat-input";
	import { MessageList } from "../components/message";

	function handleSendMessage() {
		if (chatState.hasMessages) {
			chatState.sendMessage();
			return;
		}
		document.startViewTransition(() => chatState.sendMessage());
	}
</script>

{#if !chatState.hasMessages}
	<!-- Initial state: centered layout with slogan -->
	<div class="flex h-full flex-col items-center justify-center gap-chat-gap-y">
		<span class="text-center text-chat-slogan" data-layoutid="chat-slogan">{m.chat_slogan()}</span>
		<ChatInputBox onSendMessage={handleSendMessage} />
	</div>
{:else}
	<!-- Chat active state: message list + input at bottom -->
	<div class="flex h-full flex-col">
		<div class="flex-1 overflow-hidden" data-layoutid="chat-message-list">
			<MessageList messages={chatState.messages} />
		</div>
		<div class="flex items-center justify-center">
			<ChatInputBox onSendMessage={handleSendMessage} />
		</div>
	</div>
{/if}
