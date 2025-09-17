"use client";

import { MouseEvent, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTransitionRouter } from "next-transition-router";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

interface AnimatedLinkProps {
	children: ReactNode;
	className?: string;
	href: string;
	external?: boolean;
}

export default function AnimatedLink({
	children,
	className,
	href,
	external = false,
}: AnimatedLinkProps) {
	const ref = useRef<HTMLAnchorElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);
	const transitionRouter = useTransitionRouter();

	const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>) =>
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		(event.button !== undefined && event.button !== 0);

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (external || isModifiedEvent(event)) {
			return;
		}
		event.preventDefault();
		transitionRouter.push(href);
	};

	useGSAP(
		() => {
			const el = ref.current;
			const arrow = arrowRef.current;
			if (!el) return;

			gsap.fromTo(
				el,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 1.5, ease: "power.out(1.7)" }
			);

			const handleMouseEnter = () => {
			
				if (arrow) {
					gsap.to(arrow, {
						x: 0,
						opacity: 1,
						duration: 0.6,
						ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
					});
				}
			};

			const handleMouseLeave = () => {
			

				// Hide arrow
				if (arrow) {
					gsap.to(arrow, {
						x: -20,
						opacity: 0,
						duration: 0.6,
						ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
					});
				}
			};

			el.addEventListener("mouseenter", handleMouseEnter);
			el.addEventListener("mouseleave", handleMouseLeave);

			return () => {
				el.removeEventListener("mouseenter", handleMouseEnter);
				el.removeEventListener("mouseleave", handleMouseLeave);
			};
		},
		{ scope: ref }
	);

	const classes = cn(
		"inline-flex items-center relative group disabled:cursor-not-allowed transition-all duration-[600ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:pl-4",
		className
	);

	return (
		<a
			href={href}
			onClick={handleClick}
			className={classes}
			ref={ref as React.RefObject<HTMLAnchorElement>}
		>
			<div className="flex items-center gap-2 relative will-change-transform">
				<div ref={arrowRef} className="opacity-0 -translate-x-full absolute left-0">
					<ArrowRight size={20} />
				</div>
				<span className="relative z-10 transition-all group-hover:pl-6">
					{children}
				</span>
			</div>
		</a>
	);
}
