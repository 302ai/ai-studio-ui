<script lang="ts">
	import type { ChatMessage } from "@/stores/chat-state.svelte";
	import AssistantMessage from "./assistant-message.svelte";
	import UserMessage from "./user-message.svelte";

	interface Props {
		messages: ChatMessage[];
	}

	let { messages }: Props = $props();
</script>

<div class="max-h-full flex-1 space-y-4 overflow-y-auto px-4 py-4">
	{#each messages as message (message.id)}
		{#if message.role === "user"}
			<UserMessage {message} />
		{:else if message.role === "assistant"}
			<AssistantMessage
				message={{
					...message,
					role: "assistant" as const,
					isTyping: message.isTyping ?? false,
				}}
			/>
		{/if}
	{/each}
</div>
