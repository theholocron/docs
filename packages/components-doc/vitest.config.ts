import { defineConfig } from "vitest/config";

// Stub .astro files for vitest — rendering is validated by `astro check`
const astroStub = {
	name: "astro-stub",
	transform(_code: string, id: string) {
		if (id.endsWith(".astro")) {
			return "export default {};";
		}
	},
};

export default defineConfig({
	plugins: [astroStub],
	test: {
		coverage: {
			provider: "v8",
			reporter: ["text", "json"],
			exclude: ["**/*.astro", "src/**/__tests__/**", "src/**/*.test.ts", "node_modules/**"],
		},
	},
});
