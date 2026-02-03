"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavItem {
	name: string;
	href: string;
	image: string;
}

interface DesktopNavMenuProps {
	navItems: NavItem[];
	handleNavClick: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default function DesktopNavMenu({ navItems, handleNavClick }: DesktopNavMenuProps) {
	return (
		<div className="hidden md:flex w-full h-full flex-col justify-center items-center px-8 " data-cursor-invert>
			<div className="flex flex-col w-full">
				{navItems.map((item, index) => {
					const imageOnRight = index % 2 !== 0;

					return (
						<div key={item.href} className="nav-item relative">
							<Link
								href={item.href}
								onClick={handleNavClick(item.href)}
								className={`group flex items-center justify-center gap-6 py-8 hover:scale-105 transition-transform duration-300 ${
									imageOnRight ? 'mr-40' : 'ml-40'
								}`}
							>
								{/* Circular Image - Left */}
								{!imageOnRight && (
									<div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
										<Image
											src={item.image}
											alt={item.name}
											fill
											className="object-cover"
										/>
									</div>
								)}

								{/* Text */}
								<span className="text-6xl md:text-7xl lg:text-[7.5vw] font-light tracking-tight text-[#d6d6d6d4] group-hover:text-white transition-colors">
									{item.name}
								</span>

								{/* Circular Image - Right */}
								{imageOnRight && (
									<div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
										<Image
											src={item.image}
											alt={item.name}
											fill
											className="object-cover"
										/>
									</div>
								)}
							</Link>

							{/* Full-width border */}
							<div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
