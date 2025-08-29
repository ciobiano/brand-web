"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
import { cardData } from "@/app/data";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother);

export default function Cases() {
	const introRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const container = containerRef.current;
			if (!container) return;

			// select all cards inside the container
			const cards = gsap.utils.toArray(
				container.querySelectorAll(".card")
			) as HTMLElement[];

			cards.forEach((cardEl, i) => {
				const next = cards[i + 1] as HTMLElement | undefined;
				if (!next) return;

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: next, // next card controls the timeline
						start: "top 100%",
						end: "top -80%",
						scrub: true,
						pin: cardEl, // pin the current card while animating
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

			const intro = introRef.current;
			if (!intro) return;

			const introTl = gsap.timeline({
				scrollTrigger: {
					trigger: intro,
					start: "top 100%",
					end: "+=80%",
					pin: "into",
					pinSpacing: false,
					scrub: 1,
					markers: true,
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
				"-=50%"
			);
		},
		{ scope: containerRef, dependencies: [cardData.length] }
	);

	return (
		<>
			<section
				ref={introRef}
				className="relative px-16 bg-clou-white text-white"
			>
				<div className=" into  bg-clou-black flex flex-col px-40  gap-12 md:gap-24 pt-40 pb-80 rounded-t-2xl  ">
					<div className="max-w-4xl">
						<h1 className="text-4xl md:text-5xl font-normal md:leading-[130%]">
							Hallo! Wir sind Clou, deine Agentur in Luzern mit Fokus auf
							Branding, Purpose und Websites mit Wirkung.
						</h1>
					</div>
					{/* Description and button */}
					<div className="grid gap-4 grid-rows-[auto_auto] grid-cols-2 auto-cols-fr">
						<div className="col-span-1" />
						<div className="max-w-md space-y-8">
							<p className="text-base md:text-xl text-gray-300 leading-relaxed">
								In deinem Sinn, für dich, für deine Kund:innen und nicht zuletzt
								für uns, tun wir alles dafür, dass unsere Arbeit Sinn macht.
							</p>
							<button className="px-6 md:px-8 py-3 md:py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors duration-200 shadow-lg">
								unser Purpose
							</button>
						</div>
					</div>
				</div>
			</section>
			<section className="relative bg-white text-black" ref={containerRef}>
				<div className="z-10 absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-white  h-4" />
				<div className="gap-12 flex justify-start items-stretch py-40 max-w-4xl px-40  w-full">
					<div className="max-w-xl w-full  flex flex-col gap-4 items-start  ">
						<span className="border-clou-black mb-8 border text-xs rounded-full py-[.25rem] px-[.5rem] ">
							cases
						</span>
						<h2 className="text-3xl font-normal leading-tight">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
							repellat nulla facere illum esse molestiae tempore fugiat sit,
							doloribus maiores.
						</h2>
					</div>
				</div>

				{cardData.map((card) => (
					<Card
						key={card.id}
						id={card.id}
						accentColor={card.accentColor}
						info={card.info}
						title={card.title}
						description={card.description}
						imageSrc={card.imageSrc}
						imageAlt={card.imageAlt}
					/>
				))}
			</section>

			<section className="sticky-cards"></section>

			<section className="outro">
				<h1>Next Canvas Awaits</h1>
			</section>
		</>
	);
}
