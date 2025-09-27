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
	
	},
	{
		id: "02",
		title: "Mindfully structured design systems",
		
	},
	{
		id: "03",
		title: "Insightful product discovery",
		
	},
	{
		id: "04",
		title: "Motion that tells the story",
	
	},
	{
		id: "05",
		title: "Reliable engineering foundations",
		
	},
	{
		id: "06",
		title: "AI-enabled experiences",
		
	},
	{
		id: "07",
		title: "Rapid prototyping & validation",
		
	},
	{
		id: "08",
		title: "Support beyond launch",
		
	},
];

export default function BenefitsSection() {
	const videoContainerRef = useRef<HTMLDivElement | null>(null);

	useGSAP(
		() => {
			const container = videoContainerRef.current;
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
					paddingLeft: "4rem",
					paddingRight: "4rem",
					ease: "none",
				}
			);
		},
		{ scope: videoContainerRef }
	);

	return (
		<section className=" mt-10 text-clou-black sm:py-28">
			<div className="flex flex-col w-full gap-16">
				<div ref={videoContainerRef} className="relative w-full">
					<div className="relative overflow-hidden rounded-[32px]">
						<div className="pointer-events-none absolute inset-0 z-10">
							<span className="absolute left-0 top-0 block h-16 w-16 rounded-tl-[32px] border-l border-t border-black/20" />
							<span className="absolute right-0 top-0 block h-16 w-16 rounded-tr-[32px] border-r border-t border-black/20" />
							<span className="absolute bottom-0 left-0 block h-16 w-16 rounded-bl-[32px] border-b border-l border-black/20" />
							<span className="absolute bottom-0 right-0 block h-16 w-16 rounded-br-[32px] border-b border-r border-black/20" />
						</div>
						<video
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

				<div className=" w-full px-10 mt-16">
					<div className="flex flex-col gap-10 max-w-[95rem] mx-auto items-start tracking-[-0.64px]">
						<h2 className="text-5xl  sm:text-6xl md:text-6xl lg:text-[64px] font-semibold leading-[5rem] ">
							With two decades of experience, companies worldwide trusted and
							hired us to handle various digital aspects of their businesses.
						</h2>
						<div className="mt-20 w-full  items-center justify-center">
							<div className=" grid grid-cols-1 text-4xl gap-y-0 sm:grid-cols-2 sm:gap-16">
								{benefits.map((benefit, idx) => (
									<div
										key={benefit.id}
										className="flex items-center text-center  gap-7 py-12 border-b border-black/10 "
									>
										<div className="flex-shrink-0 w-12 text-right text-3xl sm:text-5xl font-medium text-[#929296] pr-4">
											{benefit.id}
										</div>
										<div className="min-w-0">
											<h3 className="text-2xl sm:text-3xl font-semibold text-clou-black leading-tight">
												{benefit.title}.
											</h3>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
