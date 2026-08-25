# Note 5 — `holocron sync` umbrella + CI auto-sync

## Problem

The CLI has grown several independent sync commands that each need to be run manually:

| Command                 | What it syncs                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `holocron sync`         | GitHub metadata — labels, properties, teams, topics, keywords, description, homepage |
| `holocron sync-readme`  | README marker blocks + `docs/index.mdx` description frontmatter                      |
| `holocron sync-github`  | Workflow templates → `theholocron/.github` (internal, run from `holocron` repo)      |
| `holocron secrets sync` | Secrets → provider (Doppler, 1Password, etc.)                                        |

There's no single command that says "bring this repo up to date with its config" and no automation to trigger these when the underlying data changes.

## Goal

1. **`holocron sync` becomes the umbrella** — runs all applicable sync operations for the current repo in sequence, the same way `holocron setup` runs all setup steps.
2. **A CI workflow** triggers `holocron sync` (or specific sub-commands) when the files that drive sync output change, and auto-commits or opens a PR with the results.

---

## 5.1 — Extend `holocron sync` to call `sync-readme`

**Repo:** `holocron`

The current `sync` command runs GitHub metadata steps (labels, properties, topics, etc.). Add `readme` as a new step that delegates to `runSyncReadme`.

### Steps

```
sync
 ├── labels
 ├── properties
 ├── teams
 ├── topics
 ├── keywords
 ├── description
 ├── homepage
 └── readme          ← new
```

`readme` follows the same `--steps` filtering pattern: `holocron sync readme` runs only the readme step, `holocron sync` runs everything.

The `readme` step is local-only (no provider token needed) — same as `keywords`/`description`.

### Open question

Should `sync-readme` remain as a standalone command (for direct invocation) and also be callable as a step inside `sync`? **Yes** — keep `sync-readme` as a direct command; `sync readme` just delegates to the same `runSyncReadme` function.

---

## 5.2 — Identify all potential sync sub-commands

What else should `sync` coordinate? Candidates:

| Step          | Source of truth                                      | Output                                              | Notes                                            |
| ------------- | ---------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------ |
| `labels`      | `holocron.config.ts`                                 | GitHub labels                                       | ✅ existing                                      |
| `properties`  | `holocron.config.ts`                                 | GitHub repo properties                              | ✅ existing                                      |
| `teams`       | `holocron.config.ts`                                 | GitHub team permissions                             | ✅ existing                                      |
| `topics`      | `holocron.config.ts`                                 | GitHub repo topics                                  | ✅ existing                                      |
| `keywords`    | `holocron.config.ts` keywords                        | `package.json keywords`                             | ✅ existing                                      |
| `description` | `holocron.config.ts` description                     | `package.json description`                          | ✅ existing                                      |
| `homepage`    | `holocron.config.ts` homepage                        | `package.json homepage`                             | ✅ existing                                      |
| `readme`      | `holocron.config.ts` + `package.json` + registry-doc | `README.md` marker blocks + `index.mdx` description | 🆕 5.1                                           |
| `workflows`   | `holocron.config.ts` workflows array                 | `.github/workflows/*.yml` thin callers              | future — currently sync-workflow-templates in CI |

---

## 5.3 — CI workflow: auto-run `sync` on file changes

**Repo:** `theholocron/.github` (shared reusable workflow) + thin callers in each repo

### Trigger files

| Change                                      | Sync steps to run                     |
| ------------------------------------------- | ------------------------------------- |
| `holocron.config.ts`                        | all steps                             |
| `package.json` (scripts section)            | `readme`                              |
| `pnpm-workspace.yaml` (catalog versions)    | `readme`                              |
| `docs/packages/registry-doc/src/**` release | `readme` (across all consuming repos) |

### Workflow design

```yaml
# .github/workflows/sync.yml (reusable, lives in theholocron/.github)
on:
  workflow_call:
    inputs:
      steps:
        description: "Sync steps to run (default: all)"
        required: false
        type: string

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@...
      - uses: pnpm/action-setup@...
      - run: pnpm exec holocron sync ${{ inputs.steps && format('--steps {0}', inputs.steps) || '' }}
        env:
          HOLOCRON_SYNC_TOKEN: ${{ secrets.HOLOCRON_SYNC_TOKEN }}
      - uses: peter-evans/create-pull-request@...
        with:
          title: "chore: sync README and repo metadata"
          branch: chore/auto-sync
          commit-message: "chore: 🔄 sync from holocron.config"
```

Thin caller in each repo:

```yaml
# .github/workflows/sync-on-change.yml
on:
  push:
    branches: [main]
    paths:
      - holocron.config.ts
      - package.json
      - pnpm-workspace.yaml

jobs:
  sync:
    uses: theholocron/.github/.github/workflows/sync.yml@main
    secrets: inherit
```

### PR vs direct commit

- **PR** (default) — safer; allows review before merging auto-generated changes.
- **Direct commit** — opt-in via `with: { direct-commit: true }` for repos with relaxed branch protection.

### registry-doc release trigger

When `docs` releases a new version of `registry-doc`, packages tables in all consuming repo READMEs may be stale. Options:

- **A.** `registry-doc` publish triggers a `workflow_dispatch` across all consuming repos.
- **B.** Each repo's thin caller also watches for Dependabot PRs that bump `registry-doc` — runs sync on merge.
- **C.** Manual — operators run `holocron sync readme` after a registry-doc release.

Start with **C** (simplest), plan for **B**.

---

## Tickets

| #   | Repo                  | Work                                                                                                    |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------- |
| 5.1 | `holocron`            | Add `readme` step to `runSync` / `SYNC_STEPS`, delegating to `runSyncReadme`                            |
| 5.2 | `holocron`            | Add `--steps` docs and update `sync` command help text                                                  |
| 5.3 | `theholocron/.github` | New reusable `sync.yml` workflow                                                                        |
| 5.4 | all repos             | Add `sync-on-change.yml` thin caller watching config/package/workspace files                            |
| 5.5 | `holocron`            | `sync-workflow` step: thin caller generation (replaces manual `sync-workflow-templates` flow) — stretch |
