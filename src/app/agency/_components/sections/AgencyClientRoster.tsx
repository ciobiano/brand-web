"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const startups = [
	{ name: "Nimbus Labs", location: "Lagos, Nigeria" },
	{ name: "Aurora Analytics", location: "Berlin, Germany" },
	{ name: "Marble AI", location: "Austin, USA" },
	{ name: "Kite Commerce", location: "Toronto, Canada" },
	{ name: "Verve Studios", location: "Nairobi, Kenya" },
	{ name: "Pulse Robotics", location: "Seoul, South Korea" },
	{ name: "Orbit Health", location: "London, United Kingdom" },
	{ name: "Drift Finance", location: "San Francisco, USA" },
];

export default function AgencyClientRoster() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const statementRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				// Word-by-word reveal for the statement
				if (statementRef.current) {
					const statement = statementRef.current;
					const words = statement.textContent?.split(" ") || [];
					statement.innerHTML = "";
					
					words.forEach((word, i) => {
						const span = document.createElement("span");
						span.textContent = word + " ";
						span.style.display = "inline-block";
						span.style.willChange = "transform, opacity";
						span.setAttribute("data-word", "");
						statement.appendChild(span);
					});

					gsap.set("[data-word]", {
						y: 40,
						opacity: 0,
					});

					gsap.to("[data-word]", {
						y: 0,
						opacity: 1,
						duration: 0.6,
						ease: "power3.out",
						stagger: 0.04,
						scrollTrigger: {
							trigger: statementRef.current,
							start: "top 75%",
							toggleActions: "play none none reverse",
						},
					});
				}

				// Client items stagger
				gsap.fromTo("[data-client-item]", 
					{ y: 30, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 0.6,
						ease: "power3.out",
						stagger: 0.06,
						scrollTrigger: {
							trigger: "[data-client-grid]",
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					}
				);
			}, sectionRef);

			return () => ctx.revert();
		},
		{ scope: sectionRef }
	);

	return (
		<section
			ref={sectionRef}
			className="relative bg-clou-black py-24 text-clou-gray sm:py-32"
		>
			<div className="absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-clou-black h-4" />

			{/* Large statement block - "machen Sinn." style */}
			<div className="px-6 lg:px-12 mb-24">
				<div className="max-w-6xl">
					<p 
						ref={statementRef}
						className="text-[clamp(3rem,8vw,7rem)] font-medium leading-[1.05] text-clou-white tracking-tight"
					>
						machen Sinn.
					</p>
				</div>
			</div>

			<div className="px-6 lg:px-12">
				<div className="space-y-6 max-w-5xl select-none text-[clamp(1.8rem,4vw,3rem)] leading-[1.3] mb-20">
					We&apos;re not just about flashy logos. We collaborate with anyone who
					values high quality – from local startups to global giants.
				</div>

				<div data-client-grid className="mt-16 w-full">
					<div className="grid grid-cols-1 gap-y-0 sm:grid-cols-2 sm:gap-16">
						{startups.map((startup) => (
							<div
								key={startup.name}
								data-client-item
								className="group flex items-center justify-between border-b border-clou-gray/30 py-8 cursor-pointer transition-colors hover:border-clou-gray/60 opacity-0"
							>
								<div className="flex-shrink-0 pr-4 text-lg sm:text-xl font-medium text-clou-white group-hover:text-white transition-colors">
									{startup.name}
								</div>
								<div className="min-w-0">
									<span className="text-sm uppercase tracking-wider text-clou-gray group-hover:text-clou-white/80 transition-colors">
										{startup.location}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
