"use client";

import { type RefObject } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);


export function useTextReveal(
	elementRef: RefObject<HTMLElement>,
	options?: {
		isReady?: boolean;
		animateOnScroll?: boolean;
		triggerKey?: number | string;
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
		triggerKey = 0,
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

			gsap.set(element, { overflow: "hidden", opacity: 1 });

			const split = new SplitText(element, {
				type: "lines",
				linesClass: "split-line",
        mask: "lines",
        charsClass: "split-char",
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
			dependencies: [
				isReady,
				animateOnScroll,
				triggerKey,
				delay,
				stagger,
				duration,
				ease,
				start,
			],
			scope: elementRef,
		}
	);
}
