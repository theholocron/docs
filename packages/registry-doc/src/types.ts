export type LinkEntry = {
	slug: string;
	package: string;
	docsUrl: string;
	npmUrl: string;
	githubUrl: string;
	sandboxUrl?: string;
};

export type LinksRegistry = Record<string, LinkEntry>;
