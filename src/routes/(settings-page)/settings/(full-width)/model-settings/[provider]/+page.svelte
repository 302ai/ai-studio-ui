<script lang="ts">
	import { page } from "$app/state";
	import { IconPicker } from "$lib/components/buss/icon-picker/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import * as Select from "$lib/components/ui/select/index.js";
	import { providerState } from "$lib/stores/provider-state.svelte.js";
	import type { ModelProvider } from "$lib/types/provider.js";
	import { m } from "$lib/paraglide/messages.js";
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
			};
		} else {
			// 如果没有找到供应商，重置表单
			formData = {
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
			};
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
		{ value: "custom", label: "自定义" },
	];

	function handleIconChange(iconKey: string) {
		formData.apiType = iconKey;
		saveFormData();
	}

	function handleGetModels() {
		// TODO: 实现获取模型逻辑
		console.log("获取模型列表");
	}

	function handleAddModel() {
		// TODO: 实现添加模型逻辑
		console.log("添加模型");
	}

	function handleClearModels() {
		// TODO: 实现清空模型逻辑
		console.log("清空模型");
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
</script>

<div class="flex-1 p-6">
	<div class="space-y-6">
		<!-- 配置标题 -->
		<div class="flex flex-col gap-1">
			<h2 class="max-w-full break-all whitespace-normal">
				{m.provider_configure({
					name: formData.name || (formData.custom ? m.provider_custom_name() : "未命名供应商"),
				})}
			</h2>
		</div>

		<!-- 表单 -->
		<div class="space-y-4">
			{#if formData.custom}
				<!-- 图标和名称（自定义供应商） -->
				<div class="flex items-end gap-4">
					<div class="flex flex-col gap-2">
						<Label class="text-sm font-medium">{m.provider_icon()}</Label>
						<IconPicker value={formData.apiType} onChange={handleIconChange} />
					</div>
					<div class="flex flex-1 flex-col gap-2">
						<Label for="name" class="text-sm font-medium">{m.provider_name()}</Label>
						<Input
							id="name"
							bind:value={formData.name}
							placeholder={m.provider_name_placeholder()}
							oninput={handleInputChange}
							class="h-11 rounded-[10px]"
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
					placeholder={formData.custom
						? m.provider_baseurl_placeholder()
						: "接口请求英文：/chat/completions"}
					oninput={handleInputChange}
				/>
				{#if !formData.custom && currentProvider?.websites?.defaultBaseUrl}
					<p class="text-xs text-muted-foreground">
						默认请求英文：{currentProvider.websites.defaultBaseUrl}
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
						class="pr-10"
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
				{#if !formData.custom && currentProvider?.websites?.apiKey}
					<p class="text-xs text-muted-foreground">
						<a
							href={currentProvider.websites.apiKey}
							target="_blank"
							class="text-primary hover:underline"
						>
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
						<Select.Trigger class="w-full">
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
			<div class="flex gap-3 pt-4">
				<Button variant="default" onclick={handleGetModels}>{m.provider_get_models()}</Button>
				<Button variant="outline" onclick={handleAddModel}>{m.provider_add_model()}</Button>
			</div>
		</div>

		<!-- 模型列表区域 -->
		<div class="rounded-lg border p-6">
			<div class="mb-4 flex items-center justify-between">
				<div>
					<h3 class="font-medium">{m.provider_models_header()}</h3>
					<div class="flex gap-8 text-sm text-muted-foreground">
						<span>{m.provider_models_type()}</span>
						<span>{m.provider_models_capability()}</span>
						<span>{m.provider_models_action()}</span>
					</div>
				</div>
				<Button variant="destructive" size="sm" onclick={handleClearModels}
					>{m.provider_clear_models()}</Button
				>
			</div>

			<!-- 空状态 -->
			<div class="flex flex-col items-center justify-center py-12 text-muted-foreground">
				<div class="mb-2 rounded-lg bg-muted/50 p-3">
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
						/>
					</svg>
				</div>
				<p class="text-sm">{m.provider_models_empty()}</p>
			</div>
		</div>
	</div>
</div>
