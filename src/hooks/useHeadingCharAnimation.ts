"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

/**
 * Unified heading character animation.
 * Uses GSAP SplitText with mask for clean clip reveal.
 */
export function useHeadingCharAnimation(
  headingRef: RefObject<HTMLHeadingElement>,
  isReady: boolean,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    animateOnScroll?: boolean;
  }
) {
  const { 
    delay = 0, 
    duration = 1, 
    stagger = 0.05, 
    animateOnScroll = false 
  } = options ?? {};

  useGSAP(
    () => {
      if (!isReady || !headingRef.current) return;

      const split = SplitText.create(headingRef.current, {
        type: "chars",
        mask: "chars",
        charsClass: "char",
      });

      gsap.set(split.chars, { y: "100%" });

      const animationProps = {
        y: "0%",
        duration,
        stagger: 0.05,
        ease: "power4.out",
        delay,
      };

      if (animateOnScroll) {
        gsap.to(split.chars, {
          ...animationProps,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 75%",
            once: true,
          },
        });
      } else {
        gsap.to(split.chars, animationProps);
      }

      return () => {
        split.revert();
      };
    },
    { dependencies: [isReady, delay, duration, stagger, animateOnScroll] }
  );
}

