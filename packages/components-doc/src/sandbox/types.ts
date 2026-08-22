import type { SandpackFiles, SandpackPredefinedTemplate, SandpackThemeProp } from "@codesandbox/sandpack-react";

export interface SandboxProps {
	files: SandpackFiles;
	template?: SandpackPredefinedTemplate;
	dependencies?: Record<string, string>;
	theme?: SandpackThemeProp;
	height?: number;
}
