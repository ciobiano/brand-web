"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
	children: ReactNode;
	variant?: "primary" | "secondary" | "outline";
	size?: "sm" | "md" | "lg";
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
}

const buttonVariants = {
	primary: "bg-white text-black hover:bg-gray-100",
	secondary: "bg-gray-800 text-white hover:bg-gray-700",
	outline: "border border-white text-white hover:bg-white hover:text-black",
};

const buttonSizes = {
	sm: "px-4 py-2 text-sm",
	md: "px-6 py-3 text-base",
	lg: "px-8 py-4 text-lg",
};

export default function Button({
	children,
	variant = "primary",
	size = "md",
	className,
	onClick,
	type = "button",
	disabled = false,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={cn(
				"rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed",
				buttonVariants[variant],
				buttonSizes[size],
				className
			)}
		>
			{children}
		</button>
	);
}
