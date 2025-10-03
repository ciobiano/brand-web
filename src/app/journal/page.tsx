"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import clsx from "clsx";

import { journalEntries, journalTags, JournalTag } from "@/data";
import JournalEntryCard from "./_components/entry-card";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/soul/primitives/Button";

gsap.registerPlugin(SplitText, ScrollTrigger);

type FilterTag = (typeof journalTags)[number];

const isJournalTag = (tag: FilterTag): tag is JournalTag => tag !== "Show all";

const animationSelectors = {
	heroHeading: "[data-journal-hero-heading]",
	heroCopy: "[data-journal-hero-copy]",
	filters: "[data-journal-filters]",
	cards: "[data-journal-cards] > *",
} as const;

const animationDefaults = { duration: 0.6, ease: "power3.out" } as const;

function useJournalIntroAnimation(scope: RefObject<HTMLDivElement>) {
	useGSAP(
		() => {
			if (!scope.current) return;

			const context = gsap.context((self) => {
				const headingEl = document.querySelector(
					animationSelectors.heroHeading
				);
				let split: SplitText | null = null;

				if (headingEl) {
					split = new SplitText(headingEl as HTMLElement, {
						type: "chars",
						tagName: "span",
					});
					gsap.set(split.chars, { autoAlpha: 0, yPercent: 110 });
				}

				gsap.set(animationSelectors.filters, { autoAlpha: 0, y: 60 });
				gsap.set(animationSelectors.cards, { autoAlpha: 0, y: 90 });
				gsap.set(animationSelectors.heroCopy, { autoAlpha: 0, y: 50 });

				const tl = gsap.timeline({ defaults: animationDefaults });

				tl.to(animationSelectors.filters, { autoAlpha: 1, y: 0 })
					.to(
						animationSelectors.cards,
						{ autoAlpha: 1, y: 0, stagger: 0.1 },
						"-=0.3"
					)
					.to(animationSelectors.heroCopy, { autoAlpha: 1, y: 0 }, "-=0.25");

				if (split) {
					tl.to(
						split.chars,
						{
							autoAlpha: 1,
							yPercent: 0,
							stagger: 0.04,
							duration: 0.5,
							ease: "power4.out",
						},
						"+=0.2"
					);
				}

				self.add(() => {
					split?.revert();
				});
			}, scope);

			return () => context.revert();
		},
		{ dependencies: [scope] }
	);
}

export default function JournalPage() {
	const [activeTag, setActiveTag] = useState<FilterTag>("Show all");
	const pageRef = useRef<HTMLDivElement>(null);

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

	useJournalIntroAnimation(pageRef);

	useEffect(() => {
		ScrollTrigger.refresh();
	}, [filteredEntries.length]);

	return (
		<main className="flex min-h-screen flex-col text-neutral-900">
			<div
				ref={pageRef}
				className="mb-80 flex flex-1 flex-col gap-10 px-4 pt-32 sm:px-6 "
			>
				<section className="grid gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
					<h1
						data-journal-hero-heading
						className="text-[clamp(4.5rem,16vw,13rem)] leading-[0.85] tracking-tight lg:col-span-2"
					>
						Journal
					</h1>
					<span aria-hidden className="hidden lg:block" />
					<div className="flex flex-col gap-10  ">
						<p
							data-journal-hero-copy
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
						{tagsToRender.map((tag) => {
							const isActive = activeTag === tag;
							return (
								<button
									key={tag}
									type="button"
									onClick={() => setActiveTag(tag)}
									className={clsx(
										"relative overflow-hidden rounded-full border px-3 py-1 text-xs transition-all",
										"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
										isActive
											? "border-transparent bg-neutral-900 text-white shadow-[0_8px_24px_-12px_rgba(15,15,15,0.35)]"
											: "border-neutral-500/80 bg-white text-neutral-700 hover:border-neutral-600 hover:text-neutral-900"
									)}
								>
									{tag}
								</button>
							);
						})}
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
							<JournalEntryCard key={entry.id} entry={entry} />
						))
					) : (
						<div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-600">
							<p className="text-lg font-medium text-neutral-900">
								Keine Einträge gefunden
							</p>
							<p className="mt-2 text-sm">
								Wähle einen anderen Filter oder setze die Auswahl zurück.
							</p>
						</div>
					)}
				</section>

				<div className="flex max-w-2xl flex-col gap-4 pt-40">
					<h2 className="max-w-lg text-xl leading-10 text-clou-black md:text-[2rem]">
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
