import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import CapabilitiesTable from "./capabilities-table.astro";

describe("CapabilitiesTable", () => {
	it("renders the Capabilities heading", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(CapabilitiesTable, {
			props: { rows: [] },
		});
		expect(html).toContain("<h2>Capabilities</h2>");
	});

	it("renders a row for each capability", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(CapabilitiesTable, {
			props: {
				rows: [
					{ capability: "observability", token: "SENTRY_TOKEN" },
					{ capability: "secrets", token: "DOPPLER_TOKEN" },
				],
			},
		});
		expect(html).toContain("observability");
		expect(html).toContain("SENTRY_TOKEN");
		expect(html).toContain("secrets");
		expect(html).toContain("DOPPLER_TOKEN");
	});

	it("wraps capability and token in code elements", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(CapabilitiesTable, {
			props: { rows: [{ capability: "dns", token: "CF_TOKEN" }] },
		});
		expect(html).toMatch(/<code>dns<\/code>/);
		expect(html).toMatch(/<code>CF_TOKEN<\/code>/);
	});

	it("renders an empty table body when rows is empty", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(CapabilitiesTable, {
			props: { rows: [] },
		});
		expect(html).toContain("<tbody>");
		expect(html).not.toContain("<td>");
	});
});
