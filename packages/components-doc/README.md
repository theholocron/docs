# `@theholocron/components-doc`

Astro components for Holocron documentation sites.

## Requirements

- `astro` ≥ 5.0
- `@astrojs/starlight` ≥ 0.30
- `@astrojs/react` ≥ 3.0 and `react` ≥ 18 (**only** for the `Sandbox` component)

## Installation

```bash
pnpm add @theholocron/components-doc
```

## Components

### `<PackageHeader>`

Renders a package name, optional description, and npm / GitHub links. Pass `sandboxUrl` to show a Sandbox link.

```mdx
import { PackageHeader } from "@theholocron/components-doc";
import { getClients } from "@theholocron/registry-doc";

export const entry = getClients()["github-client"];

<PackageHeader entry={entry} description="TypeScript client for the GitHub REST API." />
```

### `<PluginHeader>`

Like `PackageHeader` but adds a capability badge — for Holocron plugin pages.

```mdx
import { PluginHeader } from "@theholocron/components-doc";
import { getPlugins } from "@theholocron/registry-doc";

export const entry = getPlugins()["holocron-plugin-sentry"];

<PluginHeader entry={entry} capability="observability" />
```

### `<Installation>`

Renders an Install heading and the correct `pnpm add` command.

```mdx
import { Installation } from "@theholocron/components-doc";

<Installation package="@theholocron/github-client" />
<Installation package="@theholocron/eslint-config" dev />
<Installation package="@theholocron/cli" global />
```

### `<CapabilitiesTable>`

Renders the Capabilities heading and a two-column table of capability / token pairs — for plugin pages.

```mdx
import { CapabilitiesTable } from "@theholocron/components-doc";

<CapabilitiesTable rows={[{ capability: "observability", token: "HOLOCRON_SENTRY_TOKEN (sentry)" }]} />
```

### `<PackageGrid>`

Renders a package table (Package / Docs / npm) from a `LinksRegistry`. Used on overview / index pages.

```mdx
import { PackageGrid } from "@theholocron/components-doc";
import { getClients } from "@theholocron/registry-doc";

<PackageGrid packages={getClients()} />
<PackageGrid packages={getPlugins()} type="plugins" />
```

### `<RelatedProjects>`

Picks a random selection of related packages from the full org registry and renders a linked list. Excludes the current page's slug.

```mdx
import { RelatedProjects } from "@theholocron/components-doc";

<RelatedProjects current="sentry-client" />
<RelatedProjects current="holocron-plugin-github" count={4} />
```

### `<Sandbox>`

Embeds an interactive [Sandpack](https://sandpack.codesandbox.io/) sandbox. Requires `@astrojs/react` to be configured in the consuming site.

```mdx
import { Sandbox } from "@theholocron/components-doc";

<Sandbox
  template="vanilla-ts"
  files={{ "/index.ts": `import { createGitHubClient } from "@theholocron/github-client";` }}
  dependencies={{ "@theholocron/github-client": "latest" }}
/>
```

## Remark plugin

Add `remarkSandbox` to your `astro.config.ts` to transform code fences into `<Sandbox>` elements:

```ts
import { remarkSandbox } from "@theholocron/components-doc";

export default defineConfig({
  markdown: { remarkPlugins: [remarkSandbox] },
});
```

Then in MDX:

````md
```sandbox react-ts
const App = () => <h1>Hello</h1>;
```
````
