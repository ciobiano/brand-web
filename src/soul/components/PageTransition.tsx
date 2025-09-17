"use client";

import { useRef, startTransition } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { TransitionRouter } from "next-transition-router";

gsap.registerPlugin(SplitText);

const transitionWords = ["Studio", "Collective", "Atelier", "Works", "Lab"];

const waitForTimeline = (timeline: gsap.core.Timeline) =>
	new Promise<void>((resolve) => {
		const finish = () => {
			timeline.eventCallback("onComplete", null);
			timeline.eventCallback("onInterrupt", null);
			resolve();
		};

		timeline.eventCallback("onComplete", finish);
		timeline.eventCallback("onInterrupt", finish);
	});

export function Providers({ children }: { children: React.ReactNode }) {
	const firstLayer = useRef<HTMLDivElement | null>(null);
	const leaveTextRef = useRef<HTMLSpanElement | null>(null);
	const leaveWordRef = useRef<HTMLSpanElement | null>(null);
	const leaveSplitRef = useRef<SplitText | null>(null);
	const leaveCharsRef = useRef<Element[]>([]);
	const wordIndexRef = useRef(0);

	return (
		<TransitionRouter
			auto={true}
			leave={async (next) => {
				leaveSplitRef.current?.revert();
				leaveSplitRef.current = null;

				const textEl = leaveTextRef.current;
				if (textEl) {
					gsap.set(textEl, { opacity: 1 });
				}

				const wordEl = leaveWordRef.current;
				if (wordEl) {
					const currentWord = transitionWords[wordIndexRef.current];
					wordEl.textContent = currentWord;
					wordIndexRef.current =
						(wordIndexRef.current + 1) % transitionWords.length;
					leaveSplitRef.current = new SplitText(wordEl, {
						type: "chars",
						mask: "lines",
					});
					leaveCharsRef.current = leaveSplitRef.current.chars ?? [];
				} else {
					leaveCharsRef.current = [];
				}

				const tl = gsap
					.timeline()
					.fromTo(
						firstLayer.current,
						{ y: "100%" },
						{
							y: 0,
							duration: 0.7,
							ease: "circ.inOut",
						},
						"<"

					)
				if (leaveCharsRef.current.length) {
					tl.fromTo(
						leaveCharsRef.current,
						{ yPercent: 60, opacity: 0 },
						{
							yPercent: 0,
							opacity: 1,
							duration: 0.3,
							ease: "power3.out",
							stagger: 0.1 ,
						},
						"<50%"
					);
				}

				await waitForTimeline(tl);
				next();

				return () => {
					tl.kill();
				};
			}}
			enter={async (next) => {
				const tl = gsap.timeline();
				const textEl = leaveTextRef.current;
				if (textEl) {
					tl.to(textEl, {
						opacity: 0,
						duration: 0.5,
						ease: "power2.in",
					});
				} else if (leaveCharsRef.current.length) {
					tl.to(leaveCharsRef.current, {
						opacity: 0,
						duration: 0.5,
						ease: "power2.in",
						stagger: 0.1,
					});
				}

				tl.fromTo(
						firstLayer.current,
						{ y: 0 },
						{
							y: "-100%",
							duration: 0.7,
							ease: "circ.inOut",
						}
					);
				tl.call(() => {
						leaveSplitRef.current?.revert();
						leaveSplitRef.current = null;
						leaveCharsRef.current = [];
					});

				await waitForTimeline(tl);

				await new Promise<void>((resolve) => {
					requestAnimationFrame(() => {
						startTransition(() => {
							next();
							resolve();
						});
					});
				});

				return () => {
					tl.kill();
					leaveSplitRef.current?.revert();
					leaveSplitRef.current = null;
					leaveCharsRef.current = [];
				};
			}}
		>
			<main>{children}</main>

			<div
				ref={firstLayer}
				className="pointer-events-none fixed inset-0 z-[99] translate-y-full bg-clou-black text-white flex items-center justify-center"
			>
			
				<span
					ref={leaveTextRef}
					className="text-3xl font-semibold uppercase tracking-[0.6rem] sm:text-4xl md:text-5xl"
				>
					Clou <span ref={leaveWordRef}>Studio</span>
				</span>
			</div>
		</TransitionRouter>
	);
}
