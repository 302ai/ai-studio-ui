<script lang="ts" module>
	import type { Model } from "$lib/types/model.js";

	interface Props {
		model: Model;
		isLast?: boolean;
		onEdit?: () => void;
		onDelete?: () => void;
		onToggleCollected?: () => void;
		onDuplicate?: () => void;
	}
</script>

<script lang="ts">
	import { cn } from "$lib/utils";
	import { m } from "$lib/paraglide/messages.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
	import {
		Lightbulb,
		Image,
		Music,
		Play,
		Hammer,
		PenLine,
		Trash2,
		Star,
		Copy,
		Files,
	} from "@lucide/svelte";
	import { toast } from "svelte-sonner";

	let { model, isLast = false, onEdit, onDelete, onToggleCollected, onDuplicate }: Props = $props();

	const getCapabilityIcon = (capability: string) => {
		switch (capability) {
			case "reasoning":
				return {
					Icon: Lightbulb,
					bgClass: "bg-accent dark:bg-primary/10",
					iconClass: "text-primary",
					title: m.capability_reasoning(),
				};
			case "vision":
				return {
					Icon: Image,
					bgClass: "bg-green-100 dark:bg-green-900/20",
					iconClass: "text-green-600 dark:text-green-400",
					title: m.capability_vision(),
				};
			case "music":
				return {
					Icon: Music,
					bgClass: "bg-pink-50 dark:bg-pink-900/20",
					iconClass: "text-pink-500",
					title: m.capability_music(),
				};
			case "video":
				return {
					Icon: Play,
					bgClass: "bg-blue-50 dark:bg-blue-900/20",
					iconClass: "text-blue-600",
					title: m.capability_video(),
				};
			case "function_call":
				return {
					Icon: Hammer,
					bgClass: "bg-orange-50 dark:bg-orange-900/20",
					iconClass: "text-orange-500",
					title: m.capability_function_call(),
				};
			default:
				return null;
		}
	};

	const getTypeLabel = (type: string) => {
		switch (type) {
			case "language":
				return m.model_type_chat();
			case "embedding":
				return m.model_type_embedding();
			case "image-generation":
				return m.model_type_image();
			case "tts":
				return m.model_type_audio();
			case "rerank":
				return "Rerank";
			default:
				return type;
		}
	};

	const handleCopyModelName = async () => {
		try {
			await navigator.clipboard.writeText(model.remark || model.name);
			toast.success(m.model_context_copy_name());
		} catch {
			toast.error(m.model_copy_name_failed());
		}
	};

	const handleCopyModelId = async () => {
		try {
			await navigator.clipboard.writeText(model.id);
			toast.success(m.model_context_copy_id());
		} catch {
			toast.error(m.model_copy_id_failed());
		}
	};

	const handleDuplicate = () => {
		if (onDuplicate) {
			onDuplicate();
		}
	};
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class={cn(
			"h-[50px] cursor-pointer ring-primary outline-transparent hover:bg-muted/50",
			!isLast ? "border-b border-border" : "",
		)}
	>
		<div class="flex h-full">
			<!-- 模型名称 -->
			<div class="flex h-full min-w-[160px] flex-[1.3] items-center pr-2 pl-4 outline-hidden">
				<div class="truncate" title={model.remark || model.name}>
					{model.remark || model.name}
				</div>
			</div>

			<!-- 类型 -->
			<div class="flex h-full min-w-[40px] flex-[0.7] items-center px-1 outline-hidden">
				<div class="truncate text-sm text-[#333333] dark:text-[#E6E6E6]">
					{getTypeLabel(model.type)}
				</div>
			</div>

			<!-- 能力 -->
			<div class="flex h-full min-w-[100px] flex-[1.2] items-center gap-2 outline-hidden">
				{#each Array.from(model.capabilities) as capability (capability)}
					{@const capabilityInfo = getCapabilityIcon(String(capability))}
					{#if capabilityInfo}
						<div
							class={cn(
								"flex size-6 items-center justify-center rounded-sm",
								capabilityInfo.bgClass,
							)}
							title={capabilityInfo.title}
						>
							<capabilityInfo.Icon class={cn("h-4 w-4", capabilityInfo.iconClass)} />
						</div>
					{/if}
				{/each}
			</div>

			<!-- 操作 -->
			<div
				class="flex h-full min-w-[70px] flex-[0.8] items-center justify-center pr-2 outline-hidden"
			>
				<div class="flex h-full items-center justify-center">
					<!-- Star -->
					<Button
						variant="ghost"
						size="icon"
						class="pressed:bg-accent/20 h-8 w-8 rounded-lg p-0 hover:bg-accent/10"
						onclick={onToggleCollected}
						title={model.collected ? m.common_unstar() : m.common_star()}
					>
						<Star
							class={cn(
								"size-4",
								model.collected
									? "fill-yellow-500 text-yellow-500"
									: "text-muted-foreground hover:text-foreground",
							)}
						/>
					</Button>

					<!-- Edit -->
					<Button
						variant="ghost"
						size="icon"
						class="pressed:bg-accent/20 h-8 w-8 rounded-lg p-0 hover:bg-accent/10"
						onclick={onEdit}
						title={m.common_edit()}
					>
						<PenLine class="size-4 text-muted-foreground hover:text-foreground" strokeWidth={1.5} />
					</Button>

					<!-- Delete -->
					<Button
						variant="ghost"
						size="icon"
						class="pressed:bg-destructive/20 h-8 w-8 rounded-lg p-0 hover:bg-destructive/10"
						onclick={onDelete}
						title={m.common_delete()}
					>
						<Trash2 class="size-4 text-destructive/70 hover:text-destructive" />
					</Button>
				</div>
			</div>
		</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-48">
		<ContextMenu.Item onclick={handleCopyModelName}>
			<Copy class="mr-2 h-4 w-4" />
			{m.model_context_copy_name()}
		</ContextMenu.Item>
		<ContextMenu.Item onclick={handleCopyModelId}>
			<Copy class="mr-2 h-4 w-4" />
			{m.model_context_copy_id()}
		</ContextMenu.Item>
		<ContextMenu.Separator />
		<ContextMenu.Item onclick={() => onToggleCollected?.()}>
			<Star
				class={cn(
					"mr-2 h-4 w-4",
					model.collected ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground",
				)}
			/>
			{model.collected ? m.common_unstar() : m.common_star()}
		</ContextMenu.Item>
		{#if onDuplicate}
			<ContextMenu.Item onclick={handleDuplicate}>
				<Files class="mr-2 h-4 w-4" />
				{m.model_context_duplicate()}
			</ContextMenu.Item>
		{/if}
		<ContextMenu.Separator />
		<ContextMenu.Item onclick={() => onEdit?.()}>
			<PenLine class="mr-2 h-4 w-4" />
			{m.common_edit()}
		</ContextMenu.Item>
		<ContextMenu.Item onclick={() => onDelete?.()} class="text-destructive focus:text-destructive">
			<Trash2 class="mr-2 h-4 w-4" />
			{m.common_delete()}
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
