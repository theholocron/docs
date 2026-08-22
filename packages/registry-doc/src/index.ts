import { clients } from "./clients.js";
import { configs } from "./configs.js";
import { DOCS_BASE, GITHUB_BASE, ORG, SCOPE } from "./constants.js";
import { docs } from "./docs.js";
import { cli, plugins } from "./holocron.js";
import { skills } from "./skills.js";
import { templates } from "./templates.js";
import { themes } from "./themes.js";
import { utils } from "./utils.js";

export type { LinkEntry, LinksRegistry } from "./types.js";

export const getOrg = (): string => ORG;

export const getScope = (): string => SCOPE;

export const getDocsBaseUrl = (): string => DOCS_BASE;

export const getGitHubBaseUrl = (): string => GITHUB_BASE;

export const getCli = () => cli;

export const getClients = () => clients;

export const getConfigs = () => configs;

export const getDocs = () => docs;

export const getPlugins = () => plugins;

export const getSkills = () => skills;

export const getTemplates = () => templates;

export const getThemes = () => themes;

export const getUtils = () => utils;

export const getHolocron = () => ({ ...cli, ...plugins });

export const getRegistry = () => ({
	...clients,
	...cli,
	...plugins,
	...configs,
	...utils,
	...themes,
	...docs,
	...skills,
	...templates,
});

export const getPackage = (slug: string) => getRegistry()[slug];
