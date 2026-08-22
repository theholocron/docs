import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import Installation from "./installation.astro";

describe("Installation", () => {
	it("renders the Install heading", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Installation, {
			props: { package: "@theholocron/github-client" },
		});
		expect(html).toContain("<h2>Install</h2>");
	});

	it("renders a plain add command by default", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Installation, {
			props: { package: "@theholocron/github-client" },
		});
		expect(html).toContain("pnpm add @theholocron/github-client");
		expect(html).not.toContain("-D");
		expect(html).not.toContain("-g");
	});

	it("renders -D flag when dev is true", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Installation, {
			props: { package: "@theholocron/eslint-config", dev: true },
		});
		expect(html).toContain("pnpm add -D @theholocron/eslint-config");
	});

	it("renders -g flag when global is true", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Installation, {
			props: { package: "@theholocron/cli", global: true },
		});
		expect(html).toContain("pnpm add -g @theholocron/cli");
		expect(html).not.toContain("-D");
	});
});
