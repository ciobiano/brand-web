"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePageAnimationReady } from "@/soul/primitives/page-transition";
import { useHeadingCharAnimation } from "@/hooks/useHeadingCharAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";
import Button from "@/soul/primitives/Button";

gsap.registerPlugin(ScrollTrigger);

export default function AgencyHero() {
	const rootRef = useRef<HTMLElement | null>(null);
	const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
	const visualRef = useRef<HTMLDivElement | null>(null);
	const introPara1Ref = useRef<HTMLParagraphElement | null>(null);
	const introPara2Ref = useRef<HTMLParagraphElement | null>(null);
	const bannerParaRef = useRef<HTMLParagraphElement | null>(null);

	const isPageReady = usePageAnimationReady();

	useHeadingCharAnimation(heroTitleRef, isPageReady, { delay: 0.1 });

	useTextReveal(introPara1Ref, {
		isReady: isPageReady,
		delay: 0.3,
		stagger: 0.12,
	});

	useTextReveal(introPara2Ref, {
		isReady: isPageReady,
		delay: 0.5,
		stagger: 0.12,
	});

	useTextReveal(bannerParaRef, {
		isReady: isPageReady,
		animateOnScroll: true,
		start: "top 75%",
	});

	useGSAP(
		() => {
			if (!isPageReady) return;

			const ctx = gsap.context(() => {
				const tl = gsap.timeline();

				tl.fromTo(visualRef.current,
					{ opacity: 0, scale: 0.8, y: 50 },
					{
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 1,
						ease: "power3.out",
					},
					0
				);

				gsap.fromTo("[data-team-banner-wrapper]",
					{ clipPath: "inset(0% 5% 0% 5% round 2rem 2rem 0 0)" },
					{
						clipPath: "inset(0% 0% 0% 0% round 2rem 2rem 0 0)",
						ease: "power2.inOut",
						scrollTrigger: {
							trigger: "[data-team-banner-wrapper]",
							start: "top 90%",
							end: "top 50%",
							scrub: 1,
						}
					}
				);

				ScrollTrigger.create({
					trigger: "[data-team-banner-wrapper]",
					start: "center 20%",
					end: "+=100%",
					pin: true,
					pinSpacing: false,
				});

				gsap.to("[data-marquee-track]", {
					xPercent: -50,
					duration: 15,
					ease: "none",
					repeat: -1,
				});

			}, rootRef);

			return () => ctx.revert();
		},
		{ scope: rootRef, dependencies: [isPageReady] }
	);

	return (
		<main ref={rootRef} className="flex flex-col gap-20 bg-kainé-white  pb-20">
			<section className="px-6 lg:px-12 mb-32">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 space-y-80 items-start">
					<div className="relative z-10  ">
						<h1
							ref={heroTitleRef}
							className="text-[clamp(5rem,18vw,14rem)]  font-medium  tracking-tight text-kainé-black"
							style={{ perspective: "1000px" }}
						>
							Agency
						</h1>
					</div>

					<div
						ref={visualRef}
						className="relative w-full mt-20 aspect-square  max-w-[250px] mx-auto lg:ml-auto lg:mr-30 opacity-0"
					>
						<div className="w-full h-[400px] shadow-2xl flex items-center justify-center transform  hover:rotate-6 transition-transform duration-500">
							<Image
								src="/assets/agency-art.JPG"
								alt="Agency Art"
								fill
								className="object-cover w-full h-[400px]"
								priority
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="px-6 lg:px-12 mb-40 gap-20 flex flex-col  ">
				<p
					ref={introPara1Ref}
					data-body-text
					className="text-[clamp(1.8rem,3.5vw,1.5rem)] leading-[1.2] max-w-4xl  text-kainé-black font-light  text-center lg:text-left"
				>
					We are digital by nature. We create real connections between brands and people.
					Unique and authentic connections, the kind that transcend the screen.
					The kind that become experiences that transform and endure.
				</p>
				<p
					ref={introPara2Ref}
					data-body-text
					className="mt-8 text-xl sm:text-2xl text-kainé-black max-w-2xl md:ml-auto text-center lg:text-left"
				>
					Because we know that behind every project there are stories, desires and goals that deserve to come true.
				</p>
			</section>


			<section
				data-team-banner-wrapper
				className="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden will-change-[clip-path] bg-kainé-black"
			>
				<div className="relative w-full h-full mt-28">
					<div className="flex flex-col w-full h-full mt-20 gap-24">
						<div className="w-full overflow-hidden whitespace-nowrap">
							<div data-marquee-track className="inline-flex gap-8 will-change-transform text-kainé-white">
								<span className="text-4xl md:text-[clamp(15rem,10vw,10rem)] font-medium md:leading-[130%]">
									Create. Build. Launch.
								</span>
								<span className="text-4xl md:text-[clamp(15rem,10vw,10rem)] font-medium md:leading-[130%]">
									Create. Build. Launch.
								</span>
							</div>
						</div>
						<div className="grid gap-4 grid-rows-[auto_auto] grid-cols-2 auto-cols-fr">
							<div className="col-span-1" />
							<div className="max-w-md space-y-8">
								<p ref={bannerParaRef} data-body-text className=" md:text-2xl text-gray-300 leading-relaxed ">
									In your best interest, for you, for your customers, and last but not least for us, we do everything to ensure our work makes sense.
								</p>
								<div>
									<Button variant="secondary" size="lg" href="/purpose">
										our purpose
									</Button>
								</div>
							</div>
						</div>
					</div>

					<div className="absolute inset-0 bg-black/10" />
				</div>
			</section>
		</main>
	);
}
