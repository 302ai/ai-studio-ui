import AudioViewer from "./audio-viewer.svelte";
import CodeViewer from "./code-viewer.svelte";
import DocumentViewer from "./document-viewer.svelte";
import ImageViewer from "./image-viewer.svelte";
import LoadingState from "./loading-state.svelte";
import TextViewer from "./text-viewer.svelte";
import UnknownViewer from "./unknown-viewer.svelte";
import ViewerBase from "./viewer-base.svelte";
import ViewerPanel from "./viewer-panel.svelte";

export {
	AudioViewer as AttachmentAudioViewer,
	CodeViewer as AttachmentCodeViewer,
	DocumentViewer as AttachmentDocumentViewer,
	ImageViewer as AttachmentImageViewer,
	LoadingState as AttachmentLoadingState,
	TextViewer as AttachmentTextViewer,
	UnknownViewer as AttachmentUnknownViewer,
	ViewerBase as AttachmentViewerBase,
	//
	ViewerPanel as AttachmentViewerPanel,
	AudioViewer,
	CodeViewer,
	DocumentViewer,
	ImageViewer,
	LoadingState,
	TextViewer,
	UnknownViewer,
	ViewerBase,
	ViewerPanel,
};

export type { AudioViewerProps } from "./audio-viewer.svelte";
export type { CodeViewerProps } from "./code-viewer.svelte";
export type { DocumentViewerProps } from "./document-viewer.svelte";
export type { ImageViewerProps } from "./image-viewer.svelte";
export type { LoadingStateProps } from "./loading-state.svelte";
export type { TextViewerProps } from "./text-viewer.svelte";
export type { UnknownViewerProps } from "./unknown-viewer.svelte";
export type { ViewerBaseProps } from "./viewer-base.svelte";
export type { ViewerPanelProps } from "./viewer-panel.svelte";
