"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/all";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface ScrollSmootherWrapperProps {
	children: React.ReactNode;
	contentClassName?: string;
}

export default function ScrollSmootherWrapper({
	children,
	contentClassName,
}: ScrollSmootherWrapperProps) {
	const smoother = useRef<ScrollSmoother | null>(null);
	const pathname = usePathname();

	useGSAP(
		() => {
			const initializeSmoother = () => {
				if (smoother.current) {
					smoother.current.kill();
				}

				smoother.current = ScrollSmoother.create({
					wrapper: "#smooth-wrapper",
					content: "#smooth-content",
					smooth: 2,
					effects: true,
					normalizeScroll: false,
					ignoreMobileResize: true,
					smoothTouch: 0.1,
				});

				ScrollTrigger.refresh();
			};

			// Defer initialization until after load and two RAFs to avoid initial hitch
			if (typeof window !== "undefined") {
				const run = () =>
					requestAnimationFrame(() =>
						requestAnimationFrame(initializeSmoother)
					);
				if (document.readyState === "complete") {
					run();
				} else {
					const onLoad = () => {
						run();
						window.removeEventListener("load", onLoad);
					};
					window.addEventListener("load", onLoad);
				}
			}
		},
		{
			dependencies: [pathname],
		}
	);

	return (
		<div id="smooth-wrapper">
			<div id="smooth-content" className={contentClassName}>
				{children}
			</div>
		</div>
	);
}
