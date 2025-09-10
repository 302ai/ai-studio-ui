<script lang="ts" module>
	export interface Message {
		id: string;
		content: string;
		timestamp: Date;
		isTyping?: boolean;
		model?: string;
	}

	interface Props {
		message: Message;
	}
</script>

<script lang="ts">
	import { Bot, Copy, Check } from "@lucide/svelte";

	let { message }: Props = $props();
	let copied = $state(false);

	function formatTime(date: Date): string {
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(message.content);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	}
</script>

<div class="mb-4 flex justify-start">
	<div class="flex max-w-[80%] items-start gap-3">
		<div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
			<Bot class="h-4 w-4 text-gray-600" />
		</div>
		<div class="flex flex-col">
			<div class="group relative max-w-full rounded-lg bg-gray-100 px-4 py-2">
				{#if message.isTyping}
					<div class="flex items-center gap-1">
						<div class="flex space-x-1">
							<div class="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
							<div
								class="h-2 w-2 animate-pulse rounded-full bg-gray-400"
								style="animation-delay: 0.1s"
							></div>
							<div
								class="h-2 w-2 animate-pulse rounded-full bg-gray-400"
								style="animation-delay: 0.2s"
							></div>
						</div>
						<span class="ml-2 text-sm text-gray-500">AI is typing...</span>
					</div>
				{:else}
					<p class="text-sm whitespace-pre-wrap">{message.content}</p>
					<button
						class="absolute top-2 right-2 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-gray-200"
						onclick={copyToClipboard}
						title="Copy message"
					>
						{#if copied}
							<Check class="h-3 w-3 text-green-600" />
						{:else}
							<Copy class="h-3 w-3 text-gray-500" />
						{/if}
					</button>
				{/if}
			</div>
			<div class="mt-1 flex items-center gap-2">
				<span class="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
				{#if message.model}
					<span class="text-xs text-gray-400">" {message.model}</span>
				{/if}
			</div>
		</div>
	</div>
</div>
