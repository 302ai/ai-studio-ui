<script lang="ts" module>
	export interface LdrsLoaderProps {
		type: "dot-pulse" | "line-spinner" | "waveform";
		size?: number;
		speed?: number;
		color?: string;
		stroke?: number;
	}
</script>

<script lang="ts">
	import { onMount } from "svelte";
	import { match } from "ts-pattern";

	let {
		type,
		size = 30,
		speed = 1,
		color = "currentColor",
		stroke = 2,
	}: LdrsLoaderProps = $props();

	onMount(async () => {
		await match(type)
			.with("dot-pulse", async () => {
				await import("ldrs/dotPulse");
			})
			.with("line-spinner", async () => {
				await import("ldrs/lineSpinner");
			})
			.with("waveform", async () => {
				await import("ldrs/waveform");
			})
			.exhaustive();
	});
</script>

{#if type === "dot-pulse"}
	<l-dot-pulse {size} {speed} {color}></l-dot-pulse>
{:else if type === "line-spinner"}
	<l-line-spinner {size} {speed} {color} {stroke}></l-line-spinner>
{:else if type === "waveform"}
	<l-waveform {size} {speed} {color}></l-waveform>
{/if}
