export type LinkEntry = {
	slug: string;
	package: string;
	docsUrl: string;
	npmUrl: string;
	githubUrl: string;
	sandboxUrl?: string;
};

export type LinksRegistry = Record<string, LinkEntry>;

export const getOrg = (): string => "theholocron";

export const getScope = (): string => "@theholocron";

export const getDocsBaseUrl = (): string => process.env["DOCS_BASE_URL"] ?? "https://docs.theholocron.dev";

export const getGitHubBaseUrl = (): string => "https://github.com/theholocron";

// Full registry — populated in follow-up PRs
export const getRegistry = (): LinksRegistry => ({ ...getClients(), ...getPlugins() });

export const getClients = (): LinksRegistry => ({});

export const getPlugins = (): LinksRegistry => ({});

export const getPackage = (_slug: string): LinkEntry | undefined => undefined;
