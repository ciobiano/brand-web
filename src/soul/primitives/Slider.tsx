"use client";

import React, { useRef } from "react";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import {
	createHorizontalLoop,
	type HorizontalLoopInstance,
} from "@/lib/gsap/horizontal-loop";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ArrowIcon from "@/soul/primitives/icons/ArrowIcon";

const sliderThemeStyles = {
	dark: {
		sectionText: "text-kainé-white",
		gradientFrom: "from-kainé-black/90",
		buttonBorder: "border-kainé-white/20",
		buttonText: "text-kainé-white",
		buttonOutline: "border-kainé-white",
		captionBadge: "bg-white text-kainé-black",
		captionDot: "bg-kainé-black",
	} as const,
	light: {
		sectionText: "text-kainé-black",
		gradientFrom: "from-kainé-white",
		buttonBorder: "border-kainé-black/20",
		buttonText: "text-kainé-black",
		buttonOutline: "border-kainé-black",
		captionBadge: "bg-kainé-black text-kainé-white",
		captionDot: "bg-purple-400",
	} as const,
} as const;

export type SliderTheme = keyof typeof sliderThemeStyles;
type SliderThemeStyles = (typeof sliderThemeStyles)[SliderTheme];

interface SliderButtonProps {
	label: string;
	dataAttribute: string;
	children: React.ReactNode;
	themeStyles: SliderThemeStyles;
}

const SliderButton: React.FC<SliderButtonProps> = ({
	label,
	dataAttribute,
	children,
	themeStyles,
}) => (
	<button
		type="button"
		aria-label={label}
		data-slider={dataAttribute}
		className={cn(
			"slider-button group relative flex h-20 w-20 items-center justify-center rounded-[0.45em] border bg-transparent font-inherit text-current text-lg transition-[transform,opacity] duration-[475ms] ease-[var(--cubic-default)] hover:scale-[0.85]",
			"group-hover/nav:opacity-40 hover:!opacity-100",
			themeStyles.buttonText,
			themeStyles.buttonBorder
		)}
	>
		{children}
		<div
			className={cn(
				"button-overlay absolute inset-[-2px] transition-transform duration-[475ms] ease-[var(--cubic-default)] group-hover:scale-[1.3]"
			)}
		>
			<div
				className={cn(
					"overlay-corner h-5 w-5 rounded-tl-lg border-l border-t",
					themeStyles.buttonOutline
				)}
			/>
			<div
				className={cn(
					"overlay-corner top-right absolute right-0 top-0 h-5 w-5 rotate-90",
					"rounded-tl-lg border-l border-t",
					themeStyles.buttonOutline
				)}
			/>
			<div
				className={cn(
					"overlay-corner bottom-left absolute bottom-0 left-0 h-5 w-5 rotate-[-90deg]",
					"rounded-tl-lg border-l border-t",
					themeStyles.buttonOutline
				)}
			/>
			<div
				className={cn(
					"overlay-corner bottom-right absolute bottom-0 right-0 h-5 w-5 rotate-180",
					"rounded-tl-lg border-l border-t",
					themeStyles.buttonOutline
				)}
			/>
		</div>
	</button>
);

export type SlideData = {
	imageUrl: string;
	caption: string;
	content?: React.ReactNode;
};

interface SliderProps {
	slides: SlideData[];
	theme?: SliderTheme;
}

