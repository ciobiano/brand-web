"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { JournalEntry } from "@/data";
import { cn } from "@/lib/utils";

export default function JournalCard({ entry }: { entry: JournalEntry }) {
	const [isHovered, setIsHovered] = useState(false);
	const primaryTag = entry.tags?.[0];

	return (
		<Link
			href={entry.link}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onFocus={() => setIsHovered(true)}
			onBlur={() => setIsHovered(false)}
			className="group flex w-full flex-col gap-6 text-clou-black transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clou-black"
		>
			<div className="relative flex aspect-square w-full items-center justify-center">
				<Image
					src={entry.cover.src}
					alt={entry.cover.alt}
					width={600}
					height={600}
					priority
					className={cn(
						"h-full w-full object-cover transition-all duration-500 ease-out",
						isHovered
							? "scale-[1.02] rounded-full"
							: "rounded-[.5rem]"
					)}
				/>
				{primaryTag && (
					<span
						className={cn(
							"absolute left-5 top-5 inline-flex items-center rounded-full bg-white px-4 py-1 text-sm font-medium tracking-tight text-clou-black shadow-sm transition-all duration-200 ease-out",
							isHovered ? "opacity-0" : "opacity-100"
						)}
					>
						{primaryTag}
					</span>
				)}
			</div>
			<div className="flex flex-col gap-3">
				<h3 className="text-[1.5rem] font-medium leading-[1.25] tracking-tight">
					{entry.title}
				</h3>
				<p className="text-[1.125rem] leading-[1.45] text-neutral-600">
					{entry.summary}
				</p>
			</div>
			<div
				className={cn(
					"relative inline-flex items-center self-start border-b border-current text-lg font-normal leading-tight transition-[padding-left] duration-300 ease-out",
					isHovered ? "pl-8" : "pl-0"
				)}
			>
				<span className="pointer-events-none absolute inset-y-0 left-0 flex items-center overflow-hidden">
					<span
						className={cn(
							"inline-block -translate-x-8 text-2xl transition-transform duration-300 ease-out",
							isHovered && "translate-x-0"
						)}
					>
						→
					</span>
				</span>
				<span className="pl-0">
					read on
				</span>
			</div>
		</Link>
	);
}
