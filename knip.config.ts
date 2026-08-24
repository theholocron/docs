import type { KnipConfig } from "knip";

const config: KnipConfig = {
	workspaces: {
		".": {
			// commitlint.config.ts, eslint.config.ts, prettier.config.ts auto-detected by Knip plugins
			entry: ["holocron.config.ts"],
			project: ["*.ts"],
			// astro.config.ts is the docs build config, not an Astro workspace — disable plugin
			astro: false,
		},
		docs: {
			// astro.config.ts lives at repo root, not here — set entry explicitly
			entry: ["src/content.config.ts"],
		},
		"packages/*": {
			// src/index.ts, tsdown.config.ts, vitest.config.ts auto-detected by Knip plugins
			entry: ["src/**/*.test.ts"],
			project: ["src/**/*.ts", "*.ts"],
		},
		"packages/components-doc": {
			entry: ["src/**/*.test.ts"],
			project: ["src/**/*.ts", "src/**/*.astro", "*.ts"],
		},
	},
	ignoreDependencies: [
		// passed as --config arg to lint-staged binary in .husky/pre-commit
		"@theholocron/lint-staged-config",
		// loaded at runtime by the holocron plugin system — not a static import
		"@theholocron/holocron-plugin-github",
		// skills referenced as strings in holocron.config.ts
		"@theholocron/skills",
		// config packages loaded via config file resolution — not static imports
		"@theholocron/eslint-config",
		"@theholocron/prettier-config",
		// binary tools — invoked via CLI or hooks, not module imports
		"alex",
		"prettier",
		"sort-package-json",
		// peer dep of @astrojs/starlight — required by astro check for type resolution
		"@astrojs/starlight",
		// used in docs/content/dev.mdx — Knip cannot follow imports from compiled .mdx content files
		"@theholocron/components-doc",
		"@theholocron/registry-doc",
		// peer deps of @astrojs/react — required by Astro at runtime for React hydration
		"react",
		"react-dom",
	],
	ignoreExportsUsedInFile: true,
};

export default config;