const Slider: React.FC<SliderProps> = ({ slides, theme = "dark" }) => {
	const sliderRef = useRef<HTMLElement | null>(null);
	const loopRef = useRef<HorizontalLoopInstance | null>(null);
	const themeStyles = sliderThemeStyles[theme];

	useGSAP(
		() => {
			const root = sliderRef.current;
			if (!root || slides.length === 0) {
				return () => { };
			}

			const cleanupFns: Array<() => void> = [];

			if (!root) return;

			const wrapper = root.querySelector<HTMLElement>('[data-slider="list"]');
			if (!wrapper) return;

			const slideElements = gsap.utils.toArray<HTMLElement>(
				wrapper.querySelectorAll('[data-slider="slide"]')
			);
			if (!slideElements.length) return;

			const nextButton = root.querySelector<HTMLButtonElement>(
				'[data-slider="button-next"]'
			);
			const prevButton = root.querySelector<HTMLButtonElement>(
				'[data-slider="button-prev"]'
			);
			const setActiveState = (activeSlide: HTMLElement | null) => {
				slideElements.forEach((slide) => {
					const isActive = slide === activeSlide;
					slide.dataset.active = isActive ? "true" : "false";
					slide.classList.toggle("active", isActive);
					slide
						.querySelector<HTMLElement>("[data-slide-caption]")
						?.setAttribute("data-active", isActive ? "true" : "false");
				});
			};

			setActiveState(null);
			let activeSlide: HTMLElement | null = null;

			const loop = createHorizontalLoop(slideElements, {
				paused: true,
				draggable: true,
				dragTrigger: wrapper,
				onChange: (element) => {
					const nextElement =
						(element.nextElementSibling as HTMLElement | null) ??
						slideElements[0];
					if (activeSlide !== nextElement) {
						setActiveState(nextElement);
						activeSlide = nextElement;
					}
				},
			});

			if (!loop) {
				return;
			}

			const slideDisposers = slideElements.map((slide, index) => {
				const handleClick = () => {
					loop.toIndex(index - 1, { ease: "power3", duration: 0.725 });
				};
				slide.addEventListener("click", handleClick);
				return () => slide.removeEventListener("click", handleClick);
			});
			cleanupFns.push(() => slideDisposers.forEach((dispose) => dispose()));

			if (nextButton) {
				const handleNext = () => {
					loop.next({ ease: "power3", duration: 0.725 });
				};
				nextButton.addEventListener("click", handleNext);
				cleanupFns.push(() =>
					nextButton.removeEventListener("click", handleNext)
				);
			}

			if (prevButton) {
				const handlePrev = () => {
					loop.previous({ ease: "power3", duration: 0.725 });
				};
				prevButton.addEventListener("click", handlePrev);
				cleanupFns.push(() =>
					prevButton.removeEventListener("click", handlePrev)
				);
			}

			loopRef.current = loop;
			cleanupFns.push(() => {
				loop.cleanup?.();
				loop.kill?.();
				loopRef.current = null;
			});

			return () => {
				cleanupFns.forEach((cleanup) => cleanup());
			};
		},

		{ scope: sliderRef, dependencies: [slides] }
	);

	return (
		<section
			ref={sliderRef}
			className={cn(
				"relative flex min-h-screen items-center justify-center p-4 text-[1.1vw] ",
				themeStyles.sectionText
			)}
		>
			<div className="absolute inset-0 z-10 pointer-events-none">
				<div
					className={cn(
						"h-full w-[50.5em] bg-gradient-to-r to-transparent",
						themeStyles.gradientFrom
					)}
				/>
			</div>
			<div className="absolute inset-y-0 left-0 z-20 flex w-[37.5em] items-center pl-8 pointer-events-auto">
				<div className="flex h-[40.125em] flex-col items-start justify-end">
					<div className="group/nav flex gap-8">
						<SliderButton
							label="previous slide"
							dataAttribute="button-prev"
							themeStyles={themeStyles}
						>
							<ArrowIcon direction="left" className="button-arrow w-6 h-4" />
						</SliderButton>
						<SliderButton
							label="next slide"
							dataAttribute="button-next"
							themeStyles={themeStyles}
						>
							<ArrowIcon direction="right" className="button-arrow w-6 h-4" />
						</SliderButton>
					</div>
				</div>
			</div>

			<div className="absolute inset-0 w-full h-full overflow-hidden">
				<div className="flex justify-start items-center w-full h-full">
					<div
						data-slider="list"
						className="flex flex-row justify-start items-stretch relative"
					>
						{slides.map((slide, index) => (
							<div
								key={index}
								data-slider="slide"
								data-active="false"
								className="flex-none px-4 opacity- transition-opacity duration-[400ms] data-[active=true]:opacity-100 w-[85vw] sm:w-[92vw] md:w-[88vw] lg:w-[70vw] xl:w-[70vw] max-w-[1320px]"
							>
								{slide.content ? (
									slide.content
								) : (
									<div className="relative w-full h-full rounded-md overflow-hidden">
										<Image
											src={slide.imageUrl}
											loading="lazy"
											alt={slide.caption}
											width={1000}
											height={1000}
											className="w-full object-cover h-[34rem] sm:h-[38rem] md:h-[43rem] lg:h-[46rem] xl:h-[48rem]"
										/>
										<div
											data-slide-caption
											data-active="false"
											className={cn(
												"absolute left-6 top-6 flex items-center gap-3 whitespace-nowrap rounded-md px-4 py-2 ",
												"overflow-hidden translate-x-[-25%] opacity-0 transition-transform transition-opacity duration-[525ms] ease-[var(--cubic-default)] data-[active=true]:translate-x-0 data-[active=true]:opacity-100",
												themeStyles.captionBadge
											)}
										>
											<div
												className={cn(
													"h-3 w-3 rounded-full",
													themeStyles.captionDot
												)}
											></div>
											<p className="m-0 text-sm font-[Arial,_sans-serif] ">
												{slide.caption}
											</p>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Slider;
