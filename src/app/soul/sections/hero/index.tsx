"use client";

import React, { useRef } from "react";
import { heroImages } from "@/app/data";
import EnhancedImageCard from "./enhanced-image-card";
import { useInteractiveCanvas } from "@/app/hooks/useInteractiveCanvas";
import Navigation from "../nav/Navigation";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { gsap } from "gsap";

type HeroProps = {
	title?: string;
	subtitle?: string;
	cta_text?: string;
	cta_link?: string;
};

const Hero: React.FC<HeroProps> = ({
	title = "CLOU",
	cta_text = "Scroll",
	cta_link = "#",
}) => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);

	// Initialize interactive canvas with BLAZING FAST movement matching Clou.ch 53fps speed
	useInteractiveCanvas(heroRef, {
		intensity: 500, // EXTREME intensity for blistering speed
		maxDistance: 800, // Full screen magnetic field
		animationDuration: 0.4, // MEDIUM SPEED - 400ms response time
		ease: "none", // Zero easing for instant snap
	});

	useGSAP(
		() => {
			if (titleRef.current) {
				const typeSplit = new SplitType(titleRef.current, {
					types: "chars",
					tagName: "span",
				});

				gsap.from(typeSplit.chars, {
					autoAlpha: 0,
					yPercent: 100,
					duration: 0.75,
					rotation: -30,
					delay: 0.5,
					ease: "power4.out",
					stagger: { each: 0.025 },
				});

				// Clou.ch style: Immediate appearance with subtle scale animation
				gsap.from(".canvas-card", {
					scale: 0.95, // Very subtle scale change
					duration: 0.8, // Faster animation
					delay: 0, // No delay - immediate start
					ease: "power2.out", // Smooth but quick easing
					stagger: {
						each: 0.03, // Much faster stagger for snappy feel
						from: "random", // Random order like Clou.ch
					},
				});
			}
		},
		{ scope: titleRef }
	);

	return (
		<>
			{/* Custom black dot cursor */}
			<div className="custom-cursor"></div>

			{/* Fixed container for everything except images */}
			<div className="relative w-full h-screen bg-white">
				<Navigation />

				{/* Main title - fixed in viewport */}
				<div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
					<h1
						ref={titleRef}
						className="text-[200px] sm:text-[250px] md:text-[300px] lg:text-[350px] xl:text-[400px] 2xl:text-[450px] font-medium text-black leading-[0.9] select-none"
					>
						{title.split("").map((letter, index) => (
							<span key={index} className="inline-block">
								{letter}
							</span>
						))}
					</h1>
				</div>

				{/* Scrollable image container - ONLY this scrolls */}
				<div ref={heroRef} className="absolute inset-0  overflow-x-auto ">
					<div className="canvas-hero">
						{heroImages.map((image, index) => (
							<div key={index} className="canvas-card">
								<EnhancedImageCard
									src={image.src}
									alt={image.alt}
									width={400}
									height={300}
									link={image.link}
									className="w-full h-full"
								/>
							</div>
						))}
					</div>
				</div>

				{/* Scroll indicator - fixed in viewport */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
					<span className="text-black text-base font-medium mb-2">
						{cta_text}
					</span>
					<div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
				</div>
			</div>
		</>
	);
};

export default Hero;
