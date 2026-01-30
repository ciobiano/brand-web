"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
	{
		name: "Sarah Chen",
		role: "Creative Director",
		bio: "Leading brand vision with 12+ years of experience.",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
	},
	{
		name: "Marcus Weber",
		role: "Lead Developer",
		bio: "Full-stack architect & motion specialist.",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
	},
	{
		name: "Elena Rodriguez",
		role: "UX Designer",
		bio: "Crafting intuitive experiences that delight.",
		image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
	},
	{
		name: "David Park",
		role: "Strategy Lead",
		bio: "Connecting brands with audiences that matter.",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
	},
	{
		name: "Amara Johnson",
		role: "Motion Designer",
		bio: "Bringing stories to life through animation.",
		image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
	},
	{
		name: "Thomas Müller",
		role: "Brand Strategist",
		bio: "Building meaningful brand identities.",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
	},
];

export default function AgencyTeam() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				// Staggered entrance for section title
				gsap.fromTo("[data-team-title]", 
					{ y: 80, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration: 1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: "[data-team-title]",
							start: "top 85%",
							toggleActions: "play none none reverse",
						},
					}
				);

				// Staggered card entrance animation
				gsap.fromTo("[data-team-card]", 
					{ y: 100, opacity: 0, scale: 0.95 },
					{
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 0.9,
						ease: "power3.out",
						stagger: 0.1,
						scrollTrigger: {
							trigger: "[data-team-grid]",
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					}
				);

				// Image hover scale effect
				const cards = sectionRef.current?.querySelectorAll("[data-team-card]");
				cards?.forEach((card) => {
					const image = card.querySelector("[data-team-image]");
					if (image) {
						card.addEventListener("mouseenter", () => {
							gsap.to(image, {
								scale: 1.08,
								duration: 0.5,
								ease: "power2.out",
							});
						});
						card.addEventListener("mouseleave", () => {
							gsap.to(image, {
								scale: 1,
								duration: 0.5,
								ease: "power2.out",
							});
						});
					}
				});
			}, sectionRef);

			return () => ctx.revert();
		},
		{ scope: sectionRef }
	);

	return (
		<section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-10">
			<div className="max-w-[95rem] mx-auto">
				<div className="mb-16 lg:mb-24">
					<span 
						data-team-title
						className="block text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4 opacity-0"
					>
						Team
					</span>
					<h2 
						data-team-title
						className="text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl text-clou-black opacity-0"
					>
						Die Menschen
						<br />
						hinter Clou
					</h2>
				</div>

				<div 
					data-team-grid
					className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-6"
				>
					{teamMembers.map((member) => (
						<div 
							key={member.name} 
							data-team-card
							className="group flex flex-col items-center text-center cursor-pointer opacity-0"
						>
							<div className="relative mb-5 h-28 w-28 overflow-hidden rounded-full bg-neutral-100 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
								<Image
									data-team-image
									src={member.image}
									alt={member.name}
									fill
									className="object-cover transition-transform duration-500"
									sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 112px"
								/>
							</div>
							<h3 className="text-base font-medium text-clou-black sm:text-lg">
								{member.name}
							</h3>
							<p className="mt-1 text-sm text-neutral-500">
								{member.role}
							</p>
							<p className="mt-2 text-xs text-neutral-400 max-w-[180px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								{member.bio}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
