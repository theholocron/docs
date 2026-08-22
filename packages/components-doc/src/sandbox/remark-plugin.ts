import type { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";
import { visit } from "unist-util-visit";

const DEFAULT_TEMPLATE = "vanilla-ts";

const TEMPLATE_ENTRY: Record<string, string> = {
	angular: "/src/app/app.component.ts",
	nextjs: "/pages/index.tsx",
	node: "/index.js",
	react: "/App.jsx",
	"react-ts": "/App.tsx",
	solid: "/App.tsx",
	svelte: "/App.svelte",
	"test-ts": "/index.test.ts",
	vanilla: "/index.js",
	"vanilla-ts": "/index.ts",
	vue: "/src/App.vue",
	"vue-ts": "/src/App.vue",
};

/**
 * Remark plugin that transforms fenced code blocks into Sandbox components.
 *
 * Syntax: ```sandbox [template] [/entry-file]
 *
 * Examples:
 *   ```sandbox
 *   ```sandbox react-ts
 *   ```sandbox vanilla-ts /src/client.ts
 *
 * The Sandbox component must be available in MDX scope — either imported
 * per-file or registered as a global MDX component in astro.config.ts.
 */
export function remarkSandbox() {
	return (tree: Root) => {
		visit(tree, "code", (node, index, parent) => {
			if (!node.lang?.startsWith("sandbox") || index === undefined || !parent) return;

			const meta = (node.meta ?? "").split(/\s+/).filter(Boolean);
			const langParts = node.lang.split(":");
			const template = langParts[1] ?? meta[0] ?? DEFAULT_TEMPLATE;
			const entryFile = meta.find((m) => m.startsWith("/")) ?? TEMPLATE_ENTRY[template] ?? "/index.ts";

			const sandboxNode: MdxJsxFlowElement = {
				type: "mdxJsxFlowElement",
				name: "Sandbox",
				attributes: [
					{
						type: "mdxJsxAttribute",
						name: "template",
						value: template,
					},
					{
						type: "mdxJsxAttribute",
						name: "files",
						value: {
							type: "mdxJsxAttributeValueExpression",
							value: `{ ${JSON.stringify(entryFile)}: ${JSON.stringify(node.value)} }`,
							data: {
								estree: {
									type: "Program",
									sourceType: "module",
									body: [],
								},
							},
						},
					},
				],
				children: [],
			};

			parent.children.splice(index, 1, sandboxNode);
		});
	};
}
