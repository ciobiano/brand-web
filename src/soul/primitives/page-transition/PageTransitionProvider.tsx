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
				className="pointer-events-none fixed inset-0 z-[99] translate-y-0 bg-clou-black text-white flex items-center "
			>
				<div className='w-full max-w-4xl mx-auto  justify-start  '>

				<span
					ref={leaveTextRef}
					className="text-3xl   tracking-[0.2rem] opacity-0"
				>
					Clou <span ref={leaveWordRef}>Studio</span>
				</span>
				</div>
			</div>
		</TransitionRouter>
	);
}
