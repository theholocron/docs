import { describe, expect, it } from "vitest";

import * as components from "./index.js";

describe("components-doc", () => {
	it("exports a module", () => {
		expect(components).toBeDefined();
	});
});
