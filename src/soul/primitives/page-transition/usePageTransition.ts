"use client";

import { useCallback, useEffect, useRef, startTransition } from "react";
import { gsap } from "gsap";

export type TransitionCallback = (
	next: () => void,
	from?: string,
	to?: string
) => Promise<(() => void) | void>;

const transitionWords = ["Studio", "Collective", "Atelier", "Works", "Lab"];

export function usePageTransition() {
	const firstLayerRef = useRef<HTMLDivElement | null>(null);
	const leaveTextRef = useRef<HTMLSpanElement | null>(null);
	const leaveWordRef = useRef<HTMLSpanElement | null>(null);
	const wordIndexRef = useRef(0);
	const hasRunInitialEnterRef = useRef(false);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

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
			const layer = firstLayerRef.current;
			if (!layer) {
				next();
				return;
			}

			const textEl = leaveTextRef.current;
			const wordEl = leaveWordRef.current;
			const characters: HTMLElement[] = [];

			if (wordEl) {
				const nextWord = transitionWords[wordIndexRef.current];
				wordIndexRef.current = (wordIndexRef.current + 1) % transitionWords.length;

				wordEl.textContent = "";
				nextWord.split("").forEach((char) => {
					const span = document.createElement("span");
					span.textContent = char;
					span.style.display = "inline-block";
					wordEl.appendChild(span);
					characters.push(span);
				});
			}

			if (textEl) {
				gsap.set(textEl, { opacity: 1 });
			}

			await runTimeline((timeline) => {
				timeline.set(layer, { y: "100%" });
				timeline.to(layer, {
					y: 0,
					duration: 0.7,
					ease: "circ.inOut",
				});

					if (characters.length) {
						timeline.fromTo(
							characters,
							{ yPercent: 60, opacity: 0 },
							{
								yPercent: 0,
								opacity: 1,
								duration: 0.3,
								ease: "power3.out",
								stagger: 0.08,
							},
							"-=0.45"
						);
						
					} else if (textEl) {
							timeline.to(
								textEl,
								{
									opacity: 0,
									duration: 0.2,
									ease: "sine.inOut",
								},
								">-0.2"
							);
					}
				});

			next();

			return () => {
				timelineRef.current?.kill();
				timelineRef.current = null;
			};
		},
		[runTimeline]
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
					timeline.set(textEl, { opacity: 0 });
				}

				timeline.to(layer, {
					y: "-100%",
					duration: 0.7,
					ease: "circ.inOut",
				});
				timeline.set(layer, { y: "100%" });
			});

			await new Promise<void>((resolve) => {
				requestAnimationFrame(() => {
					startTransition(() => {
						next();
						resolve();
					});
				});
			});

			return () => {
				timelineRef.current?.kill();
				timelineRef.current = null;
			};
		},
		[runTimeline]
	);

	useEffect(() => {
		if (hasRunInitialEnterRef.current) {
			return;
		}

		let rafId = 0;

		const initialise = () => {
			const layer = firstLayerRef.current;
			if (!layer) {
				rafId = requestAnimationFrame(initialise);
				return;
			}

			hasRunInitialEnterRef.current = true;
			gsap.set(layer, { y: "100%" });

			if (leaveTextRef.current) {
				gsap.set(leaveTextRef.current, { opacity: 0 });
			}

			handleEnter(() => {}).catch(() => {
				// Ignore; router will retry on navigation.
			});
		};

		rafId = requestAnimationFrame(initialise);

		return () => {
			cancelAnimationFrame(rafId);
		};
	}, [handleEnter]);

	return {
		firstLayerRef,
		leaveTextRef,
		leaveWordRef,
		transitionRouterProps: {
			auto: true,
			leave: handleLeave,
			enter: handleEnter,
		},
	};
}
