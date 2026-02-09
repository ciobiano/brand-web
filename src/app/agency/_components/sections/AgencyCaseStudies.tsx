"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createHorizontalLoop, type HorizontalLoopInstance } from "@/lib/gsap/horizontal-loop";
import { caseStudies } from "@/data";

const allSlides = [...caseStudies, ...caseStudies, ...caseStudies];

gsap.registerPlugin(ScrollTrigger);

export default function AgencyCaseStudies() {
	const containerRef = useRef<HTMLElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const loopRef = useRef<HorizontalLoopInstance | null>(null);




	useGSAP(
		() => {
			if (!wrapperRef.current) return;
			if (!containerRef.current) return;

		 const pinTl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top top",
				end: "+=100%",
				pin: true,
				pinSpacing: false,
			},
		 });	

		 pinTl.to(containerRef.current, {
			y: "10%",
			duration: 0.5,
			ease: "none",
		 });


			const slideElements = Array.from(
				wrapperRef.current.querySelectorAll<HTMLElement>('[data-case-slide]')
			);

			if (!slideElements.length) return;

			const loop = createHorizontalLoop(slideElements, {
				draggable: true,
				dragTrigger: wrapperRef.current,
				speed: 0.5,
				repeat: -1,
			});

			if (loop) {
				loopRef.current = loop;
			}

			return () => {
				loop?.cleanup();
				loop?.kill();
			};
		},
		{ scope: containerRef, dependencies: [caseStudies.length] }
	);

	return (
		<section
			ref={containerRef}
			className="relative w-full py-10 overflow-hidden bg-white z-10"
		>
			<div className="px-6 lg:px-10">
				<h2 className="text-5xl font-semibold tracking-[-0.03em] sm:text-7xl lg:text-9xl text-kainé-black">
					Real <br /> Stories
				</h2>
			</div>

			<div className="flex w-full h-full items-center justify-center ">
				<div
					ref={wrapperRef}
					className="flex items-center gap-8 px-6 lg:gap-12 lg:px-12"
				>
					{allSlides.map((slide, index) => (
						<div
							key={`${slide.id}-${index}`}
							data-case-slide
							className="flex-shrink-0 group"
							
						>
							<div className={`relative overflow-hidden rounded-2xl ${slide.className}`}>
								<Image
									src={slide.image}
									alt={slide.title}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-105"
									sizes="(min-width: 1024px) 700px, 100vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<h3 className="text-white font-semibold text-xl mb-2 drop-shadow-lg">
										{slide.title}
									</h3>
									
									<div>
										<p className="text-white font-medium text-sm drop-shadow-md">
											{slide.client}
										</p>
										<p className="text-white/80 text-xs drop-shadow-md">
											{slide.role}
										</p>
									</div>
								</div>
							</div>

							<div className="mt-4 h-full opacity-0 overflow-hidden group-hover:opacity-100 transition-all duration-500 ease-out">
								<div className={`${slide.className} mx-auto`}>
									<p className="text-kainé-black text-sm leading-relaxed text-center px-4">
										`{slide.testimonial}`
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
