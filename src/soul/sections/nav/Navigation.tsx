"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTransitionRouter } from "next-transition-router";
import NavigationBar from "./NavigationBar";
import DesktopNavMenu from "./DesktopNavMenu";
import MobileNavMenu from "./MobileNavMenu";
import NavigationFooter from "./NavigationFooter";

// Extended nav items to support both original simple links and new overlay rich layout
const navItems = [
	{
		name: "Projects",
		href: "/projects",
		message: 'kaine projects',
		image: "/images/placeholder1.jpg",
		className: "md:top-[20%] md:left-[55%] md:-translate-x-1/2",
	},
	{
		name: "Agency",
		href: "/agency",
		message: 'kaine projects',
		image: "/images/placeholder2.jpg",
		className: "md:top-[35%] md:left-[%]",
	},
	{
		name: "Journal",
		href: "/journal",
		message: 'kaine projects',
		image: "/images/placeholder3.jpg",
		className: "md:top-[50%] md:right-[25%] md",
	},
	{
		name: "Contact",
		href: "/contact",
		message: 'kaine projects',
		image: "/images/placeholder4.jpg",
		className: "md:bottom-[20%] md:left-[50%] md:-translate-x-1/2",
	},
];

export default function Navigation() {
	const router = useTransitionRouter();
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	// Reset menu on route change
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	useGSAP(
		() => {
			if (!menuRef.current) return;

			// Kill any existing animations on these elements
			gsap.killTweensOf([menuRef.current, ".nav-item"]);

			if (isOpen) {
				// Set initial states
				gsap.set(".nav-item", { y: 50, opacity: 0 });

				// Opening animation - slide down from top
				const openTl = gsap.timeline();

				openTl.to(menuRef.current, {
					y: "0%",
					duration: 0.8,
					ease: "power3.out",
					overwrite: true,
				});

				// Stagger in items
				openTl.to(".nav-item", {
					y: 0,
					opacity: 1,
					duration: 0.6,
					stagger: 0.08,
					ease: "power2.out",
					overwrite: true,
				}, "-=0.4");
			} else {
				// Closing animation - slide up to top
				const closeTl = gsap.timeline();

				// Fade out items first with faster stagger
				closeTl.to(".nav-item", {
					y: -30,
					opacity: 0,
					duration: 0.2,
					stagger: 0.02,
					ease: "power2.in",
					overwrite: true,
				});

				// Slide up overlay to top
				closeTl.to(menuRef.current, {
					y: "-100%",
					duration: 0.4,
					ease: "power3.in",
					overwrite: true,
				}, "-=0.2");

				// Reset nav items position for next open
				closeTl.set(".nav-item", { y: 50, opacity: 0, delay: 0.6 });
			}
		},
		{ scope: containerRef, dependencies: [isOpen] }
	);

	const toggleMenu = () => setIsOpen(!isOpen);

	// Original helper for link handling
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
			<NavigationBar isOpen={isOpen} toggleMenu={toggleMenu} navItems={navItems} />

			{/* Fullscreen Overlay */}
			<div
				ref={menuRef}
				className="fixed inset-0 bg-[#0a0a0a] z-40 flex flex-col justify-center items-center -translate-y-full will-change-transform"
			>
				<DesktopNavMenu navItems={navItems} handleNavClick={handleNavClick} />
				<MobileNavMenu navItems={navItems} handleNavClick={handleNavClick} />
				<NavigationFooter />
			</div>
		</nav>
	);
}
