<script lang="ts" module>
	import type { ThemeCategory, ThemeVariable } from "$lib/theme/theme-types.js";

	interface Props {
		category: ThemeCategory;
		onVariableChange?: (variable: ThemeVariable, value: string) => void;
	}
</script>

<script lang="ts">
	import * as Accordion from "@/components/ui/accordion";
	import ColorEditor from "./color-editor.svelte";
	import NumericEditor from "./numeric-editor.svelte";
	import { Badge } from "@/components/ui/badge";
	import { m } from "$lib/paraglide/messages.js";

	let { category, onVariableChange }: Props = $props();

	function handleVariableChange(variable: ThemeVariable, value: string) {
		// Update the variable's current value
		variable.currentValue = value;
		onVariableChange?.(variable, value);
	}

	function getVariableCount(category: ThemeCategory): number {
		return category.variables.length;
	}

	function getVariableTypeIcon(type: string): string {
		switch (type) {
			case "color":
				return "🎨";
			case "size":
				return "📏";
			case "spacing":
				return "📐";
			case "radius":
				return "⭕";
			case "density":
				return "📊";
			case "text":
				return "📝";
			default:
				return "⚙️";
		}
	}

	function getCategoryLabel(categoryName: string): string {
		switch (categoryName) {
			case "colors":
				return m.theme_category_colors();
			case "layout":
				return m.theme_category_layout();
			case "components":
				return m.theme_category_components();
			case "typography":
				return m.theme_category_typography();
			case "geometry":
				return m.theme_category_geometry();
			default:
				return category.label;
		}
	}

	function getCategoryDescription(categoryName: string): string {
		switch (categoryName) {
			case "colors":
				return m.theme_category_colors_desc();
			case "layout":
				return m.theme_category_layout_desc();
			case "components":
				return m.theme_category_components_desc();
			case "typography":
				return m.theme_category_typography_desc();
			case "geometry":
				return m.theme_category_geometry_desc();
			default:
				return category.description || "";
		}
	}
</script>

<Accordion.Item value={category.name}>
	<Accordion.Trigger class="text-left">
		<div class="flex w-full items-center justify-between pr-4">
			<div class="flex items-center gap-2">
				<span class="font-medium">{getCategoryLabel(category.name)}</span>
				<Badge variant="secondary" class="text-xs">
					{getVariableCount(category)}
				</Badge>
			</div>
		</div>
		{@const description = getCategoryDescription(category.name)}
		{#if description}
			<p class="mt-1 text-sm text-muted-foreground">{description}</p>
		{/if}
	</Accordion.Trigger>

	<Accordion.Content class="space-y-6 pt-2">
		{#each category.variables as variable (variable.name)}
			<div class="rounded-lg border border-border bg-card p-4">
				<div class="mb-3 flex items-start gap-2">
					<span class="text-lg" title={variable.type}>
						{getVariableTypeIcon(variable.type)}
					</span>
					<div class="min-w-0 flex-1">
						<div class="mb-1 flex items-center gap-2">
							<h4 class="text-sm font-medium">{variable.label}</h4>
							<Badge variant="outline" class="font-mono text-xs">
								{variable.name}
							</Badge>
						</div>
						{#if variable.description}
							<p class="mb-3 text-xs text-muted-foreground">{variable.description}</p>
						{/if}
					</div>
				</div>

				<!-- Variable editor based on type -->
				{#if variable.type === "color"}
					{@const currentValue = variable.currentValue ?? variable.defaultValue}
					<ColorEditor
						label=""
						value={currentValue}
						onValueChange={(value) => handleVariableChange(variable, value)}
					/>
				{:else if variable.type === "size" || variable.type === "spacing" || variable.type === "radius" || variable.type === "density"}
					{@const currentValue = variable.currentValue ?? variable.defaultValue}
					<NumericEditor
						label=""
						value={currentValue}
						min={variable.min}
						max={variable.max}
						step={variable.step}
						unit={variable.unit}
						presets={variable.presets}
						onValueChange={(value) => handleVariableChange(variable, value)}
					/>
				{:else}
					{@const currentValue = variable.currentValue ?? variable.defaultValue}
					<!-- Fallback for other types - simple text input -->
					<div class="space-y-2">
						<input
							type="text"
							value={currentValue}
							onchange={(e) => handleVariableChange(variable, e.currentTarget.value)}
							class="w-full rounded-md border border-input px-3 py-2 font-mono text-sm"
							placeholder={variable.defaultValue}
						/>
						<div class="text-xs text-muted-foreground">
							{m.theme_variable_default()} <span class="font-mono">{variable.defaultValue}</span>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</Accordion.Content>
</Accordion.Item>
