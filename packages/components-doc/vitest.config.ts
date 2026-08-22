import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		coverage: {
			provider: "v8",
			reporter: ["text", "json"],
			exclude: ["src/**/*.test.ts", "node_modules/**"],
		},
	},
});
