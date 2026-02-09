"use client";

import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-[3rem] text-base    disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
	{
		variants: {
			variant: {
				primary: "bg-[#1f2126] text-white hover:bg-[#141618]",
			
				secondary: "bg-[#e8ebe9] text-black hover:bg-gray-100",
				outline:
					"border border-white text-white hover:bg-white hover:text-black",
				"outline-dark":
					"border border-[#1f2126] text-[#1f2126] hover:bg-[#1f2126] hover:text-white",
				nav: "bg-transparent text-black hover:bg-[#f5f7f6] pl-4 pr-5 py-2",
				"nav-inverted": "bg-transparent text-white hover:bg-white/10 pl-4 pr-5 py-2",
			},
			size: {
				sm: "px-4 py-2 text-sm",
				md: "px-6 py-4 text-base",
				lg: "px-8 py-4 text-base",
				nav: "px-4 py-2 text-base",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	}
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	href?: string;
}

export default function Button({
	children,
	variant = "primary",
	size = "md",
	className,
	onClick,
	type = "button",
	disabled = false,
	href,
}: ButtonProps) {
	const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
	const bulletRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const el = ref.current;
			const bullet = bulletRef.current;
			if (!el) return;

			const handleMouseEnter = () => {
				if (bullet) {
					gsap.to(bullet, {
						opacity: 1,
						scale: 1,
						duration: 0.4,
						ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
						marginLeft: 4,
						marginRight: 4,
					});
				}
			};

			const handleMouseLeave = () => {
				if (bullet) {
					gsap.to(bullet, {
						opacity: 0,
						scale: 0.8,
						duration: 0.4,
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
		{ scope: ref, dependencies: [variant] }
	);

	const classes = cn(buttonVariants({ variant, size, className }));

	const bulletPoint = (
		<div
			ref={bulletRef}
			className="absolute left-2 top-1/2 -translate-y-1/2   size-4  bg-purple-400 rounded-full opacity-0 scale-80"
		/>
	);

	const textShiftClasses = cn(
		"relative z-10 inline-flex items-center gap-2 transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
		variant === "nav"
			? "pl-0 group-hover:pl-6"
			: "pl-0 group-hover:pl-3"
	);

	const content = (
		<>
			{bulletPoint}
			<span className={textShiftClasses}>{children}</span>
		</>
	);

	if (href) {
		return (
			<Link
				href={href}
				className={classes}
				ref={ref as React.RefObject<HTMLAnchorElement>}
			>
				{content}
			</Link>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={classes}
			ref={ref as React.RefObject<HTMLButtonElement>}
			
			
		>
			{content}
		</button>
	);
}
