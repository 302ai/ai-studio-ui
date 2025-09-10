<script lang="ts">
	import { page } from "$app/state";
	import { IconPicker } from "$lib/components/buss/icon-picker/index.js";
	import { ModelList, type Model } from "$lib/components/buss/model-list/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { m } from "$lib/paraglide/messages.js";
	import { providerState } from "$lib/stores/provider-state.svelte.js";
	import type { ModelProvider } from "$lib/types/provider.js";
	import { Eye, EyeOff } from "@lucide/svelte";

	let providerParam = $derived(page.params.provider);

	// 从 providerState 中找到对应的供应商
	let currentProvider = $derived(
		providerParam ? providerState.getProviderByNameOrId(providerParam) : undefined,
	);

	// 表单状态
	let formData = $state<ModelProvider>({
		id: "",
		name: "",
		apiType: "openai",
		apiKey: "",
		baseUrl: "",
		enabled: true,
		custom: false,
		status: "pending",
		websites: {
			official: "",
			apiKey: "",
			docs: "",
			models: "",
			defaultBaseUrl: "",
		},
		icon: undefined,
	});

	// 当 currentProvider 变化时更新表单数据
	$effect(() => {
		if (currentProvider) {
			// 重新设置整个表单数据，确保状态完全同步
			formData = {
				id: currentProvider.id,
				name: currentProvider.name,
				apiType: currentProvider.apiType,
				apiKey: currentProvider.apiKey,
				baseUrl: currentProvider.baseUrl,
				enabled: currentProvider.enabled,
				custom: currentProvider.custom || false,
				status: currentProvider.status,
				websites: { ...currentProvider.websites },
				icon: currentProvider.icon,
			};

			// 加载该供应商的排序后模型
			modelsState = providerState.getSortedModelsByProvider(currentProvider.id);
		}
	});

	let showApiKey = $state(false);

	// API 类型选项
	const apiTypes = [
		{ value: "openai", label: "OpenAI" },
		{ value: "anthropic", label: "Anthropic" },
		{ value: "gemini", label: "Google Gemini" },
		{ value: "azure", label: "Azure OpenAI" },
		{ value: "ollama", label: "Ollama" },
		{ value: "custom", label: m.common_custom() },
	];

	function handleIconChange(iconKey: string) {
		formData.icon = iconKey;
		saveFormData();
	}

	async function handleGetModels() {
		console.log("Getting models for provider:", providerParam);

		if (!currentProvider) {
			console.error("No current provider found");
			return;
		}

		console.log("Current provider:", currentProvider);
		console.log("Provider details:", {
			id: currentProvider.id,
			name: currentProvider.name,
			apiType: currentProvider.apiType,
			apiKey: currentProvider.apiKey ? "***" : "empty",
			baseUrl: currentProvider.baseUrl,
			enabled: currentProvider.enabled,
		});

		isLoadingModels = true;
		try {
			const success = await providerState.fetchModelsForProvider(currentProvider);
			console.log("Fetch result:", success);

			if (success) {
				// 获取该供应商的排序后模型并更新UI
				const sortedModels = providerState.getSortedModelsByProvider(currentProvider.id);
				console.log("Sorted models:", sortedModels);
				modelsState = sortedModels;
			} else {
				console.error("Failed to fetch models");
			}
		} catch (error) {
			console.error("Error fetching models:", error);
		} finally {
			isLoadingModels = false;
		}
	}

	function handleAddModel() {
		// TODO: 实现添加模型逻辑
		console.log("添加模型");
	}

	// 根据API类型生成完整的聊天请求URL
	function getChatEndpointUrl(baseUrl: string, apiType: string): string {
		const cleanBaseUrl = baseUrl.replace(/\/$/, ""); // 移除尾部斜杠

		switch (apiType.toLowerCase()) {
			case "openai":
			case "302ai":
				if (cleanBaseUrl.endsWith("/v1")) {
					return `${cleanBaseUrl}/chat/completions`;
				}
				return `${cleanBaseUrl}/v1/chat/completions`;
			case "anthropic":
				return `${cleanBaseUrl}/v1/messages`;
			case "gemini":
			case "google":
				return `${cleanBaseUrl}/v1beta/generateContent`;
			default:
				// 默认使用OpenAI兼容格式
				if (cleanBaseUrl.endsWith("/v1")) {
					return `${cleanBaseUrl}/chat/completions`;
				}
				return `${cleanBaseUrl}/v1/chat/completions`;
		}
	}

	function handleModelEdit(model: Model) {
		// 可以打开编辑模态框或跳转到编辑页面
		console.log("编辑模型", model);
	}

	function handleModelDelete(model: Model) {
		const success = providerState.removeModel(model.id);
		if (success) {
			// 更新UI中的模型列表
			modelsState = modelsState.filter((m) => m.id !== model.id);
		}
	}

	let modelsState = $state<Model[]>([]);
	let isLoadingModels = $state(false);
	let searchQuery = $state("");

	function handleModelToggleCollected(model: Model) {
		const success = providerState.toggleModelCollected(model.id);
		if (success) {
			// 更新UI中的模型状态
			const index = modelsState.findIndex((m) => m.id === model.id);
			if (index !== -1) {
				modelsState[index].collected = !modelsState[index].collected;
			}
		}
	}

	function handleModelDuplicate(model: Model) {
		if (!currentProvider) return;

		// 创建复制的模型
		const duplicatedModel = providerState.addModel({
			name: `${model.name} (Copy)`,
			remark: model.remark ? `${model.remark} (Copy)` : "",
			providerId: currentProvider.id,
			capabilities: new Set(model.capabilities),
			type: model.type,
			custom: true, // 复制的模型标记为自定义
			enabled: model.enabled,
			collected: false, // 复制的模型默认不收藏
		});

		// 更新UI中的模型列表
		modelsState = [...modelsState, duplicatedModel];
	}

	// 保存表单数据到状态管理
	function saveFormData() {
		if (formData.id) {
			providerState.updateProvider(formData.id, {
				name: formData.name,
				apiType: formData.apiType,
				apiKey: formData.apiKey,
				baseUrl: formData.baseUrl,
				enabled: formData.enabled,
				custom: formData.custom,
				status: formData.status,
				websites: formData.websites,
				icon: formData.icon,
			});
		}
	}

	// 监听表单变化并自动保存
	let saveTimeout: NodeJS.Timeout;
	function handleInputChange() {
		clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			saveFormData();
		}, 500); // 防抖保存，500ms后保存
	}

	// 根据搜索查询过滤模型
	let filteredModels = $derived(
		modelsState.filter(
			(model) =>
				searchQuery === "" ||
				model.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
				model.name.toLowerCase().includes(searchQuery.toLowerCase()),
		),
	);
