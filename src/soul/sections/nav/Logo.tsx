"use client";

import React, { MouseEvent } from "react";
import { useTransitionRouter } from "next-transition-router";

type LogoProps = {
	className?: string; // Parent can pass absolute/fixed etc here if needed
	href?: string;
	letter?: string;
};

const Logo: React.FC<LogoProps> = ({
	className = "",
	href = "/",
	letter = "C",
}) => {
	const router = useTransitionRouter();

	const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>) =>
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		(event.button !== undefined && event.button !== 0);

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (isModifiedEvent(event)) {
			return;
		}
		event.preventDefault();
		router.push(href);
	};

	return (
		<div className={`p-6 ${className}`}>
			<a
				href={href}
				onClick={handleClick}
				className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center transition-transform hover:scale-105"
			>
				<span className="text-white font-bold text-lg">{letter}</span>
			</a>
		</div>
	);
};

export default Logo;
