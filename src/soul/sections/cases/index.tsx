"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
import { projectsData } from "@/data";
import { useGSAP } from "@gsap/react";
import Button from "../../primitives/Button";
import Badge from "../../primitives/Badge";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Cases() {
	const introRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const container = containerRef.current;
			if (!container) return;

			const intro = introRef.current;
			if (!intro) return;

			const cards = gsap.utils.toArray(
				container.querySelectorAll(".card")
			) as HTMLElement[];

			cards.forEach((cardEl, i) => {
				const next = cards[i + 1] as HTMLElement | undefined;
				const isLastCard = i === cards.length - 1;

				const trigger = isLastCard ? container.nextElementSibling : next;

				if (!trigger) return;

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: trigger,
						start: "top 100%",
						end: "top -80%",
						scrub: true,
						pin: cardEl,
						pinSpacing: false,
						invalidateOnRefresh: true,
					},
				});

				tl.to(
					cardEl,
					{
						paddingTop: "30rem",
						paddingBottom: "30rem",
						paddingLeft: "30rem",
						paddingRight: "30rem",
						duration: 1,
						ease: "none",
					},
					0
				);

				tl.to(
					cardEl,
					{
						opacity: 0,
						duration: 0.5,
						ease: "none",
					},
					0
				);
			});


			// Pin the intro section and add subtle movement
			const pinTl = gsap.timeline({
				scrollTrigger: {
					trigger: intro,
					start: "20% top",
					end: () => `+=${container.offsetHeight}`,
					pin: true,
					pinSpacing: false,
					scrub: true,
				},
			});

			// Add subtle upward movement while pinned
			pinTl.to(intro, {
				yPercent: -15,
				ease: "none",
			});

			// Padding animation
			const introTl = gsap.timeline({
				scrollTrigger: {
					trigger: intro,
					start: "top 100%",
					end: "+=80%",
					scrub: 1,
				},
			});

			introTl.to(
				intro,
				{
					paddingLeft: 0,
					paddingRight: 0,
					duration: 1,
					ease: "none",
				},
				"0"
			);
		},
		{ scope: containerRef, dependencies: [projectsData.length] }
	);

	return (
		<>
			<section
				ref={introRef}
				className="relative px-16 text-white z-0"
			>
				<div className="bg-kainé-black w-full flex flex-col  gap-12 md:gap-28 pt-44 pb-96 rounded-t-2xl" data-cursor-invert>
					<div className="flex flex-col w-full h-full max-w-[90rem]  mx-auto gap-32   ">
						<div className="max-w-4xl">
							<h1 className="text-4xl md:text-5xl font-normal md:leading-[130%]">
								Hello! We are kainé, your agency in Lucerne focused on branding, purpose, and websites with impact.
							</h1>
						</div>
						{/* Description and button */}
						<div className="grid gap-4 grid-rows-[auto_auto] grid-cols-2 auto-cols-fr">
							<div className="col-span-1" />
							<div className="max-w-md space-y-8">
								<p className="text-base md:text-xl text-gray-300 leading-relaxed">
									In your best interest, for you, for your customers, and last but not least for us, we do everything to ensure our work makes sense.
								</p>
								<div>
									<Button variant="primary" size="md" href="/purpose">
										our purpose
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section
				data-speed="1"
				className="relative bg-white text-black z-10"
				ref={containerRef}
			>
				<div className="z-10 absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-white h-4" />
				<div className="gap-12 flex justify-start items-stretch py-40 max-w-4xl px-40 w-full">
					<div className="max-w-xl w-full flex flex-col gap-4 items-start">
						<Badge variant="outline" size="sm" className="mb-8">
							cases
						</Badge>
						<h2 className="text-3xl font-normal leading-tight">
							Extensive projects we are particularly proud of – meaning-based design and communication:
						</h2>
					</div>
				</div>

				{projectsData.map((project) => (
					<Card
						key={project.id}
						project={project}
					/>
				))}
			</section>


		</>
	);
}
