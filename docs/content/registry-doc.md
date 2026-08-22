---
title: registry-doc
description: Cross-repo package registry and link utilities for docs.
---

`@theholocron/registry-doc` is the single source of truth for package names, docs URLs, npm links, and GitHub URLs across all Holocron repos. Every docs site imports from here so cross-repo links never go stale.

## Installation

```bash
pnpm add @theholocron/registry-doc
```

## Registries

The package exports one getter per repo, plus a combined registry:

| Getter           | Packages                                     |
| ---------------- | -------------------------------------------- |
| `getClients()`   | 15 HTTP clients (`theholocron/clients`)      |
| `getCli()`       | `@theholocron/cli`                           |
| `getPlugins()`   | 13 Holocron plugins                          |
| `getHolocron()`  | cli + plugins combined                       |
| `getConfigs()`   | 16 shareable configs (`theholocron/configs`) |
| `getUtils()`     | 8 utility packages (`theholocron/utils`)     |
| `getThemes()`    | `@theholocron/docs-theme`                    |
| `getDocs()`      | `@theholocron/registry-doc`                  |
| `getSkills()`    | `@theholocron/skills`                        |
| `getTemplates()` | 6 project templates                          |
| `getRegistry()`  | All 62 entries merged                        |

## Usage

```ts
import { getClients, getPlugins, getRegistry, getPackage } from "@theholocron/registry-doc";

// All clients
const clients = getClients();
const entry = clients["github-client"];
// { slug, package, docsUrl, npmUrl, githubUrl }

// Look up any entry by slug
const client = getPackage("sentry-client");

// Org-level constants
import { getOrg, getScope, getDocsBaseUrl } from "@theholocron/registry-doc";
getOrg(); // "theholocron"
getScope(); // "@theholocron"
getDocsBaseUrl(); // "https://docs.theholocron.dev"
```

## In MDX pages

Pair with `@theholocron/components-doc` to render package headers, installation blocks, and package grids directly from registry data:

```mdx
import { PackageHeader, PackageGrid } from "@theholocron/components-doc";
import { getClients } from "@theholocron/registry-doc";

export const entry = getClients()["github-client"];

<PackageHeader entry={entry} description="TypeScript client for the GitHub REST API." />

<PackageGrid packages={getClients()} />
```

## Validation

Use `validateRegistry` in CI to catch registry entries that are missing or no longer published:

```ts
import { validateRegistry } from "@theholocron/registry-doc/validate";
import { getClients } from "@theholocron/registry-doc";

const result = validateRegistry(getClients(), ["@theholocron/github-client"]);
if (!result.valid) {
  console.error("Missing:", result.missing);
  console.error("Extra:", result.extra);
}
```
