<script lang="ts" module>
	const MAX_ATTACHMENT_COUNT = 5;
</script>

<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import ButtonWithTooltip from "@/components/ui/button-with-tooltip.svelte";
	import { chatState, type AttachmentFile } from "@/stores/chat-state.svelte";
	import { Paperclip } from "@lucide/svelte";
	import { nanoid } from "nanoid";

	let attachments = $derived(chatState.attachments);
	let isMaxReached = $derived(attachments.length >= MAX_ATTACHMENT_COUNT);
	let fileInput: HTMLInputElement;

	async function generatePreview(file: File): Promise<string | undefined> {
		if (!file.type.startsWith("image/")) {
			return undefined;
		}

		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				resolve(e.target?.result as string);
			};
			reader.onerror = () => {
				resolve(undefined);
			};
			reader.readAsDataURL(file);
		});
	}

	async function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;

		if (!files) return;

		const newAttachments: AttachmentFile[] = [];

		for (const file of Array.from(files)) {
			if (attachments.length + newAttachments.length >= MAX_ATTACHMENT_COUNT) {
				break;
			}

			const preview = await generatePreview(file);
			const attachment: AttachmentFile = {
				id: nanoid(),
				name: file.name,
				type: file.type,
				size: file.size,
				file: file,
				preview,
			};

			newAttachments.push(attachment);
		}

		chatState.addAttachments(newAttachments);
		target.value = "";
	}

	function handleClick() {
		if (!isMaxReached) {
			fileInput?.click();
		}
	}
</script>

<input
	bind:this={fileInput}
	type="file"
	multiple
	class="hidden"
	accept="image/*,text/*,.pdf,.doc,.docx,.json,.csv,.xlsx,.xls"
	onchange={handleFileSelect}
/>

<ButtonWithTooltip
	class="hover:!bg-chat-action-hover"
	tooltip={`${m.chat_uploadAttachment()} (${attachments.length}/${MAX_ATTACHMENT_COUNT})`}
	disabled={isMaxReached}
	onclick={handleClick}
>
	<Paperclip />
</ButtonWithTooltip>
