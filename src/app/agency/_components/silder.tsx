"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";

import { cn } from "@/lib/utils";

gsap.registerPlugin(Draggable, InertiaPlugin);

const sliderThemeStyles = {
	dark: {
		sectionText: "text-clou-white",
		gradientFrom: "from-clou-black/90",
		buttonBorder: "border-clou-white/20",
		buttonText: "text-clou-white",
		buttonOutline: "border-clou-white",
		counterDivider: "bg-clou-white",
		captionBadge: "bg-white text-clou-black",
		captionDot: "bg-clou-black",
	} as const,
	light: {
		sectionText: "text-clou-black",
		gradientFrom: "from-clou-white/95",
		buttonBorder: "border-clou-black/20",
		buttonText: "text-clou-black",
		buttonOutline: "border-clou-black",
		counterDivider: "bg-clou-black",
		captionBadge: "bg-clou-black text-clou-white",
		captionDot: "bg-clou-white",
	} as const,
} as const;

export type SliderTheme = keyof typeof sliderThemeStyles;
type SliderThemeStyles = (typeof sliderThemeStyles)[SliderTheme];
type DraggableInstance = ReturnType<typeof Draggable.create>[number];

interface HorizontalLoopConfig {
	paused?: boolean;
	repeat?: number;
	speed?: number;
	snap?: number | number[] | ((value: number) => number) | false;
	center?: boolean | Element | string | null;
	draggable?: boolean;
	paddingRight?: number | string;
	reversed?: boolean;
	onChange?: (element: HTMLElement, index: number) => void;
}

type HorizontalLoopTimeline = gsap.core.Timeline & {
	toIndex: (
		index: number,
		vars?: gsap.TweenVars & { duration?: number }
	) => gsap.core.Tween | gsap.core.Timeline;
	closestIndex: (setCurrent?: boolean) => number;
	current: () => number;
	next: (vars?: gsap.TweenVars & { duration?: number }) => gsap.core.Tween;
	previous: (
		vars?: gsap.TweenVars & { duration?: number }
	) => gsap.core.Tween;
	times: number[];
	draggable?: DraggableInstance;
};

type SnapValue = Parameters<typeof gsap.utils.snap>[0];
type SnapFunction = (value: number) => number;

const resolveSnap = (value: SnapValue | false): SnapFunction => {
    if (value === false) {
        return (input) => input;
    }
    return gsap.utils.snap(value as SnapValue) as SnapFunction;
};

const toPixels = (target: HTMLElement, property: string) => {
    const raw = gsap.getProperty(target, property, "px");
    if (typeof raw === "number") return raw;
    const parsed = parseFloat(raw ?? "0");
    return Number.isNaN(parsed) ? 0 : parsed;
};

const toNumber = (input: unknown, fallback = 0) => {
    return typeof input === "number" && !Number.isNaN(input) ? input : fallback;
};

