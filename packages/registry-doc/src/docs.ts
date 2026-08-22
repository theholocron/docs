import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

const github = `${GITHUB_BASE}/docs`;

function makeDocsEntry(slug: string, docsPath: string): LinkEntry {
	const pkg = `${SCOPE}/${slug}`;
	return {
		slug,
		package: pkg,
		docsUrl: `${DOCS_BASE}/docs/${docsPath}`,
		npmUrl: `${NPM_BASE}/${pkg}`,
		githubUrl: github,
	};
}

export const docs: LinksRegistry = {
	"registry-doc": makeDocsEntry("registry-doc", "registry-doc"),
};
