import { describe, expect, it } from "vitest";

import {
	getClients,
	getDocsBaseUrl,
	getGitHubBaseUrl,
	getOrg,
	getPackage,
	getPlugins,
	getRegistry,
	getScope,
} from "./index.js";

describe("getOrg", () => {
	it("returns the org name", () => {
		expect(getOrg()).toBe("theholocron");
	});
});

describe("getScope", () => {
	it("returns the npm scope", () => {
		expect(getScope()).toBe("@theholocron");
	});
});

describe("getDocsBaseUrl", () => {
	it("returns the default docs base URL", () => {
		expect(getDocsBaseUrl()).toBe("https://docs.theholocron.dev");
	});
});

describe("getGitHubBaseUrl", () => {
	it("returns the GitHub org URL", () => {
		expect(getGitHubBaseUrl()).toBe("https://github.com/theholocron");
	});
});

describe("getRegistry", () => {
	it("returns an empty object before registries are populated", () => {
		expect(getRegistry()).toStrictEqual({});
	});
});

describe("getClients", () => {
	it("returns an empty object before clients are populated", () => {
		expect(getClients()).toStrictEqual({});
	});
});

describe("getPlugins", () => {
	it("returns an empty object before plugins are populated", () => {
		expect(getPlugins()).toStrictEqual({});
	});
});

describe("getPackage", () => {
	it("returns undefined for unknown slugs", () => {
		expect(getPackage("unknown")).toBeUndefined();
	});
});
