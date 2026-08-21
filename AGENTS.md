# theholocron/docs — agent operating contract

`CLAUDE.md` is a symlink to this file, so Claude, Codex, and every other agent
read the same rules. Put durable, repo-wide agent guidance here.

@../github-private/AGENTS.md

## What this repo is

Documentation infrastructure for the Holocron ecosystem. Packages published
here are consumed by all other `theholocron` repos to build their docs sites.

## Architecture

- pnpm workspace monorepo with Turborepo for task orchestration.
- Each package under `packages/` is an independently published npm package
  with a `-doc` suffix (singular): `registry-doc`, `components-doc`, etc.
- All packages compile TypeScript source (`src/`) to `dist/` via tsdown.
- Packages are versioned in lockstep via semantic-release (`release.config.ts`).

## Packages

| Package                     | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `@theholocron/registry-doc` | Cross-repo package registry and link utilities |

## Adding a new package

Use the `-doc` suffix (singular). When adding a new package:

1. Scaffold under `packages/<name>-doc/`
2. Add to `codecov.yml` under `component_management.individual_components`
3. Add `codecov/patch/<name>-doc` to `requiredChecks` in `holocron.config.ts`

## Updating the registry

When a new client or plugin ships in another repo, add an entry to
`packages/registry-doc/src/clients.ts` or `src/plugins.ts` in this repo.
This is the single source of truth for all cross-repo package links.

## Quality

- `pnpm build` — tsdown across all packages via Turbo
- `pnpm test` — vitest across all packages via Turbo
- `pnpm typecheck` — `tsc --noEmit` in each package via Turbo
- `pnpm lint` — ESLint via Turbo
