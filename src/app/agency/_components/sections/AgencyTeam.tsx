"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Badge from "@/soul/primitives/Badge";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
	{
		name: "Albi Christen",
		role: "Owner & Creative Director",
		skills: ["Concept", "Strategy", "Consulting"],
		bio: "I love my work and I love racking my brain for others, developing new concepts, connecting thoughts and people. I follow what inspires me, makes sense and brings joy. That's why I rarely dance at just one wedding.",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
	},
	{
		name: "Marcel Huwiler",
		role: "Art Director",
		skills: ["Branding", "Concept", "Consulting"],
		bio: "Fancy stuff can take a hike. I like it smart, simple and somehow different. And yet a good portion of absurdity puts a smile on my face. Deliberate stumbling blocks can help to look at things from a different angle.",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
	},
	{
		name: "Fabian Gubelmann",
		role: "Designer",
		skills: ["Branding", "UX/UI Design", "Webflow"],
		bio: "I go with the flow. When snowboarding, in designing unassuming designs as well as implementing Webflow websites. This requires the right balance, a good overview and of course fun shouldn't be neglected – I like this combination.",
		image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=face",
	},
	{
		name: "Michelle Strähler",
		role: "Junior Art Director",
		skills: ["Branding", "Editorial", "Project Management"],
		bio: "Beautiful design makes me happy – at home and at work. Whether it's 80-year-old Art Nouveau or a pretty vase in the living room, when it looks good and harmonizes with each other, my eyes start to sparkle.",
		image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face",
	},
	{
		name: "Sarah Chen",
		role: "Creative Director",
		skills: ["Strategy", "Branding", "Concept"],
		bio: "Leading brand vision with 12+ years of experience in creating meaningful connections between brands and their audiences.",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face",
	},
	{
		name: "David Park",
		role: "Strategy Lead",
		skills: ["Digital", "Analytics", "Research"],
		bio: "Connecting brands with audiences that matter through data-driven insights and strategic thinking.",
		image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face",
	},
	{
		name: "Elena Rodriguez",
		role: "UX Designer",
		skills: ["UX/UI", "Research", "Prototyping"],
		bio: "Crafting intuitive experiences that delight users and solve real problems with elegant simplicity.",
		image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face",
	},
	{
		name: "Thomas Müller",
		role: "Brand Strategist",
		skills: ["Branding", "Positioning", "Identity"],
		bio: "Building meaningful brand identities that resonate with audiences and stand the test of time.",
		image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face",
	},
];

export default function AgencyTeam() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			if (!sectionRef.current) return;

			const ctx = gsap.context(() => {
				// Set initial states
				gsap.set("[data-team-badge]", { opacity: 0, y: 30 });
				gsap.set("[data-team-title]", { opacity: 0, y: 50 });
				gsap.set("[data-team-card]", { opacity: 0, y: 80, scale: 0.98 });

				// Badge animation
				gsap.to("[data-team-badge]", {
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						toggleActions: "play none none reverse",
					},
				});

				// Title animation
				gsap.to("[data-team-title]", {
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
						toggleActions: "play none none reverse",
					},
				});

				// Staggered card entrance animation
				gsap.to("[data-team-card]", {
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.9,
					ease: "power3.out",
					stagger: 0.08,
					scrollTrigger: {
						trigger: "[data-team-grid]",
						start: "top 70%",
						toggleActions: "play none none reverse",
					},
				});

				// Image hover scale effect
				const cards = sectionRef.current?.querySelectorAll("[data-team-card]");
				cards?.forEach((card) => {
					const image = card.querySelector("[data-team-image]");
					if (image) {
						card.addEventListener("mouseenter", () => {
							gsap.to(image, {
								scale: 1.05,
								duration: 0.6,
								ease: "power2.out",
							});
						});
						card.addEventListener("mouseleave", () => {
							gsap.to(image, {
								scale: 1,
								duration: 0.6,
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
		<section ref={sectionRef} className="py-20 px-4  sm:px-6">
			<div className="w-full mx-auto">
				{/* Header */}
				<div className="mb-12 lg:mb-16">
					<Badge
						data-team-badge
						variant="outline"
						size="sm"
						className="mb-6"
					>
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

				{/* Team Grid */}
				<div
					data-team-grid
					className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
				>
					{teamMembers.map((member) => (
						<div
							key={member.name}
							data-team-card
							className="group flex flex-col"
						>
							{/* Image */}
							<div className="relative mb-4 w-full aspect-[5/5.5] overflow-hidden rounded-lg bg-neutral-100">
								<Image
									data-team-image
									src={member.image}
									alt={member.name}
									fill
									className="object-cover transition-transform duration-700"
									sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
								/>
							</div>

							{/* Name */}
							<h3 className="text-xl font-normal text-kainé-black mb-1">
								{member.name}
							</h3>

							{/* Role */}
							<p className="text-sm text-neutral-500 mb-3">
								{member.role}
							</p>

							{/* Skills */}
							<div className="flex flex-wrap gap-1.5 mb-3">
								{member.skills.map((skill) => (
									<Badge
										key={skill}
										variant="outline"
										size="sm"
										className="text-xs border-neutral-400 text-neutral-600"
									>
										{skill}
									</Badge>
								))}
							</div>

							{/* Bio */}
							<p className="text-sm leading-relaxed text-neutral-600">
								{member.bio}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
