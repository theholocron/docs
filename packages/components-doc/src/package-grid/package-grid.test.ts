import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import PackageGrid from "./package-grid.astro";
import type { PackageGridProps } from "./types.ts";

const mockRegistry: PackageGridProps["packages"] = {
	"github-client": {
		slug: "github-client",
		package: "@theholocron/github-client",
		docsUrl: "https://docs.theholocron.dev/clients/github",
		npmUrl: "https://www.npmjs.com/package/@theholocron/github-client",
		githubUrl: "https://github.com/theholocron/clients",
	},
	"sentry-client": {
		slug: "sentry-client",
		package: "@theholocron/sentry-client",
		docsUrl: "https://docs.theholocron.dev/clients/sentry",
		npmUrl: "https://www.npmjs.com/package/@theholocron/sentry-client",
		githubUrl: "https://github.com/theholocron/clients",
	},
};

describe("PackageGrid", () => {
	it("renders a row for each entry", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageGrid, {
			props: { packages: mockRegistry },
		});
		expect(html).toContain("@theholocron/github-client");
		expect(html).toContain("@theholocron/sentry-client");
	});

	it("shows Package column header by default", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageGrid, {
			props: { packages: mockRegistry },
		});
		expect(html).toContain("<th>Package</th>");
	});

	it("shows Plugin column header when type is plugins", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageGrid, {
			props: { packages: mockRegistry, type: "plugins" },
		});
		expect(html).toContain("<th>Plugin</th>");
	});

	it("renders docs and npm links for each entry", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(PackageGrid, {
			props: { packages: mockRegistry },
		});
		expect(html).toContain("https://docs.theholocron.dev/clients/github");
		expect(html).toContain("https://www.npmjs.com/package/@theholocron/github-client");
	});
});
