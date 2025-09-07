<script lang="ts">
	import { onMount } from "svelte";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { applyRawUserCss } from "$lib/theme/user-theme";
	import { m } from "$lib/paraglide/messages.js";

	let raw = $state("");
	const LS_KEY = "user-ui-vars-raw";

	function apply() {
		applyRawUserCss(raw);
		try {
			localStorage.setItem(LS_KEY, raw);
		} catch {}
	}

	function reset() {
		raw = "";
		applyRawUserCss("");
		try {
			localStorage.removeItem(LS_KEY);
		} catch {}
	}

	onMount(() => {
		try {
			const saved = localStorage.getItem(LS_KEY);
			if (saved) {
				raw = saved;
				applyRawUserCss(raw);
			}
		} catch {}
	});
</script>

<div class="flex flex-col gap-2">
	<Label class="text-label-fg">Theme Tokens (safe, use --ui-*)</Label>
	<Textarea
		bind:value={raw}
		placeholder="--ui-accent: #8e47f0;\n--ui-accent-fg: #fff;\n--ui-radius: 0.5rem;\n--ui-density: 1;\n--ui-tab-height: 2rem; /* optional per-component */"
		class="min-h-40"
	/>

	<div class="flex gap-2">
		<Button onclick={apply}>{m?.apply?.() ?? "Apply"}</Button>
		<Button variant="secondary" onclick={reset}>{m?.reset?.() ?? "Reset"}</Button>
	</div>

	<div class="text-sm text-muted-foreground">
		<p>Notes:</p>
		<ul class="list-disc space-y-1 pl-5">
			<li>Only <code>--ui-*</code> variables are applied for safety.</li>
			<li>
				Examples: <code>--ui-accent</code>, <code>--ui-accent-fg</code>, <code>--ui-radius</code>,
				<code>--ui-density</code>.
			</li>
			<li>
				You can also override component-level <code>--ui-*</code> like tabs, settings, and chat.
			</li>
		</ul>
	</div>
</div>
