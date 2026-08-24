import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import RepoIndex from "./repo-index.astro";

describe("RepoIndex", () => {
	it("renders clients packages with Package column header", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(RepoIndex, {
			props: { type: "clients" },
		});
		expect(html).toContain("@theholocron/github-client");
		expect(html).toContain("<th>Package</th>");
	});

	it("renders plugins with Plugin column header", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(RepoIndex, {
			props: { type: "plugins" },
		});
		expect(html).toContain("@theholocron/holocron-plugin-github");
		expect(html).toContain("<th>Plugin</th>");
	});

	it("renders utils packages", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(RepoIndex, {
			props: { type: "utils" },
		});
		expect(html).toContain("@theholocron/array-utils");
		expect(html).toContain("<th>Package</th>");
	});

	it("renders docs packages", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(RepoIndex, {
			props: { type: "docs" },
		});
		expect(html).toContain("@theholocron/registry-doc");
	});

	it("renders skills packages", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(RepoIndex, {
			props: { type: "skills" },
		});
		expect(html).toContain("@theholocron/skills");
	});
});
