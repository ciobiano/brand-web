"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
	{
		type: "video" as const,
		sources: [
			{
				src: "https://cdn.prod.website-files.com/6753439d3da31c3534ed228c%2F6823861bbf033cf0b7090529_Standard_Mode_the_man_blink_with_one_eye%20%281%29-transcode.mp4",
				type: "video/mp4",
			},
			{
				src: "https://cdn.prod.website-files.com/6753439d3da31c3534ed228c%2F6823861bbf033cf0b7090529_Standard_Mode_the_man_blink_with_one_eye%20%281%29-transcode.webm",
				type: "video/webm",
			},
		],
		poster:
			"https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/6823861bbf033cf0b7090529_Standard_Mode_the_man_blink_with_one_eye%20(1)-poster-00001.jpg",
		label: "Made by humans.",
	},
	{
		type: "image" as const,
		src: "https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/680f204dd3110a6fca214fbd_img-2-big.webp",
		label: "Built to deliver.",
	},
	{
		type: "image" as const,
		src: "https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/680f205015fb858aa5c81abc_img-1-big.webp",
		label: "Rooted in craft.",
	},
];

const specialties = [
	"Development.",
	"AI Integration.",
	"Motion Design.",
	"UX Design.",
	"Visual Design.",
	"Branding.",
	"Prototyping.",
	"Visual Front-End Engineering.",
];

export default function Header() {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const cardsWrapperRef = useRef<HTMLDivElement | null>(null);
	const cardsRef = useRef<HTMLDivElement | null>(null);
	const marqueeItems = [...specialties, ...specialties, ...specialties];

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				gsap.set("[data-hero-line]", { yPercent: 110, opacity: 0 });
				gsap.timeline({ delay: 0.4 }).to("[data-hero-line]", {
					yPercent: 0,
					opacity: 1,
					duration: 1,
					ease: "power4.out",
					stagger: 0.12,
				});

				if (rootRef.current && cardsWrapperRef.current && cardsRef.current) {
					const section = rootRef.current;
					const wrapper = cardsWrapperRef.current;
					const cards = cardsRef.current;
										const getScrollAmount = () =>
																		Math.max(0, cards.scrollWidth - wrapper.clientWidth);

					if (getScrollAmount() > 0) {
						
						gsap.fromTo(
							cards,
							{ x: 0 },
							{
								x: () => -getScrollAmount(),
								ease: "none",
								scrollTrigger: {
									trigger: wrapper,
									pin: section,
									start: "center center",
									end: () => `+=${getScrollAmount()}`,
									scrub: 1,
									markers: true,
									invalidateOnRefresh: true,
								},
							}
						);
					}
				}
			}, rootRef);

			return () => ctx.revert();
		},
		{ scope: rootRef }
	);

	return (
		<section ref={rootRef} className="relative bg-white text-black">
			<div className="flex w-full flex-col gap-6 px-6 pb-24 mt-48">
				<div className="space-y-8 px-10 pb-10">
					<p className="text-xs font-medium uppercase tracking-[0.45em] text-black/60">
						Award-winning agency with 18 years of experience worldwide.
					</p>
					<h1 className="max-w-3xl text-4xl font-semibold uppercase leading-tight sm:text-5xl lg:text-[4.1rem] lg:leading-[1.15]">
						<span className="block overflow-hidden">
							<span data-hero-line className="block">
								Welcome!
							</span>
						</span>
						<span className="block overflow-hidden">
							<span data-hero-line className="block">
								From designers to developers, we&apos;ve got you covered.
							</span>
						</span>
					</h1>
				</div>

				<div>
					<div ref={cardsWrapperRef} className="relative">
						<div
							ref={cardsRef}
							className="inline-grid grid-flow-col auto-cols-[clamp(20rem,_85vw,_60rem)] gap-4 md:gap-8"
							data-hero-cards
						>
							{slides.map((slide, index) => (
								<div
									key={index}
									className="relative w-full overflow-hidden rounded-[32px] border border-black/5 bg-black/5"
								>
									<div className="relative h-[32rem] w-full sm:h-[54vh] lg:h-[65vh]">
										{slide.type === "video" ? (
											<video
												className="h-full w-full object-cover"
												autoPlay
												loop
												muted
												playsInline
												poster={slide.poster}
											>
												{slide.sources.map((source) => (
													<source
														key={source.src}
														src={source.src}
														type={source.type}
													/>
												))}
											</video>
										) : (
											<Image
												src={slide.src}
												alt={slide.label}
												fill
												className="object-cover"
												sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 45vw, 100vw"
												priority={index === 0}
											/>
										)}
									</div>
									<div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
										<p className="text-sm uppercase tracking-[0.4em]">
											{slide.label}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mx-auto w-full rounded-[32px] border border-clou-red/25 bg-clou-red px-6 py-16 text-black shadow-[0_40px_80px_-45px_rgba(0,0,0,0.55)] sm:px-16 sm:py-24 lg:px-[120px]">
					<div className="grid min-h-[360px] grid-rows-[1fr_auto] gap-64">
						<p className="max-w-7xl text-[clamp(2.2rem,4.8vw,3.7rem)] font-semibold leading-[1.15] ">
							To put it simply, you can rent our talented experts or an entire team on a short-term or long-term basis to help you design, build, and launch your project.
						</p>
						<div className="relative mt-10 overflow-hidden" aria-label="Service capabilities">
							<div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-clou-red via-clou-red/70 to-transparent" />
							<div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-clou-red via-clou-red/70 to-transparent" />
							<div className="flex w-max gap-10 text-lg font-medium tracking-[0.05em] text-black/50 sm:text-xl animate-marquee-soft motion-reduce:animate-none">
								{marqueeItems.map((item, index) => (
									<span
										key={`${item}-${index}`}
										className="whitespace-nowrap"
										aria-hidden={index >= specialties.length}
									>
										{item}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
				</div>
		</section>
	);
}
