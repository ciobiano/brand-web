/**
 * Page Transition Animation Constants
 * Centralized timing and easing values for consistent animations
 */

export const TRANSITION_DURATION = {
	/** Main overlay slide duration */
	OVERLAY: 0.7,
	/** Text fade in/out duration */
	TEXT_FADE: 0.5,
	/** Character stagger animation duration */
	CHAR_ANIMATION: 0.3,
	/** Initial page load text animation */
	INITIAL_LOAD: 0.6,
	/** Delay before initial enter animation */
	INITIAL_DELAY: 0.5,
} as const;

export const TRANSITION_EASE = {
	/** Overlay slide easing */
	OVERLAY: "circ.inOut",
	/** Text fade easing */
	TEXT: "power2.inOut",
	/** Character stagger easing */
	CHARS: "power3.out",
} as const;

export const TRANSITION_STAGGER = {
	/** Stagger timing between characters */
	CHARS: 0.08,
} as const;

export const TRANSITION_TIMING = {
	/** Character animation starts this much before overlay finishes */
	CHAR_OVERLAP: -0.45,
	/** Text fade starts this much before overlay ends */
	TEXT_FADE_OVERLAP: -0.2,
} as const;
