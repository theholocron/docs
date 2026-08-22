import type { LinkEntry } from "@theholocron/registry-doc";

export function pickRelated(pool: LinkEntry[], current: string, count: number): LinkEntry[] {
	return pool
		.filter((e) => e.slug !== current)
		.sort(() => Math.random() - 0.5)
		.slice(0, count);
}
