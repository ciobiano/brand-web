"use client";

import React, { useRef } from "react";
import { heroImages } from "@/data";
import EnhancedImageCard from "./enhanced-image-card";
import { useInteractiveCanvas } from "@/hooks/useInteractiveCanvas";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { usePageAnimationReady } from "@/soul/primitives/page-transition";

type HeroProps = {
	title?: string;
	cta_text?: string;
};
gsap.registerPlugin(SplitText);

const Hero: React.FC<HeroProps> = ({
	title = "Kainé",
	cta_text = "Scroll",
}) => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);

	const isPageReady = usePageAnimationReady();

	useInteractiveCanvas(heroRef, {
		intensity: 500,
		maxDistance: 800,
		animationDuration: 0.4,
		ease: "none",
	});

	useGSAP(
		() => {
			if (!isPageReady) return;
			if (!titleRef.current || !heroRef.current) return;

			const tl = gsap.timeline();

			const typeSplit = new SplitText(titleRef.current, {
				type: "chars",
				tagName: "span",
			});

			tl.from(
				typeSplit.chars,
				{
					autoAlpha: 0,
					yPercent: 100,
					duration: 0.5,
					rotation: -30,
					ease: "power4.out",
					stagger: { each: 0.025 },
				},
				0.2
			);

			const cards = heroRef.current.querySelectorAll(".canvas-card");
			tl.from(
				cards,
				{
					duration: 0.5,
					scale: 0.5,
					opacity: 0,
					ease: "back.out",
					stagger: {
						from: "random",
						amount: 1,
					},
				},
				0.1
			);

			return () => {
				typeSplit.revert();
			};
		},
		{ dependencies: [isPageReady] }
	);

	return (
		<main className="w-full  min-h-screen">
			<div className="relative w-full h-svh  ">

				<div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
					<h1
						ref={titleRef}
						className="text-[200px] sm:text-[250px] md:text-[150px] lg:text-[200px] xl:text-[400px] 2xl:text-[25vh]  text-black  select-none"
					>
						{title.split("").map((letter, index) => (
							<span key={index} className="inline-block">
								{letter}
							</span>
						))}
					</h1>
				</div>

				<div ref={heroRef} className="absolute inset-0   ">
					<div className="canvas-hero">
						{heroImages.map((image, index) => (
							<div key={index} className="canvas-card">
								<EnhancedImageCard
									src={image.src}
									alt={image.alt}
									link={image.link}
									className="w-[300px] h-[225px] sm:w-[400px] sm:h-[300px]"
								/>
							</div>
						))}
					</div>
				</div>
				<div className="absolute h-full left-0 top-[100vh] right-0 bg-[linear-gradient(#fff0,_#fff_25%)] " />

				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
					<span className="text-black text-base font-medium mb-2">
						{cta_text}
					</span>
					<div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
				</div>
			</div>
		</main>
	);
};

export default Hero;
