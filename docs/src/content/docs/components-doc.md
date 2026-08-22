---
title: components-doc
description: Astro components for Holocron documentation sites.
---

`@theholocron/components-doc` ships the Astro components and remark plugin used across all Holocron docs sites to render package headers, installation blocks, capability tables, and interactive sandboxes.

## Installation

```bash
pnpm add @theholocron/components-doc
```

The `Sandbox` component additionally requires `@astrojs/react`, `react`, and `react-dom` in the consuming site.

## Components

### `PackageHeader`

Renders the package name, optional description, and npm / GitHub links for a client package page. Pass `sandboxUrl` on the `LinkEntry` to surface a Sandbox link.

```mdx
import { PackageHeader } from "@theholocron/components-doc";
import { getClients } from "@theholocron/registry-doc";

export const entry = getClients()["github-client"];

<PackageHeader entry={entry} description="TypeScript client for the GitHub REST API." />
```

### `PluginHeader`

Same as `PackageHeader` but adds a capability badge — used on Holocron plugin pages.

```mdx
import { PluginHeader } from "@theholocron/components-doc";
import { getPlugins } from "@theholocron/registry-doc";

export const entry = getPlugins()["holocron-plugin-sentry"];

<PluginHeader entry={entry} capability="observability" />
```

### `Installation`

Renders an **Install** heading and the correct `pnpm add` command. Supports `dev` and `global` flags.

```mdx
import { Installation } from "@theholocron/components-doc";

<Installation package="@theholocron/github-client" />
<Installation package="@theholocron/eslint-config" dev />
<Installation package="@theholocron/cli" global />
```

### `CapabilitiesTable`

Renders the **Capabilities** heading and a two-column table of capability / token pairs. Used on plugin pages.

```mdx
import { CapabilitiesTable } from "@theholocron/components-doc";

<CapabilitiesTable rows={[{ capability: "observability", token: "HOLOCRON_SENTRY_TOKEN (sentry)" }]} />
```

### `PackageGrid`

Renders a table of packages (Package / Docs / npm) from a `LinksRegistry`. Used on overview and index pages.

```mdx
import { PackageGrid } from "@theholocron/components-doc";
import { getClients, getPlugins } from "@theholocron/registry-doc";

<PackageGrid packages={getClients()} />
<PackageGrid packages={getPlugins()} type="plugins" />
```

### `RelatedProjects`

Picks a random cross-registry selection from all 62 org packages and renders a linked list, excluding the current page's slug. Refreshes on each build.

```mdx
import { RelatedProjects } from "@theholocron/components-doc";

<RelatedProjects current="sentry-client" />
<RelatedProjects current="holocron-plugin-github" count={4} />
```

### `Sandbox`

Embeds an interactive [Sandpack](https://sandpack.codesandbox.io/) sandbox powered by CodeSandbox. The component uses `client:only="react"` so it only runs in the browser — no SSR.

```mdx
import { Sandbox } from "@theholocron/components-doc";

<Sandbox
  template="vanilla-ts"
  files={{ "/index.ts": `import { createGitHubClient } from "@theholocron/github-client";` }}
  dependencies={{ "@theholocron/github-client": "latest" }}
/>
```

## Remark plugin

`remarkSandbox` transforms fenced code blocks into `<Sandbox>` elements so authors write plain Markdown rather than importing the component manually.

```ts
// astro.config.ts
import { remarkSandbox } from "@theholocron/components-doc";

export default defineConfig({
  markdown: { remarkPlugins: [remarkSandbox] },
});
```

Syntax in MDX:

````md
```sandbox vanilla-ts
import { createGitHubClient } from "@theholocron/github-client";
const client = createGitHubClient({ token: process.env.GITHUB_TOKEN });
```
````

Template is read from the language tag (`sandbox react-ts`, `sandbox nextjs`, etc.). The entry file defaults to the template's conventional name (`/index.ts`, `/App.tsx`, etc.) and can be overridden: ` ```sandbox vanilla-ts /src/client.ts `.
