import { getContainerRenderer } from "@astrojs/react";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import { describe, expect, it } from "vitest";

import { Sandbox } from "./index.ts";
import { remarkSandbox } from "./remark-plugin.ts";

describe("Sandbox", () => {
	it("exports as a function", () => {
		expect(typeof Sandbox).toBe("function");
	});

	it("renders without error with React renderer registered", async () => {
		const container = await AstroContainer.create({
			renderers: [getContainerRenderer()],
		});
		const html = await container.renderToString(Sandbox, {
			props: { files: { "/index.ts": "const x = 1;" } },
		});
		expect(html).toBeDefined();
	});
});

describe("remarkSandbox", () => {
	async function process(md: string) {
		const file = await remark().use(remarkMdx).use(remarkSandbox).process(md);
		return String(file);
	}

	it("transforms a sandbox code block into a Sandbox JSX element", async () => {
		const result = await process("```sandbox\nconsole.log('hi');\n```");
		expect(result).toContain("<Sandbox");
		expect(result).toContain("console.log");
	});

	it("uses vanilla-ts as the default template", async () => {
		const result = await process("```sandbox\nconst x = 1;\n```");
		expect(result).toContain('template="vanilla-ts"');
	});

	it("picks up an explicit template from the lang", async () => {
		const result = await process("```sandbox react-ts\nconst App = () => <div/>;\n```");
		expect(result).toContain('template="react-ts"');
	});

	it("uses the correct entry file for react-ts", async () => {
		const result = await process("```sandbox react-ts\nconst App = () => null;\n```");
		expect(result).toContain("/App.tsx");
	});

	it("allows overriding the entry file path", async () => {
		const result = await process("```sandbox vanilla-ts /src/client.ts\nconst x = 1;\n```");
		expect(result).toContain("/src/client.ts");
	});

	it("falls back to /index.ts for unknown templates", async () => {
		const result = await process("```sandbox unknown-template\nconst x = 1;\n```");
		expect(result).toContain('template="unknown-template"');
		expect(result).toContain("/index.ts");
	});

	it("leaves non-sandbox code blocks unchanged", async () => {
		const result = await process("```ts\nconst x = 1;\n```");
		expect(result).not.toContain("<Sandbox");
		expect(result).toContain("```");
	});
});
