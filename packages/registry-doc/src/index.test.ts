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

describe("getClients", () => {
	it("returns all 15 client entries", () => {
		expect(Object.keys(getClients())).toHaveLength(15);
	});

	it("derives package name from scope and slug", () => {
		expect(getClients()["github-client"]?.package).toBe("@theholocron/github-client");
	});

	it("builds npm URL from package name", () => {
		expect(getClients()["sentry-client"]?.npmUrl).toBe("https://www.npmjs.com/package/@theholocron/sentry-client");
	});

	it("sets docs URL under /clients/", () => {
		expect(getClients()["github-client"]?.docsUrl).toBe("https://docs.theholocron.dev/clients/github");
	});

	it("points githubUrl to the clients repo", () => {
		expect(getClients()["http-client"]?.githubUrl).toBe("https://github.com/theholocron/clients");
	});
});

describe("getPlugins", () => {
	it("returns all 13 plugin entries", () => {
		expect(Object.keys(getPlugins())).toHaveLength(13);
	});

	it("derives package name from scope and slug", () => {
		expect(getPlugins()["holocron-plugin-sentry"]?.package).toBe("@theholocron/holocron-plugin-sentry");
	});

	it("sets docs URL under /holocron/plugins/", () => {
		expect(getPlugins()["holocron-plugin-github"]?.docsUrl).toBe(
			"https://docs.theholocron.dev/holocron/plugins/github"
		);
	});

	it("points githubUrl to the holocron repo", () => {
		expect(getPlugins()["holocron-plugin-slack"]?.githubUrl).toBe("https://github.com/theholocron/holocron");
	});
});

describe("getRegistry", () => {
	it("merges clients and plugins", () => {
		const reg = getRegistry();
		expect(Object.keys(reg)).toHaveLength(28);
	});

	it("contains both client and plugin entries", () => {
		const reg = getRegistry();
		expect(reg["github-client"]).toBeDefined();
		expect(reg["holocron-plugin-github"]).toBeDefined();
	});
});

describe("getPackage", () => {
	it("returns an entry by slug", () => {
		expect(getPackage("sentry-client")?.package).toBe("@theholocron/sentry-client");
	});

	it("returns undefined for unknown slugs", () => {
		expect(getPackage("does-not-exist")).toBeUndefined();
	});
});
