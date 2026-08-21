import { codecovRollupPlugin } from "@codecov/rollup-plugin";
import { library } from "@theholocron/tsdown-config/presets/library";

export default library({
	plugins: [
		codecovRollupPlugin({
			enableBundleAnalysis: process.env["CODECOV_TOKEN"] !== undefined,
			bundleName: "package-a",
			gitService: "github",
			uploadToken: process.env["CODECOV_TOKEN"],
		}),
	],
});
