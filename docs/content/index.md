---
title: Overview
description: A modern NodeJS template for monorepos with pre-configured tools, best practices, and CI/CD setup for rapid project development.
---

A pnpm workspace monorepo template for `@theholocron` projects that need multiple packages published in lockstep.

## Structure

```
packages/
  package-a/    Example library package (TypeScript, tsdown, Vitest)
```

Add new packages under `packages/` — Turborepo handles build ordering and caching across the workspace.

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

## Getting started

Use the [Holocron CLI](https://github.com/theholocron/holocron) to scaffold a new monorepo from this template:

```bash
npx @theholocron/cli new monorepo my-monorepo \
  --description "My monorepo description" \
  --homepage "https://my-monorepo.example.com" \
  --vault doppler \
  --agent claude
```

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
pnpm --filter package-a build
pnpm --filter package-a test
```
