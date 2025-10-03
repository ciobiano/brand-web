"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "@/soul/primitives/Button";

gsap.registerPlugin(ScrollTrigger);

type LabelVariant = "center" | "mid-left" | "none";

type VideoSlide = {
	type: "video";
	sources: {
		src: string;
		type: string;
	}[];
	poster: string;
	label?: string;
	labelVariant?: LabelVariant;
};

type ImageSlide = {
	type: "image";
	src: string;
	label?: string;
	labelVariant?: LabelVariant;
};

type Slide = VideoSlide | ImageSlide;

const defaultLabelVariant: Record<Slide["type"], LabelVariant> = {
	video: "center",
	image: "mid-left",
};

const labelContainerClasses: Record<LabelVariant, string> = {
	center: "inset-0 flex items-center justify-center",
	"mid-left": "top-1/2 left-0 flex -translate-y-1/2 items-center px-4 py-5",
	none: "",
};

const labelTextClasses: Record<LabelVariant, string> = {
	center: "text-center",
	"mid-left": "text-left",
	none: "",
};

const slides: Slide[] = [
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

export default function AgencyHero() {
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
		<main ref={rootRef} className="flex  flex-col text-neutral-900">
			<div className="mb-80 flex flex-1 flex-col gap-10 px-4 pt-32 sm:px-6 ">
				<section className="grid gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
					<h1
						data-hero-line
						className="text-[clamp(4.5rem,16vw,13rem)] leading-[0.85] tracking-tight lg:col-span-2"
					>
						Agency
					</h1>
					<span aria-hidden className="hidden lg:block" />
					<div className="flex flex-col gap-10  ">
						<p
							data-hero-line
							className="text-base text-neutral-600 sm:text-lg lg:col-start-2 lg:mt-10 lg:max-w-2xl lg:text-2xl lg:justify-self-start"
						>
							Stories and field notes from the studio. Strategy sprints,
							time-out journals, and the experiments moving our practice
							forward.
						</p>
						<div className="w-full">
							<Button variant="secondary" size="md">
								Newsletter sign up
							</Button>
						</div>
					</div>
				</section>
				<section className="relative py-10 bg-white text-black">
					<div>
						<div ref={cardsWrapperRef} className="relative">
							<div
								ref={cardsRef}
								className="inline-grid grid-flow-col auto-cols-[clamp(20rem,_85vw,_60rem)] gap-4 md:gap-8"
								data-hero-cards
							>
								{slides.map((slide, index) => {
									const labelVariant =
										slide.labelVariant ?? defaultLabelVariant[slide.type];
									const shouldRenderLabel =
										Boolean(slide.label) && labelVariant !== "none";

									return (
										<div
											key={index}
											className="relative w-full overflow-hidden rounded-[32px] border border-black/5 bg-black/5"
										>
											<div className="relative h-[32rem] w-[57vw] max-w-[1022px] sm:h-[54vh] lg:max-h-[70vh]">
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
														alt={slide.label ?? "Agency case study"}
														fill
														className="object-cover"
														sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 45vw, 100vw"
														priority={index === 0}
													/>
												)}
												{shouldRenderLabel && (
													<div
														className={`pointer-events-none absolute z-10 text-white ${labelContainerClasses[labelVariant]}`}
													>
														<p
															className={`text-3xl ${labelTextClasses[labelVariant]}`}
														>
															{slide.label}
														</p>
													</div>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					<div className="mx-auto mt-20 w-full overflow-hidden rounded-[32px] border border-clou-black/25 bg-clou-black px-6 py-16 text-clou-white">
						<div className="grid min-h-[360px] grid-rows-[1fr_auto] gap-64">
							<div className="px-20">
								<p className="max-w-7xl text-[clamp(2.2rem,4.8vw,3.7rem)] font-semibold leading-[1.15]">
									To put it simply, you can rent our talented experts or an
									entire team on a short-term or long-term basis to help you
									design, build, and launch your project.
								</p>
							</div>
							<div className="relative mt-10" aria-label="Service capabilities">
								<div className="flex w-max gap-10 animate-marquee-soft text-2xl font-medium tracking-[0.05em] text-clou-gray sm:text-xl">
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
				</section>
			</div>
		</main>
	);
}
