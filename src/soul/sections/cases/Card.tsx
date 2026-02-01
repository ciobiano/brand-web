"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface CardProps {
	id: string;
	accentColor: "accent-1" | "accent-2" | "accent-3" | "accent-4";
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	features?: Array<{ icon: ReactNode; label: string }>;
	children?: ReactNode;
}

const accentColors = {
	"accent-1": "bg-[#b1c0ef]",
	"accent-2": "bg-[#f2acac]",
	"accent-3": "bg-[#fedd93]",
	"accent-4": "bg-[#81b7bf]",
};

export default function Card({
	id,
	accentColor,
	title,
	description,
	imageSrc,
	imageAlt,
	features,
	children,
}: CardProps) {
	return (
		<div
			className="card sticky w-full h-[85svh] px-6 transform-style-preserve-3d perspective-1000"
			id={id}
		>
			<div
				className={`relative w-full rounded-3xl h-full overflow-hidden flex flex-col ${accentColors[accentColor]}`}
			>
				{/* Main Image Container with Overlaid Title */}
				<div className="relative w-full flex-1 overflow-hidden">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>

					{/* Title Overlaid on Image */}
					<div className="absolute inset-0 flex items-end justify-center pb-12 md:pb-8">
						<h1 className="text-[8rem] font-bold text-white drop-shadow-2xl md:text-5xl">
							{title}
						</h1>
					</div>
				</div>

				{/* Bottom Content Section */}
				<div className="bg-black/90 backdrop-blur-sm px-12 py-8 md:px-6 md:py-14">
					{/* Description */}
					<p className="text-white/90 text-center text-lg leading-relaxed mb-6 max-w-3xl mx-auto md:text-base md:mb-4">
						{description}
					</p>

					{/* Features Row */}
					{features && features.length > 0 && (
						<div className="flex items-center justify-center gap-8 mb-6 md:gap-4 md:mb-4">
							{features.map((feature, index) => (
								<div key={index} className="flex flex-col items-center gap-2">
									<div className="text-white/70 w-6 h-6 flex items-center justify-center">
										{feature.icon}
									</div>
									<span className="text-white/60 text-xs font-medium">
										{feature.label}
									</span>
								</div>
							))}
						</div>
					)}

					{/* CTA Button */}
					<div className="flex justify-center">
						<button className="px-6 py-2 text-white border border-white/30 rounded-full hover:bg-white/10 transition-colors text-sm font-medium">
							Learn More
						</button>
					</div>
				</div>

				{/* Overlay (for GSAP animations) */}
				<div
					className="absolute inset-0 bg-black opacity-0 will-change-opacity pointer-events-none z-10"
					style={{ "--after-opacity": 0 } as React.CSSProperties}
				/>

				{children}
			</div>
		</div>
	);
}