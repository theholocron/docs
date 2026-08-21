import { library } from "@theholocron/eslint-config/bundles/library";
import type { Linter } from "eslint";

const config: Linter.Config[] = [
	...library(),
	{
		rules: {
			// src/ compiles to dist/ via tsdown; files[] lists dist/ so every
			// relative src/ import is flagged as unpublished. False positive
			// for the TypeScript src→dist build model.
			"n/no-unpublished-import": "off",
		},
	},
	{ ignores: ["docs/**", "**/dist/**", "**/coverage/**"] },
];

export default config;
