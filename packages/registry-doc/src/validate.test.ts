import { describe, expect, it } from "vitest";

import { validateRegistry } from "./validate.js";

const mockRegistry = {
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

describe("validateRegistry", () => {
	it("returns valid when registry and workspace match", () => {
		const result = validateRegistry(mockRegistry, [
			"@theholocron/github-client",
			"@theholocron/sentry-client",
		]);
		expect(result.valid).toBe(true);
		expect(result.missing).toHaveLength(0);
		expect(result.extra).toHaveLength(0);
	});

	it("reports missing when workspace has package absent from registry", () => {
		const result = validateRegistry(mockRegistry, [
			"@theholocron/github-client",
			"@theholocron/sentry-client",
			"@theholocron/posthog-client",
		]);
		expect(result.valid).toBe(false);
		expect(result.missing).toStrictEqual(["@theholocron/posthog-client"]);
		expect(result.extra).toHaveLength(0);
	});

	it("reports extra when registry has entry absent from workspace", () => {
		const result = validateRegistry(mockRegistry, ["@theholocron/github-client"]);
		expect(result.valid).toBe(false);
		expect(result.missing).toHaveLength(0);
		expect(result.extra).toStrictEqual(["@theholocron/sentry-client"]);
	});

	it("handles an empty registry against an empty workspace", () => {
		const result = validateRegistry({}, []);
		expect(result.valid).toBe(true);
	});
});
