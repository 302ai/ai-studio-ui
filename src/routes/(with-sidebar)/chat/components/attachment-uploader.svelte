<script lang="ts" module>
	const MAX_FILE_COUNT = 5;
</script>

<script lang="ts">
	import ButtonWithTooltip from "@/components/ui/button-with-tooltip.svelte";
	import { m } from "$lib/paraglide/messages.js";
	import { Paperclip } from "@lucide/svelte";
	import { chatState } from "$lib/stores/chat-state";

	let attachments = $derived(chatState.attachments);
</script>

<ButtonWithTooltip
	class="hover:!bg-chat-action-hover"
	tooltip={`${m.chat_uploadAttachment()} (${attachments.length}/${MAX_FILE_COUNT})`}
>
	<Paperclip />
</ButtonWithTooltip>
