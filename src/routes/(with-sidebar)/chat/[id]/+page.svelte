<script lang="ts">
	import { Textarea } from '@/components/ui/textarea';
	import { m } from '$lib/paraglide/messages.js';
	import { cn } from '@/utils';
	import { Globe, Lightbulb, Paperclip, Settings2 } from '@lucide/svelte';
	import ButtonWithTooltip from '@/components/ui/button-with-tooltip.svelte';
	import { chatState } from '$lib/stores/chat-state.js';
	import mcpIcon from '@lobehub/icons-static-svg/icons/mcp.svg';

	let disabled = $derived(chatState.providerType !== '302ai');
</script>

<div class="flex h-full flex-col items-center justify-center gap-y-9">
	<span class="text-center text-[34px]">{m.chat_slogan()}</span>

	<div
		class={cn(
			'max-w-[720px]',
			'transition-[color,box-shadow]',
			'flex max-h-52 min-h-[126px] w-full flex-col gap-y-1 rounded-[20px] border pt-2 pr-2 pb-2 pl-4',
			'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 focus-within:outline-hidden',
			'bg-input'
		)}
	>
		<Textarea
			class={cn(
				'max-h-52 w-full resize-none p-0',
				'border-none shadow-none focus-within:ring-0 focus-within:outline-hidden focus-visible:ring-0'
			)}
			placeholder={m.chat_placeholder()}
		/>

		<div class="flex h-9 items-center gap-x-2">
			<ButtonWithTooltip tooltip={m.chat_uploadAttachment()}>
				<Paperclip />
			</ButtonWithTooltip>
			<ButtonWithTooltip tooltip={disabled ? m.chat_unsupportAction() : m.chat_thinking()}>
				<Lightbulb />
			</ButtonWithTooltip>
			<ButtonWithTooltip tooltip={disabled ? m.chat_unsupportAction() : m.chat_onlineSearch()}>
				<Globe />
			</ButtonWithTooltip>
			<ButtonWithTooltip tooltip={m.chat_mcpServers()}>
				<img
					src={mcpIcon}
					alt="MCP"
					class="size-4 group-hover:[filter:brightness(0)_saturate(100%)_invert(35%)_sepia(84%)_saturate(2329%)_hue-rotate(244deg)_brightness(92%)_contrast(96%)] dark:invert"
				/>
			</ButtonWithTooltip>
			<ButtonWithTooltip tooltip={m.chat_parameters()}>
				<Settings2 />
			</ButtonWithTooltip>
		</div>
	</div>
</div>