</script>

<div class="flex flex-1 flex-col overflow-hidden p-6">
	<!-- 配置标题 -->
	<div class="mb-6 flex flex-shrink-0 flex-col gap-1">
		<h2 class="max-w-full break-all whitespace-normal">
			{m.provider_configure({
				name: formData.name || (formData.custom ? m.provider_custom_name() : m.provider_unnamed()),
			})}
		</h2>
	</div>

	<div class="flex min-h-0 flex-1 flex-col gap-6">
		<!-- 表单 -->
		<div class="flex-shrink-0 space-y-4">
			{#if formData.custom}
				<!-- 图标和名称（自定义供应商） -->
				<div class="flex items-end gap-4">
					<div class="flex flex-col gap-2">
						<Label class="text-sm font-medium">{m.provider_icon()}</Label>
						<IconPicker value={formData.icon || formData.apiType} onChange={handleIconChange} />
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<Label for="name" class="text-sm font-medium">{m.provider_name()}</Label>
						<Input
							id="name"
							bind:value={formData.name}
							placeholder={m.provider_name_placeholder()}
							oninput={handleInputChange}
							class="h-11 rounded-settings-item bg-settings-item-bg hover:ring-1 hover:ring-ring"
						/>
					</div>
				</div>
			{/if}

			<!-- Base URL -->
			<div class="space-y-2">
				<Label for="baseUrl">{m.provider_baseurl()}</Label>
				<Input
					id="baseUrl"
					bind:value={formData.baseUrl}
					placeholder={formData.custom ? m.provider_baseurl_placeholder() : ""}
					oninput={handleInputChange}
					class="rounded-settings-item bg-settings-item-bg hover:ring-1 hover:ring-ring"
				/>
				{#if formData.baseUrl}
					<p class="text-xs text-muted-foreground">
						{m.provider_baseurl_request_to({
							url: getChatEndpointUrl(formData.baseUrl, formData.apiType),
						})}
					</p>
				{/if}
			</div>

			<!-- API Key -->
			<div class="space-y-2">
				<Label for="apiKey">{m.provider_apikey()}</Label>
				<div class="relative">
					<Input
						id="apiKey"
						type={showApiKey ? "text" : "password"}
						bind:value={formData.apiKey}
						placeholder={m.provider_apikey_placeholder()}
						class="rounded-settings-item bg-settings-item-bg pr-10 hover:ring-1 hover:ring-ring"
						oninput={handleInputChange}
					/>
					<Button
						variant="ghost"
						size="sm"
						class="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
						onclick={() => (showApiKey = !showApiKey)}
					>
						{#if showApiKey}
							<EyeOff class="h-4 w-4" />
						{:else}
							<Eye class="h-4 w-4" />
						{/if}
					</Button>
				</div>
				{#if !formData.custom && formData.websites.apiKey}
					<p class="text-xs text-muted-foreground">
						<a href={formData.websites.apiKey} target="_blank" class="text-primary hover:underline">
							{m.provider_get_apikey()}
						</a>
					</p>
				{/if}
			</div>

			<!-- 接口类型 (仅自定义供应商) -->
			{#if formData.custom}
				<div class="space-y-2">
					<Label for="apiType">{m.provider_interface_type()}</Label>
					<Select.Root
						type="single"
						bind:value={formData.apiType}
						onValueChange={(value) => {
							formData.apiType = value || "openai";
							saveFormData();
						}}
					>
						<Select.Trigger class="w-full rounded-settings-item bg-settings-item-bg">
							{apiTypes.find((t) => t.value === formData.apiType)?.label ||
								m.provider_interface_type_placeholder()}
						</Select.Trigger>
						<Select.Content>
							{#each apiTypes as type (type.value)}
								<Select.Item value={type.value} label={type.label} />
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			{/if}

			<!-- 操作按钮 -->
			<div class="flex items-center gap-3 pt-4">
				<Button variant="default" onclick={handleGetModels} disabled={isLoadingModels}>
					{isLoadingModels ? m.provider_get_models_loading() : m.provider_get_models()}
				</Button>
				<Button variant="outline" onclick={handleAddModel}>{m.provider_add_model()}</Button>
				<div class="flex-1"></div>
				<Input
					bind:value={searchQuery}
					placeholder={m.model_select_placeholder()}
					class="w-64 rounded-settings-item bg-settings-item-bg hover:ring-1 hover:ring-ring"
				/>
			</div>
		</div>

		<!-- 模型列表区域 -->
		<div class="min-h-0 flex-1">
			<ModelList
				models={filteredModels}
				onModelEdit={handleModelEdit}
				onModelDelete={handleModelDelete}
				onModelToggleCollected={handleModelToggleCollected}
				onModelDuplicate={handleModelDuplicate}
			/>
		</div>
	</div>
</div>
