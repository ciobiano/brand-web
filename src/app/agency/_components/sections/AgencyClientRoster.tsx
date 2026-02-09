"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { clients } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const PREVIEW_SIZE = 400;
const PREVIEW_CENTER_DIVISOR = 2;
const COLUMNS_PER_ROW = 3;
const PREVIEW_ANIMATION_DURATION = 0.4;
const PREVIEW_FADE_DURATION = 0.3;

export default function AgencyClientRoster() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const clientListRef = useRef<HTMLDivElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const clientRowRefs = useRef<(HTMLDivElement | null)[]>([]);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const handleClientHover = (index: number) => {
		setHoveredIndex(index);

		if (!previewRef.current || !clientListRef.current) return;
		const rowEl = clientRowRefs.current[index];
		if (!rowEl) return;

		const listRect = clientListRef.current.getBoundingClientRect();
		const rowRect = rowEl.getBoundingClientRect();
		const rowCenterY = rowRect.top - listRect.top + rowRect.height / PREVIEW_CENTER_DIVISOR;
		const targetY = rowCenterY - PREVIEW_SIZE / PREVIEW_CENTER_DIVISOR;

		gsap.to(previewRef.current, {
			y: targetY,
			duration: PREVIEW_ANIMATION_DURATION,
			ease: "power2.out",
			overwrite: "auto",
		});
	};

	const handleListEnter = () => {
		gsap.to(previewRef.current, {
			opacity: 1,
			duration: PREVIEW_FADE_DURATION,
			ease: "power2.out",
		});
	};

	const handleListLeave = () => {
		gsap.to(previewRef.current, {
			opacity: 0,
			duration: PREVIEW_FADE_DURATION,
			ease: "power2.out",
		});
		setHoveredIndex(null);
	};

	useGSAP(
		() => {
			if (headingRef.current) {
				const heading = headingRef.current;
				const words = heading.textContent?.split(" ") || [];
				heading.innerHTML = "";
				words.forEach((word) => {
					const span = document.createElement("span");
					span.textContent = word + " ";
					span.style.willChange = "transform, opacity";
					span.setAttribute("data-word", "");
					heading.appendChild(span);
				});

				gsap.set("[data-word]", { y: 40, opacity: 0 });
				gsap.to("[data-word]", {
					y: 0,
					opacity: 1,
					duration: 0.6,
					ease: "power3.out",
					stagger: 0.04,
					scrollTrigger: {
						trigger: headingRef.current,
						start: "top 75%",
						toggleActions: "play none none reverse",
					},
				});
			}

			gsap.fromTo(
				"[data-client-name]",
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.5,
					ease: "power3.out",
					stagger: 0.015,
					scrollTrigger: {
						trigger: clientListRef.current,
						start: "top 80%",
						toggleActions: "play none none reverse",
					},
				}
			);

			gsap.fromTo(
				sectionRef.current,
				{ clipPath: "inset(0% 5% 0% 5% round 2rem 2rem 0 0)" },
				{
					clipPath: "inset(0% 0% 0% 0% round 2rem 2rem 0 0)",
					ease: "power2.inOut",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 90%",
						end: "top 50%",
						scrub: 1,
					},
				}
			);
		},
		{ scope: sectionRef }
	);

	const rowCount = Math.ceil(clients.length / COLUMNS_PER_ROW);

	return (
		<section
			ref={sectionRef}
			className="relative bg-kainé-black py-24 text-kainé-gray sm:py-40 z-10 overflow-hidden will-change-[clip-path]"
			data-cursor-invert
			data-client-roster-wrapper
		>
			<div className="absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-kainé-black h-4 z-10" />

			<div className="px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pb-20">
					<div className="lg:col-start-2">
						<span className="inline-flex items-center rounded-full border border-white/40 text-white px-3 py-0.5 text-xs">
							Kundʼinnen
						</span>

						<div
							ref={headingRef}
							className="mt-6 text-[clamp(1rem,5vw,2rem)]  text-kainé-white max-w-sm"
						>
							People, brands, and companies we work with
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-[minmax(500px,2fr)_2fr] gap-8 lg:gap-8">
					<div className="hidden lg:block relative min-h-[400px]">
						<div
							ref={previewRef}
							className="absolute left-[25%] top-20  pointer-events-none  justify-center  items-center z-10"
							style={{ opacity: 0, willChange: "transform" }}
						>
							<div
								className="rounded-2xl overflow-hidden "
								style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
							>
								{clients.map((client, i) => (
									<div
										key={client.name}
										className={`absolute inset-0 transition-opacity duration-300  ${
											hoveredIndex === i ? "opacity-100" : "opacity-0"
										}`}
									>
										<Image
											src={client.image}
											alt={client.name}
											width={PREVIEW_SIZE}
											height={PREVIEW_SIZE}
											className="object-cover w-full h-full rounded-2xl "
										/>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className=" items-start">
						<div
							ref={clientListRef}
							className="relative mt-20 -ml-4 "
							onMouseEnter={handleListEnter}
							onMouseLeave={handleListLeave}
						>
							<div
								className="grid"
								style={{
									gridAutoFlow: "column",
									gridTemplateColumns: `repeat(${COLUMNS_PER_ROW}, 1fr)`,
									gridTemplateRows: `repeat(${rowCount}, auto)`,
									gap: "0.125rem clamp(1.5rem, 4vw, 3rem)",
								}}
							>
								{clients.map((client, i) => (
									<div
										key={client.name}
										ref={(el) => {
											clientRowRefs.current[i] = el;
										}}
										data-client-name
										data-cursor="link"
										onMouseEnter={() => handleClientHover(i)}
										className="flex items-center gap-2 py-0.5 cursor-default select-none group"
									>
										<span
											className={`text-2xl text-purple-300 transition-opacity duration-200 ${
												hoveredIndex === i ? "opacity-100" : "opacity-0"
											}`}
										>
											●
										</span>
										<span className="text-lg transition-colors duration-300 text-kaine-white">
											{client.name}
										</span>
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
