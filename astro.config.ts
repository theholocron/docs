import starlight from "@astrojs/starlight";
import { defineConfig } from "@theholocron/astro-config";
import { docsTheme } from "@theholocron/docs-theme";

export default defineConfig({
	docs: {
		name: "Docs",
		github: "docs",
		sidebar: [
			{ label: "Overview", slug: "" },
			{
				label: "Packages",
				items: [
					{ label: "components-doc", slug: "components-doc" },
					{ label: "registry-doc", slug: "registry-doc" },
				],
			},
			{ label: "Component Preview", slug: "dev" },
		],
	},
	starlight,
	docsTheme,
	srcDir: "./docs/src",
	outDir: "./docs/dist",
	publicDir: "./docs/public",
});
