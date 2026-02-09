"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { journalEntries, journalTags, JournalTag } from "@/data";
import JournalEntryCard from "./_components/entry-card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageAnimationReady } from "@/soul/primitives/page-transition";
import { useHeadingCharAnimation } from "@/hooks/useHeadingCharAnimation";
import { usePageIntroAnimation } from "@/hooks/usePageIntroAnimation";
import Button from "@/soul/primitives/Button";
import Badge from "@/soul/primitives/Badge";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type FilterTag = (typeof journalTags)[number];

const isJournalTag = (tag: FilterTag): tag is JournalTag => tag !== "Show all";

export default function JournalPage() {
	const [activeTag, setActiveTag] = useState<FilterTag>("Show all");
	const pageRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const isPageReady = usePageAnimationReady();

	const tagsToRender = useMemo(() => {
		const available = new Set<JournalTag>();
		journalEntries.forEach((entry) => {
			entry.tags.forEach((tag) => available.add(tag));
		});
		return journalTags.filter((tag) => {
			if (tag === "Show all") return true;
			return available.has(tag);
		});
	}, []);

	const filteredEntries = useMemo(() => {
		if (!isJournalTag(activeTag)) return journalEntries;
		return journalEntries.filter((entry) => entry.tags.includes(activeTag));
	}, [activeTag]);

	const hasEntries = filteredEntries.length > 0;

	usePageIntroAnimation(pageRef, isPageReady, {
		bodyText: "[data-body-text]",
		filters: "[data-journal-filters]",
		cards: "[data-journal-cards] > *",
	});
	useHeadingCharAnimation(headingRef, isPageReady, { delay: 0.1 });

	useEffect(() => {
		ScrollTrigger.refresh();
	}, [filteredEntries.length]);

	return (
		<main className="flex min-h-screen flex-col text-neutral-900">
			<div
				ref={pageRef}
				className="mb-80 flex flex-1 flex-col gap-10 px-4 pt-24 sm:px-6 "
			>
				<section className="grid gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
					<h1
						ref={headingRef}
						data-journal-hero-heading
						className="text-[clamp(4.5rem,16vw,14rem)] font-medium leading-[0.85] tracking-tight lg:col-span-2"
						style={{ perspective: "1000px" }}
					>
						Journal
					</h1>
					<span aria-hidden className="hidden lg:block" />
					<div className="flex flex-col gap-10  ">
						<p
							data-body-text
							className="text-base text-neutral-600 sm:text-lg lg:col-start-2 lg:mt-10 lg:max-w-2xl lg:text-2xl lg:justify-self-start"
						>
							Stories and field notes from the studio. Strategy sprints,
							time-out journals, and the experiments moving our practice
							forward.
						</p>
						<div className="w-full">

							<Button variant="secondary" size="md">
								Newsletter  sign up
							</Button>
						</div>
					</div>
				</section>

				<section data-journal-filters className="max-w-5xl">
					<div className="text-2xl text-neutral-500">Filter</div>
					<div className="mt-6 flex flex-wrap gap-3">
						{tagsToRender.map((tag) => (
							<Badge
								key={tag}
								variant="filter"
								size="sm"
								interactive
								active={activeTag === tag}
								onClick={() => setActiveTag(tag)}
							>
								{tag}
							</Badge>
						))}
					</div>
				</section>

				<section
					data-journal-cards
					className={clsx(
						"grid gap-3 gap-y-20  overflow-hidden sm:max-w-[90vw] lg:max-w-none lg:grid-cols-[repeat(4,_minmax(0,_60vw))]",
						hasEntries ? "" : "min-h-[200px]"
					)}
				>
					{hasEntries ? (
						filteredEntries.map((entry) => (
							<JournalEntryCard key={entry.href} entry={entry} />
						))
					) : (
						<div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-600">
							<p className="text-lg font-medium text-neutral-900">
								No entries found
							</p>
							<p className="mt-2 text-sm">
								Choose another filter or reset the selection.
							</p>
						</div>
					)}
				</section>

				<div className="flex max-w-2xl flex-col gap-4 pt-40">
					<h2 className="max-w-lg text-xl leading-10 text-kainé-black md:text-[2rem]">
						Scrolled all the way to the bottom? Then it really starts now. What
						do you want next?
					</h2>
					<div className="flex flex-col gap-4 sm:flex-row">
						<Button variant="primary" size="md">
							Make contact
						</Button>
						<Button variant="secondary" size="md">
							See our services
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
