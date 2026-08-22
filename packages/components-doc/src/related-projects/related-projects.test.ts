import type { LinkEntry } from "@theholocron/registry-doc";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it, vi } from "vitest";

import RelatedProjects from "./related-projects.astro";
import { pickRelated } from "./utils.ts";

function makeEntry(slug: string): LinkEntry {
	return {
		slug,
		package: `@theholocron/${slug}`,
		docsUrl: `https://docs.theholocron.dev/${slug}`,
		npmUrl: `https://www.npmjs.com/package/@theholocron/${slug}`,
		githubUrl: "https://github.com/theholocron/repo",
	};
}

const pool = [makeEntry("a"), makeEntry("b"), makeEntry("c"), makeEntry("d")];

describe("RelatedProjects", () => {
	it("renders the Related Projects section", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(RelatedProjects, {
			props: { current: "github-client" },
		});
		expect(html).toContain("Related Projects");
	});

	it("does not include the current slug in rendered output", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(RelatedProjects, {
			props: { current: "github-client" },
		});
		expect(html).not.toContain("github-client");
	});

	it("renders nothing when the pool is empty after filtering", async () => {
		vi.spyOn(Math, "random").mockReturnValue(0);
		const container = await AstroContainer.create();
		const html = await container.renderToString(RelatedProjects, {
			props: { current: "github-client", count: 0 },
		});
		expect(html).not.toContain("Related Projects");
		vi.restoreAllMocks();
	});
});

describe("pickRelated", () => {
	it("excludes the current slug from results", () => {
		const result = pickRelated(pool, "a", 4);
		expect(result.map((e) => e.slug)).not.toContain("a");
	});

	it("returns at most count entries", () => {
		const result = pickRelated(pool, "a", 2);
		expect(result).toHaveLength(2);
	});

	it("returns all remaining entries when pool is smaller than count", () => {
		const result = pickRelated(pool, "a", 10);
		expect(result).toHaveLength(3);
	});

	it("returns empty array when pool is empty", () => {
		expect(pickRelated([], "a", 3)).toHaveLength(0);
	});

	it("returns empty array when current is the only entry", () => {
		expect(pickRelated([makeEntry("a")], "a", 3)).toHaveLength(0);
	});

	it("does not mutate the original pool", () => {
		const original = [...pool];
		pickRelated(pool, "a", 2);
		expect(pool).toEqual(original);
	});

	it("uses Math.random for shuffling", () => {
		const spy = vi.spyOn(Math, "random").mockReturnValue(0);
		pickRelated(pool, "a", 3);
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});
});
