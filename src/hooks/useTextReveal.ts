"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Line-by-line text reveal animation with mask effect.
 *
 * Splits text into lines and animates each line sliding up from behind
 * a mask. Can trigger on scroll or immediately on page load.
 *
 * @param elementRef - Text element to animate (p, h2, div, etc.)
 * @param options - Configuration options
 * @param options.isReady - Gate animation until ready (e.g., page transition complete)
 * @param options.animateOnScroll - Trigger on scroll instead of immediately (default: false)
 * @param options.delay - Delay before animation starts in seconds (default: 0)
 * @param options.stagger - Delay between each line in seconds (default: 0.15)
 * @param options.duration - Animation duration per line in seconds (default: 0.9)
 * @param options.ease - GSAP easing function (default: "power4.out")
 * @param options.start - ScrollTrigger start position (default: "top 80%")
 *
 * @example
 * ```tsx
 * const paragraphRef = useRef<HTMLParagraphElement>(null);
 * const isPageReady = usePageAnimationReady();
 *
 * useTextReveal(paragraphRef, {
 *   isReady: isPageReady,
 *   delay: 0.2
 * });
 *
 * // Or with scroll trigger
 * useTextReveal(paragraphRef, {
 *   isReady: true,
 *   animateOnScroll: true,
 *   start: "top 75%"
 * });
 * ```
 */
export function useTextReveal(
  elementRef: RefObject<HTMLElement>,
  options?: {
    isReady?: boolean;
    animateOnScroll?: boolean;
    delay?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    start?: string;
  }
) {
  const {
    isReady = true,
    animateOnScroll = false,
    delay = 0,
    stagger = 0.15,
    duration = 0.9,
    ease = "power4.out",
    start = "top 80%",
  } = options ?? {};

  useGSAP(
    () => {
      if (!isReady || !elementRef.current) return;

      const element = elementRef.current;

      gsap.set(element, { overflow: "hidden" });

      const split = new SplitText(element, {
        type: "lines",
        linesClass: "split-line",
      });

      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.set(split.lines, { yPercent: 100 });

      const animProps = {
        yPercent: 0,
        duration,
        stagger,
        ease,
        delay,
      };

      if (animateOnScroll) {
        gsap.to(split.lines, {
          ...animProps,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.to(split.lines, animProps);
      }

      return () => {
        split.revert();
      };
    },
    {
      dependencies: [isReady, animateOnScroll, delay, stagger, duration, ease, start],
      scope: elementRef,
    }
  );
}
