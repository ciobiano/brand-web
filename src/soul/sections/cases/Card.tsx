"use client";

import Image from "next/image";
import Badge from "../../primitives/Badge";
import { Project } from "@/data/types";

interface CardProps {
	project: Project;
}

const accentBg = {
	"accent-1": "#D9613A",
	"accent-2": "#f2acac",
	"accent-3": "#fedd93",
	"accent-4": "#81b7bf",
};

export default function Card({ project }: CardProps) {
	const { id, accentColor = "accent-1", info, title, description, imageSrc, imageAlt, tags } = project;

	return (
		<div className="card sticky w-full h-[85svh] px-6" id={id}>
			<div
				className="relative w-full rounded-3xl h-full overflow-hidden"
				style={{ backgroundColor: accentBg[accentColor] }}
				data-cursor="casestudy"
				data-cursor-text="CASE STUDY"
			>
				{/* ── White circle — oversized, clips the product image ── */}
				<div
					className="absolute rounded-full bg-white overflow-hidden w-[90%] aspect-square left-[5%] top-[5%] "

				>
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover"
						sizes="100vw"
						quality={90}
					/>
				</div>

				{/* ── Title + tag badges — top left, over orange ── */}
				<div className="absolute top-5 left-5 z-10 flex flex-col gap-3">
					<h2 className="text-[1.75rem] font-normal text-black leading-tight">
						{title}
					</h2>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag, i) => (
							<Badge key={i} variant="outline" size="sm">
								{tag}
							</Badge>
						))}
					</div>
				</div>

				{/* ── CTA circle — center sits on the white circle's top edge ── */}
				{/* <div
					className="absolute left-1/2 z-20"
					style={{
						top: "10%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<a
						href={project.href}
						className="flex items-center justify-center w-[7rem] h-[7rem] bg-black rounded-full hover:bg-gray-900 transition-colors"
					>
						<span className="text-white text-[0.8125rem] font-medium text-center leading-snug px-3">
							View case
						</span>
					</a>
				</div> */}

				{/* ── Fade overlay — driven by GSAP on scroll ── */}
				<div className="absolute inset-0 bg-black opacity-0 will-change-opacity pointer-events-none z-30" />
			</div>
		</div>
	);
}