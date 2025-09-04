"use client";

import Link from "next/link";
import React from "react";

type LogoProps = {
	className?: string;
	href?: string;
	letter?: string;
};

const Logo: React.FC<LogoProps> = ({
	className = "",
	href = "#",
	letter = "C",
}) => {
	return (
		<div className={`absolute top-0 left-0 z-50 p-6 ${className}`}>
			<Link
				href={href}
				className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center transition-transform hover:scale-105"
			>
				<span className="text-white font-bold text-lg">{letter}</span>
			</Link>
		</div>
	);
};

export default Logo;
