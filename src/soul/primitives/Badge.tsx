"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
	children: ReactNode;
	variant?: "default" | "outline" | "secondary";
	size?: "sm" | "md" | "lg";
	className?: string;
}

const badgeVariants = {
	default: "bg-clou-black text-white",
	outline: "border border-clou-black  text-clou-black ",
	secondary: "bg-gray-100 text-gray-800",
};

const badgeSizes = {
	sm: "px-2 py-1 text-xs",
	md: "px-3 py-1.5 text-sm",
	lg: "px-4 py-2 text-base",
};

export default function Badge({
	children,
	variant = "default",
	size = "md",
	className,
}: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full ",
				badgeVariants[variant],
				badgeSizes[size],
				className
			)}
		>
			{children}
		</span>
	);
}
