import { describe, expect, it } from "vitest";

import { CapabilitiesTable, Installation, PackageGrid, PackageHeader, PluginHeader, RelatedProjects } from "./index.js";

describe("barrel exports", () => {
	it("exports all six components as functions", () => {
		expect(typeof CapabilitiesTable).toBe("function");
		expect(typeof Installation).toBe("function");
		expect(typeof PackageGrid).toBe("function");
		expect(typeof PackageHeader).toBe("function");
		expect(typeof PluginHeader).toBe("function");
		expect(typeof RelatedProjects).toBe("function");
	});
});
