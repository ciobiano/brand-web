"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "@/soul/primitives/Button";

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
	const cardsPinRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				if (!cardsPinRef.current) return;

				const cardShell = cardsPinRef.current;
				const section = sectionRef.current;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: cardShell,
					start: "top 80%",
					end: "+=200%", // or link to your anchor once renamed
					scrub: true,
					pin: true,
					markers: true,
				},
			});

			tl.to(cardShell, {
				scale: 2,
				z:350,
				transformOrigin: "center center",
				ease: "power1.inOut",
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
				className="relative bg-clou-black py-28 rounded-b-2xl text-clou-white sm:py-32"
			>
				{/* Header scrolls normally */}
				<div className="flex flex-col gap-20 px-10 lg:px-12">
					<div className="text-9xl font-semibold tracking-[-0.03em]">
						Real stories,
						<br /> real result.
					</div>

					<div className="relative my-10 ">
						{/* Replace/wrap with Swiper if you like — no impact on the zoom */}
						<div
							ref={cardsPinRef}
							className="inline-grid grid-flow-col auto-cols-[75vw] gap-4 md:gap-8"
						>
							{testimonials.map((t, i) => {
								const bg = gradientImages[i % gradientImages.length];
								return (
									<div
										key={i}
										className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 bg-cover bg-center bg-no-repeat grainy-card "
										style={{ backgroundImage: `url(${bg})` }}
									>
										<div className="relative z-10 flex h-[32rem] w-full flex-col gap-6 p-10 sm:h-[70vh]">
											<div className="flex items-center gap-4">
												<span className="flex h-20 w-20 items-center justify-center rounded-full bg-clou-gray/20" />
												<div className="flex flex-col gap-2">
													<h1 className="text-xl font-semibold">{t.name}</h1>
													<span className="text-lg text-clou-gray">
														{t.role}
													</span>
												</div>
											</div>

											<div className="flex flex-1 items-center justify-center text-center">
												<p className="max-w-3xl text-start text-5xl text-clou-gray">
													{t.quote}
												</p>
											</div>
										</div>

										{/* Optional overlay for contrast while zooming */}
										<div className="pointer-events-none absolute inset-0 bg-black/10" />
									</div>
								);
							})}
							<div className="anchor.next.container" />
						</div>
					</div>

					{/* Rest scrolls normally */}
					<div className="my-20 flex flex-col gap-20 px-10">
						<div className="text-[120px] font-semibold leading-none tracking-[-0.03em]">
							From humans <br /> to humans.
						</div>
						<p className="max-w-8xl pt-4 text-[4rem] leading-tight text-clou-gray">
							We&apos;re real people dedicated to helping others achieve great
							things. We value and respect everyone we work with, and we&apos;re
							grateful that what we love doing also pays our bills.
						</p>
					</div>
				</div>
			</section>

			<section className="relative py-24 text-clou-black sm:py-40">
				<div className="flex w-full flex-col gap-16 px-10 mb-80">
					<div className="flex max-w-2xl flex-col gap-4 ">
						<h2 className="max-w-lg text-xl leading-10 text-clou-black md:text-[2rem]">
							Would you also like to write us something nice like that? Then
							let&apos;s implement a joint project.
						</h2>
						<div className="flex flex-col gap-4 sm:flex-row">
							<Button variant="primary" size="md">
								Make contact
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
