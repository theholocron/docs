import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

const github = `${GITHUB_BASE}/clients`;

function makeClientEntry(slug: string, docsPath: string, sandboxUrl?: string): LinkEntry {
	const pkg = `${SCOPE}/${slug}`;
	return {
		slug,
		package: pkg,
		docsUrl: `${DOCS_BASE}/clients/${docsPath}`,
		npmUrl: `${NPM_BASE}/${pkg}`,
		githubUrl: github,
		sandboxUrl,
	};
}

export const clients: LinksRegistry = {
	"clerk-client": makeClientEntry("clerk-client", "clerk"),
	"cloudflare-client": makeClientEntry("cloudflare-client", "cloudflare"),
	"confluence-client": makeClientEntry("confluence-client", "confluence"),
	"doppler-client": makeClientEntry("doppler-client", "doppler"),
	"github-client": makeClientEntry("github-client", "github"),
	"google-client": makeClientEntry("google-client", "google"),
	"http-client": makeClientEntry("http-client", "http"),
	"infisical-client": makeClientEntry("infisical-client", "infisical"),
	"jira-client": makeClientEntry("jira-client", "jira"),
	"neon-client": makeClientEntry("neon-client", "neon"),
	"posthog-client": makeClientEntry("posthog-client", "posthog"),
	"postman-client": makeClientEntry("postman-client", "postman"),
	"sentry-client": makeClientEntry("sentry-client", "sentry"),
	"vercel-client": makeClientEntry("vercel-client", "vercel"),
	"zendesk-client": makeClientEntry("zendesk-client", "zendesk"),
};