const horizontalLoop = (
    items: Iterable<HTMLElement> | HTMLElement[] | NodeListOf<HTMLElement>,
    config: HorizontalLoopConfig = {}
): HorizontalLoopTimeline | null => {
    const elements = gsap.utils.toArray(items) as HTMLElement[];
    if (!elements.length) {
        return null;
    }

    const {
        repeat,
        paused = false,
        speed = 1,
        snap = 1,
        center = false,
        draggable = false,
        paddingRight = 0,
        reversed = false,
        onChange,
    } = config;

    const clampSnap = resolveSnap(snap);
    const totalItems = elements.length;
    const startX = elements[0].offsetLeft;
    const times: number[] = new Array(totalItems).fill(0);
    const widths: number[] = new Array(totalItems).fill(0);
    const spaceBefore: number[] = new Array(totalItems).fill(0);
    const xPercents: number[] = new Array(totalItems).fill(0);

    let totalWidth = 0;
    let curIndex = 0;
    let lastIndex = 0;
    let indexIsDirty = false;
    let timeWrap = gsap.utils.wrap(0, 0);
    let proxy: HTMLDivElement | null = null;

    const container =
        center === true
            ? elements[0]?.parentElement
            : center instanceof HTMLElement
                ? center
                : elements[0]?.parentElement;

    if (!container) {
        return null;
    }

    const pixelsPerSecond = speed * 100;
    const paddingInPx =
        typeof paddingRight === "string"
            ? parseFloat(paddingRight) || 0
            : paddingRight || 0;

    const timeline = gsap.timeline({
        repeat,
        paused,
        defaults: { ease: "none" },
        onReverseComplete() {
            const duration = timeline.duration();
            timeline.totalTime(timeline.rawTime() + duration * 100);
        },
    }) as HorizontalLoopTimeline;

    const computeTotalWidth = () => {
        const last = totalItems - 1;
        const lastElement = elements[last];
        const width = widths[last];
        const scaleX = toNumber(gsap.getProperty(lastElement, "scaleX"), 1);
        return (
            lastElement.offsetLeft +
            (xPercents[last] / 100) * width -
            startX +
            spaceBefore[0] +
            lastElement.offsetWidth * scaleX +
            paddingInPx
        );
    };

    const populateWidths = () => {
        let previous = container.getBoundingClientRect();
        elements.forEach((element, index) => {
            const width = element.offsetWidth || 1;
            widths[index] = width;
            const currentRect = element.getBoundingClientRect();
            spaceBefore[index] = currentRect.left - (index ? previous.right : previous.left);
            previous = currentRect;
            const rawX = toPixels(element, "x");
            const rawXPercent = toNumber(gsap.getProperty(element, "xPercent"));
            xPercents[index] = clampSnap(((rawX / width) * 100) + rawXPercent);
        });
        gsap.set(elements, {
            x: 0,
            xPercent: (index: number) => xPercents[index],
        });
        totalWidth = computeTotalWidth();
    };

    const populateTimeline = () => {
        timeline.clear();
        for (let index = 0; index < totalItems; index += 1) {
            const element = elements[index];
            const width = widths[index] || 1;
            const xPercent = xPercents[index];
            const currentX = (xPercent / 100) * width;
            const distanceToStart = element.offsetLeft + currentX - startX + spaceBefore[0];
            const distanceToLoop = distanceToStart + width * toNumber(gsap.getProperty(element, "scaleX"), 1);

            timeline
                .to(
                    element,
                    {
                        xPercent: clampSnap(((currentX - distanceToLoop) / width) * 100),
                        duration: distanceToLoop / pixelsPerSecond,
                    },
                    0
                )
                .fromTo(
                    element,
                    {
                        xPercent: clampSnap(((currentX - distanceToLoop + totalWidth) / width) * 100),
                    },
                    {
                        xPercent,
                        duration: (currentX - distanceToLoop + totalWidth - currentX) / pixelsPerSecond,
                        immediateRender: false,
                    },
                    distanceToLoop / pixelsPerSecond
                )
                .add(`label${index}`, distanceToStart / pixelsPerSecond);

            times[index] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, timeline.duration());
    };

    const populateOffsets = () => {
        if (!center) return;
        const duration = timeline.duration();
        if (!duration || !totalWidth) return;
        const timeOffset = (duration * container.offsetWidth) / (2 * totalWidth);
        times.forEach((_, index) => {
            times[index] = timeWrap(
                timeline.labels[`label${index}`] +
                    (duration * widths[index]) / (2 * totalWidth) -
                    timeOffset
            );
        });
    };

    const refresh = (deep = false) => {
        const progress = timeline.progress();
        timeline.progress(0, true);
        populateWidths();
        if (deep) {
            populateTimeline();
        }
        populateOffsets();
        if (deep && timeline.draggable) {
            timeline.time(times[curIndex], true);
        } else {
            timeline.progress(progress, true);
        }
    };

    const getClosestIndex = (value: number, wrap: number) => {
        let closest = Number.POSITIVE_INFINITY;
        let closestIndex = 0;
        for (let i = 0; i < times.length; i += 1) {
            let difference = Math.abs(times[i] - value);
            if (difference > wrap / 2) {
                difference = wrap - difference;
            }
            if (difference < closest) {
                closest = difference;
                closestIndex = i;
            }
        }
        return closestIndex;
    };

    populateWidths();
    populateTimeline();
    populateOffsets();

    const resizeHandler = () => refresh(true);
    window.addEventListener("resize", resizeHandler);

    const toIndex = (
        index: number,
        vars: (gsap.TweenVars & { duration?: number }) | undefined
    ): gsap.core.Tween | gsap.core.Timeline => {
        const wrappedIndex = gsap.utils.wrap(0, totalItems, index);
        if (Math.abs(index - curIndex) > totalItems / 2) {
            index += index > curIndex ? -totalItems : totalItems;
        }

        let time = times[wrappedIndex];
        if ((time > timeline.time()) !== index > curIndex && index !== curIndex) {
            time += timeline.duration() * (index > curIndex ? 1 : -1);
        }
        const options = { ...(vars ?? {}), overwrite: true } as typeof vars & {
            overwrite: boolean;
            modifiers?: { time: (value: number) => number };
        };
        if (time < 0 || time > timeline.duration()) {
            options.modifiers = { time: timeWrap };
        }
        curIndex = wrappedIndex;
        if (proxy) {
            gsap.killTweensOf(proxy);
        }
        if (options.duration === 0) {
            return timeline.time(timeWrap(time));
        }
        return timeline.tweenTo(time, options);
    };

    timeline.toIndex = (index, vars) => toIndex(index, vars);
    timeline.closestIndex = (setCurrent = false) => {
        const index = getClosestIndex(timeline.time(), timeline.duration());
        if (setCurrent) {
            curIndex = index;
            indexIsDirty = false;
        }
        return index;
    };
    timeline.current = () => (indexIsDirty ? timeline.closestIndex(true) : curIndex);
    timeline.next = (vars) => toIndex(timeline.current() + 1, vars);
    timeline.previous = (vars) => toIndex(timeline.current() - 1, vars);
    timeline.times = times;

    timeline.progress(1, true).progress(0, true);

    if (reversed) {
        timeline.vars.onReverseComplete?.();
        timeline.reverse();
    }

    if (onChange) {
        timeline.eventCallback("onUpdate", () => {
            const index = timeline.closestIndex();
            if (lastIndex !== index) {
                lastIndex = index;
                onChange(elements[index], index);
            }
        });
    }

    if (draggable && typeof Draggable === "function") {
        proxy = document.createElement("div");
        const wrap = gsap.utils.wrap(0, 1);
        let ratio = 0;
        let startProgress = 0;
        let initChangeX = 0;
        let lastSnap = 0;
        let wasPlaying = false;
        let draggableInstance: DraggableInstance | undefined;

        const align = () => {
            if (!draggableInstance) return;
            timeline.progress(
                wrap(startProgress + ((draggableInstance.startX - draggableInstance.x) * ratio))
            );
        };
        const syncIndex = () => timeline.closestIndex(true);

        draggableInstance = Draggable.create(proxy, {
            trigger: elements[0].parentNode as Element,
            type: "x",
            onPressInit() {
                const x = this.x;
                gsap.killTweensOf(timeline);
                wasPlaying = !timeline.paused();
                timeline.pause();
                refresh();
                ratio = totalWidth ? 1 / totalWidth : 0;
                startProgress = timeline.progress();
                initChangeX = ratio ? startProgress / -ratio - x : 0;
                gsap.set(proxy, { x: ratio ? startProgress / -ratio : 0 });
            },
            onDrag: align,
            onThrowUpdate: align,
            overshootTolerance: 0,
            inertia: true,
            snap(value) {
                if (!ratio) return value;
                if (Math.abs(startProgress / -ratio - this.x) < 10) {
                    return lastSnap + initChangeX;
                }
                const time = -(value * ratio) * timeline.duration();
                const wrappedTime = timeWrap(time);
                const snapTime = times[getClosestIndex(wrappedTime, timeline.duration())];
                let difference = snapTime - wrappedTime;
                if (Math.abs(difference) > timeline.duration() / 2) {
                    difference += difference < 0 ? timeline.duration() : -timeline.duration();
                }
                lastSnap = (time + difference) / timeline.duration() / -ratio;
                return lastSnap;
            },
            onRelease() {
                syncIndex();
                if (draggableInstance?.isThrowing) {
                    indexIsDirty = true;
                }
            },
            onThrowComplete() {
                syncIndex();
                if (wasPlaying) {
                    timeline.play();
                }
            },
        })[0];

        if (typeof InertiaPlugin === "undefined") {
            console.warn(
                "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
            );
        }

        timeline.draggable = draggableInstance;
    }

    timeline.closestIndex(true);
    lastIndex = curIndex;
    onChange?.(elements[curIndex], curIndex);

    timeline.eventCallback("onKill", () => {
        window.removeEventListener("resize", resizeHandler);
    });

    return timeline;
};

