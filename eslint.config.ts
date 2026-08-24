import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { library } from "@theholocron/eslint-config/bundles/library";
import type { Linter } from "eslint";

const config: Linter.Config[] = [
	...library(),
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
			},
		},
	},
	{ ignores: ["docs/**", "**/dist/**", "**/coverage/**"] },
	// Root package.json is a private workspace root, not a published library.
	// sort-package-json (pre-commit) and the library bundle's sort-properties rule
	// use different canonical field orderings; suppress the rule here.
	{
		files: ["package.json"],
		rules: { "package-json/sort-properties": "off" },
	},
];

export default config;
