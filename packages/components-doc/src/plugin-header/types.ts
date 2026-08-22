import type { LinkEntry } from "@theholocron/registry-doc";

export interface PluginHeaderProps {
	entry: LinkEntry;
	capability: string;
	description?: string;
}
