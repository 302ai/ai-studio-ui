<script lang="ts">
	import { X, Plus } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	type Tab = {
		id: string;
		title: string;
		href: string;
		closable?: boolean;
	};

	let {
		tabs = $bindable<Tab[]>(),
		activeTabId = $bindable<string>(),
		onTabClick,
		onTabClose,
		onNewTab,
		class: className
	}: {
		tabs: Tab[];
		activeTabId: string;
		onTabClick: (tab: Tab) => void;
		onTabClose: (tab: Tab) => void;
		onNewTab: () => void;
		class?: string;
	} = $props();
</script>

<div class={cn('flex h-10 items-end border-b bg-muted/50', className)}>
	<div class="flex items-end gap-0.5 overflow-x-auto px-2">
		{#each tabs as tab (tab.id)}
			<div
				class={cn(
					'group relative flex h-8 cursor-pointer items-center gap-2 px-3 text-sm transition-all',
					'rounded-t-md border border-b-0 hover:bg-background/80',
					activeTabId === tab.id
						? 'bg-background text-foreground shadow-sm'
						: 'border-transparent bg-muted/50 text-muted-foreground'
				)}
				onclick={() => onTabClick(tab)}
				role="button"
				tabindex="0"
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						onTabClick(tab);
					}
				}}
			>
				<span class="max-w-[200px] truncate">{tab.title}</span>
				{#if tab.closable !== false}
					<button
						class={cn(
							'opacity-0 transition-opacity group-hover:opacity-100',
							'rounded p-0.5 hover:bg-muted'
						)}
						onclick={(e) => {
							e.stopPropagation();
							onTabClose(tab);
						}}
						aria-label="Close tab"
						type="button"
					>
						<X class="h-3 w-3" />
					</button>
				{/if}
			</div>
		{/each}

		<button
			class="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-muted"
			onclick={() => onNewTab()}
		>
			<Plus class="h-4 w-4" />
		</button>
	</div>
</div>
