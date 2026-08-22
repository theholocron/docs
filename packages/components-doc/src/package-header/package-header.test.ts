import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import PackageHeader from "./package-header.astro";
import type { PackageHeaderProps } from "./types.ts";

const entry: PackageHeaderProps["entry"] = {
	slug: "github-client",
	package: "@theholocron/github-client",
	docsUrl: "https://docs.theholocron.dev/clients/github",
	npmUrl: "https://www.npmjs.com/package/@theholocron/github-client",
	githubUrl: "https://github.com/theholocron/clients",
};

describe("PackageHeader", () => {
	it("renders the package name in a code element", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageHeader, { props: { entry } });
		expect(html).toMatch(/<code>@theholocron\/github-client<\/code>/);
	});

	it("renders npm and GitHub links", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageHeader, { props: { entry } });
		expect(html).toContain(entry.npmUrl);
		expect(html).toContain(entry.githubUrl);
	});

	it("renders description when provided", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageHeader, {
			props: { entry, description: "TypeScript client for the GitHub REST API." },
		});
		expect(html).toContain("TypeScript client for the GitHub REST API.");
	});

	it("omits description paragraph when not provided", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageHeader, { props: { entry } });
		expect(html).not.toContain("TypeScript client");
	});

	it("renders sandbox link when sandboxUrl is provided", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageHeader, {
			props: { entry: { ...entry, sandboxUrl: "https://stackblitz.com/example" } },
		});
		expect(html).toContain("https://stackblitz.com/example");
		expect(html).toContain("Sandbox");
	});

	it("omits sandbox link when sandboxUrl is absent", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageHeader, { props: { entry } });
		expect(html).not.toContain("Sandbox");
	});
});
