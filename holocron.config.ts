import { defineConfig } from "@theholocron/cli";
import { nodeDocs } from "@theholocron/holocron-config";

const preset = nodeDocs();

export default defineConfig({
	...preset,
	description: "Documentation infrastructure.",
	homepage: "https://docs.theholocron.dev/docs/",
	repo: {
		...preset.repo,
		name: "theholocron/docs",
		teams: [{ slug: "gatekeepers", permission: "maintain" }],
		topics: ["astro", "documentation", "registry", "starlight", "typescript"],
		properties: {
			...preset.repo?.properties,
			runtime_environment: "node",
			open_source: true,
			uses_external_packages: false,
		},
	},
	tasks: [
		...(preset.tasks ?? []),
		{ name: "audit", required: true, with: { "run-knip": true } },
		{ name: "release", with: { "run-build": true, "post-release": true } },
		"sync",
	],
	extraRequiredChecks: [...(preset.extraRequiredChecks ?? []), "codecov/patch/registry-doc"],
	providers: { ...preset.providers, secrets: "github" },
	agent: "claude",
	skills: ["git-safety", "pr-workflow", "commit-standards", "security-review"],
});
