import { library } from "@theholocron/tsdown-config/presets/library";

// Only the /markdown subpath is compiled — Astro components ship as source
// so consuming Astro sites can process them through their own Vite pipeline.
export default library({
	entry: { "markdown/index": "src/markdown/index.ts" },
});
