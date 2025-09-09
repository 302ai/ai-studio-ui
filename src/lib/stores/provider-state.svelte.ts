import { DEFAULT_PROVIDERS } from "$lib/datas/providers.js";
import type { ModelProvider } from "$lib/types/provider.js";
import type { Model, ModelCreateInput, ModelUpdateInput } from "$lib/types/model.js";
import { nanoid } from "nanoid";
import { getModelsByProvider, getAllModels } from "$lib/api/models.js";

class ProviderState {
	providers = $state<ModelProvider[]>([]);
	models = $state<Model[]>([]);

	constructor() {
		// 从 localStorage 加载数据，如果没有则使用默认数据
		this.loadFromStorage();
	}

	// 从 localStorage 加载数据
	private loadFromStorage() {
		const storedProviders = localStorage.getItem("ai-studio-providers");
		if (storedProviders) {
			try {
				this.providers = JSON.parse(storedProviders);
			} catch {
				this.providers = [...DEFAULT_PROVIDERS];
			}
		} else {
			this.providers = [...DEFAULT_PROVIDERS];
		}

		const storedModels = localStorage.getItem("ai-studio-models");
		if (storedModels) {
			try {
				const parsedModels = JSON.parse(storedModels);
				// Convert capabilities arrays back to Sets
				this.models = parsedModels.map((model: { capabilities: string[] }) => ({
					...model,
					capabilities: new Set(model.capabilities || []),
				}));
			} catch {
				this.models = [];
			}
		} else {
			this.models = [];
		}
	}

	// 保存到 localStorage
	private saveToStorage() {
		localStorage.setItem("ai-studio-providers", JSON.stringify(this.providers));

		// Convert Sets to arrays for JSON serialization
		const modelsForStorage = this.models.map((model) => ({
			...model,
			capabilities: Array.from(model.capabilities),
		}));
		localStorage.setItem("ai-studio-models", JSON.stringify(modelsForStorage));
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

	// Model management methods

	// 根据模型名称搜索
	searchModelsByName(name: string): Model[] {
		return this.models.filter((m) => m.name.toLowerCase().includes(name.toLowerCase()));
	}

	// 获取排序后的模型列表
	getSortedModels(): Model[] {
		return [...this.models].sort((a, b) => a.name.localeCompare(b.name));
	}

	// 根据供应商ID获取排序后的模型
	getSortedModelsByProvider(providerId: string): Model[] {
		return this.models
			.filter((m) => m.providerId === providerId)
			.sort((a, b) => a.name.localeCompare(b.name));
	}

	// 添加模型
	addModel(input: ModelCreateInput): Model {
		const model: Model = {
			id: nanoid(),
			name: input.name,
			remark: input.remark || "",
			providerId: input.providerId,
			capabilities: input.capabilities || new Set(),
			type: input.type || "language",
			custom: input.custom || false,
			enabled: input.enabled ?? true,
			collected: input.collected || false,
		};
		this.models = [...this.models, model];
		this.saveToStorage();
		return model;
	}

	// 更新模型
	updateModel(id: string, updates: ModelUpdateInput): boolean {
		const modelIndex = this.models.findIndex((m) => m.id === id);
		if (modelIndex === -1) return false;

		this.models = this.models.map((m) => (m.id === id ? { ...m, ...updates } : m));
		this.saveToStorage();
		return true;
	}

	// 删除模型
	removeModel(id: string): boolean {
		const originalLength = this.models.length;
		this.models = this.models.filter((m) => m.id !== id);
		if (this.models.length !== originalLength) {
			this.saveToStorage();
			return true;
		}
		return false;
	}

	// 批量添加模型
	addModels(models: ModelCreateInput[]): Model[] {
		const newModels: Model[] = models.map((input) => ({
			id: nanoid(),
			name: input.name,
			remark: input.remark || "",
			providerId: input.providerId,
			capabilities: input.capabilities || new Set(),
			type: input.type || "language",
			custom: input.custom || false,
			enabled: input.enabled ?? true,
			collected: input.collected || false,
		}));
		this.models = [...this.models, ...newModels];
		this.saveToStorage();
		return newModels;
	}

	// 切换模型收藏状态
	toggleModelCollected(id: string): boolean {
		const model = this.models.find((m) => m.id === id);
		if (!model) return false;

		this.models = this.models.map((m) => (m.id === id ? { ...m, collected: !m.collected } : m));
		this.saveToStorage();
		return true;
	}

	// 切换模型启用状态
	toggleModelEnabled(id: string): boolean {
		const model = this.models.find((m) => m.id === id);
		if (!model) return false;

		this.models = this.models.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m));
		this.saveToStorage();
		return true;
	}

	// 删除供应商的所有模型
	removeModelsByProvider(providerId: string): number {
		const originalLength = this.models.length;
		this.models = this.models.filter((m) => m.providerId !== providerId);
		const removedCount = originalLength - this.models.length;
		if (removedCount > 0) {
			this.saveToStorage();
		}
		return removedCount;
	}

	// 从API获取供应商的模型列表
	async fetchModelsForProvider(provider: ModelProvider): Promise<boolean> {
		try {
			const result = await getModelsByProvider(provider);
			if (result.success && result.data) {
				// 移除该供应商的旧模型
				this.removeModelsByProvider(provider.id);

				// 添加新获取的模型（API已经返回完整的Model对象）
				this.models = [...this.models, ...result.data.models];
				this.saveToStorage();
				return true;
			}
			return false;
		} catch (error) {
			console.error(`Failed to fetch models for provider ${provider.id}:`, error);
			return false;
		}
	}

	// 从API获取所有启用供应商的模型列表
	async fetchAllModels(): Promise<boolean> {
		try {
			const result = await getAllModels(this.providers);
			if (result.success && result.data) {
				// API已经返回完整的Model对象
				this.models = result.data.models;
				this.saveToStorage();
				return true;
			}
			return false;
		} catch (error) {
			console.error("Failed to fetch all models:", error);
			return false;
		}
	}

	// 刷新特定供应商的模型
	async refreshProviderModels(providerId: string): Promise<boolean> {
		const provider = this.getProvider(providerId);
		if (!provider) return false;

		return await this.fetchModelsForProvider(provider);
	}
}

export const providerState = new ProviderState();
