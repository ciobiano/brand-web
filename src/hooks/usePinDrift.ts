"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Unified scroll-pinned section with upward drift animation.
 *
 * Pins an element in place while scrolling, applying a subtle upward
 * yPercent movement. The pin duration is calculated based on a container's
 * height, creating a "floating while the world scrolls past" effect.
 *
 * Common use case: Pinning intro sections while content cards scroll beneath.
 *
 * @param triggerRef - Element to pin (e.g., intro section)
 * @param options - Configuration options
 * @param options.yPercent - Amount of upward drift (default: -15)
 * @param options.start - ScrollTrigger start position (default: "20% top")
 * @param options.containerRef - Reference for calculating dynamic end position
 * @param options.scrub - Scrub value for scroll-linked animation (default: true)
 *
 * @example
 * ```tsx
 * const introRef = useRef<HTMLDivElement>(null);
 * const containerRef = useRef<HTMLDivElement>(null);
 *
 * usePinDrift(introRef, {
 *   yPercent: -15,
 *   start: "20% top",
 *   containerRef
 * });
 * ```
 */
export function usePinDrift(
  triggerRef: RefObject<HTMLElement>,
  options?: {
    yPercent?: number;
    start?: string;
    containerRef?: RefObject<HTMLElement>;
    scrub?: boolean | number;
  }
) {
  const {
    yPercent = -15,
    start = "20% top",
    containerRef,
    scrub = true,
  } = options ?? {};

  useGSAP(
    () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const end = containerRef?.current
        ? `+=${containerRef.current.offsetHeight}`
        : "+=100%";

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start,
          end,
          pin: true,
          pinSpacing: false,
          scrub,
          invalidateOnRefresh: true,
        },
      });

      pinTl.to(trigger, {
        yPercent,
        ease: "none",
      });
    },
    {
      dependencies: [yPercent, start, scrub],
      scope: triggerRef,
    }
  );
}
