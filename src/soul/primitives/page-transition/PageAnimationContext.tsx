"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	type PropsWithChildren,
} from "react";

interface PageAnimationContextValue {
	isReady: boolean;
	signalReady: () => void;
	reset: () => void;
}

const PageAnimationContext = createContext<PageAnimationContextValue | null>(
	null
);

export function PageAnimationProvider({ children }: PropsWithChildren) {
	const [isReady, setIsReady] = useState(false);

	const signalReady = useCallback(() => {
		setIsReady(true);
	}, []);

	const reset = useCallback(() => {
		setIsReady(false);
	}, []);

	return (
		<PageAnimationContext.Provider value={{ isReady, signalReady, reset }}>
			{children}
		</PageAnimationContext.Provider>
	);
}

/**
 * Hook to check if page animations should start.
 * Returns true when the page transition has completed and animations can begin.
 */
export function usePageAnimationReady(): boolean {
	const context = useContext(PageAnimationContext);
	if (!context) return true;
	return context.isReady;
}

/**
 * Hook to get the full context for controlling page animation state.
 * Used internally by the page transition system.
 */
export function usePageAnimationContext(): PageAnimationContextValue {
	const context = useContext(PageAnimationContext);
	if (!context) {
		throw new Error(
			"usePageAnimationContext must be used within a PageAnimationProvider"
		);
	}
	return context;
}
