<script lang="ts">
	import { formatShortcutKeys, isMac } from "@/shortcut/shortcut-config";
	import { cn } from "@/utils";

	interface Props {
		value?: string[];
		onValueChange: (keys: string[]) => void;
		placeholder?: string;
		className?: string;
		disabled?: boolean;
		onRecordingChange?: (isRecording: boolean) => void;
		allShortcuts?: { action: string; keys: string[] }[];
		onReset?: () => void;
	}

	let {
		value = $bindable([]),
		onValueChange,
		placeholder,
		className,
		disabled = false,
		onRecordingChange,
		allShortcuts = [],
		onReset,
	}: Props = $props();

	// 翻译函数 - 这里需要根据你的 i18n 实现来调整
	const t = (key: string) => {
		const translations: Record<string, string> = {
			"press-keys": "Press keys...",
			placeholder: "Click to record shortcut",
			cancel: "Cancel",
			reset: "Reset",
			"error.modifier-required": "Shortcut must include a modifier key",
			"error.shortcut-conflict": "This shortcut conflicts with an existing one",
		};
		return translations[key] || key;
	};

	let isRecording = $state(false);
	let currentKeys = $state<string[]>([]);

	const checkShortcutConflict = (
		keys: string[],
		allShortcuts: { action: string; keys: string[] }[] = [],
	): boolean => {
		const normalizedCurrentKeys = !isMac
			? keys.map((key) => (key === "Cmd" ? "Ctrl" : key === "Option" ? "Alt" : key))
			: keys;
		const currentKeysStr = normalizedCurrentKeys.slice().sort().join(",");

		return allShortcuts.some((shortcut) => {
			const normalizedExistingKeys = !isMac
				? shortcut.keys.map((key) => (key === "Cmd" ? "Ctrl" : key === "Option" ? "Alt" : key))
				: shortcut.keys;

			const existingKeysStr = normalizedExistingKeys.slice().sort().join(",");
			return existingKeysStr === currentKeysStr;
		});
	};

	const hasModifierKey = (keys: string[]): boolean => {
		const modifierKeys = ["Ctrl", "Cmd", "Alt", "Shift"];
		return keys.some((key) => modifierKeys.includes(key));
	};

	const isValidShortcut = (keys: string[]): boolean => {
		if (!hasModifierKey(keys)) {
			// logger.info("isValidShortcut: no modifier key1", { keys });
			return false;
		}

		// logger.info("isValidShortcut: has modifier key2", { keys });

		const modifierKeys = ["Ctrl", "Cmd", "Alt", "Shift"];
		const nonModifierKeys = keys.filter((key) => !modifierKeys.includes(key));
		return nonModifierKeys.length > 0;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isRecording) return;

		event.preventDefault();
		event.stopPropagation();

		if (event.key === "Backspace") {
			isRecording = false;
			currentKeys = [];
			onRecordingChange?.(false);
			return;
		}

		const newKeys: string[] = [];

		if (event.ctrlKey) newKeys.push("Ctrl");
		if (event.metaKey) newKeys.push("Cmd");
		if (event.altKey) newKeys.push("Alt");
		if (event.shiftKey) newKeys.push("Shift");

		if (event.key && !["Control", "Meta", "Shift", "Alt"].includes(event.key)) {
			let keyToAdd = event.key;

			// 处理单字符按键
			if (keyToAdd.length === 1) {
				keyToAdd = keyToAdd.toUpperCase();
			}
			// 处理功能键名称映射
			else if (keyToAdd === " ") {
				keyToAdd = "Space";
			} else if (keyToAdd === "Escape") {
				keyToAdd = "Esc";
			}

			newKeys.push(keyToAdd);
		}

		currentKeys = newKeys;
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		if (!isRecording) return;

		event.preventDefault();
		event.stopPropagation();

		if (currentKeys.length === 0) {
			return;
		}

		if (!isValidShortcut(currentKeys)) {
			// toast.error(t("error.modifier-required"));
			currentKeys = [];
			isRecording = false;
			onRecordingChange?.(false);
			return;
		}

		// logger.info("handleKeyUp: currentKeys", { currentKeys });
		// logger.info("handleKeyUp: allShortcuts", { allShortcuts });

		if (checkShortcutConflict(currentKeys, allShortcuts)) {
			// toast.error(t("error.shortcut-conflict"));
			currentKeys = [];
			isRecording = false;
			onRecordingChange?.(false);
			return;
		}

		isRecording = false;
		onValueChange(currentKeys);
		currentKeys = [];
		onRecordingChange?.(false);
	};

	const startRecording = () => {
		if (disabled) return;
		isRecording = true;
		currentKeys = [];
		onRecordingChange?.(true);
	};

	const handleReset = () => {
		if (onReset) {
			onReset();
		} else {
			onValueChange([]);
		}
	};

	const handleCancel = () => {
		isRecording = false;
		currentKeys = [];
		onRecordingChange?.(false);
	};

	const formatKeys = (keys: string[]) => {
		return formatShortcutKeys(keys);
	};

	// 计算显示值
	const displayValue = $derived(() => {
		if (isRecording) {
			return currentKeys.length > 0 ? formatKeys(currentKeys) : "press-keys";
		}
		return value.length > 0 ? formatKeys(value) : placeholder || "placeholder";
	});

	// 事件监听器
	$effect(() => {
		if (!isRecording) return;

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	});
</script>

<div class={cn("relative", className)}>
	<button
		type="button"
		onclick={() => {
			if (!isRecording && !disabled) {
				startRecording();
			}
		}}
		class={cn(
			"flex h-settings-item w-full items-center justify-between rounded-settings-item bg-settings-item-bg px-settings-item-x py-settings-item-y",

			"focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
			value.length === 0 && "text-muted-fg",
			disabled && "cursor-not-allowed opacity-50",
			isRecording && "border-primary ring-1 ring-ring",
			!isRecording && !disabled && "cursor-text",
		)}
		{disabled}
	>
		<span class="flex-1 text-left text-settings-shortcut-size">{displayValue()}</span>

		{#if isRecording}
			<button
				type="button"
				onclick={(e) => {
					e.stopPropagation();
					handleCancel();
				}}
				class="ml-2 cursor-pointer text-settings-shortcut-size font-medium text-primary hover:text-primary/80"
			>
				{t("cancel")}
			</button>
		{:else}
			<button
				type="button"
				onclick={(e) => {
					e.stopPropagation();
					handleReset();
				}}
				class="ml-2 cursor-pointer text-settings-shortcut-size font-medium text-primary hover:text-primary/80"
			>
				{t("reset")}
			</button>
		{/if}
	</button>
</div>
