import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

const github = `${GITHUB_BASE}/themes`;

function makeThemeEntry(slug: string, docsPath: string): LinkEntry {
	const pkg = `${SCOPE}/${slug}`;
	return {
		slug,
		package: pkg,
		docsUrl: `${DOCS_BASE}/themes/${docsPath}`,
		npmUrl: `${NPM_BASE}/${pkg}`,
		githubUrl: github,
	};
}

export const themes: LinksRegistry = {
	"docs-theme": makeThemeEntry("docs-theme", "docs"),
};
