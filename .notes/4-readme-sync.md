# Note 4 — README ↔ docs sync

**Repos affected:** `theholocron/holocron` (CLI change), all repos with docs
**Depends on:** Notes 1, 2, 3 — specifically `<PackageGrid>` from `components-doc`.

---

## Problem

`docs/src/content/docs/index.mdx` and `README.md` both describe the same
project but are maintained separately. `holocron sync-readme` already keeps
the README description in sync from `holocron.config.ts`, but the docs index
is untouched and drifts.

---

## Decision: component-driven index, sync only frontmatter

The body of `docs/index.mdx` becomes fully component-driven — no hardcoded
prose. `<PackageGrid>` renders from `registry-doc`, so the index never has
content to drift. The only field that can become stale is the frontmatter
`description`, which `holocron sync-readme` already manages for `README.md`.

Extend `sync-readme` to also update the `description` frontmatter field in
`docs/src/content/docs/index.mdx` when that file exists. One command keeps
both in sync.

---

## What `index.mdx` looks like

**`theholocron/clients`**

```mdx
---
title: Overview
description: API clients and shared HTTP primitives.
---
import { PackageGrid } from "@theholocron/components-doc";
import { getClients } from "@theholocron/registry-doc";

<PackageGrid packages={getClients()} />
```

**`theholocron/holocron`** (plugin overview page)

```mdx
---
title: Plugins
description: First-party plugins for the Holocron CLI.
---
import { PackageGrid } from "@theholocron/components-doc";
import { getPlugins } from "@theholocron/registry-doc";

<PackageGrid packages={getPlugins()} type="plugins" />
```

The body is static component calls — nothing hardcoded, nothing to drift.

---

## `sync-readme` extension

```
holocron sync-readme now does:
  1. Read description from holocron.config.ts                    (existing)
  2. Write <!-- holocron:description --> block in README.md       (existing)
  3. If docs/src/content/docs/index.mdx exists:
       parse YAML frontmatter, update description field, write    (new)
```

The frontmatter update is a targeted YAML field replace — not full template
generation, not marker blocks. Just one field.

---

## Developer workflow after this lands

Adding a new client package:

1. Create `packages/<slug>-client/`
2. Open PR in `theholocron/docs` to add entry to `registry-doc`
3. Create `docs/src/content/docs/<slug>.mdx` using the standard MDX template
4. Run `holocron sync-readme` — updates README description and docs `index.mdx`
   frontmatter automatically
5. `<PackageGrid>` on the docs index picks up the new entry from `registry-doc`
   at build time — no manual edit to `index.mdx` needed

---

## What this does NOT do

- Does not generate `index.mdx` from scratch — it's authored once, then only
  `description` is synced.
- Does not symlink README into docs or vice versa — the content genuinely
  differs (README has GitHub badges and marker blocks; docs index is a
  component-rendered grid).
- Does not touch per-package doc pages — those are handled by Note 3 components.

---

## Tickets

| # | Repo | PR title | Notes |
|---|---|---|---|
| 4.1 | `clients` | `refactor(docs): replace index.md with component-driven index.mdx` | First consumer; validates pattern; can combine with Note 2 ticket 2.4 |
| 4.2 | `holocron` | `refactor(docs): replace plugin overview with component-driven index.mdx` | Can combine with 2.5 |
| 4.3 | `holocron` | `feat(sync-readme): update docs/index.mdx frontmatter description` | CLI change; small, targeted YAML update |
| 4.4 | `utils` | `refactor(docs): replace index.md with component-driven index.mdx` | Same pattern |

4.1 + 4.2 can be rolled into the Note 2 migration PRs (2.4 + 2.5) to avoid
extra PRs per repo.
