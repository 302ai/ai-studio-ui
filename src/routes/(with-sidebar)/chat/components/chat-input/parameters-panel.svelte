<script lang="ts">
	import { m } from "@/paraglide/messages.js";
	import { chatState } from "@/stores/chat-state.svelte";
	import ParametersSlider from "./parameters-slider.svelte";
</script>

<div class="w-[500px]">
	<div class="flex flex-col gap-y-2">
		<ParametersSlider
			label={m.text_label_temperature()}
			tips={m.title_temperature_tips()}
			min={0.0}
			max={2.0}
			step={0.1}
			value={chatState.temperature}
			onChange={chatState.handleTemperatureChange.bind(chatState)}
		/>
		<ParametersSlider
			label="Top P"
			tips={m.title_top_p_tips()}
			min={0.1}
			max={1.0}
			step={0.1}
			value={chatState.topP}
			onChange={chatState.handleTopPChange.bind(chatState)}
		/>
		<ParametersSlider
			label={m.text_label_frequency_penalty()}
			tips={m.title_frequency_penalty_tips()}
			min={-2.0}
			max={2.0}
			step={0.1}
			value={chatState.frequencyPenalty}
			onChange={chatState.handleFrequencyPenaltyChange.bind(chatState)}
		/>
		<ParametersSlider
			label={m.text_label_presence_penalty()}
			tips={m.title_presence_penalty_tips()}
			min={-2.0}
			max={2.0}
			step={0.1}
			value={chatState.presencePenalty}
			onChange={chatState.handlePresencePenaltyChange.bind(chatState)}
		/>
	</div>
</div>
