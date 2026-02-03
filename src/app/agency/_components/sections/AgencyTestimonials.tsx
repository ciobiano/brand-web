"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Slider, { type SlideData } from "@/soul/primitives/Slider";
import Button from "@/soul/primitives/Button";

gsap.registerPlugin(ScrollTrigger);





export default function AgencyTestimonials() {
	const sectionRef = useRef<HTMLElement | null>(null);

	

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				
				// Outro text animation
				gsap.set("[data-outro-text]", {
					y: 60,
					opacity: 0,
				});

				gsap.to("[data-outro-text]", {
					y: 0,
					opacity: 1,
					duration: 0.9,
					ease: "power3.out",
					stagger: 0.12,
					scrollTrigger: {
						trigger: "[data-outro-section]",
						start: "top 95%",
						toggleActions: "play none none reverse",
					},
				});
			}, sectionRef);

			return () => ctx.revert();
		},
		{ scope: sectionRef }
	);

	return (
		<>
			<section
				ref={sectionRef}
				className="relative rounded-b-2xl bg-kainé-black py-24 text-kainé-white sm:py-20"
				data-cursor-invert
			>
				<div className="flex flex-col gap-16 px-6 lg:px-12">
				

					<div className="my-16 flex flex-col gap-16 px-4 lg:px-10">
						<div data-outro-text className="text-6xl font-medium leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
							From humans <br />to humans.
						</div>
						<p data-outro-text className="max-w-5xl pt-4 text-2xl leading-relaxed text-kainé-gray sm:text-3xl lg:text-4xl">
							We&apos;re real people dedicated to helping others achieve great
							things. We value and respect everyone we work with, and we&apos;re
							grateful that what we love doing also pays our bills.
						</p>
					</div>
				</div>
			</section>

			<section data-outro-section className="relative py-24 text-kainé-black sm:py-32 bg-white">
				<div className="mb-40 flex w-full flex-col gap-12 px-6 lg:px-10">
					<div className="flex max-w-2xl flex-col gap-6">
						<h2 data-outro-text className="max-w-xl text-xl leading-relaxed text-kainé-black md:text-2xl lg:text-3xl">
							Would you also like to write us something nice like that? Then
							let&apos;s implement a joint project.
						</h2>
						<div data-outro-text className="flex flex-col gap-4 sm:flex-row" >
							<Button  variant="primary" size="md" href="/contact" >
								Make contact
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
