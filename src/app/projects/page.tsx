"use client";

import { useMemo, useRef, useState } from "react";
import clsx from "clsx";

import Navigation from "@/soul/sections/nav/Navigation";
import { projectTags, projectsData, ProjectTag } from "@/data";
import ProjectCard from "./_components/cards";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import Button from "@/soul/primitives/Button";

gsap.registerPlugin(SplitText);

type FilterTag = (typeof projectTags)[number];

const isProjectTag = (tag: FilterTag): tag is ProjectTag =>
	tag !== "Show all";

export default function ProjectsPage() {
	const [activeTag, setActiveTag] = useState<FilterTag>("Show all");
	const pageRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);

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

	useGSAP(
		() => {
			let split: SplitText | undefined;
			let heroChars: HTMLElement[] = [];

			if (titleRef.current) {
				split = new SplitText(titleRef.current, {
					type: "chars",
					tagName: "span",
					charsClass: "projects-hero-char",
				});
				heroChars = split.chars as HTMLElement[];
				gsap.set(heroChars, { opacity: 0, yPercent: 110 });
			}

			gsap.set("[data-animate=filters]", { opacity: 0, y: 60 });
			gsap.set("[data-animate=cards] > *", { opacity: 0, y: 90 });
			gsap.set("[data-animate=hero-paragraph]", { opacity: 0, y: 50 });

			const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" } });

			tl.to("[data-animate=filters]", { y: 0, opacity: 1 });
			tl.to(
				"[data-animate=cards] > *",
				{ y: 0, opacity: 1, stagger: 0.1 },
				"-=0.3"
			);
			tl.to("[data-animate=hero-paragraph]", { y: 0, opacity: 1 }, "-=0.35");

			if (heroChars.length) {
				tl.to(heroChars, {
					opacity: 1,
					yPercent: 0,
					duration: 0.5,
					stagger: 0.04,
					ease: "power4.out",
				}, "+=0.2");
			}

			return () => {
				split?.revert();
			};
		},
		{ scope: pageRef }
	);

	return (
		<main className="max-h-svh h-full relative text-neutral-900">
			<Navigation />
			<div ref={pageRef} className="px-4 sm:px-6 lg:px-10 pt-32 pb-32">
				<section className="grid gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
					<h1
						ref={titleRef}
						className="text-[clamp(4.5rem,16vw,13rem)] leading-[0.85] tracking-tight lg:col-span-2"
					>
						Projekte
					</h1>
					<span aria-hidden className="hidden lg:block" />
					<p
						data-animate="hero-paragraph"
						className="text-base sm:text-lg lg:text-2xl text-neutral-600 md:mt-10 lg:col-start-2 lg:max-w-2xl lg:justify-self-start"
					>
						Kreativität ist für uns kein Selbstzweck, sondern eine wesentliche
						Voraussetzung für unsere Arbeit. Wir lieben, was wir tun und so
						werden auch Projekte mit unseren Kund:innen zu
						Herzensangelegenheiten.
					</p>
				</section>

				<section data-animate="filters" className="mt-20 max-w-5xl">
					<div className="text-2xl text-neutral-500">
						Filter
					</div>
					<div className="mt-2 flex flex-wrap gap-2">
						{tagsToRender.map((tag) => {
							const isActive = activeTag === tag;
							return (
								<button
									key={tag}
									type="button"
									onClick={() => setActiveTag(tag)}
									className={clsx(
										"relative overflow-hidden rounded-full border px-2 py-1 text-xs transition-all",
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
					data-animate="cards"
					className="mt-4 grid gap-y-16 sm:max-w-[90vw] lg:max-w-none lg:grid-cols-[repeat(2,_minmax(0,_60vw))] overflow-hidden min-h-screen"
				>
					{filteredProjects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</section>
				<div className="flex flex-col  max-w-2xl  mt-40 mb-64">
					<h2 className="text-xl md:text-[2rem] max-w-lg  text-clou-black leading-10 mb-2 ">
						Scrolled all the way to the bottom? Then it really starts now. What
						do you want next?
					</h2>
					<div className="flex flex-col md:flex-row   gap-4 mt-4 ">
						<Button variant="primary" size="md">
							Make contact
						</Button>
						
				</div>
				</div>
			</div>
		</main>
	);
}
