import { Sandpack } from "@codesandbox/sandpack-react";

import type { SandboxProps } from "./types.ts";

export default function Sandbox({
	files,
	template = "vanilla-ts",
	dependencies,
	theme = "auto",
	height = 400,
}: SandboxProps) {
	return (
		<Sandpack
			files={files}
			template={template}
			customSetup={{ dependencies }}
			theme={theme}
			options={{ editorHeight: height }}
		/>
	);
}
