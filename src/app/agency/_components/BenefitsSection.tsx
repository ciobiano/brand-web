"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
	{
		id: "01",
		title: "Functional web and mobile apps",
		description:
			"Ship reliable experiences instead of fighting recurring frustration.",
	},
	{
		id: "02",
		title: "Mindfully structured design systems",
		description:
			"Bring order to complex ecosystems with flexible foundations you can scale.",
	},
	{
		id: "03",
		title: "Clickable product prototypes",
		description:
			"Rally stakeholders with immersive stories rather than static slides.",
	},
	{
		id: "04",
		title: "Minimum viable products",
		description:
			"Launch faster with focused MVPs that validate ideas and funding conversations.",
	},
	{
		id: "05",
		title: "Automated quality assurance",
		description:
			"Replace repeatable manual testing with automated coverage and alerts.",
	},
	{
		id: "06",
		title: "Memorable branding systems",
		description:
			"Create recognizable brand worlds that translate into every digital touchpoint.",
	},
	{
		id: "07",
		title: "AI-powered automation",
		description:
			"Remove bottlenecks across operations with smart, human-first workflows.",
	},
	{
		id: "08",
		title: "Invisible partner work",
		description:
			"Collaborate with a proven team that adapts to your tools, rituals, and ambitions.",
	},
];

export default function BenefitsSection() {
	const videoContainerRef = useRef<HTMLDivElement | null>(null);
	const videoElementRef = useRef<HTMLVideoElement | null>(null);

	useGSAP(
		() => {
			const container = videoContainerRef.current;
			const video = videoElementRef.current;
			if (!container) {
				return;
			}

			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
					invalidateOnRefresh: true,
				},
			});

			timeline.to(
				container,
			
				{
					paddingLeft: "rem",
					paddingRight: "6rem",
					ease: "none",
				}
			);

			if (video) {
				timeline.fromTo(
					video,
					{ scale: 0 },
					{ scale: 1.05, transformOrigin: "50% 50%", ease: "none" },
					0
				);
			}
		},
		{ scope: videoContainerRef }
	);

	return (
		<section className=" mt-10 text-clou-black sm:py-28">
			<div className="flex flex-col w-full gap-16">
				<div
					ref={videoContainerRef}
					className="relative w-full"
				>
					<div className="relative overflow-hidden rounded-[32px]">
						<div className="pointer-events-none absolute inset-0 z-10">
							<span className="absolute left-0 top-0 block h-16 w-16 rounded-tl-[32px] border-l border-t border-black/20" />
							<span className="absolute right-0 top-0 block h-16 w-16 rounded-tr-[32px] border-r border-t border-black/20" />
							<span className="absolute bottom-0 left-0 block h-16 w-16 rounded-bl-[32px] border-b border-l border-black/20" />
							<span className="absolute bottom-0 right-0 block h-16 w-16 rounded-br-[32px] border-b border-r border-black/20" />
						</div>
						<video
							ref={videoElementRef}
							className="h-full w-full object-cover will-change-transform"
							autoPlay
							loop
							muted
							playsInline
						>
							<source
								src="https://cdn.dribbble.com/userupload/15520736/file/original-d2edd14c2fa17fbfce6a4e9f7550b43b.mp4"
								type="video/mp4"
							/>
						</video>
					</div>
				</div>

				<div className="max-w-3xl space-y-6 mt-16 p">
					<p className="text-sm uppercase tracking-[0.35em]">
						Outcomes you can expect
					</p>
					<h2 className="text-4xl font-semibold leading-tightsm:text-5xl">
						With two decades behind us, teams worldwide rely on Platform to own
						the digital outcomes they care about most.
					</h2>
				</div>
				<div className="mt-14 grid gap-6 sm:grid-cols-2">
					{benefits.map((benefit) => (
						<article
							key={benefit.id}
							className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-8 transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08]"
						>
							<span className="text-sm font-semibold uppercase tracking-[0.4em]">
								{benefit.id}
							</span>
							<h3 className="mt-6 text-2xl font-semibold">{benefit.title}</h3>
							<p className="mt-4 text-base">{benefit.description}</p>
							<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
								<div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
								<div className="absolute -right-24 bottom-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
