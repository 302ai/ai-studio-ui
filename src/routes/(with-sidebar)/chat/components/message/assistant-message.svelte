<script lang="ts" module>
	export type AssistantMessage = ChatMessage & {
		role: "assistant";
	};

	interface Props {
		message: AssistantMessage;
	}
</script>

<script lang="ts">
	import { ModelIcon } from "$lib/components/buss/model-icon/index.js";
	import type { ChatMessage } from "@/types/chat";
	import MessageStatus from "./message-status.svelte";

	let { message }: Props = $props();
</script>

<div class="mb-4 flex justify-start">
	<div class="flex max-w-[80%] items-start gap-3">
		<ModelIcon className="size-6" modelName={message.model.name} />
		<div class="flex flex-col">
			{message.content}

			<MessageStatus status={message.status} />
		</div>
	</div>
</div>
