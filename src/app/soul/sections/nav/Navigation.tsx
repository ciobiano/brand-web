"use client";

import React from "react";

type NavigationProps = {
	className?: string;
};

const Navigation: React.FC<NavigationProps> = ({ className = "" }) => {
	return (
		<nav className={`absolute top-0 right-0 z-50 p-6 ${className}`}>
			<div className="hidden md:flex space-x-8">
				<a
					href="#"
					className="text-black text-base font-medium hover:opacity-70 transition-opacity"
				>
					Projekte
				</a>
				<a
					href="#"
					className="text-black text-base font-medium hover:opacity-70 transition-opacity"
				>
					Agentur
				</a>
				<a
					href="#"
					className="text-black text-base font-medium hover:opacity-70 transition-opacity"
				>
					Journal
				</a>
				<a
					href="#"
					className="text-black text-base font-medium hover:opacity-70 transition-opacity"
				>
					Kontakt
				</a>
			</div>
			<div className="md:hidden">
				<button className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
					<span className="text-white text-xs">☰</span>
				</button>
			</div>
		</nav>
	);
};

export default Navigation;
