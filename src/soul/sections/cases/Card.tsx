"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface CardProps {
	id: string;
	accentColor: "accent-1" | "accent-2" | "accent-3" | "accent-4";
	info: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
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
	info,
	title,
	description,
	imageSrc,
	imageAlt,
	children,
}: CardProps) {
	return (
		<div
			className=" card sticky w-full h-[85svh] px-6  transform-style-preserve-3d perspective-1000"
			id={id}
		>
			<div
				className={`relative w-full rounded-t-3xl h-full  flex flex-col transform-origin-[50%_100%] will-change-transform text-center ${accentColors[accentColor]}`}
			>
				{/* Card Info */}
				<div className="w-1/4 p-16 text-left md:w-3/4 md:mx-auto md:px-8 md:py-16 md:text-center">
					<p className="text-sm font-medium uppercase">{info}</p>
				</div>

				{/* Card Title */}
				<div className="card-title">
					<h1 className="text-[10rem] font-black font-['Barlow_Condensed'] uppercase leading-none py-8 md:text-6xl md:py-4">
						{title}
					</h1>
				</div>

				{/* Card Description */}
				<div className="w-3/5 mx-auto mb-8 md:w-full md:px-4">
					<p className="text-2xl font-medium uppercase md:text-xl">
						{description}
					</p>
				</div>

				{/* Card Image */}
				<div className="w-full h-full mt-16 overflow-hidden relative">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
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
