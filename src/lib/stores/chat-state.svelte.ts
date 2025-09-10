import { nanoid } from "nanoid";

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
	model: Model;
	attachments?: AttachmentFile[];
}

export interface Provider {
	id: string;
	name: string;
}

export interface Model {
	id: string;
	provider: Provider;
	name: string;
	type: "llm" | "tts" | "text-embedding" | "rerank" | "speech-to-text";
}

class ChatState {
	inputValue = $state("");
	attachments = $state<AttachmentFile[]>([]);
	messages = $state<ChatMessage[]>([]);
	mcpServers = $state<MCPServer[]>([]);
	isThinkingActive = $state(false);
	isOnlineSearchActive = $state(false);
	isMCPActive = $state(false);
	selectedModel = $state<Model | null>(null);
	isPrivateChatActive = $state(false);

	providerType = $derived<string | null>(this.selectedModel?.provider.name ?? null);
	sendMessageEnabled = $derived<boolean>(
		(this.inputValue.trim() !== "" || this.attachments.length > 0) && !!this.selectedModel,
	);
	hasMessages = $derived(this.messages.length > 0);

	sendMessage = () => {
		if (this.sendMessageEnabled) {
			const currentModel = this.selectedModel!;
			const userMessage: ChatMessage = {
				id: nanoid(),
				role: "user",
				content: this.inputValue,
				timestamp: new Date(),
				attachments: this.attachments,
				model: currentModel,
			};

			this.messages = [...this.messages, userMessage];
			this.inputValue = "";
			this.attachments = [];

			// Auto-reply with typing simulation
			setTimeout(() => {
				const typingMessage: ChatMessage = {
					id: nanoid(),
					role: "assistant",
					content: "",
					timestamp: new Date(),
					isTyping: true,
					model: currentModel,
				};

				this.messages = [...this.messages, typingMessage];

				setTimeout(() => {
					const assistantMessage: ChatMessage = {
						id: typingMessage.id, // Use same ID to replace
						role: "assistant",
						content: `Current time: ${new Date().toLocaleString()}`,
						timestamp: new Date(),
						isTyping: false,
						model: currentModel,
					};

					this.messages = this.messages.map((msg) =>
						msg.id === typingMessage.id ? assistantMessage : msg,
					);
				}, 1500);
			}, 500);
		}
	};

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
