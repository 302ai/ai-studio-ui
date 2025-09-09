import type { Provider } from "@/components/buss/provider-list";
import { nanoid } from "nanoid";

export const mockProviders: Provider[] = [
	{
		id: nanoid(),
		name: "openai",
		title: "OpenAI",
		description: "GPT-4, GPT-3.5, DALL-E, Whisper models",
	},
	{
		id: nanoid(),
		name: "anthropic",
		title: "Anthropic",
		description: "Claude 3.5 Sonnet, Claude 3 Opus, Haiku models",
	},
	{
		id: nanoid(),
		name: "google",
		title: "Google AI",
		description: "Gemini Pro, Gemini Flash, PaLM models",
	},
	{
		id: nanoid(),
		name: "meta",
		title: "Meta AI",
		description: "Llama 3.2, Llama 3.1 open-source models",
	},
	{
		id: nanoid(),
		name: "302ai",
		title: "302.AI",
		description: "Unified API for 100+ AI models",
	},
	{
		id: nanoid(),
		name: "mistral",
		title: "Mistral AI",
		description: "Mixtral, Mistral Large, Code models",
	},
	{
		id: nanoid(),
		name: "cohere",
		title: "Cohere",
		description: "Command, Embed, Rerank models",
	},
	{
		id: nanoid(),
		name: "huggingface",
		title: "Hugging Face",
		description: "Open-source transformers and datasets",
	},
];
