import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

const github = `${GITHUB_BASE}/holocron`;

function makeHolocronEntry(slug: string, docsPath: string): LinkEntry {
	const pkg = `${SCOPE}/${slug}`;
	return {
		slug,
		package: pkg,
		docsUrl: `${DOCS_BASE}/holocron/${docsPath}`,
		npmUrl: `${NPM_BASE}/${pkg}`,
		githubUrl: github,
	};
}

export const cli: LinksRegistry = {
	cli: makeHolocronEntry("cli", "cli"),
};

export const plugins: LinksRegistry = {
	"holocron-plugin-1password": makeHolocronEntry("holocron-plugin-1password", "plugins/1password"),
	"holocron-plugin-clerk": makeHolocronEntry("holocron-plugin-clerk", "plugins/clerk"),
	"holocron-plugin-cloudflare": makeHolocronEntry("holocron-plugin-cloudflare", "plugins/cloudflare"),
	"holocron-plugin-discord": makeHolocronEntry("holocron-plugin-discord", "plugins/discord"),
	"holocron-plugin-doppler": makeHolocronEntry("holocron-plugin-doppler", "plugins/doppler"),
	"holocron-plugin-github": makeHolocronEntry("holocron-plugin-github", "plugins/github"),
	"holocron-plugin-infisical": makeHolocronEntry("holocron-plugin-infisical", "plugins/infisical"),
	"holocron-plugin-neon": makeHolocronEntry("holocron-plugin-neon", "plugins/neon"),
	"holocron-plugin-posthog": makeHolocronEntry("holocron-plugin-posthog", "plugins/posthog"),
	"holocron-plugin-postman": makeHolocronEntry("holocron-plugin-postman", "plugins/postman"),
	"holocron-plugin-sentry": makeHolocronEntry("holocron-plugin-sentry", "plugins/sentry"),
	"holocron-plugin-slack": makeHolocronEntry("holocron-plugin-slack", "plugins/slack"),
	"holocron-plugin-vercel": makeHolocronEntry("holocron-plugin-vercel", "plugins/vercel"),
};
