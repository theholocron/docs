import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		coverage: {
			provider: "v8",
			reporter: ["text", "json"],
			exclude: [
				"src/**/*.test.ts",
				// client:only components never run server-side; AstroContainer can't
				// exercise them without the full Astro integration virtual module context
				"**/sandbox/sandbox.astro",
				"node_modules/**",
			],
		},
	},
});
