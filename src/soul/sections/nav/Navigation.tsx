"use client";

import { MouseEvent } from "react";
import { useTransitionRouter } from "next-transition-router";
import Logo from "./Logo";
import Button from "../../primitives/Button";

const navItems = [
	{ name: "Projects", href: "/projects", message:'kaine projects' },
	{ name: "Agency", href: "/agency", message:'kaine projects'  },
	{ name: "Journal", href: "/journal", message:'kaine projects' },
	{ name: "Contact", href: "/contact", message:'kaine projects' },
];

export default function Navigation() {
	const router = useTransitionRouter();

	const isModifiedEvent = (event: MouseEvent<HTMLAnchorElement>) =>
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		(event.button !== undefined && event.button !== 0);

	const handleNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
		if (isModifiedEvent(event)) {
			return;
		}
		event.preventDefault();
		router.push(href);
	};

	return (
		<nav className="fixed top-4 left-0 right-0 z-50 w-full ">
			<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center  h-16">
					{/* Logo */}

					<div className="flex flex-1 items-center ">
						<Logo />
					</div>

					
					<div className="flex-shrink-0">
						<div className="hidden md:flex p-1  rounded-3xl bg-clou-white/50 backdrop-blur-xl items-center space-x-2">
						{navItems.map((item) => (
							<Button key={item.name} variant="nav" size="nav" href={item.href}>
								{item.name}
							</Button>
						))}
					</div>
					</div>

					{/* Mobile menu button */}
					<div className="flex flex-1 justify-end ">
						    <div className="flex-shrink-0">

						<button
							type="button"
							className="bg-clou-black inline-flex items-center justify-center p-3 rounded-full text-clou-white  hover:scale-105"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			</div>

			{/* Mobile menu */}
			<div className="md:hidden" id="mobile-menu">
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
					{navItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							onClick={handleNavClick(item.href)}
							className="text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
						>
							{item.name}
						</a>
					))}
				</div>
			</div>
		</nav>
	);
}
