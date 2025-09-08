export interface MCPServer {
	id: string;
}

export interface AttachmentFile {
	id: string;
	name: string;
	type: string;
	size: number;
	file: File;
	preview?: string;
}

export interface Model {
	id: string;
	provider: string;
	name: string;
	type: "llm" | "tts" | "text-embedding" | "rerank" | "speech-to-text";
}

class ChatState {
	inputValue = $state("");
	attachments = $state<AttachmentFile[]>([]);
	providerType = $state("302ai");
	mcpServers = $state<MCPServer[]>([]);
	isThinkingActive = $state(false);
	isOnlineSearchActive = $state(false);
	isMCPActive = $state(false);
	selectedModel = $state<Model | null>(null);

	setInputValue(value: string) {
		this.inputValue = value;
	}

	sendMessage = () => {
		this.inputValue = "";
		this.attachments = [];
	};

	addAttachment(attachment: AttachmentFile) {
		this.attachments = [...this.attachments, attachment];
	}

	addAttachments(attachments: AttachmentFile[]) {
		this.attachments = [...this.attachments, ...attachments];
	}

	removeAttachment(id: string) {
		this.attachments = this.attachments.filter((att) => att.id !== id);
	}

	handleThinkingActiveChange(active: boolean) {
		this.isThinkingActive = active;
	}

	handleOnlineSearchActiveChange(active: boolean) {
		this.isOnlineSearchActive = active;
	}

	handleMCPActiveChange(active: boolean) {
		this.isMCPActive = active;
	}

	handleSelectedModelChange(model: Model | null) {
		this.selectedModel = model;
	}
}

export const chatState = new ChatState();
