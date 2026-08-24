import type { LinksRegistry } from "@theholocron/registry-doc";

export interface PackageGridProps {
	packages: LinksRegistry;
	type?: "packages" | "plugins";
}
