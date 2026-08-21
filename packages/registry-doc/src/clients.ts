import { DOCS_BASE, GITHUB_BASE, NPM_BASE, SCOPE } from "./constants.js";
import type { LinkEntry, LinksRegistry } from "./types.js";

const github = `${GITHUB_BASE}/clients`;

function c(slug: string, docsPath: string, sandboxUrl?: string): LinkEntry {
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
	"clerk-client": c("clerk-client", "clerk"),
	"cloudflare-client": c("cloudflare-client", "cloudflare"),
	"confluence-client": c("confluence-client", "confluence"),
	"doppler-client": c("doppler-client", "doppler"),
	"github-client": c("github-client", "github"),
	"google-client": c("google-client", "google"),
	"http-client": c("http-client", "http"),
	"infisical-client": c("infisical-client", "infisical"),
	"jira-client": c("jira-client", "jira"),
	"neon-client": c("neon-client", "neon"),
	"posthog-client": c("posthog-client", "posthog"),
	"postman-client": c("postman-client", "postman"),
	"sentry-client": c("sentry-client", "sentry"),
	"vercel-client": c("vercel-client", "vercel"),
	"zendesk-client": c("zendesk-client", "zendesk"),
};
