<script lang="ts">
	import { chatState, type AttachmentFile } from "@/stores/chat-state.svelte";
	import { cn } from "@/utils";
	import {
		File,
		FileAudio,
		FileCode,
		FileImage,
		FileJson,
		FileSpreadsheet,
		FileText,
		Trash2,
	} from "@lucide/svelte";

	let attachments = $derived(chatState.attachments);

	function formatFileSize(bytes: number): string {
		if (bytes < 1024) return `${bytes}B`;
		if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
	}

	function getFileIcon(attachment: AttachmentFile) {
		const { type, name } = attachment;

		// Image files
		if (type.startsWith("image/")) {
			return FileImage;
		}

		// Audio files
		if (type.startsWith("audio/")) {
			return FileAudio;
		}

		// JSON files
		if (type.includes("json")) {
			return FileJson;
		}

		// JavaScript/TypeScript files
		if (
			type.includes("javascript") ||
			type.includes("typescript") ||
			name.endsWith(".js") ||
			name.endsWith(".ts") ||
			name.endsWith(".tsx") ||
			name.endsWith(".jsx")
		) {
			return FileCode;
		}

		// Excel/Spreadsheet files
		if (
			type.includes("excel") ||
			type.includes("spreadsheet") ||
			type.includes("csv") ||
			name.endsWith(".xlsx") ||
			name.endsWith(".xls") ||
			name.endsWith(".csv")
		) {
			return FileSpreadsheet;
		}

		// Text files and others
		if (
			type.startsWith("text/") ||
			type.includes("yaml") ||
			type.includes("xml") ||
			name.endsWith(".txt") ||
			name.endsWith(".md") ||
			name.endsWith(".yml") ||
			name.endsWith(".yaml")
		) {
			return FileText;
		}

		// Default file icon
		return File;
	}

	function handleRemove(id: string) {
		chatState.removeAttachment(id);
	}
</script>

{#if attachments.length > 0}
	<div class="flex gap-2 p-2">
		{#each attachments as attachment (attachment.id)}
			<div class="group relative">
				<div
					class={cn(
						"relative size-14 overflow-hidden rounded-lg",
						"flex items-center justify-center",
						attachment.preview ? "bg-muted" : "",
					)}
				>
					{#if attachment.preview}
						<img
							src={attachment.preview}
							alt={attachment.name}
							class="h-full w-full object-cover"
						/>
					{:else}
						{@const IconComponent = getFileIcon(attachment)}
						<div
							class="flex h-full w-full flex-col items-center justify-center gap-y-1 px-0.5 text-muted-foreground"
						>
							<IconComponent class="size-6" />
							<span class="max-w-full truncate text-xs leading-none">
								{attachment.name}
							</span>
						</div>
					{/if}
				</div>

				<!-- Overlay with preview and file size -->
				<div
					class={cn(
						"absolute inset-0 rounded-lg bg-black/70 text-white",
						"flex flex-col items-center justify-center",
						"opacity-0 transition-opacity duration-200 group-hover:opacity-100",
					)}
				>
					<!-- File size -->
					<div class="absolute right-0 bottom-0 left-0 px-1.5 text-center text-xs font-medium">
						{formatFileSize(attachment.size)}
					</div>
				</div>

				<!-- Remove button -->
				<button
					onclick={() => handleRemove(attachment.id)}
					class="absolute top-0.5 right-0.5 size-4 text-destructive opacity-0 group-hover:opacity-100"
				>
					<Trash2 class="size-4 hover:text-destructive/80" />
				</button>
			</div>
		{/each}
	</div>
{/if}
