import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import PluginHeader from "./plugin-header.astro";
import type { PluginHeaderProps } from "./types.ts";

const entry: PluginHeaderProps["entry"] = {
	slug: "holocron-plugin-sentry",
	package: "@theholocron/holocron-plugin-sentry",
	docsUrl: "https://docs.theholocron.dev/holocron/plugins/sentry",
	npmUrl: "https://www.npmjs.com/package/@theholocron/holocron-plugin-sentry",
	githubUrl: "https://github.com/theholocron/holocron",
};

describe("PluginHeader", () => {
	it("renders the package name in a code element", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PluginHeader, {
			props: { entry, capability: "observability" },
		});
		expect(html).toMatch(/<code>@theholocron\/holocron-plugin-sentry<\/code>/);
	});

	it("renders the capability badge", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PluginHeader, {
			props: { entry, capability: "observability" },
		});
		expect(html).toContain("observability");
	});

	it("renders npm and GitHub links", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PluginHeader, {
			props: { entry, capability: "observability" },
		});
		expect(html).toContain(entry.npmUrl);
		expect(html).toContain(entry.githubUrl);
	});

	it("renders description when provided", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PluginHeader, {
			props: { entry, capability: "observability", description: "Tracks errors via Sentry." },
		});
		expect(html).toContain("Tracks errors via Sentry.");
	});

	it("omits description when not provided", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PluginHeader, {
			props: { entry, capability: "observability" },
		});
		expect(html).not.toContain("Tracks errors");
	});
});
