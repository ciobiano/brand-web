"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import clsx from "clsx";

import { projectTags, projectsData, ProjectTag } from "@/data";
import ProjectCard from "./_components/cards";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/soul/primitives/Button";
import Badge from "@/soul/primitives/Badge";

gsap.registerPlugin(SplitText, ScrollTrigger);

type FilterTag = (typeof projectTags)[number];

const isProjectTag = (tag: FilterTag): tag is ProjectTag => tag !== "Show all";

const animationSelectors = {
	heroHeading: "[data-projects-hero-heading]",
	heroCopy: "[data-projects-hero-copy]",
	filters: "[data-projects-filters]",
	cards: "[data-projects-cards] > *",
} as const;

const animationDefaults = { duration: 0.6, ease: "power3.out" } as const;

function useProjectsIntroAnimation(scope: RefObject<HTMLDivElement>) {
	useGSAP(
		() => {
			if (!scope.current) return;

			const context = gsap.context((self) => {
				const headingEl = document.querySelector(animationSelectors.heroHeading);
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

				tl
					.to(animationSelectors.filters, { autoAlpha: 1, y: 0 })
					.to(
						animationSelectors.cards,
						{ autoAlpha: 1, y: 0, stagger: 0.1 },
						"-=0.3"
					)
					.to(animationSelectors.heroCopy, { autoAlpha: 1, y: 0 }, "-=0.25");

				if (split) {
					tl.to(split.chars, {
						autoAlpha: 1,
						yPercent: 0,
						stagger: 0.04,
						duration: 0.5,
						ease: "power4.out",
					}, "+=0.2");
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

export default function ProjectsPage() {
	const [activeTag, setActiveTag] = useState<FilterTag>("Show all");
	const pageRef = useRef<HTMLDivElement>(null);

	const tagsToRender = useMemo(() => {
		const available = new Set<ProjectTag>();
		projectsData.forEach((project) => {
			project.tags.forEach((tag) => available.add(tag));
		});
		return projectTags.filter((tag) => {
			if (tag === "Show all") return true;
			return available.has(tag);
		});
	}, []);

	const filteredProjects = useMemo(() => {
		if (!isProjectTag(activeTag)) return projectsData;
		return projectsData.filter((project) => project.tags.includes(activeTag));
	}, [activeTag]);

	const hasProjects = filteredProjects.length > 0;

	useProjectsIntroAnimation(pageRef);

	useEffect(() => {
		ScrollTrigger.refresh();
	}, [filteredProjects.length]);

	return (
		<main className="flex min-h-screen flex-col text-neutral-900">
			<div
				ref={pageRef}
				className="flex flex-1 flex-col gap-10 px-4 pt-24 mb-80 sm:px-6 "
			>
				<section className="grid gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
					<h1
						data-projects-hero-heading
						className="text-[clamp(4.5rem,16vw,14rem)] font-medium  leading-[0.85] tracking-tight lg:col-span-2"
					>
						Projects
					</h1>
					<span aria-hidden className="hidden lg:block" />
					<p
						data-projects-hero-copy
						className="text-base sm:text-lg lg:text-2xl text-neutral-600 md:mt-10 lg:col-start-2 lg:max-w-2xl lg:justify-self-start"
					>
						Creativity is not an end in itself for us, but an essential prerequisite for our work. We love what we do, and so projects with our clients become matters of the heart.
					</p>
				</section>

				<section data-projects-filters className="max-w-5xl">
					<div className="text-2xl text-neutral-500">
						Filter
					</div>
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
					data-projects-cards
					className={clsx(
						" grid gap-y-20 overflow-hidden sm:max-w-[90vw] mb-20 lg:max-w-none lg:grid-cols-[repeat(2,_minmax(0,_60vw))]",
						hasProjects ? "" : "min-h-svh"
					)}
				>
					{hasProjects ? (
						filteredProjects.map((project) => (
							<ProjectCard key={project.id} project={project} />
						))
					) : (
						<div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-600">
							<p className="text-lg font-medium text-neutral-900">No projects found</p>
							<p className="mt-2 text-sm">Select another filter or reset the selection.</p>
						</div>
					)}
				</section>
				<div className="flex flex-col gap-6 pt-40 max-w-2xl">
					<h2 className="text-xl md:text-[2rem] max-w-lg text-kainé-black leading-10">
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
