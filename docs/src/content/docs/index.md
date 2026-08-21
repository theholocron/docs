---
title: Overview
description: Documentation infrastructure for the Holocron ecosystem.
---

`theholocron/docs` is the home for shared documentation tooling across all Holocron repos.

## Packages

| Package | Description |
| ------- | ----------- |
| [`@theholocron/registry-doc`](/registry-doc) | Cross-repo package registry and link utilities |

## How it fits together

Every `theholocron` docs site (clients, holocron, utils) imports from
`@theholocron/registry-doc` to get canonical package names, docs URLs, npm
links, and GitHub links — all derived from a single source so cross-repo links
never go stale.
