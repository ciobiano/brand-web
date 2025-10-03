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
			// Kill any existing smoother
			if (smoother.current) {
				smoother.current.kill();
			}

			smoother.current = ScrollSmoother.create({
				smooth: 2,
				effects: true,
				normalizeScroll: true,
				ignoreMobileResize: true,
				smoothTouch: 0.1,
			});
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
