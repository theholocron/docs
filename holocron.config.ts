import { defineConfig } from "@theholocron/cli";
import { node } from "@theholocron/holocron-config";

const { repo, workflows, providers } = node();
export default defineConfig({
	description: "Documentation infrastructure.",
	homepage: "https://docs.theholocron.dev/docs/",
	repo: {
		name: "theholocron/docs",
		teams: [{ slug: "gatekeepers", permission: "maintain" }],
		topics: ["astro", "documentation", "registry", "starlight", "typescript"],
		...repo,
		protection: "strict",
		requiredChecks: [
			"audit / Knip",
			"audit / Audit the bundle size",
			"codecov/patch",
			"codecov/patch/registry-doc",
			"codecov/project",
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
		{ name: "release", with: { "run-build": true } },
		"sync",
		"post-release",
		{ name: "deploy", with: { docs: true } },
	],
	providers: {
		...providers,
		secrets: "github",
	},
	docs: { build: "workflow", https: true },
	agent: "claude",
	skills: ["git-safety", "pr-workflow", "commit-standards", "security-review"],
});
