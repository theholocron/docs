import { clients } from "./clients.js";
import { DOCS_BASE, GITHUB_BASE, ORG, SCOPE } from "./constants.js";
import { plugins } from "./plugins.js";

export type { LinkEntry, LinksRegistry } from "./types.js";

export const getOrg = (): string => ORG;

export const getScope = (): string => SCOPE;

export const getDocsBaseUrl = (): string => DOCS_BASE;

export const getGitHubBaseUrl = (): string => GITHUB_BASE;

export const getClients = () => clients;

export const getPlugins = () => plugins;

export const getRegistry = () => ({ ...clients, ...plugins });

export const getPackage = (slug: string) => getRegistry()[slug];
