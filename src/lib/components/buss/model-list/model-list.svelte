<script lang="ts" module>
	import type { Model } from "$lib/types/model.js";

	interface Props {
		models: Model[];
		onModelEdit?: (model: Model) => void;
		onModelDelete?: (model: Model) => void;
		onModelToggleCollected?: (model: Model) => void;
	}
</script>

<script lang="ts">
	import { m } from "$lib/paraglide/messages.js";
	import { VirtualList } from "$lib/components/ui/virtual-list/index.js";
	import { ModelListItem } from "./index.js";

	let { models, onModelEdit, onModelDelete, onModelToggleCollected }: Props = $props();

	// 每个模型项的高度（固定）
	const ITEM_HEIGHT = 50;
	// 容器元素引用
	let containerElement = $state<HTMLDivElement>();
	let containerHeight = $state(400); // 默认高度

	// 监听容器尺寸变化
	$effect(() => {
		if (containerElement) {
			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					containerHeight = entry.contentRect.height;
				}
			});
			resizeObserver.observe(containerElement);

			return () => {
				resizeObserver.disconnect();
			};
		}
	});
</script>

<div class="flex h-full flex-col rounded-xl border">
	<div class="flex h-full flex-col overflow-hidden rounded-xl">
		<!-- 表格头部 -->
		<div class="text-muted-fg flex h-10 flex-shrink-0 bg-muted">
			<div class="flex h-full min-w-[160px] flex-[1.3] items-center pl-4 outline-hidden">
				<div class="truncate">{m.provider_models_name()}</div>
			</div>

			<div class="flex h-full min-w-[40px] flex-[0.7] items-center outline-hidden">
				<div class="truncate">{m.provider_models_type()}</div>
			</div>

			<div class="flex h-full min-w-[100px] flex-[1.2] items-center outline-hidden">
				<div class="truncate">{m.provider_models_capability()}</div>
			</div>

			<div class="flex h-full min-w-[70px] flex-[0.8] items-center justify-center outline-hidden">
				<div class="truncate">{m.provider_models_action()}</div>
			</div>
		</div>

		<!-- 模型列表 -->
		{#if models.length === 0}
			<!-- 空状态 -->
			<div class="text-muted-fg flex flex-1 -translate-y-10 items-center justify-center">
				<div class="flex flex-col items-center gap-2">
					<svg class="size-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
						/>
					</svg>
					<p>{m.provider_models_empty_description()}</p>
				</div>
			</div>
		{:else}
			<div bind:this={containerElement} class="min-h-0 flex-1">
				{#if containerHeight > 0}
					<VirtualList
						items={models}
						itemHeight={ITEM_HEIGHT}
						height={containerHeight}
						class="w-full"
					>
						{#snippet item(model, index)}
							<ModelListItem
								{model}
								isLast={index === models.length - 1}
								onEdit={() => onModelEdit?.(model)}
								onDelete={() => onModelDelete?.(model)}
								onToggleCollected={() => onModelToggleCollected?.(model)}
							/>
						{/snippet}
					</VirtualList>
				{/if}
			</div>
		{/if}
	</div>
</div>
