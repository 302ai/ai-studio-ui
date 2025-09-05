interface MCPServer {
	id: string;
}

class ChatState {
	private _providerType: string = "302ai";
	private _mcpServers: MCPServer[] = [];
	private _attachments: File[] = [];

	get providerType() {
		return this._providerType;
	}

	get mcpServers() {
		return this._mcpServers;
	}

	get attachments() {
		return this._attachments;
	}

	set providerType(value: string) {
		this._providerType = value;
	}

	set mcpServers(value: MCPServer[]) {
		this._mcpServers = value;
	}

	set attachments(value: File[]) {
		this._attachments = value;
	}
}

export const chatState = new ChatState();
