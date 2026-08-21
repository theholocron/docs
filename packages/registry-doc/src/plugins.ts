import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

const github = `${GITHUB_BASE}/holocron`;

function p(slug: string, docsPath: string): LinkEntry {
	const pkg = `${SCOPE}/${slug}`;
	return {
		slug,
		package: pkg,
		docsUrl: `${DOCS_BASE}/holocron/plugins/${docsPath}`,
		npmUrl: `${NPM_BASE}/${pkg}`,
		githubUrl: github,
	};
}

export const plugins: LinksRegistry = {
	"holocron-plugin-1password": p("holocron-plugin-1password", "1password"),
	"holocron-plugin-clerk": p("holocron-plugin-clerk", "clerk"),
	"holocron-plugin-cloudflare": p("holocron-plugin-cloudflare", "cloudflare"),
	"holocron-plugin-discord": p("holocron-plugin-discord", "discord"),
	"holocron-plugin-doppler": p("holocron-plugin-doppler", "doppler"),
	"holocron-plugin-github": p("holocron-plugin-github", "github"),
	"holocron-plugin-infisical": p("holocron-plugin-infisical", "infisical"),
	"holocron-plugin-neon": p("holocron-plugin-neon", "neon"),
	"holocron-plugin-posthog": p("holocron-plugin-posthog", "posthog"),
	"holocron-plugin-postman": p("holocron-plugin-postman", "postman"),
	"holocron-plugin-sentry": p("holocron-plugin-sentry", "sentry"),
	"holocron-plugin-slack": p("holocron-plugin-slack", "slack"),
	"holocron-plugin-vercel": p("holocron-plugin-vercel", "vercel"),
};
