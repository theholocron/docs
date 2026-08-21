import { describe, expect, test } from "vitest";

import { add } from "./add.js";

describe("add", () => {
	test("returns the sum of two positive numbers", () => {
		expect(add(1, 2)).toBe(3);
	});

	test("returns the sum when left operand is negative", () => {
		expect(add(-2, 3)).toBe(1);
	});

	test("returns the sum of two negative numbers", () => {
		expect(add(-2, -3)).toBe(-5);
	});

	test("handles zero as left operand", () => {
		expect(add(0, 5)).toBe(5);
	});

	test("handles zero as right operand", () => {
		expect(add(5, 0)).toBe(5);
	});

	test("handles both operands as zero", () => {
		expect(add(0, 0)).toBe(0);
	});

	test("handles large numbers", () => {
		expect(add(1_000_000, 2_000_000)).toBe(3_000_000);
	});

	test("handles floating point numbers", () => {
		expect(add(0.1, 0.2)).toBeCloseTo(0.3);
	});
});
