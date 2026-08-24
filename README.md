# `@theholocron/docs`

<!-- holocron:description -->

Documentation infrastructure.

<!-- /holocron:description -->

## Development

This repo uses [pnpm workspaces](https://pnpm.io/workspaces) with [Turborepo](https://turbo.build/repo) for task orchestration.

```bash
pnpm install       # install all deps
pnpm build         # build all packages
pnpm test          # test all packages
pnpm typecheck     # typecheck all packages
pnpm lint          # lint all packages
```

## Packages

| Package                                                    | Description                                       |
| ---------------------------------------------------------- | ------------------------------------------------- |
| [`@theholocron/components-doc`](./packages/components-doc) | Astro components for Holocron documentation sites |
| [`@theholocron/registry-doc`](./packages/registry-doc)     | Cross-repo package registry and link utilities    |

## Releases

Releases are automated via [semantic-release](https://semantic-release.gitbook.io) on push to `main`. All packages are versioned and published in lockstep. See [CHANGELOG.md](CHANGELOG.md) for the release history.

## Documentation

Check out [The Holocron Archive](https://docs.theholocron.dev/docs/) for more information.
