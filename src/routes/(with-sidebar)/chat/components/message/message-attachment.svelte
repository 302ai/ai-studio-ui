<script lang="ts" module>
	export interface MessageAttachment {
		id: string;
		name: string;
		type: string;
		url?: string;
	}

	interface Props {
		attachment: MessageAttachment;
		onViewerOpen?: (attachment: MessageAttachment) => void;
	}
</script>

<script lang="ts">
	import {
		File,
		FileCode,
		FileImage,
		FileJson,
		FileSpreadsheet,
		FileText,
		Headphones,
		Video,
	} from "@lucide/svelte";

	let { attachment, onViewerOpen }: Props = $props();

	function getFileIcon(attachment: MessageAttachment) {
		const { type, name } = attachment;

		// Image files
		if (type.startsWith("image/")) {
			return FileImage;
		}

		// Audio files
		if (type.startsWith("audio/")) {
			return Headphones;
		}

		// Video files
		if (type.startsWith("video/")) {
			return Video;
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

	function isImageOrVideo(type: string): boolean {
		return type.startsWith("image/") || type.startsWith("video/");
	}

	function handleClick() {
		if (onViewerOpen) {
			onViewerOpen(attachment);
		}
	}
</script>

<div class="mt-2">
	{#if isImageOrVideo(attachment.type) && attachment.url}
		<button onclick={handleClick} class="block cursor-pointer">
			{#if attachment.type.startsWith("image/")}
				<img
					src={attachment.url}
					alt={attachment.name}
					class="max-h-48 max-w-64 rounded-md border border-gray-200 object-contain"
				/>
			{:else if attachment.type.startsWith("video/")}
				<video
					src={attachment.url}
					class="max-h-48 max-w-64 rounded-md border border-gray-200 object-contain"
					controls={false}
					preload="metadata"
				>
					<track kind="captions" />
				</video>
			{/if}
		</button>
	{:else}
		{@const IconComponent = getFileIcon(attachment)}
		<button
			onclick={handleClick}
			class="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 transition-colors hover:bg-gray-100"
		>
			<IconComponent class="h-4 w-4 text-gray-600" />
			<span class="max-w-48 truncate text-sm text-gray-700">{attachment.name}</span>
		</button>
	{/if}
</div>
