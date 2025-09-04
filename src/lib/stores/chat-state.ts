interface MCPServer {
	id: string;
}

class ChatState {
	private _providerType: string = '302ai';
	private _mcpServers: MCPServer[] = [];

	get providerType() {
		return this._providerType;
	}

	get mcpServers() {
		return this._mcpServers;
	}

	set providerType(value: string) {
		this._providerType = value;
	}

	set mcpServers(value: MCPServer[]) {
		this._mcpServers = value;
	}
}

export const chatState = new ChatState();
