import { codecovRollupPlugin } from "@codecov/rollup-plugin";
import { library } from "@theholocron/tsdown-config/presets/library";

export default library({
	entry: ["src/index.ts"],
	plugins: [
		codecovRollupPlugin({
			enableBundleAnalysis: process.env["CODECOV_TOKEN"] !== undefined,
			bundleName: "components-doc",
			gitService: "github",
			uploadToken: process.env["CODECOV_TOKEN"],
		}),
	],
});
