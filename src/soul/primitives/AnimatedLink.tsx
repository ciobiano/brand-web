"use client";

import { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTransitionRouter } from "next-transition-router";

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

	return (
		<a href={href} onClick={handleClick} className={cn("group", className)}>
			<div className="relative flex items-center overflow-hidden ">
				<span
					aria-hidden="true"
					className="pointer-events-none absolute left-0 -translate-x-full text-2xl transition-transform duration-500 ease-out md:group-hover:translate-x-0 "
				>
					→
				</span>
				<div className="pl-0  leading-tight transition-all duration-500 ease-out md:group-hover:pl-8">
					{children}
				</div>
			</div>
		</a>
	);
}
