import { describe, expect, it } from "vitest";

import { Sandbox } from "./index.ts";

describe("Sandbox", () => {
	it("exports as a function", () => {
		expect(typeof Sandbox).toBe("function");
	});
});
