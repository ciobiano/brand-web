"use client";

import { MouseEvent } from "react";
import Link from "next/link";

interface NavItem {
	name: string;
	href: string;
}

interface MobileNavMenuProps {
	navItems: NavItem[];
	handleNavClick: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default function MobileNavMenu({ navItems, handleNavClick }: MobileNavMenuProps) {
	return (
		<div className="md:hidden flex flex-col items-center gap-8 w-full px-6">
			{navItems.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					onClick={handleNavClick(item.href)}
					className="nav-item text-4xl font-light text-[#e0e0e0]"
				>
					{item.name}
				</Link>
			))}
		</div>
	);
}
