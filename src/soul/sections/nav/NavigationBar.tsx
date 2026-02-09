"use client";

import Logo from "./Logo";
import Button from "../../primitives/Button";

interface NavigationBarProps {
	isOpen: boolean;
	toggleMenu: () => void;
	navItems: Array<{
		name: string;
		href: string;
	}>;
}

export default function NavigationBar({ isOpen, toggleMenu, navItems }: NavigationBarProps) {
	return (
		<div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
			<div className="flex items-center h-16 pointer-events-none">
				<div className="flex flex-1 items-center pointer-events-auto">
					<Logo />
				</div>

				<div className={`flex-shrink-0 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
					<div className="hidden md:flex p-1 rounded-3xl bg-kainé-white/30 backdrop-blur-sm items-center space-x-2 pointer-events-auto">
						{navItems.map((item) => (
							<Button key={item.name} variant="nav" size="nav" href={item.href}>
								{item.name}
							</Button>
						))}
					</div>
				</div>

				<div className="flex flex-1 justify-end pointer-events-auto">
					<div className="flex-shrink-0">
						<button
							type="button"
							onClick={toggleMenu}
							className="bg-kainé-black inline-flex items-center justify-center p-3 rounded-full text-kainé-white hover:scale-105 transition-transform z-50 relative"
							aria-controls="mobile-menu"
							aria-expanded={isOpen}
						>
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
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
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
