"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Badge from "@/soul/primitives/Badge";

gsap.registerPlugin(ScrollTrigger);

const services = [
	{ id: "01", title: "Branding & Identity", description: "Strategic brand development" },
	{ id: "02", title: "Web Design & Development", description: "Digital experiences that convert" },
	{ id: "03", title: "Motion Design", description: "Animation that tells your story" },
	{ id: "04", title: "UX/UI Design", description: "User-centered design solutions" },
	{ id: "05", title: "Product Strategy", description: "From concept to market" },
	{ id: "06", title: "AI Integration", description: "Intelligent digital solutions" },
];

export default function AgencyExpertise() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				// Title animation
				gsap.fromTo("[data-expertise-title]",
					{ y: 60, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 75%",
							toggleActions: "play none none reverse",
						},
					}
				);

				// Staggered service items entrance
				gsap.fromTo("[data-service-item]",
					{ y: 40, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.8,
						ease: "power3.out",
						stagger: 0.08,
						scrollTrigger: {
							trigger: "[data-services-list]",
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					}
				);

				// Hover animations for service items
				const items = sectionRef.current?.querySelectorAll("[data-service-item]");
				items?.forEach((item) => {
					const arrow = item.querySelector("[data-arrow]");
					const bg = item.querySelector("[data-bg]");

					item.addEventListener("mouseenter", () => {
						gsap.to(bg, {
							scaleX: 1,
							duration: 0.4,
							ease: "power2.out",
						});
						gsap.to(arrow, {
							x: 8,
							opacity: 1,
							duration: 0.3,
							ease: "power2.out",
						});
						gsap.to(item, {
							color: "#ffffff",
							duration: 0.3,
						});
					});

					item.addEventListener("mouseleave", () => {
						gsap.to(bg, {
							scaleX: 0,
							duration: 0.4,
							ease: "power2.out",
						});
						gsap.to(arrow, {
							x: 0,
							opacity: 0,
							duration: 0.3,
							ease: "power2.out",
						});
						gsap.to(item, {
							color: "#101114",
							duration: 0.3,
						});
					});
				});
			}, sectionRef);

			return () => ctx.revert();
		},
		{ scope: sectionRef }
	);

	return (
		<section ref={sectionRef} className="py-24 px-4 sm:px-6 bg-white">
			<div className="w-full mx-auto">
				<div className="mb-16 lg:mb-20">
					<Badge
						className="mb-4"
						variant="outline"
						size="sm"
						>Expertise</Badge>
					<h2
						data-expertise-title
						className="text-4xl  leading-tight sm:text-5xl lg:text-6xl text-kainé-black max-w-4xl opacity-0"
					>
						With two decades of experience, companies worldwide trusted us to handle various digital aspects.
					</h2>
				</div>

				<div data-services-list className="mt-16 w-full">
					<div className="flex flex-col">
						{services.map((service) => (
							<div
								key={service.id}
								data-service-item
								className="relative group flex items-center justify-between border-b border-neutral-200 py-8 cursor-pointer overflow-hidden opacity-0"
							>
								{/* Background slide */}
								<div
									data-bg
									className="absolute inset-0 bg-kainé-black origin-left scale-x-0 z-0"
								/>

								<div className="relative z-10 flex items-center gap-8 flex-1 px-2">
									<span className="text-lg font-medium text-neutral-400 w-12 group-hover:text-neutral-500 transition-colors">
										{service.id}
									</span>
									<div className="flex flex-col gap-1">
										<h3 className="text-2xl font-medium sm:text-3xl lg:text-4xl transition-colors">
											{service.title}
										</h3>
										<p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">
											{service.description}
										</p>
									</div>
								</div>

								{/* Arrow indicator */}
								<div className="relative z-10 pr-4">
									<svg
										data-arrow
										className="w-6 h-6 opacity-0 -translate-x-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										/>
									</svg>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
