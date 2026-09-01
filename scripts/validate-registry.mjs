#!/usr/bin/env node
/**
 * Validates internal consistency of @theholocron/registry-doc.
 *
 * Checks:
 * 1. No duplicate package names across getters
 * 2. All required fields present on every entry
 * 3. No entry has an empty slug, package, docsUrl, npmUrl, or githubUrl
 *
 * Usage: node scripts/validate-registry.mjs
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const pkgPath = join(root, "packages/registry-doc/dist/index.mjs");

// Build registry-doc if dist is missing (fresh CI checkout has no dist/).
if (!existsSync(pkgPath)) {
	execFileSync("pnpm", ["--filter", "@theholocron/registry-doc", "build"], {
		cwd: root,
		stdio: "inherit",
	});
}

const { getRegistry } = await import(pkgPath);

const REQUIRED_FIELDS = ["slug", "package", "docsUrl", "npmUrl", "githubUrl"];

let errors = 0;
let warnings = 0;

function error(msg) {
	console.error(`  ERROR  ${msg}`);
	errors++;
}

function warn(msg) {
	console.warn(`  WARN   ${msg}`);
	warnings++;
}

const registry = getRegistry();
const entries = Object.entries(registry);

console.log(`\nValidating ${entries.length} registry entries…\n`);

// 1. Required fields
for (const [key, entry] of entries) {
	for (const field of REQUIRED_FIELDS) {
		if (!entry[field] || String(entry[field]).trim() === "") {
			error(`${key}: missing or empty field "${field}"`);
		}
	}
	// slug must match the record key
	if (entry.slug && entry.slug !== key) {
		warn(`${key}: slug "${entry.slug}" does not match key`);
	}
}

// 2. Duplicate package names
const seen = new Map();
for (const [key, entry] of entries) {
	if (!entry.package) continue;
	if (seen.has(entry.package)) {
		error(`duplicate package name "${entry.package}" — appears in both "${seen.get(entry.package)}" and "${key}"`);
	} else {
		seen.set(entry.package, key);
	}
}

console.log(`${errors} error(s), ${warnings} warning(s)`);

if (errors > 0) process.exit(1);
