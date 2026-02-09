"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useScrollEntrance } from "@/hooks/useScrollEntrance";
import Badge from "@/soul/primitives/Badge";
import { teamMembers, type TeamMember } from "@/data";
import { cn } from "@/lib/utils";

function TeamCard({ member }: { member: TeamMember }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			data-team-card
			className="group flex flex-col"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="relative mb-4 w-full aspect-[5/5.5] rounded-lg">
				<Image
					data-team-image
					src={member.image}
					alt={member.name}
					fill
					className={cn(
						"object-cover transition-all duration-500 ease-out",
						isHovered ? "scale-105 rounded-full" : "rounded-lg"
					)}
					sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
				/>

				{member.email && (
					<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
						<div
							className={cn(
								"bg-kainé-black/95 rounded-full px-6 py-3 transition-transform duration-500 ease-out shadow-lg",
								isHovered ? "scale-100" : "scale-0"
							)}
						>
							<span className="text-white text-2xl  whitespace-nowrap">
								{member.email}
							</span>
						</div>
					</div>
				)}
			</div>

			<h3 className="text-2xl text-kainé-black mb-1">{member.name}</h3>

			<p className="text-2xl text-neutral-500 mb-3">{member.role}</p>

			<div className="flex flex-wrap gap-1.5 mb-3">
				{member.skills.map((skill) => (
					<Badge
						key={skill}
						variant="outline"
						size="sm"
						className=" border-neutral-400 text-neutral-600"
					>
						{skill}
					</Badge>
				))}
			</div>

			<p className=" leading-relaxed text-neutral-600">{member.bio}</p>
		</div>
	);
}

export default function AgencyTeam() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useScrollEntrance("[data-team-badge]", {
		y: 30,
		duration: 0.8,
		start: "top 80%",
		scope: sectionRef,
	});

	useScrollEntrance("[data-team-title]", {
		y: 50,
		duration: 1,
		start: "top 80%",
		scope: sectionRef,
	});

	useScrollEntrance("[data-team-card]", {
		y: 80,
		scale: 0.98,
		duration: 0.9,
		stagger: 0.08,
		start: "top 70%",
		scope: sectionRef,
	});

	return (
		<section
			ref={sectionRef}
			className="relative z-10 py-20 px-4 sm:px-6 bg-kainé-white"
		>
			<div className="z-10 absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-white h-4" />

			<div className="w-full mx-auto h-full min-h-screen pb-20">
				<div className="mb-12 lg:mb-16">
					<Badge data-team-badge variant="outline" size="sm" className="mb-6">
						Team
					</Badge>
					<h2
						data-team-title
						className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] text-kainé-black"
					>
						The people
						<br />
						behind Kainé
					</h2>
				</div>

				<div
					data-team-grid
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
				>
					{teamMembers.map((member) => (
						<TeamCard key={member.name} member={member} />
					))}
				</div>
			</div>
		</section>
	);
}
