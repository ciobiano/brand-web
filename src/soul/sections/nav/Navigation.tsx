"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTransitionRouter } from "next-transition-router";
import { navigationItems } from "@/data";
import NavigationBar from "./NavigationBar";
import DesktopNavMenu from "./DesktopNavMenu";
import MobileNavMenu from "./MobileNavMenu";
import NavigationFooter from "./NavigationFooter";

export default function Navigation() {
	const router = useTransitionRouter();
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	useGSAP(
		() => {
			if (!menuRef.current) return;

			gsap.killTweensOf([menuRef.current, ".nav-item"]);

			if (isOpen) {
				gsap.set(".nav-item", { y: 50, opacity: 0 });

				const openTl = gsap.timeline();

				openTl.to(menuRef.current, {
					y: "0%",
					duration: 0.8,
					ease: "power3.out",
					overwrite: true,
				});

				openTl.to(".nav-item", {
					y: 0,
					opacity: 1,
					duration: 0.6,
					stagger: 0.08,
					ease: "power2.out",
					overwrite: true,
				}, "-=0.4");
			} else {
				const closeTl = gsap.timeline();

				closeTl.to(".nav-item", {
					y: -30,
					opacity: 0,
					duration: 0.2,
					stagger: 0.02,
					ease: "power2.in",
					overwrite: true,
				});

				closeTl.to(menuRef.current, {
					y: "-100%",
					duration: 0.4,
					ease: "power3.in",
					overwrite: true,
				}, "-=0.2");

				closeTl.set(".nav-item", { y: 50, opacity: 0, delay: 0.6 });
			}
		},
		{ scope: containerRef, dependencies: [isOpen] }
	);

	const toggleMenu = () => setIsOpen(!isOpen);

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
		<nav ref={containerRef} data-scroll-nav className="fixed top-4 left-0 right-0 z-50 w-full">
			<NavigationBar isOpen={isOpen} toggleMenu={toggleMenu} navItems={navigationItems} />

			<div
				ref={menuRef}
				className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-center -translate-y-full will-change-transform"
			>
				<DesktopNavMenu navItems={navigationItems} handleNavClick={handleNavClick} />
				<MobileNavMenu navItems={navigationItems} handleNavClick={handleNavClick} />
				<NavigationFooter />
			</div>
		</nav>
	);
}
