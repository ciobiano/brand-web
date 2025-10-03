"use client";

import type { PropsWithChildren } from "react";
import { TransitionRouter } from "next-transition-router";
import { usePageTransition } from "./usePageTransition";

export function PageTransitionProvider({ children }: PropsWithChildren) {
	const {
		firstLayerRef,
		leaveTextRef,
		leaveWordRef,
		transitionRouterProps,
	} = usePageTransition();

	return (
		<TransitionRouter {...transitionRouterProps}>
			<main>{children}</main>

			<div
				ref={firstLayerRef}
				className="pointer-events-none fixed inset-0 z-[99] translate-y-0 bg-clou-black text-white flex items-center justify-center"
			>
				<span
					ref={leaveTextRef}
					className="text-3xl font-semibold uppercase tracking-[0.6rem] opacity-0 sm:text-4xl md:text-5xl"
				>
					Clou <span ref={leaveWordRef}>Studio</span>
				</span>
			</div>
		</TransitionRouter>
	);
}
