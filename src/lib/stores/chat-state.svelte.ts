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

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
	isTyping?: boolean;
	model?: string;
	attachments?: Array<{
		id: string;
		name: string;
		type: string;
		url?: string;
	}>;
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
	messages = $state<ChatMessage[]>([]);
	providerType = $state("302ai");
	mcpServers = $state<MCPServer[]>([]);
	isThinkingActive = $state(false);
	isOnlineSearchActive = $state(false);
	isMCPActive = $state(false);
	selectedModel = $state<Model | null>(null);
	isPrivateChatActive = $state(false);
	hasMessages = $derived(this.messages.length > 0);

	sendMessage = () => {
		if (this.inputValue.trim() || this.attachments.length > 0) {
			const userMessage: ChatMessage = {
				id: Date.now().toString(),
				role: "user",
				content: this.inputValue,
				timestamp: new Date(),
				attachments: this.attachments.map((att) => ({
					id: att.id,
					name: att.name,
					type: att.type,
					url: att.preview,
				})),
			};

			this.messages = [...this.messages, userMessage];
			this.inputValue = "";
			this.attachments = [];

			// Auto-reply with timestamp
			setTimeout(() => {
				const assistantMessage: ChatMessage = {
					id: (Date.now() + 1).toString(),
					role: "assistant",
					content: `Current time: ${new Date().toLocaleString()}`,
					timestamp: new Date(),
					model: this.selectedModel?.name || "AI Assistant",
				};

				this.messages = [...this.messages, assistantMessage];
			}, 1000);
		}
	};

	addMessage(message: ChatMessage) {
		this.messages = [...this.messages, message];
	}

	clearMessages() {
		this.messages = [];
	}

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

	handlePrivateChatActiveChange(active: boolean) {
		this.isPrivateChatActive = active;
	}
}

export const chatState = new ChatState();
