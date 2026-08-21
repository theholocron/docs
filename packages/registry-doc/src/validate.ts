import type { LinksRegistry } from "./index.js";

export interface ValidationResult {
	valid: boolean;
	missing: string[];
	extra: string[];
}

export function validateRegistry(registry: LinksRegistry, workspacePackages: string[]): ValidationResult {
	const registered = new Set(Object.values(registry).map((e) => e.package));
	const workspace = new Set(workspacePackages);
	const missing = workspacePackages.filter((p) => !registered.has(p));
	const extra = [...registered].filter((p) => !workspace.has(p));
	return { valid: missing.length === 0 && extra.length === 0, missing, extra };
}
