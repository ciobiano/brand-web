"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
	{
		quote:
			"The team’s enthusiasm and dedication were obvious. They set up an efficient workflow, delivered ahead of schedule, and made the process stress-free.",
		name: "Jordan Rivers",
		role: "Product Lead, VentureCo",
		location: "Remote",
	},
	{
		quote:
			"They felt like an internal squad. They aligned our stakeholders, built momentum, and shipped a product customers now rely on every day.",
		name: "Taylor Morgan",
		role: "Head of Product, Nimbus Labs",
		location: "Global",
	},
	{
		quote:
			"They translated a complex workflow into something effortless. The craft and thinking behind every detail is world-class.",
		name: "Casey Lee",
		role: "Founder, Horizon Works",
		location: "Distributed",
	},
];

const gradientImages = [
	"/gradient-1.jpg",
	"/gradient-2.webp",
	"/gradient-3.jpg",
];

export default function TestimonialsSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const pinRef = useRef<HTMLDivElement | null>(null);
	const trackRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				if (!sectionRef.current || !pinRef.current || !trackRef.current) {
					return;
				}

				const track = trackRef.current;
				const pinTarget = pinRef.current;

				const getScrollAmount = () => {
					const overflow = track.scrollWidth - pinTarget.clientWidth;
					return overflow > 0 ? overflow : 0;
				};

				gsap.set(track, { x: 0 });

				if (getScrollAmount() <= 0) {
					return;
				}

				gsap.to(track, {
					x: () => -getScrollAmount(),
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: () => `+=${getScrollAmount()}`,
						scrub: 1,
						pin: pinTarget,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					},
				});
			}, sectionRef);

			return () => ctx.revert();
		},
		{ scope: sectionRef }
	);

	return (
		<section
			ref={sectionRef}
			className="relative bg-clou-black py-28  text-clou-white sm:py-32"
		>
			<div className="flex flex-col px-10 lg:px-12 gap-20">
				<div className="text-9xl  font-semibold  tracking-[-0.03em]">
					Real stories,
					<br /> real result.
				</div>

				<div className="relative my-10">
					<div
						className="inline-grid grid-flow-col auto-cols-[75vw] gap-4 md:gap-8"
						data-hero-cards
					>
						{testimonials.map((testimonial, index) => {
							const backgroundImage =
								gradientImages[index % gradientImages.length];
							return (
								<div
									key={index}
									className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-cover bg-center bg-no-repeat grainy-card"
									style={{
										backgroundImage: `url(${backgroundImage})`,
									}}
								>
									<div className="relative z-10 flex h-[32rem] w-full flex-col gap-6 p-10 sm:h-[70vh]">
										<div className="flex items-center gap-4">
											<span className="flex h-20 w-20 items-center justify-center rounded-full bg-clou-gray/20" />

											<div className="flex flex-col gap-2">
												<h1 className="text-xl font-semibold">
													{testimonial.name}
												</h1>
												<span className="text-lg text-clou-gray">
													{testimonial.role}
												</span>
											</div>
										</div>

										<div className="flex flex-1 items-center justify-center text-center">
											<p className="max-w-3xl text-start text-5xl text-clou-gray">
												{testimonial.quote}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex flex-col px-10 gap-20 my-20">
					<div className="text-[120px] leading-none  font-semibold  tracking-[-0.03em]">
						From humans <br /> to humans.
					</div>
					<p className="max-w-8xl text-[4rem] pt-4 leading-tight text-clou-gray">
						We&apos;re real people dedicated to helping others achieve great things.
						We value and respect everyone we work with, and we&apos;re grateful that
						what we love doing also pays our bills. 
					</p>
				</div>
			</div>
				
		</section>
	);
}
