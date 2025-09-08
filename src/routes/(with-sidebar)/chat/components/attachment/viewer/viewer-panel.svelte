<script lang="ts" module>
	import type { AttachmentFile } from "@/stores/chat-state.svelte";

	export interface ViewerPanelProps {
		attachment: AttachmentFile;
		isOpen: boolean;
		onClose: () => void;
		onDownload?: (attachment: AttachmentFile) => void;
	}

	export type ViewerType = "image" | "audio" | "code" | "document" | "text" | "unknown";
</script>

<script lang="ts">
	import * as Dialog from "@/components/ui/dialog";
	import { ImageViewer } from "svelte-image-viewer";

	let { attachment, isOpen, onClose }: ViewerPanelProps = $props();

	function formatFileSize(bytes: number): string {
		if (bytes < 1024) return `${bytes}B`;
		if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
	}

	function getViewerType(attachment: AttachmentFile): ViewerType {
		const { type, name } = attachment;

		if (type.startsWith("image/")) {
			return "image";
		}

		if (type.startsWith("audio/")) {
			return "audio";
		}

		if (
			type.includes("javascript") ||
			type.includes("typescript") ||
			type.startsWith("text/") ||
			name.endsWith(".js") ||
			name.endsWith(".ts") ||
			name.endsWith(".tsx") ||
			name.endsWith(".jsx") ||
			name.endsWith(".py") ||
			name.endsWith(".java") ||
			name.endsWith(".cpp") ||
			name.endsWith(".c") ||
			name.endsWith(".css") ||
			name.endsWith(".html") ||
			name.endsWith(".json") ||
			name.endsWith(".xml") ||
			name.endsWith(".yml") ||
			name.endsWith(".yaml")
		) {
			return "code";
		}

		if (
			type.includes("pdf") ||
			type.includes("document") ||
			type.includes("word") ||
			type.includes("excel") ||
			type.includes("powerpoint") ||
			name.endsWith(".pdf") ||
			name.endsWith(".doc") ||
			name.endsWith(".docx") ||
			name.endsWith(".xlsx") ||
			name.endsWith(".xls") ||
			name.endsWith(".pptx") ||
			name.endsWith(".ppt")
		) {
			return "document";
		}

		if (type.startsWith("text/") || name.endsWith(".txt") || name.endsWith(".md")) {
			return "text";
		}

		return "unknown";
	}

	let viewerType = $derived(getViewerType(attachment));
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.Content class="w-fit max-w-[95vw] min-w-[60vw] gap-0 rounded-[10px] p-0">
		<div
			class="bg-chat-attachment-viewer flex items-center gap-2 rounded-t-[10px] border-b p-4 text-sm"
		>
			<span class="truncate" title={attachment.name}>
				{attachment.name}
			</span>
			<span class="text-muted-foreground">
				{formatFileSize(attachment.size)}
			</span>
		</div>

		<div class="flex flex-1 items-center justify-center overflow-hidden">
			{#if viewerType === "image" && attachment.preview}
				<div
					class="bg-chat-attachment-viewer rounded-b-[10px]"
					style="height: 70vh; width: 70vw; position: relative; user-select: none;"
				>
					<ImageViewer
						src={attachment.preview}
						alt={attachment.name}
						targetOffsetX={0}
						targetOffsetY={0}
						targetScale={0.5}
						minScale={0.1}
						maxScale={5}
					/>
				</div>
			{:else if viewerType === "audio"}
				<div class="flex h-[50vh] items-center justify-center p-6">
					<div class="text-center">
						<p class="text-lg font-medium">Audio Viewer</p>
						<p class="mt-2 text-sm text-muted-foreground">Audio viewer will be implemented here</p>
					</div>
				</div>
			{:else if viewerType === "code"}
				<div class="flex h-[60vh] items-center justify-center p-6">
					<div class="text-center">
						<p class="text-lg font-medium">Code Viewer</p>
						<p class="mt-2 text-sm text-muted-foreground">Code viewer will be implemented here</p>
					</div>
				</div>
			{:else if viewerType === "document"}
				<div class="flex h-[70vh] items-center justify-center p-6">
					<div class="text-center">
						<p class="text-lg font-medium">Document Viewer</p>
						<p class="mt-2 text-sm text-muted-foreground">
							Document viewer will be implemented here
						</p>
					</div>
				</div>
			{:else if viewerType === "text"}
				<div class="flex h-[50vh] items-center justify-center p-6">
					<div class="text-center">
						<p class="text-lg font-medium">Text Viewer</p>
						<p class="mt-2 text-sm text-muted-foreground">Text viewer will be implemented here</p>
					</div>
				</div>
			{:else}
				<div class="flex h-[40vh] items-center justify-center p-6">
					<div class="text-center">
						<p class="text-lg font-medium">Unsupported File Type</p>
						<p class="mt-2 text-sm text-muted-foreground">Cannot preview this file type</p>
					</div>
				</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
