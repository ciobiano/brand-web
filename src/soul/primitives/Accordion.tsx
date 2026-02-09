"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
	activeId: string | null;
	toggle: (id: string) => void;
	activeHoverId: string | null;
	setActiveHoverId: (value: ((prev: string | null) => string | null) | string | null) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error("Accordion components must be used within an Accordion");
	}
	return context;
}

interface AccordionProps {
	children: ReactNode;
	className?: string;
	defaultOpen?: string;
}

export function Accordion({ children, className, defaultOpen }: AccordionProps) {
	const [activeId, setActiveId] = useState<string | null>(defaultOpen ?? null);
	const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

	const toggle = (id: string) => {
		setActiveId((current) => (current === id ? null : id));
	};

	return (
		<AccordionContext.Provider value={{ activeId, toggle, activeHoverId, setActiveHoverId }}>
			<div className={className}>{children}</div>
		</AccordionContext.Provider>
	);
}

interface AccordionItemContextValue {
	isPreviewVisible: boolean;
	isMouseOverItem: boolean;
	previewRef: { current: HTMLDivElement | null };
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItem() {
	const context = useContext(AccordionItemContext);
	if (!context) {
		throw new Error("AccordionHoverPreview must be used within an AccordionItem");
	}
	return context;
}

/** Returns true whenever the mouse is anywhere inside the AccordionItem row. */
export function useAccordionItemHover(): boolean {
	const context = useContext(AccordionItemContext);
	return context?.isMouseOverItem ?? false;
}

/** Returns the value of the currently-open item, or null if none is open. */
export function useAccordionActive(): string | null {
	const { activeId } = useAccordion();
	return activeId;
}

interface AccordionItemProps {
	children: ReactNode;
	value: string;
	className?: string;
}

export function AccordionItem({ children, value, className }: AccordionItemProps) {
	const { activeId, activeHoverId, setActiveHoverId } = useAccordion();
	const isOpen = activeId === value;
	const isPreviewVisible = activeHoverId === value && !isOpen;
	const isMouseOverItem = activeHoverId === value;
	const itemRef = useRef<HTMLDivElement>(null);
	const previewRef = useRef<HTMLDivElement | null>(null);

	const handleMouseMove = (e: { clientX: number }) => {
		if (!itemRef.current || !previewRef.current || isOpen) return;
		const rect = itemRef.current.getBoundingClientRect();
		const normalizedX = (e.clientX - rect.left) / rect.width;
		gsap.to(previewRef.current, {
			x: (normalizedX - 0.5) * 120,
			duration: 0.2,
			ease: "power2.out",
			overwrite: "auto",
		});
	};

	return (
		<AccordionItemContext.Provider value={{ isPreviewVisible, isMouseOverItem, previewRef }}>
			<div
				ref={itemRef}
				className={cn("border-b border-neutral-200 relative", className)}
				data-state={isOpen ? "open" : "closed"}
				onMouseEnter={(e) => {
					setActiveHoverId(value);
					if (!isOpen && itemRef.current && previewRef.current) {
						const rect = itemRef.current.getBoundingClientRect();
						const normalizedX = (e.clientX - rect.left) / rect.width;
						gsap.set(previewRef.current, { x: (normalizedX - 0.5) * 120 });
					}
				}}
				onMouseLeave={() => {
					setActiveHoverId((prev) => (prev === value ? null : prev));
				}}
				onMouseMove={handleMouseMove}
			>
				{children}
			</div>
		</AccordionItemContext.Provider>
	);
}

interface AccordionTriggerProps {
	children: ReactNode;
	value: string;
	className?: string;
	iconClassName?: string;
}

export function AccordionTrigger({ children, value, className, iconClassName }: AccordionTriggerProps) {
	const { activeId, toggle } = useAccordion();
	const isOpen = activeId === value;
	const iconRef = useRef<SVGSVGElement>(null);

	useGSAP(() => {
		if (!iconRef.current) return;

		gsap.to(iconRef.current, {
			rotation: isOpen ? 45 : 0,
			duration: 0.3,
			ease: "power2.out",
		});
	}, [isOpen]);

	return (
		<button
			onClick={() => toggle(value)}
			className={cn(
				"w-full flex justify-between items-center py-6 text-left cursor-pointer",
				className
			)}
			aria-expanded={isOpen}
		>
			<span className="flex-1">{children}</span>
			<span
				className={cn(
					"w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center flex-shrink-0 hover:bg-neutral-800 transition-colors",
					iconClassName
				)}
			>
				<svg
					ref={iconRef}
					className="w-5 h-5 text-violet-400  "
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={1.5}
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
				</svg>
			</span>
		</button>
	);
}

interface AccordionContentProps {
	children: ReactNode;
	value: string;
	className?: string;
}

export function AccordionContent({ children, value, className }: AccordionContentProps) {
	const { activeId } = useAccordion();
	const isOpen = activeId === value;
	const contentRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!contentRef.current) return;

		if (isOpen) {
			gsap.to(contentRef.current, {
				height: "auto",
				opacity: 1,
				duration: 0.4,
				ease: "power2.out",
			});
		} else {
			gsap.to(contentRef.current, {
				height: 0,
				opacity: 0,
				duration: 0.3,
				ease: "power2.in",
			});
		}
	}, [isOpen]);

	return (
		<div
			ref={contentRef}
			className={cn("overflow-hidden h-0 opacity-0", className)}
			aria-hidden={!isOpen}
		>
			{children}
		</div>
	);
}

interface AccordionHoverPreviewProps {
	children: ReactNode;
	className?: string;
}

export function AccordionHoverPreview({ children, className }: AccordionHoverPreviewProps) {
	const { isPreviewVisible, previewRef } = useAccordionItem();

	useGSAP(() => {
		if (!previewRef.current) return;

		if (isPreviewVisible) {
			gsap.to(previewRef.current, {
				opacity: 1,
				scale: 1,
				duration: 0.4,
				ease: "power2.out",
				overwrite: true,
			});
		} else {
			gsap.set(previewRef.current, { opacity: 0, scale: 0.95 });
		}
	}, [isPreviewVisible]);

	return (
		<div
			ref={previewRef}
			className={cn(
				"absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-10",
				className
			)}
			style={{ opacity: 0 }}
		>
			{children}
		</div>
	);
}
