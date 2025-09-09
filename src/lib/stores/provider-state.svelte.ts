import { DEFAULT_PROVIDERS } from "$lib/datas/providers.js";
import type { ModelProvider } from "$lib/types/provider.js";

class ProviderState {
	providers = $state<ModelProvider[]>([]);

	constructor() {
		// 从 localStorage 加载数据，如果没有则使用默认数据
		this.loadFromStorage();
	}

	// 从 localStorage 加载数据
	private loadFromStorage() {
		const stored = localStorage.getItem("ai-studio-providers");
		if (stored) {
			try {
				this.providers = JSON.parse(stored);
			} catch {
				this.providers = [...DEFAULT_PROVIDERS];
			}
		} else {
			this.providers = [...DEFAULT_PROVIDERS];
		}
	}

	// 保存到 localStorage
	private saveToStorage() {
		localStorage.setItem("ai-studio-providers", JSON.stringify(this.providers));
	}

	// 获取单个供应商
	getProvider(id: string): ModelProvider | undefined {
		return this.providers.find((p) => p.id === id);
	}

	// 获取供应商（通过name或id）
	getProviderByNameOrId(nameOrId: string): ModelProvider | undefined {
		return this.providers.find((p) => p.name === nameOrId || p.id === nameOrId);
	}

	// 添加供应商
	addProvider(provider: ModelProvider) {
		this.providers = [...this.providers, provider];
		this.saveToStorage();
	}

	// 更新供应商
	updateProvider(id: string, updates: Partial<ModelProvider>) {
		this.providers = this.providers.map((p) => (p.id === id ? { ...p, ...updates } : p));
		this.saveToStorage();
	}

	// 删除供应商
	removeProvider(id: string) {
		this.providers = this.providers.filter((p) => p.id !== id);
		this.saveToStorage();
	}

	// 重新排序供应商
	reorderProviders(newOrder: ModelProvider[]) {
		this.providers = [...newOrder];
		this.saveToStorage();
	}

	// 创建新的自定义供应商
	createCustomProvider(name: string = "自定义提供商"): ModelProvider {
		const timestamp = Date.now();
		return {
			id: `custom-${timestamp}`,
			name,
			apiType: "openai",
			apiKey: "",
			baseUrl: "",
			enabled: true,
			custom: true,
			status: "pending",
			websites: {
				official: "",
				apiKey: "",
				docs: "",
				models: "",
				defaultBaseUrl: "",
			},
		};
	}

	// 重置为默认供应商
	resetToDefaults() {
		this.providers = [...DEFAULT_PROVIDERS];
		this.saveToStorage();
	}
}

export const providerState = new ProviderState();
