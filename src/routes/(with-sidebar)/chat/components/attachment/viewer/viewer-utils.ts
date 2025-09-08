import type { AttachmentFile } from "@/stores/chat-state.svelte";

export type ViewerType = "image" | "audio" | "code" | "document" | "text" | "unknown";

export function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes}B`;
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function getViewerType(attachment: AttachmentFile): ViewerType {
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

export async function loadTextContent(attachment: AttachmentFile): Promise<string> {
	if (attachment.preview && typeof attachment.preview === "string") {
		// If preview is a data URL, extract the content
		if (attachment.preview.startsWith("data:text/")) {
			const base64Content = attachment.preview.split(",")[1];
			return atob(base64Content);
		} else {
			// If preview is a URL, fetch it
			const response = await fetch(attachment.preview);
			return await response.text();
		}
	} else if (attachment.file) {
		// Read from File object
		return await attachment.file.text();
	}
	throw new Error("No content available");
}
