class ChatState {
	private _providerType: string = '302ai';

	get providerType() {
		return this._providerType;
	}

	set providerType(value: string) {
		this._providerType = value;
	}
}

export const chatState = new ChatState();
