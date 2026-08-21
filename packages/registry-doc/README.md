# `@theholocron/registry-doc`

Cross-repo package registry and link utilities for Holocron docs.

## Installation

```bash
pnpm add @theholocron/registry-doc
```

## Usage

```ts
import { getClients, getPlugins, getRegistry, getPackage } from "@theholocron/registry-doc";

// All clients
const clients = getClients();
const entry = clients["github-client"];
// { slug, package, docsUrl, npmUrl, githubUrl }

// Cross-repo: get a client entry from a plugin page
const client = getPackage("sentry-client");

// Org-level constants
import { getOrg, getScope, getDocsBaseUrl } from "@theholocron/registry-doc";
getOrg();        // "theholocron"
getScope();      // "@theholocron"
getDocsBaseUrl(); // "https://docs.theholocron.dev"
```

## Validation

```ts
import { validateRegistry } from "@theholocron/registry-doc/validate";
import { getClients } from "@theholocron/registry-doc";

const result = validateRegistry(getClients(), ["@theholocron/github-client", ...]);
if (!result.valid) {
  console.error("Missing:", result.missing);
  console.error("Extra:", result.extra);
}
```
