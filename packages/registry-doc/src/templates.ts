import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

function makeTemplateEntry(slug: string, docsPath: string): LinkEntry {
	const pkg = `${SCOPE}/${slug}`;
	return {
		slug,
		package: pkg,
		docsUrl: `${DOCS_BASE}/templates/${docsPath}`,
		npmUrl: `${NPM_BASE}/${pkg}`,
		githubUrl: `${GITHUB_BASE}/${slug}`,
	};
}

export const templates: LinksRegistry = {
	"cli-template": makeTemplateEntry("cli-template", "cli"),
	"monorepo-react-template": makeTemplateEntry("monorepo-react-template", "monorepo-react"),
	"monorepo-template": makeTemplateEntry("monorepo-template", "monorepo"),
	"nextjs-template": makeTemplateEntry("nextjs-template", "nextjs"),
	"node-template": makeTemplateEntry("node-template", "node"),
	"react-template": makeTemplateEntry("react-template", "react"),
};
