"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
	children: ReactNode;
	variant?: "default" | "outline" | "secondary" | "filter";
	size?: "sm" | "md" | "lg";
	className?: string;
	interactive?: boolean;
	active?: boolean;
	onClick?: () => void;
}

const badgeVariants = {
	default: "bg-kainé-black text-white",
	outline: "border border-kainé-black text-kainé-black",
	secondary: "bg-gray-100 text-gray-800",
	filter: "", // Filter styles are handled separately based on active state
};

const badgeSizes = {
	sm: "px-3 py-0.5 text-xs",
	md: "px-3 py-1.5 text-sm",
	lg: "px-4 py-2 text-base",
};

export default function Badge({
	children,
	variant = "default",
	size = "md",
	className,
	interactive = false,
	active = false,
	onClick,
}: BadgeProps) {
	const isFilter = variant === "filter";

	const filterStyles = isFilter
		? active
			? "border-transparent bg-neutral-900 text-white shadow-[0_8px_24px_-12px_rgba(15,15,15,0.35)]"
			: "border-neutral-500/80 bg-white text-neutral-700 hover:border-neutral-600 hover:text-neutral-900"
		: "";

	const baseClasses = cn(
		"inline-flex items-center rounded-full relative overflow-hidden transition-all",
		badgeSizes[size],
		isFilter ? cn("border", filterStyles) : badgeVariants[variant],
		interactive && "cursor-pointer",
		interactive && !isFilter && "hover:opacity-80 transition-opacity",
		className
	);

	if (interactive || onClick) {
		return (
			<button
				type="button"
				onClick={onClick}
				className={cn(
					baseClasses,
					"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
				)}
			>
				{children}
			</button>
		);
	}

	return (
		<span className={baseClasses}>
			{children}
		</span>
	);
}
