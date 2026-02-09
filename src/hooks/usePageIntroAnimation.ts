"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

/**
 * Unified page intro animation for filterable content pages.
 *
 * Animates three key sections with staggered timing using reveal-style animations:
 * 1. Body text - Line-by-line masked reveal using SplitText
 * 2. Filter buttons - Staggered reveal animation
 * 3. Content cards - Staggered reveal animation
 *
 * All elements use a consistent "slide up from behind mask" reveal pattern.
 *
 * @param scope - Container ref for scoping animations
 * @param isPageReady - Gate animations until page transition completes
 * @param selectors - CSS selectors for the three animated sections
 * @param selectors.bodyText - Paragraph/body text to reveal line-by-line
 * @param selectors.filters - Filter buttons container
 * @param selectors.cards - Card elements (use child selector like "> *")
 *
 * @example
 * ```tsx
 * usePageIntroAnimation(pageRef, isPageReady, {
 *   bodyText: "[data-body-text]",
 *   filters: "[data-filters]",
 *   cards: "[data-cards] > *"
 * });
 * ```
 */
export function usePageIntroAnimation(
  scope: RefObject<HTMLElement>,
  isPageReady: boolean,
  selectors: {
    bodyText: string;
    filters: string;
    cards: string;
  }
) {
  useGSAP(
    () => {
      if (!isPageReady || !scope.current) return;

      const bodyTextElement = scope.current.querySelector(selectors.bodyText);
      let split: SplitText | null = null;

      if (bodyTextElement) {
        gsap.set(bodyTextElement, { overflow: "hidden" });

        split = new SplitText(bodyTextElement, {
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
      }

      const filterItems = scope.current.querySelectorAll(`${selectors.filters} > *`);
      const cardItems = scope.current.querySelectorAll(selectors.cards);

      gsap.set(filterItems, { autoAlpha: 0, yPercent: 50 });
      gsap.set(cardItems, { autoAlpha: 0, yPercent: 30 });

      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power3.out",
        },
      });

      tl.to(
        cardItems,
        {
          autoAlpha: 1,
          yPercent: 0,
          stagger: 0.08,
        },
        0
      );

      tl.to(
        filterItems,
        {
          autoAlpha: 1,
          yPercent: 0,
          stagger: 0.04,
        },
        0.1
      );

      if (split && split.lines.length > 0) {
        tl.to(
          split.lines,
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.15, // Delay between each line
            ease: "power4.out",
          },
          0.2
        );
      }

      return () => {
        split?.revert();
      };
    },
    { dependencies: [scope, isPageReady], scope }
  );
}
