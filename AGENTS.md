# theholocron/monorepo-template — agent operating contract

`CLAUDE.md` is a symlink to this file, so Claude, Codex, and every other agent
read the same rules. Put durable, repo-wide agent guidance here.

@../github-private/AGENTS.md

## What this repo is

<description>

## Architecture

- pnpm workspace monorepo with Turborepo for task orchestration.
- Each package under `packages/` is an independently published npm package.
- All packages compile TypeScript source (`src/`) to `dist/` via tsdown.
- Packages are versioned in lockstep via semantic-release (`release.config.ts`).

## Packages

| Package                  | Description |
| ------------------------ | ----------- |
| `@theholocron/package-a` | —           |

## Quality

- `pnpm build` — tsdown across all packages via Turbo
- `pnpm test` — vitest across all packages via Turbo
- `pnpm typecheck` — `tsc --noEmit` in each package via Turbo
- `pnpm lint` — ESLint via Turbo
