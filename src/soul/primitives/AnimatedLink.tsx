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

	const isExternalHref = (hrefValue: string) => {
		if (!hrefValue) return false;
		const protocolPrefixes = ["mailto:", "tel:"];
		if (protocolPrefixes.some((prefix) => hrefValue.startsWith(prefix))) {
			return true;
		}
		try {
			const url = new URL(hrefValue, window.location.href);
			return url.origin !== window.location.origin;
		} catch {
			return /^https?:\/\//.test(hrefValue);
		}
	};

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (isModifiedEvent(event) || external || isExternalHref(href)) {
			return;
		}
		event.preventDefault();
		transitionRouter.push(href);
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className={cn("group hover:transform-none", className)}
		>
			<div className="relative flex items-center overflow-hidden">
				<span
					aria-hidden="true"
					className="pointer-events-none absolute left-0 -translate-x-full text-2xl transition-transform duration-300 ease-out md:group-hover:translate-x-0"
				>
					→
				</span>
				<div className="leading-tight transition-[padding-left] duration-300 ease-out md:group-hover:pl-8">
					{children}
				</div>
			</div>
		</a>
	);
}
