"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { usePageAnimationContext } from "./PageAnimationContext";
import { transitionWords } from "@/data";
import {
	TRANSITION_DURATION,
	TRANSITION_EASE,
	TRANSITION_STAGGER,
	TRANSITION_TIMING,
} from "./constants";

export type TransitionCallback = (
	next: () => void,
	from?: string,
	to?: string
) => Promise<void>;

const MAX_INIT_ATTEMPTS = 60; // 1 second at 60fps

export function usePageTransition() {
	const firstLayerRef = useRef<HTMLDivElement | null>(null);
	const leaveTextRef = useRef<HTMLSpanElement | null>(null);
	const wordIndexRef = useRef(0);
	const hasRunInitialEnterRef = useRef(false);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	const [wordCharacters, setWordCharacters] = useState<string[]>(
		transitionWords[0].split("")
	);

	const { signalReady, reset } = usePageAnimationContext();

	const cycleWord = useCallback(() => {
		const nextIndex = (wordIndexRef.current + 1) % transitionWords.length;
		wordIndexRef.current = nextIndex;
		const nextWord = transitionWords[nextIndex];
		setWordCharacters(nextWord.split(""));
	}, []);

	const runTimeline = useCallback(
		(setup: (timeline: gsap.core.Timeline) => void) => {
			timelineRef.current?.kill();

			return new Promise<void>((resolve) => {
				const timeline = gsap.timeline({
					onComplete: () => {
						if (timelineRef.current === timeline) {
							timelineRef.current = null;
						}
						resolve();
					},
					onInterrupt: () => {
						if (timelineRef.current === timeline) {
							timelineRef.current = null;
						}
						resolve();
					},
				});

				timelineRef.current = timeline;
				setup(timeline);
			});
		},
		[]
	);

	const handleLeave: TransitionCallback = useCallback(
		async (next) => {
			reset();

			const layer = firstLayerRef.current;
			if (!layer) {
				next();
				return;
			}

			const textEl = leaveTextRef.current;

			cycleWord();

			if (textEl) {
				gsap.set(textEl, { opacity: 1 });
			}

			await runTimeline((timeline) => {
				timeline.set(layer, { y: "100%" });
				timeline.to(layer, {
					y: 0,
					duration: TRANSITION_DURATION.OVERLAY,
					ease: TRANSITION_EASE.OVERLAY,
				});

				const charElements = layer.querySelectorAll("[data-word-char]");
				if (charElements.length) {
					timeline.fromTo(
						charElements,
						{ yPercent: 60, opacity: 0 },
						{
							yPercent: 0,
							opacity: 1,
							duration: TRANSITION_DURATION.CHAR_ANIMATION,
							ease: TRANSITION_EASE.CHARS,
							stagger: TRANSITION_STAGGER.CHARS,
						},
						TRANSITION_TIMING.CHAR_OVERLAP
					);
				} else if (textEl) {
					timeline.to(
						textEl,
						{
							opacity: 0,
							duration: 0.2,
							ease: "sine.inOut",
						},
						TRANSITION_TIMING.TEXT_FADE_OVERLAP
					);
				}
			});

			next();
		},
		[runTimeline, reset, cycleWord]
	);

	const handleEnter: TransitionCallback = useCallback(
		async (next) => {
			const layer = firstLayerRef.current;
			if (!layer) {
				next();
				return;
			}

			const textEl = leaveTextRef.current;

			await runTimeline((timeline) => {
				timeline.set(layer, { y: 0 });

				if (textEl) {
					timeline.to(
						textEl,
						{
							opacity: 0,
							duration: TRANSITION_DURATION.TEXT_FADE,
							ease: TRANSITION_EASE.TEXT,
						},
						0
					);
				}

				timeline.to(layer, {
					y: "-100%",
					duration: TRANSITION_DURATION.OVERLAY,
					ease: TRANSITION_EASE.OVERLAY,
				});
				timeline.set(layer, { y: "100%" });
			});

			next();

			signalReady();
		},
		[runTimeline, signalReady]
	);

	useEffect(() => {
		if (hasRunInitialEnterRef.current) {
			return;
		}

		let rafId = 0;
		let attempts = 0;

		const initialise = () => {
			// Safety: Bail out after max attempts
			if (attempts++ > MAX_INIT_ATTEMPTS) {
				console.warn(
					"Page transition overlay not found after 1s, skipping initial animation"
				);
				signalReady(); // Gracefully continue
				return;
			}

			const layer = firstLayerRef.current;
			if (!layer) {
				rafId = requestAnimationFrame(initialise);
				return;
			}

			hasRunInitialEnterRef.current = true;

			if (leaveTextRef.current) {
				const tl = gsap.timeline();

				tl.fromTo(
					leaveTextRef.current,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: TRANSITION_DURATION.INITIAL_LOAD,
						ease: TRANSITION_EASE.CHARS,
					}
				);

				tl.add(() => {
					handleEnter(() => {}).catch((err) => {
						console.error("Initial enter animation failed:", err);
					});
				}, `+=${TRANSITION_DURATION.INITIAL_DELAY}`);

				return;
			}

			handleEnter(() => {}).catch((err) => {
				console.error("Initial enter animation failed:", err);
			});
		};

		rafId = requestAnimationFrame(initialise);

		return () => {
			cancelAnimationFrame(rafId);
		};
	}, [handleEnter, signalReady]);

	return {
		firstLayerRef,
		leaveTextRef,
		wordCharacters, // Expose for declarative rendering
		transitionRouterProps: {
			auto: true,
			leave: handleLeave,
			enter: handleEnter,
		},
	};
}
