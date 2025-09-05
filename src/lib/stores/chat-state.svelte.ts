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

class ChatState {
	providerType = $state("302ai");
	mcpServers = $state<MCPServer[]>([]);
	attachments = $state<AttachmentFile[]>([]);

	addAttachment(attachment: AttachmentFile) {
		this.attachments = [...this.attachments, attachment];
	}

	removeAttachment(id: string) {
		this.attachments = this.attachments.filter((att) => att.id !== id);
	}
}

export const chatState = new ChatState();
