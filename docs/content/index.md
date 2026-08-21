---
title: Overview
description: Documentation infrastructure for the Holocron ecosystem.
---

`theholocron/docs` is the home for shared documentation tooling across all Holocron repos.

## Structure

```
packages/
  registry-doc/    Cross-repo package registry and link utilities
```

Add new packages under `packages/` with the `-doc` suffix — Turborepo handles build ordering and caching across the workspace.

## What's included

- **TypeScript** across all packages with shared `@theholocron/tsconfig` presets
- **tsdown** for compiling each package's `src/` → `dist/`
- **Vitest** with coverage for all packages
- **ESLint + Prettier** via shared `@theholocron/eslint-config` and `@theholocron/prettier-config`
- **Turborepo** for task orchestration — `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck` all run across packages in dependency order
- **pnpm workspaces** with catalog pinning for consistent dependency versions
- **semantic-release** with lockstep versioning — all packages share a single version
- **Husky + lint-staged** via `@theholocron/lint-staged-config`
- Full CI/CD via reusable workflows in `theholocron/.github`

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
