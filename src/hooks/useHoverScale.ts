"use client";

import { type RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Unified hover scale animation with automatic event listener management.
 *
 * Applies a smooth scale animation on mouse enter/leave. Automatically
 * handles event listener cleanup and uses `overwrite: "auto"` to prevent
 * animation conflicts.
 *
 * @param containerRef - Parent element containing hoverable items
 * @param options - Configuration options
 * @param options.selector - CSS selector for items to animate (e.g., "[data-team-card]")
 * @param options.targetSelector - Optional selector for the actual element to scale (nested child)
 * @param options.scale - Scale amount on hover (default: 1.05)
 * @param options.duration - Animation duration in seconds (default: 0.6)
 * @param options.ease - GSAP easing function (default: "power2.out")
 *
 * @example
 * ```tsx
 * const gridRef = useRef<HTMLDivElement>(null);
 *
 * // Scale entire cards on hover
 * useHoverScale(gridRef, {
 *   selector: "[data-team-card]",
 *   scale: 1.05,
 *   duration: 0.6
 * });
 *
 * // Scale nested images on card hover
 * useHoverScale(gridRef, {
 *   selector: "[data-team-card]",
 *   targetSelector: "[data-team-image]",
 *   scale: 1.05
 * });
 * ```
 */
export function useHoverScale(
  containerRef: RefObject<HTMLElement>,
  options: {
    selector: string;
    targetSelector?: string;
    scale?: number;
    duration?: number;
    ease?: string;
  }
) {
  const {
    selector,
    targetSelector,
    scale = 1.05,
    duration = 0.6,
    ease = "power2.out",
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const items = containerRef.current.querySelectorAll(selector);
      const cleanupFunctions: (() => void)[] = [];

      items.forEach((item) => {
        const target = targetSelector
          ? item.querySelector(targetSelector)
          : item;

        if (!target) return;

        const handleMouseEnter = () => {
          gsap.to(target, {
            scale,
            duration,
            ease,
            overwrite: "auto", // Prevent conflicts with other animations
          });
        };

        const handleMouseLeave = () => {
          gsap.to(target, {
            scale: 1,
            duration,
            ease,
            overwrite: "auto",
          });
        };

        item.addEventListener("mouseenter", handleMouseEnter);
        item.addEventListener("mouseleave", handleMouseLeave);

        cleanupFunctions.push(() => {
          item.removeEventListener("mouseenter", handleMouseEnter);
          item.removeEventListener("mouseleave", handleMouseLeave);
        });
      });

      return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
      };
    },
    { scope: containerRef, dependencies: [selector, targetSelector, scale, duration, ease] }
  );
}
