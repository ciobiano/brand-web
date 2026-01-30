"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "@/soul/primitives/Button";

gsap.registerPlugin(ScrollTrigger);

export default function AgencyHero() {
	const rootRef = useRef<HTMLElement | null>(null);
	const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
	const visualRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				// 1. Title Animation (Split Text) - Starts hidden via opacity-0 class
				if (heroTitleRef.current) {
					const title = heroTitleRef.current;
					const text = title.textContent || "";
					title.innerHTML = "";
					
					// Split text into chars
					text.split("").forEach((char) => {
						const span = document.createElement("span");
						span.textContent = char === " " ? "\u00A0" : char;
						span.style.display = "inline-block";
						span.style.willChange = "transform, opacity";
						span.setAttribute("data-char", "");
						title.appendChild(span);
					});

					// Animate chars in
					gsap.fromTo("[data-char]", 
						{ 
							yPercent: 120, 
							opacity: 0,
							rotateX: -90
						},
						{
							yPercent: 0,
							opacity: 1,
							rotateX: 0,
							duration: 1.2,
							ease: "power4.out",
							stagger: 0.03,
							delay: 0.2, // Wait for overlay to start sliding
						}
					);
				}

				// 2. Visual Element Entrance
				gsap.fromTo(visualRef.current,
					{ opacity: 0, scale: 0.8, y: 50 },
					{
						opacity: 1,
						scale: 1,
						y: 0,
						duration: 1.4,
						ease: "power3.out",
						delay: 0.4
					}
				);
				
				// 3. Intro Text Reveal ("We are digital by nature...")
				gsap.fromTo("[data-intro-text]",
					{ opacity: 0, y: 40 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: "power3.out",
						delay: 0.6,
						stagger: 0.1
					}
				);

				// 4. Team Banner Parallax & Expansion
				// We create a timeline to handle multiple animations on the banner simultaneously
				const bannerTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: "[data-team-banner-wrapper]",
						start: "top 90%", // Start expanding when the top of the wrapper hits 90% of the viewport height
						end: "bottom bottom", // Finish when the bottom hits the bottom
						scrub: 1, // Smooth scrubbing effect linked to scroll position
					}
				});

				// Animation 1: Expand width (using clip-path for performance)
				// Initial state (set in CSS or fromTo): inset(0% 5% 0% 5% round 2rem) creates the padding/rounded look
				bannerTimeline.fromTo("[data-team-banner-wrapper]",
					{ 
						clipPath: "inset(0% 5% 0% 5% round 2rem)", 
					},
					{
						clipPath: "inset(0% 0% 0% 0% round 0rem)",
						ease: "power2.inOut", // Smooth easing for the expansion
					},
					0 // Start at time 0
				);

				// Animation 2: Parallax effect on the image itself
				// Moves the image slightly slower than the scroll to create depth
				bannerTimeline.fromTo("[data-team-banner]",
					{ yPercent: -10, scale: 1.1 }, // Start zoomed in slightly
					{
						yPercent: 10,
						scale: 1,
						ease: "none",
					},
					0 // Sync with expansion
				);

			}, rootRef);

			return () => ctx.revert();
		},
		{ scope: rootRef }
	);

	return (
		<main ref={rootRef} className="flex flex-col bg-clou-white min-h-screen pt-32 sm:pt-40 pb-20">
			{/* Top Section: Title Left, Visual Right */}
			<section className="px-6 lg:px-12 mb-32">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					{/* Left: Huge Title */}
					<div className="relative z-10">
						<h1
							ref={heroTitleRef}
							className="text-[clamp(5rem,18vw,10rem)]  leading-[0.8] tracking-tight text-clou-black"
							style={{ perspective: "1000px" }}
						>
							Agency
						</h1>
					</div>

					{/* Right: Visual Element (Placeholder for Pink Rabbit) */}
					<div 
						ref={visualRef}
						className="relative w-full mt-20 aspect-square  max-w-[250px] mx-auto lg:ml-auto lg:mr-30 opacity-0"
					>
						{/* Placeholder Visual - A styled abstract shape */}
						<div className="w-full h-[400px] bg-gradient-to-br from-pink-400 to-rose-600 shadow-2xl flex items-center justify-center transform  hover:rotate-6 transition-transform duration-500">
							<span className="text-white text-opacity-80 font-medium text-lg">Visual / 3D Element</span>
						</div>
					</div>
				</div>
			</section>

			{/* Middle Section: Intro Text */}
			<section className="px-4 lg:px-6 mb-32 max-w-[100rem] mx-auto">
				<p 
					data-intro-text
					className="text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.2] tracking- text-clou-black text-neutral-500 font-light  text-center lg:text-left opacity-0"
				>
					We are digital by nature. We create real connections between brands and people. 
					Unique and authentic connections, the kind that transcend the screen. 
					The kind that become experiences that transform and endure.
				</p>
				<p 
					data-intro-text
					className="mt-8 text-xl sm:text-2xl text-neutral-500 max-w-4xl text-center lg:text-left opacity-0"
				>
					Because we know that behind every project there are stories, desires and goals that deserve to come true.
				</p>
			</section>

			{/* Bottom Section: Team Banner */}
			{/* We add "inset-x-0" to make sure it can be full width, but clip-path handles the visual padding */}
			<section 
				data-team-banner-wrapper 
				className="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden will-change-[clip-path]"
			>
				<div 
					data-team-banner
					className="relative w-full h-[120%] -mt-[10%]"
				>
					<Image
						src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
						alt="Agency Team"
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-black/10" />
				</div>
			</section>
		</main>
	);
}
