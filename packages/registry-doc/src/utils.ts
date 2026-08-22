import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

const github = `${GITHUB_BASE}/utils`;

function makeUtilEntry(slug: string, docsPath: string): LinkEntry {
	const pkg = `${SCOPE}/${slug}`;
	return {
		slug,
		package: pkg,
		docsUrl: `${DOCS_BASE}/utils/${docsPath}`,
		npmUrl: `${NPM_BASE}/${pkg}`,
		githubUrl: github,
	};
}

export const utils: LinksRegistry = {
	"array-utils": makeUtilEntry("array-utils", "array"),
	"date-time-utils": makeUtilEntry("date-time-utils", "date-time"),
	"env-utils": makeUtilEntry("env-utils", "env"),
	"location-utils": makeUtilEntry("location-utils", "location"),
	"misc-utils": makeUtilEntry("misc-utils", "misc"),
	"storage-utils": makeUtilEntry("storage-utils", "storage"),
	"string-utils": makeUtilEntry("string-utils", "string"),
	"uri-utils": makeUtilEntry("uri-utils", "uri"),
};
