"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Unified scroll-triggered entrance animation.
 *
 * Fades in and slides up elements when they enter the viewport.
 * Supports stagger for animating multiple elements sequentially.
 *
 * @param selector - CSS selector string or element ref to animate
 * @param options - Configuration options
 * @param options.y - Initial y offset in pixels (default: 60)
 * @param options.scale - Initial scale (default: 1, no scale)
 * @param options.opacity - Initial opacity (default: 0)
 * @param options.duration - Animation duration in seconds (default: 0.8)
 * @param options.stagger - Delay between animating multiple elements (default: 0)
 * @param options.ease - GSAP easing function (default: "power3.out")
 * @param options.start - ScrollTrigger start position (default: "top 75%")
 * @param options.toggleActions - ScrollTrigger toggle actions (default: "play none none reverse")
 * @param options.isPageReady - Gate animation on page transition (default: true)
 * @param options.scope - Container ref for scoping selector queries
 *
 * @example
 * ```tsx
 * // Single element
 * useScrollEntrance("[data-team-badge]", {
 *   y: 30,
 *   duration: 0.8
 * });
 *
 * // Multiple elements with stagger
 * useScrollEntrance("[data-team-card]", {
 *   y: 80,
 *   scale: 0.98,
 *   stagger: 0.08,
 *   isPageReady
 * });
 * ```
 */
export function useScrollEntrance(
  selector: string | RefObject<HTMLElement>,
  options?: {
    y?: number;
    scale?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    toggleActions?: string;
    isPageReady?: boolean;
    scope?: RefObject<HTMLElement>;
  }
) {
  const {
    y = 60,
    scale = 1,
    opacity = 0,
    duration = 0.8,
    stagger = 0,
    ease = "power3.out",
    start = "top 75%",
    toggleActions = "play none none reverse",
    isPageReady = true,
    scope,
  } = options ?? {};

  useGSAP(
    () => {
      if (!isPageReady) return;

      const target =
        typeof selector === "string"
          ? selector
          : selector.current;

      if (!target) return;

      gsap.set(target, {
        autoAlpha: opacity,
        y,
        scale,
      });

      gsap.to(target, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration,
        ease,
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: {
          trigger: target,
          start,
          toggleActions,
        },
      });
    },
    {
      dependencies: [isPageReady, y, scale, opacity, duration, stagger, ease, start],
      scope,
    }
  );
}
