"use client";

import type { PropsWithChildren, RefObject } from "react";
import { TransitionRouter } from "next-transition-router";
import { usePageTransition } from "./usePageTransition";
import { PageAnimationProvider } from "./PageAnimationContext";
import { useTextReveal } from "@/hooks/useTextReveal";

function PageTransitionInner({ children }: PropsWithChildren) {
	const {
		firstLayerRef,
		leaveTextRef,
		currentWord,
		wordRevealKey,
		transitionRouterProps,
	} = usePageTransition();

	useTextReveal(leaveTextRef as RefObject<HTMLElement>, {
		isReady: true,
		animateOnScroll: false,
		triggerKey: wordRevealKey,
		delay: 0.35,
		stagger: 0.12,
		duration: 0.9,
	});

	return (
		<TransitionRouter {...transitionRouterProps}>
			<main>{children}</main>

			<div
				ref={firstLayerRef}
				className="pointer-events-none cursor-none fixed inset-0 z-[99] translate-y-0 bg-kainé-black text-white flex items-center px-6 sm:px-10"
			>
				<div className="w-full max-w-4xl mx-auto flex items-baseline justify-start">
					<span className="block text-4xl sm:text-5xl font-normal leading-tight sm:leading-snug tracking-tight text-balance">
						kainé{" "}
						<span
							ref={leaveTextRef}
							className="ml-3 sm:ml-4 inline-block opacity-0"
						>
							{currentWord}
						</span>
					</span>
				</div>
			</div>
		</TransitionRouter>
	);
}

export function PageTransitionProvider({ children }: PropsWithChildren) {
	return (
		<PageAnimationProvider>
			<PageTransitionInner>{children}</PageTransitionInner>
		</PageAnimationProvider>
	);
}
