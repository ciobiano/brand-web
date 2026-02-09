"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAccordionActive } from "@/soul/primitives/Accordion";

interface FloatingPreviewProps {
	items: { image: string; title: string }[];
	containerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Single floating image preview that follows the mouse across a list.
 * Uses GSAP quickTo() for smooth, performant cursor following with a natural lag effect.
 */
export default function FloatingPreview({ items, containerRef }: FloatingPreviewProps) {
	const previewRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const mouseInsideRef = useRef(false);
	const accordionOpen = useAccordionActive();
	const accordionOpenRef = useRef(accordionOpen);
	useEffect(() => {
		accordionOpenRef.current = accordionOpen;
	}, [accordionOpen]);

	const xSetter = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
	const ySetter = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

	useEffect(() => {
		if (previewRef.current) {
			xSetter.current = gsap.quickTo(previewRef.current, "x", { duration: 1.2, ease: "power3.out" });
			ySetter.current = gsap.quickTo(previewRef.current, "y", { duration: 1.2, ease: "power3.out" });
		}
	}, []);

	useGSAP(() => {
		if (!previewRef.current || activeIndex === null) return;
		gsap.fromTo(
			previewRef.current.querySelector("img"),
			{ scale: 1.08, opacity: 0.6 },
			{ scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
		);
	}, { dependencies: [activeIndex] });

	useEffect(() => {
		if (accordionOpen !== null) {
			gsap.to(previewRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
		} else if (mouseInsideRef.current) {
			gsap.to(previewRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" });
		}
	}, [accordionOpen]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el || !xSetter.current || !ySetter.current) return;

		const onEnter = (e: MouseEvent) => {
			mouseInsideRef.current = true;
			if (accordionOpenRef.current !== null) return;
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left - 75;
			const y = e.clientY - rect.top - 75;

			gsap.set(previewRef.current, { x, y });
			gsap.to(previewRef.current, { opacity: 1, duration: 0.25, ease: "power2.out" });
		};

		const onLeave = () => {
			mouseInsideRef.current = false;
			gsap.to(previewRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
		};

		const onMove = (e: MouseEvent) => {
			if (!containerRef.current || !xSetter.current || !ySetter.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left - 75;
			const y = e.clientY - rect.top - 75;

			xSetter.current(x);
			ySetter.current(y);

			const rows = containerRef.current.querySelectorAll("[data-expertise-row]");
			for (let i = 0; i < rows.length; i++) {
				const rowRect = rows[i].getBoundingClientRect();
				if (e.clientY >= rowRect.top && e.clientY <= rowRect.bottom) {
					setActiveIndex(i);
					return;
				}
			}
		};

		el.addEventListener("mouseenter", onEnter);
		el.addEventListener("mouseleave", onLeave);
		el.addEventListener("mousemove", onMove);
		return () => {
			el.removeEventListener("mouseenter", onEnter);
			el.removeEventListener("mouseleave", onLeave);
			el.removeEventListener("mousemove", onMove);
		};
	}, [containerRef]);

	return (
		<div
			ref={previewRef}
			className="absolute top-0 left-0 pointer-events-none z-10"
		>
			<div
				className="w-full h-full rounded-lg overflow-hidden aspect-square shadow-lg"
				style={{ backgroundColor: "#E8E0F0" }}
			>
				{activeIndex !== null && (
					<Image
						src={items[activeIndex].image}
						alt={items[activeIndex].title}
						width={150}
						height={150}
						className="object-cover w-full h-full"
						priority
					/>
				)}
			</div>
		</div>
	);
}
