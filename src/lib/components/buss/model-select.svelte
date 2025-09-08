<script lang="ts" module>
	import type { Snippet } from "svelte";

	interface TriggerProps {
		onclick: () => void;
	}

	export interface ModelSelectProps {
		trigger?: Snippet<[TriggerProps]>;
		onModelSelect: (model: Model) => void;
	}
</script>

<script lang="ts">
	import { Button } from "@/components/ui/button";
	import * as Command from "@/components/ui/command";
	import { mockModels } from "@/datas/models";
	import { m } from "@/paraglide/messages";
	import { type Model } from "@/stores/chat-state.svelte";
	import { cn } from "@/utils";
	import { ChevronRight } from "@lucide/svelte";

	let { trigger, onModelSelect }: ModelSelectProps = $props();
	let isOpen = $state(false);
	let searchValue = $state("");
	let collapsedProviders = $state<Record<string, boolean>>({});

	const triggerProps: TriggerProps = {
		onclick: () => (isOpen = true),
	};

	const groupedModels = $derived(() => {
		const groups: Record<string, Model[]> = {};

		mockModels.forEach((model) => {
			if (
				searchValue &&
				!model.name.toLowerCase().includes(searchValue.toLowerCase()) &&
				!model.type.toLowerCase().includes(searchValue.toLowerCase())
			)
				return;

			if (!groups[model.provider]) {
				groups[model.provider] = [];
			}
			groups[model.provider].push(model);
		});

		Object.keys(groups).forEach((key) => {
			if (groups[key].length === 0) {
				delete groups[key];
			}
		});

		return groups;
	});

	$effect(() => {
		if (searchValue) {
			Object.keys(groupedModels()).forEach((provider) => {
				collapsedProviders[provider] = false;
			});
		}
	});

	function handleModelSelect(model: Model) {
		onModelSelect(model);
		isOpen = false;
	}

	function toggleProvider(provider: string) {
		collapsedProviders[provider] = !collapsedProviders[provider];
	}
</script>

{#if trigger}
	{@render trigger(triggerProps)}
{:else}
	<Button {...triggerProps}>{m.modelSelect_trigger()}</Button>
{/if}
<Command.Dialog bind:open={isOpen}>
	<Command.Input bind:value={searchValue} placeholder={m.modelSelect_placeholder()} />
	<Command.List>
		{#each Object.entries(groupedModels()) as [provider, models] (provider)}
			<div class="px-2 py-1">
				<button
					class="flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm text-muted-foreground"
					onclick={() => toggleProvider(provider)}
					disabled={searchValue.length > 0}
				>
					{provider}
					{#if !searchValue}
						<ChevronRight
							class={cn(
								"h-4 w-4 transition-transform duration-200",
								collapsedProviders[provider] ? "" : "rotate-90",
							)}
						/>
					{/if}
				</button>
				{#if !collapsedProviders[provider] || searchValue}
					<div class="space-y-1">
						{#each models as model (model.id)}
							<Command.Item
								onSelect={() => handleModelSelect(model)}
								value="{model.name} {model.type}"
							>
								<div class="flex flex-row gap-2 pl-2">
									<span class="font-medium">{model.name}</span>
									<span class="text-sm text-muted-foreground">{model.type}</span>
								</div>
							</Command.Item>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</Command.List>
</Command.Dialog>
