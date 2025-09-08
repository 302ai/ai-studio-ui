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
	import { Button } from "@/components/ui/button";
	import * as Dialog from "@/components/ui/dialog";
	import { Download, X } from "@lucide/svelte";
	import { ImageViewer } from "svelte-image-viewer";

	let { attachment, isOpen, onClose, onDownload }: ViewerPanelProps = $props();

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

	function handleDownload() {
		onDownload?.(attachment);
	}
</script>

<Dialog.Root open={isOpen} onOpenChange={onClose}>
	<Dialog.Content
		class="h-auto max-h-[95vh] w-fit max-w-[95vw] min-w-[60vw] gap-0 p-0"
		showCloseButton={false}
	>
		<div
			class="relative z-10 flex items-center justify-between rounded-[10px] border-b bg-muted/50 px-6 py-4"
		>
			<div class="flex min-w-0 flex-1 flex-col gap-1">
				<h2 class="truncate text-lg font-semibold" title={attachment.name}>
					{attachment.name}
				</h2>
				<p class="text-sm text-muted-foreground">
					{formatFileSize(attachment.size)}
				</p>
			</div>

			<div class="ml-4 flex items-center gap-2">
				<Button variant="outline" size="sm" onclick={handleDownload} disabled={!onDownload}>
					<Download class="h-4 w-4" />
				</Button>

				<Button variant="outline" size="sm" onclick={onClose}>
					<X class="h-4 w-4" />
				</Button>
			</div>
		</div>

		<div class="relative z-0 flex flex-1 items-center justify-center overflow-hidden">
			{#if viewerType === "image" && attachment.preview}
				<div
					class="relative bg-black/5"
					style="height: 70vh; width: 70vw; border: 1px solid white; position: relative; z-index: 0; user-select: none;"
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
