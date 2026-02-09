"use client";

import type { PropsWithChildren } from "react";
import { TransitionRouter } from "next-transition-router";
import { usePageTransition } from "./usePageTransition";
import { PageAnimationProvider } from "./PageAnimationContext";

function PageTransitionInner({ children }: PropsWithChildren) {
	const {
		firstLayerRef,
		leaveTextRef,
		wordCharacters,
		transitionRouterProps,
	} = usePageTransition();

	return (
		<TransitionRouter {...transitionRouterProps}>
			<main>{children}</main>

			<div
				ref={firstLayerRef}
				className="pointer-events-none cursor-none fixed inset-0 z-[99] translate-y-0 bg-kainé-black text-white flex items-center "
			>
				<div className='w-full max-w-4xl mx-auto  justify-start  '>
					<span
						ref={leaveTextRef}
						className="text-4xl font-normal  opacity-0"
					>
						kainé{" "}
						<span>
							{wordCharacters.map((char, index) => (
								<span
									key={`${char}-${index}`}
									data-word-char
									className="inline-block"
								>
									{char}
								</span>
							))}
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
