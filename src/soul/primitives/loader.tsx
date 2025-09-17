// components/PageLoader.tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface PageLoaderProps {
	message?: string;
	onComplete?: () => void;
}

export default function PageLoader({
	message = "",
	onComplete,
}: PageLoaderProps) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const messageRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!loaderRef.current) return;

			const tl = gsap.timeline({
				onComplete: () => {
					if (onComplete) onComplete();
				},
			});

			// Initial state
			gsap.set(loaderRef.current, { yPercent: 0 });
			gsap.set(messageRef.current, { opacity: 0 });

			// Animate in message
			tl.to(messageRef.current, {
				opacity: 1,
				duration: 0.3,
				ease: "power2.out",
			});

			// Expose animateOut function
			(window as any).animatePageOut = (msg?: string) => {
				tl.clear();

				// Update message if provided
				if (messageRef.current && msg) {
					messageRef.current.textContent = msg;
				}

				// Animate out message
				tl.to(messageRef.current, {
					opacity: 0,
					duration: 0.2,
					ease: "power2.in",
				})
					// Animate curtain out
					.to(
						loaderRef.current,
						{
							yPercent: -100,
							duration: 0.8,
							ease: "power3.inOut",
							onComplete: () => {
								if (onComplete) onComplete();
							},
						},
						0.1
					);
			};

			return () => {
				tl.kill();
				delete (window as any).animatePageOut;
			};
		},
		{ scope: loaderRef, dependencies: [onComplete] }
	);

	return (
		<div
			ref={loaderRef}
			className={`fixed inset-0 z-[9999] bg-clou-black flex items-center justify-center pointer-events-none`}
		>
			<div
				ref={messageRef}
				className="text-white font-bold text-2xl opacity-0 justify-start items-start"
			>
				{message}
			</div>
		</div>
	);
}
