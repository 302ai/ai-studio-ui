/**
 * Theme variable types and definitions for the visual theme editor
 */

export type VariableType = "color" | "size" | "spacing" | "radius" | "density" | "text";

export interface ThemeVariable {
	name: string; // CSS variable name (e.g., "--ui-accent")
	type: VariableType;
	category: string; // Group name (e.g., "Colors", "Typography", "Layout")
	label: string; // Human-readable label
	description?: string; // Optional description
	defaultValue: string; // Default CSS value
	currentValue?: string; // Current user-set value
	min?: number; // For numeric values
	max?: number; // For numeric values
	step?: number; // For numeric values
	unit?: string; // For size/spacing values (px, rem, etc.)
	presets?: string[]; // Predefined common values
}

export interface ThemeCategory {
	name: string;
	label: string;
	description?: string;
	variables: ThemeVariable[];
}

export interface ThemeConfig {
	categories: ThemeCategory[];
}

/**
 * Variable type detection patterns
 */
export const TYPE_PATTERNS = {
	color: /^--ui-(accent|surface|text|bg|fg|border|chat.*-(hover|active)|tab.*-(bg|fg|hover|btn))/,
	size: /^--ui-.*-(size|width|height|w|h|max-w|min-w|max-h|min-h)$/,
	spacing: /^--ui-.*-(padding|margin|gap|x|y|px|py|pad|pt)$/,
	radius: /^--ui-.*-radius$/,
	density: /^--ui-density$/,
	text: /^--ui-.*-(text|font)/,
} as const;

/**
 * Category definitions
 * Note: Labels and descriptions are now handled by i18n in the UI components
 */
export const THEME_CATEGORIES = {
	colors: {
		name: "colors",
		label: "Colors", // Fallback - should use i18n
		description: "Color scheme and surface colors", // Fallback - should use i18n
	},
	layout: {
		name: "layout",
		label: "Layout", // Fallback - should use i18n
		description: "Spacing, sizing and layout properties", // Fallback - should use i18n
	},
	components: {
		name: "components",
		label: "Components", // Fallback - should use i18n
		description: "Component-specific styling", // Fallback - should use i18n
	},
	typography: {
		name: "typography",
		label: "Typography", // Fallback - should use i18n
		description: "Text and font settings", // Fallback - should use i18n
	},
	geometry: {
		name: "geometry",
		label: "Geometry", // Fallback - should use i18n
		description: "Border radius and shape settings", // Fallback - should use i18n
	},
} as const;
