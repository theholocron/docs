---
title: Overview
description: Documentation infrastructure for the Holocron ecosystem.
---

`theholocron/docs` is the home for shared documentation tooling across all Holocron repos.

## Packages

| Package                                          | Description                                                          |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| [`@theholocron/components-doc`](/components-doc) | Astro components for docs sites — headers, install blocks, sandboxes |
| [`@theholocron/registry-doc`](/registry-doc)     | Cross-repo package registry and link utilities                       |

## How it fits together

`@theholocron/registry-doc` is the single source of truth for every package name, docs URL, npm link, and GitHub URL in the org. `@theholocron/components-doc` consumes that data to render consistent headers, installation blocks, capability tables, and interactive sandboxes across every docs site.

Every `theholocron` docs site (clients, holocron, utils) imports from these packages so cross-repo links never go stale and page layouts stay consistent without per-repo maintenance.

## Development

```bash
pnpm install       # install all deps
pnpm build         # build all packages via Turborepo
pnpm test          # run tests across all packages
pnpm typecheck     # tsc --noEmit in each package
pnpm lint          # ESLint across all packages
```

To work on a single package:

```bash
pnpm --filter registry-doc build
pnpm --filter registry-doc test
```