// --- Reusable Button Component ---
// This component encapsulates the repeating button structure and styles.

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
			"slider-button group relative flex h-16 w-16 items-center justify-center rounded-[0.4em] border bg-transparent font-inherit text-current transition-[transform,opacity] duration-[475ms] ease-[var(--cubic-default)] hover:scale-[0.85]",
			"group-hover/nav:opacity-40 hover:!opacity-100",
			themeStyles.buttonText,
			themeStyles.buttonBorder
		)}
	>
		{children}
		<div
			className={cn(
				"button-overlay absolute inset-[-1px] transition-transform duration-[475ms] ease-[var(--cubic-default)] group-hover:scale-[1.4]"
			)}
		>
			<div
				className={cn(
					"overlay-corner h-4 w-4 rounded-tl-md border-l border-t",
					themeStyles.buttonOutline
				)}
			/>
			<div
				className={cn(
					"overlay-corner top-right absolute right-0 top-0 h-4 w-4 rotate-90",
					"rounded-tl-md border-l border-t",
					themeStyles.buttonOutline
				)}
			/>
			<div
				className={cn(
					"overlay-corner bottom-left absolute bottom-0 left-0 h-4 w-4 rotate-[-90deg]",
					"rounded-tl-md border-l border-t",
					themeStyles.buttonOutline
				)}
			/>
			<div
				className={cn(
					"overlay-corner bottom-right absolute bottom-0 right-0 h-4 w-4 rotate-180",
					"rounded-tl-md border-l border-t",
					themeStyles.buttonOutline
				)}
			/>
		</div>
	</button>
);

