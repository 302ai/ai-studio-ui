<script lang="ts">
	import { Label } from "$lib/components/ui/label";
	import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
	import { CircleQuestionMark } from "@lucide/svelte";

	interface Props {
		label: string;
		tips: string;
		tooltipPlacement?: "top" | "bottom" | "left" | "right";
	}

	let { label, tips, tooltipPlacement = "right" }: Props = $props();
</script>

<div class="flex flex-row items-center gap-x-1" data-slot="label">
	<Label class="text-label-fg">{label}</Label>
	<Tooltip>
		<TooltipTrigger>
			<CircleQuestionMark class="h-3 w-3 text-label-fg" />
		</TooltipTrigger>

		<TooltipContent
			class="rounded-[10px] border bg-overlay p-0 text-sm/6 text-overlay-foreground"
			side={tooltipPlacement}
			arrowClasses="hidden"
			sideOffset={5}
		>
			<div class="max-w-[300px] min-w-[200px] px-2.5 py-1.5 text-justify break-all hyphens-auto">
				{tips}
			</div>
		</TooltipContent>
	</Tooltip>
</div>
