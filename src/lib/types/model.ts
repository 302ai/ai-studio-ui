export type ModelType = "language" | "image-generation" | "tts" | "embedding" | "rerank";

export type ModelCapability = string;

export interface Model {
	id: string;
	name: string;
	remark: string;
	providerId: string;
	capabilities: Set<ModelCapability>;
	type: ModelType;
	custom: boolean;
	enabled: boolean;
	collected: boolean;
}

export interface ModelCreateInput {
	name: string;
	remark?: string;
	providerId: string;
	capabilities?: Set<ModelCapability>;
	type?: ModelType;
	custom?: boolean;
	enabled?: boolean;
	collected?: boolean;
}

export interface ModelUpdateInput {
	name?: string;
	remark?: string;
	providerId?: string;
	capabilities?: Set<ModelCapability>;
	type?: ModelType;
	custom?: boolean;
	enabled?: boolean;
	collected?: boolean;
}
