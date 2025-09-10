<script lang="ts" module>
	export type UserMessage = ChatMessage & {
		role: "user";
		attachments: AttachmentFile[];
	};

	interface Props {
		message: UserMessage;
	}
</script>

<script lang="ts">
	import { ViewerPanel } from "$lib/components/buss/viewer/index.js";
	import type { AttachmentFile, ChatMessage } from "@/types/chat";
	import MessageAttachment from "./message-attachment.svelte";

	let { message }: Props = $props();
	let selectedAttachment = $state<AttachmentFile | null>(null);

	function openViewer(attachment: AttachmentFile) {
		selectedAttachment = attachment;
	}

	function closeViewer() {
		selectedAttachment = null;
	}
</script>

<div class="mb-4 flex justify-end">
	<div
		class="flex max-w-[80%] rounded-lg bg-chat-user-message-bg px-4 py-2 text-chat-user-message-fg"
	>
		<span class="whitespace-pre-wrap">{message.content}</span>

		{#if message.attachments.length > 0}
			<div class="space-y-2">
				{#each message.attachments as attachment (attachment.id)}
					<MessageAttachment {attachment} {openViewer} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<!-- Viewer Panel Modal -->
{#if selectedAttachment}
	<ViewerPanel
		attachment={selectedAttachment}
		isOpen={selectedAttachment !== null}
		onClose={closeViewer}
	/>
{/if}
