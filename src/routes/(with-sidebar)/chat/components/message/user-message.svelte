<script lang="ts" module>
	export interface Message {
		id: string;
		content: string;
		timestamp: Date;
		attachments?: Array<{
			id: string;
			name: string;
			type: string;
			url?: string;
		}>;
	}

	interface Props {
		message: Message;
	}
</script>

<script lang="ts">
	import { User } from "@lucide/svelte";
	import MessageAttachment from "./message-attachment.svelte";
	import { ViewerPanel } from "$lib/components/buss/viewer/index.js";

	let { message }: Props = $props();
	let selectedAttachment = $state<NonNullable<Message["attachments"]>[0] | null>(null);

	function formatTime(date: Date): string {
		return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	}

	function openViewer(attachment: NonNullable<Message["attachments"]>[0]) {
		selectedAttachment = attachment;
	}

	function closeViewer() {
		selectedAttachment = null;
	}
</script>

<div class="mb-4 flex justify-end">
	<div class="flex max-w-[80%] items-start gap-3">
		<div class="flex flex-col items-end">
			<div class="max-w-full rounded-lg bg-blue-500 px-4 py-2 text-white">
				{#if message.content}
					<p class="text-sm whitespace-pre-wrap">{message.content}</p>
				{/if}
				{#if message.attachments && message.attachments.length > 0}
					<div class="space-y-2">
						{#each message.attachments as attachment (attachment.id)}
							<MessageAttachment {attachment} onViewerOpen={openViewer} />
						{/each}
					</div>
				{/if}
			</div>
			<span class="mt-1 text-xs text-gray-500">{formatTime(message.timestamp)}</span>
		</div>
		<div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
			<User class="h-4 w-4 text-blue-600" />
		</div>
	</div>
</div>

<!-- Viewer Panel Modal -->
{#if selectedAttachment}
	<ViewerPanel
		attachment={{
			id: selectedAttachment.id,
			name: selectedAttachment.name,
			type: selectedAttachment.type,
			size: 0,
			file: new File([], selectedAttachment.name),
			preview: selectedAttachment.url,
		}}
		isOpen={selectedAttachment !== null}
		onClose={closeViewer}
	/>
{/if}
