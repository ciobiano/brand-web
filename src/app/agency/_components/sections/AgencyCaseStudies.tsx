"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Slider, { type SlideData } from "@/soul/primitives/Slider";

gsap.registerPlugin(ScrollTrigger);

const slides: SlideData[] = [
	{
		imageUrl:
			"https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/6823861bbf033cf0b7090529_Standard_Mode_the_man_blink_with_one_eye%20(1)-poster-00001.jpg",
		caption: "Transistor • Immersive launch campaign built around real-time product demos.",
	},
	{
		imageUrl:
			"https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/680f204dd3110a6fca214fbd_img-2-big.webp",
		caption: "Tuple • Delivered a collaborative design system used by 40+ product squads.",
	},
	{
		imageUrl:
			"https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/680f205015fb858aa5c81abc_img-1-big.webp",
		caption: "Reform • Crafted a modular brand kit spanning 14 service verticals.",
	},
];

export default function AgencyCaseStudies() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			const section = sectionRef.current;
			if (!section) {
				return;
			}

			const trigger = ScrollTrigger.create({
				trigger: section,
				start: "70% center",
				end: () => `+=${Math.max(window.innerHeight, section.offsetHeight)}`,
				pin: section,
				pinSpacing: false,
				anticipatePin: 1,
				invalidateOnRefresh: true,
			});

			return () => {
				trigger.kill();
			};
		},
		{ scope: sectionRef }
	);

	return (
		<section ref={sectionRef} id="work" className="py-28 sm:py-32">
			<div className="w-full px-6 lg:px-10">
				<div className="flex flex-col gap-24 lg:gap-2">
					<div className="text-5xl font-semibold tracking-[-0.03em] sm:text-7xl lg:text-9xl">
						We deliver.
						<br /> Period.
					</div>
					
					<Slider slides={slides} theme="light" />
				</div>
			</div>
		</section>
	);
}
