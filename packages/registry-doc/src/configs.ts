import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

const github = `${GITHUB_BASE}/configs`;

function makeConfigEntry(slug: string, docsPath: string): LinkEntry {
	const pkg = `${SCOPE}/${slug}`;
	return {
		slug,
		package: pkg,
		docsUrl: `${DOCS_BASE}/configs/${docsPath}`,
		npmUrl: `${NPM_BASE}/${pkg}`,
		githubUrl: github,
	};
}

export const configs: LinksRegistry = {
	"astro-config": makeConfigEntry("astro-config", "astro"),
	"browserslist-config": makeConfigEntry("browserslist-config", "browserslist"),
	"commitlint-config": makeConfigEntry("commitlint-config", "commitlint"),
	"devmoji-config": makeConfigEntry("devmoji-config", "devmoji"),
	"eslint-config": makeConfigEntry("eslint-config", "eslint"),
	"holocron-config": makeConfigEntry("holocron-config", "holocron"),
	"lighthouse-config": makeConfigEntry("lighthouse-config", "lighthouse"),
	"lint-staged-config": makeConfigEntry("lint-staged-config", "lint-staged"),
	"prettier-config": makeConfigEntry("prettier-config", "prettier"),
	"semantic-release-config": makeConfigEntry("semantic-release-config", "semantic-release"),
	"storybook-config": makeConfigEntry("storybook-config", "storybook"),
	"stylelint-config": makeConfigEntry("stylelint-config", "stylelint"),
	tsconfig: makeConfigEntry("tsconfig", "tsconfig"),
	"tsdown-config": makeConfigEntry("tsdown-config", "tsdown"),
	"vite-config": makeConfigEntry("vite-config", "vite"),
	"vitest-config": makeConfigEntry("vitest-config", "vitest"),
};