// --- Main Slider Component ---
export type SlideData = {
	imageUrl: string;
	caption: string;
};

interface SliderProps {
	slides: SlideData[];
	theme?: SliderTheme;
}

const Slider: React.FC<SliderProps> = ({ slides, theme = "dark" }) => {
	const sliderRef = useRef<HTMLElement | null>(null);
	const themeStyles = sliderThemeStyles[theme];

	useEffect(() => {
		const root = sliderRef.current;
		if (!root || slides.length === 0) {
			return;
		}

		const cleanupFns: Array<() => void> = [];

		const ctx = gsap.context(() => {
			if (!root) return;

			const wrapper = root.querySelector<HTMLElement>('[data-slider="list"]');
			if (!wrapper) return;

			const slideElements = gsap.utils.toArray<HTMLElement>(
				wrapper.querySelectorAll('[data-slider="slide"]')
			);
			const totalSlides = slideElements.length;
			if (totalSlides === 0) return;

			const nextButton = root.querySelector<HTMLButtonElement>(
				'[data-slider="button-next"]'
			);
			const prevButton = root.querySelector<HTMLButtonElement>(
				'[data-slider="button-prev"]'
			);
			const totalElement = root.querySelector<HTMLElement>(
				'[data-slide-count="total"]'
			);
			const stepTemplate = root.querySelector<HTMLElement>(
				'[data-slide-count="step"]'
			);
			const stepsParent = stepTemplate?.parentElement;

			if (!stepTemplate || !stepsParent) return;

			if (totalElement) {
				totalElement.textContent =
					totalSlides < 10 ? `0${totalSlides}` : totalSlides.toString();
			}

			const stepPrototype = stepTemplate.cloneNode(true) as HTMLElement;
			stepsParent.innerHTML = "";
			slideElements.forEach((_, index) => {
				const stepClone = stepPrototype.cloneNode(true) as HTMLElement;
				stepClone.textContent =
					index + 1 < 10 ? `0${index + 1}` : (index + 1).toString();
				stepsParent.appendChild(stepClone);
			});

			const allSteps = Array.from(
				stepsParent.querySelectorAll<HTMLElement>('[data-slide-count="step"]')
			);

			const setActiveState = (activeSlide: HTMLElement | null) => {
				slideElements.forEach((slide) => {
					const isActive = slide === activeSlide;
					slide.dataset.active = isActive ? "true" : "false";
					slide.classList.toggle("active", isActive);
					slide
						.querySelector<HTMLElement>('[data-slide-caption]')
						?.setAttribute("data-active", isActive ? "true" : "false");
				});
			};

			setActiveState(null);
			if (allSteps.length) {
				gsap.set(allSteps, { y: "0%" });
			}

			let activeSlide: HTMLElement | null = null;

			const loop = horizontalLoop(slideElements, {
				paused: true,
				draggable: true,
				center: false,
				onChange: (element, index) => {
					const nextElement =
						(element.nextElementSibling as HTMLElement | null) ??
						slideElements[0];
					if (activeSlide !== nextElement) {
						setActiveState(nextElement);
						activeSlide = nextElement;
					}

					if (allSteps.length) {
						gsap.to(allSteps, {
							y: `${-100 * index}%`,
							ease: "power3",
							duration: 0.45,
						});
					}
				},
			});

			if (!loop) {
				return;
			}

			const slideHandlers = slideElements.map((slide, index) => {
				const handleClick = () => {
					loop.toIndex(index - 1, { ease: "power3", duration: 0.725 });
				};
				slide.addEventListener("click", handleClick);
				return { slide, handleClick };
			});
			cleanupFns.push(() => {
				slideHandlers.forEach(({ slide, handleClick }) =>
					slide.removeEventListener("click", handleClick)
				);
			});

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

			cleanupFns.push(() => {
				loop.draggable?.kill();
				loop.kill();
			});
		}, sliderRef);

		return () => {
			cleanupFns.forEach((cleanup) => cleanup());
			ctx.revert();
		};
	}, [slides]);

	return (
		<section
			ref={sliderRef}
			className={cn(
				"relative flex min-h-screen items-center justify-center p-8 text-[1.1vw] font-sans",
				themeStyles.sectionText
			)}
		>
			<div className="absolute inset-0 z-10">
				<div
					className={cn(
						"h-full w-full bg-gradient-to-r to-transparent",
						themeStyles.gradientFrom
					)}
				/>
			</div>
			<div className="absolute inset-y-0 left-0 z-20 flex w-[37.5em] items-center pl-8">
				<div className="flex h-[28.125em] flex-col items-start justify-between">
					<div className="flex items-center gap-1 text-[5.625em] font-bold font-[PPNeueCorp,Impact,sans-serif]">
						<div className="overflow-hidden h-[1em]">
							<h2
								data-slide-count="step"
								className="count-heading w-[2ch] text-[1em] leading-none m-0"
							>
								01
							</h2>
						</div>
						<div
							className={cn(
								"h-[0.75em] w-[2px] rotate-[15deg]",
								themeStyles.counterDivider
							)}
						></div>
						<div className="overflow-hidden h-[1em]">
							<h2
								data-slide-count="total"
								className="count-heading w-[2ch] text-[1em] leading-none m-0"
							>
								00
							</h2>
						</div>
					</div>
					<div className="group/nav flex gap-8">
						<SliderButton
							label="previous slide"
							dataAttribute="button-prev"
							themeStyles={themeStyles}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								viewBox="0 0 17 12"
								fill="none"
								className="button-arrow w-4 h-3"
							>
								<path
									d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
									fill="currentColor"
								/>
							</svg>
						</SliderButton>
						<SliderButton
							label="next slide"
							dataAttribute="button-next"
							themeStyles={themeStyles}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								viewBox="0 0 17 12"
								fill="none"
								className="button-arrow w-4 h-3 rotate-180"
							>
								<path
									d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
									fill="currentColor"
								/>
							</svg>
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
								className="flex-none w-[42.5em] h-[28em] px-5 opacity-20 transition-opacity duration-[400ms] data-[active=true]:opacity-100"
							>
								<div className="relative w-full h-full rounded-md overflow-hidden">
									<img
										src={slide.imageUrl}
										loading="lazy"
										alt={slide.caption}
										className="w-full h-full object-cover"
									/>
									<div
										data-slide-caption
										data-active="false"
										className={cn(
											"absolute left-5 top-5 flex items-center gap-2 whitespace-nowrap rounded-sm px-3 py-2",
											"overflow-hidden translate-x-[-25%] opacity-0 transition-transform transition-opacity duration-[525ms] ease-[var(--cubic-default)] data-[active=true]:translate-x-0 data-[active=true]:opacity-100",
											themeStyles.captionBadge
										)}
									>
										<div
											className={cn(
												"h-2 w-2 rounded-full",
												themeStyles.captionDot
											)}
										></div>
										<p className="m-0 text-xs font-[Arial,_sans-serif]">
											{slide.caption}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Slider;
