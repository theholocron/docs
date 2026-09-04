import { defineConfig } from "@theholocron/cli";
import { nodeDocs } from "@theholocron/holocron-config";

const { repo, workflows, providers, org, domain, docs } = nodeDocs();
export default defineConfig({
	description: "Documentation infrastructure.",
	homepage: "https://docs.theholocron.dev/docs/",
	org,
	domain,
	docs,
	repo: {
		name: "theholocron/docs",
		teams: [{ slug: "gatekeepers", permission: "maintain" }],
		topics: ["astro", "documentation", "registry", "starlight", "typescript"],
		...repo,
		requiredChecks: [
			...repo.requiredChecks,
			"audit / Knip",
			"audit / Audit the bundle size",
			"codecov/patch/registry-doc",
		],
		properties: {
			...repo.properties,
			runtime_environment: "node",
			open_source: true,
			uses_external_packages: false,
		},
	},
	workflows: [
		...workflows,
		{ name: "audit", with: { "run-knip": true } },
		{ name: "release", with: { "run-build": true, "post-release": true } },
		"sync",
	],
	providers: { ...providers, secrets: "github" },
	agent: "claude",
	skills: ["git-safety", "pr-workflow", "commit-standards", "security-review"],
});
