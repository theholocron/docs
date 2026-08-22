import { describe, expect, it } from "vitest";

import { CapabilitiesTable, Installation, PackageGrid, PackageHeader, PluginHeader } from "./index.js";

describe("components-doc", () => {
	it("exports PackageHeader", () => {
		expect(PackageHeader).toBeDefined();
	});

	it("exports PluginHeader", () => {
		expect(PluginHeader).toBeDefined();
	});

	it("exports Installation", () => {
		expect(Installation).toBeDefined();
	});

	it("exports CapabilitiesTable", () => {
		expect(CapabilitiesTable).toBeDefined();
	});

	it("exports PackageGrid", () => {
		expect(PackageGrid).toBeDefined();
	});
});
