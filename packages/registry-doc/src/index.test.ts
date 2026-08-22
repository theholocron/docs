import { describe, expect, it } from "vitest";

import {
	getCli,
	getClients,
	getConfigs,
	getDocs,
	getDocsBaseUrl,
	getGitHubBaseUrl,
	getHolocron,
	getOrg,
	getPackage,
	getPlugins,
	getRegistry,
	getScope,
	getSkills,
	getTemplates,
	getThemes,
	getUtils,
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

describe("getCli", () => {
	it("returns 1 cli entry", () => {
		expect(Object.keys(getCli())).toHaveLength(1);
	});

	it("derives package name from scope", () => {
		expect(getCli()["cli"]?.package).toBe("@theholocron/cli");
	});

	it("sets docs URL under /holocron/cli", () => {
		expect(getCli()["cli"]?.docsUrl).toBe("https://docs.theholocron.dev/holocron/cli");
	});

	it("points githubUrl to the holocron repo", () => {
		expect(getCli()["cli"]?.githubUrl).toBe("https://github.com/theholocron/holocron");
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

describe("getHolocron", () => {
	it("merges cli and plugins into 14 entries", () => {
		expect(Object.keys(getHolocron())).toHaveLength(14);
	});

	it("contains both cli and plugin entries", () => {
		const h = getHolocron();
		expect(h["cli"]).toBeDefined();
		expect(h["holocron-plugin-github"]).toBeDefined();
	});
});

describe("getConfigs", () => {
	it("returns all 16 config entries", () => {
		expect(Object.keys(getConfigs())).toHaveLength(16);
	});

	it("derives package name from scope and slug", () => {
		expect(getConfigs()["eslint-config"]?.package).toBe("@theholocron/eslint-config");
	});

	it("sets docs URL under /configs/", () => {
		expect(getConfigs()["prettier-config"]?.docsUrl).toBe("https://docs.theholocron.dev/configs/prettier");
	});

	it("points githubUrl to the configs repo", () => {
		expect(getConfigs()["tsconfig"]?.githubUrl).toBe("https://github.com/theholocron/configs");
	});
});

describe("getUtils", () => {
	it("returns all 8 util entries", () => {
		expect(Object.keys(getUtils())).toHaveLength(8);
	});

	it("derives package name from scope and slug", () => {
		expect(getUtils()["string-utils"]?.package).toBe("@theholocron/string-utils");
	});

	it("sets docs URL under /utils/", () => {
		expect(getUtils()["array-utils"]?.docsUrl).toBe("https://docs.theholocron.dev/utils/array");
	});

	it("points githubUrl to the utils repo", () => {
		expect(getUtils()["env-utils"]?.githubUrl).toBe("https://github.com/theholocron/utils");
	});
});

describe("getThemes", () => {
	it("returns 1 theme entry", () => {
		expect(Object.keys(getThemes())).toHaveLength(1);
	});

	it("derives package name from scope and slug", () => {
		expect(getThemes()["docs-theme"]?.package).toBe("@theholocron/docs-theme");
	});

	it("sets docs URL under /themes/", () => {
		expect(getThemes()["docs-theme"]?.docsUrl).toBe("https://docs.theholocron.dev/themes/docs");
	});
});

describe("getDocs", () => {
	it("returns 2 docs entries", () => {
		expect(Object.keys(getDocs())).toHaveLength(2);
	});

	it("derives package name from scope and slug", () => {
		expect(getDocs()["registry-doc"]?.package).toBe("@theholocron/registry-doc");
	});

	it("sets docs URL under /docs/", () => {
		expect(getDocs()["registry-doc"]?.docsUrl).toBe("https://docs.theholocron.dev/docs/registry-doc");
	});
});

describe("getSkills", () => {
	it("returns 1 skills entry", () => {
		expect(Object.keys(getSkills())).toHaveLength(1);
	});

	it("derives package name from scope", () => {
		expect(getSkills()["skills"]?.package).toBe("@theholocron/skills");
	});

	it("points githubUrl to the skills repo", () => {
		expect(getSkills()["skills"]?.githubUrl).toBe("https://github.com/theholocron/skills");
	});
});

describe("getTemplates", () => {
	it("returns all 6 template entries", () => {
		expect(Object.keys(getTemplates())).toHaveLength(6);
	});

	it("derives package name from scope and slug", () => {
		expect(getTemplates()["nextjs-template"]?.package).toBe("@theholocron/nextjs-template");
	});

	it("sets docs URL under /templates/", () => {
		expect(getTemplates()["react-template"]?.docsUrl).toBe("https://docs.theholocron.dev/templates/react");
	});

	it("points githubUrl to each template's own repo", () => {
		expect(getTemplates()["cli-template"]?.githubUrl).toBe("https://github.com/theholocron/cli-template");
	});
});

describe("getRegistry", () => {
	it("merges all registries into 63 entries", () => {
		const reg = getRegistry();
		expect(Object.keys(reg)).toHaveLength(63);
	});

	it("contains entries from every registry", () => {
		const reg = getRegistry();
		expect(reg["github-client"]).toBeDefined();
		expect(reg["cli"]).toBeDefined();
		expect(reg["holocron-plugin-github"]).toBeDefined();
		expect(reg["eslint-config"]).toBeDefined();
		expect(reg["string-utils"]).toBeDefined();
		expect(reg["docs-theme"]).toBeDefined();
		expect(reg["registry-doc"]).toBeDefined();
		expect(reg["skills"]).toBeDefined();
		expect(reg["nextjs-template"]).toBeDefined();
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
