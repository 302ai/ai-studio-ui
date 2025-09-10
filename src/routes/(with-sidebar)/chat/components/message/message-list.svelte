<script lang="ts" module>
	export interface ChatMessage {
		id: string;
		role: "user" | "assistant";
		content: string;
		timestamp: Date;
		isTyping?: boolean;
		model?: string;
		attachments?: Array<{
			id: string;
			name: string;
			type: string;
			url?: string;
		}>;
	}

	interface Props {
		messages: ChatMessage[];
		autoScroll?: boolean;
	}
</script>

<script lang="ts">
	import UserMessage from "./user-message.svelte";
	import AssistantMessage from "./assistant-message.svelte";

	let { messages, autoScroll = true }: Props = $props();
	let messagesContainer: HTMLDivElement;

	function scrollToBottom() {
		if (messagesContainer && autoScroll) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}

	$effect(() => {
		scrollToBottom();
	});
</script>

<div bind:this={messagesContainer} class="max-h-full flex-1 space-y-4 overflow-y-auto px-4 py-4">
	{#if messages.length === 0}
		<div class="flex h-full flex-col items-center justify-center text-gray-500">
			<div class="text-center">
				<p class="mb-2 text-lg font-medium">Start a conversation</p>
				<p class="text-sm">Send a message to begin chatting with the AI assistant.</p>
			</div>
		</div>
	{:else}
		{#each messages as message (message.id)}
			{#if message.role === "user"}
				<UserMessage {message} />
			{:else if message.role === "assistant"}
				<AssistantMessage {message} />
			{/if}
		{/each}
	{/if}
</div>
