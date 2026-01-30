"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Slider, { type SlideData } from "@/soul/primitives/Slider";
import Button from "@/soul/primitives/Button";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
	{
		quote:
			"The team's enthusiasm and dedication were obvious. They set up an efficient workflow, delivered ahead of schedule, and made the process stress-free.",
		name: "Jordan Rivers",
		role: "Product Lead, VentureCo",
		location: "Remote",
	},
	{
		quote:
			"They felt like an internal squad. They aligned our stakeholders, built momentum, and shipped a product customers now rely on every day.",
		name: "Taylor Morgan",
		role: "Head of Product, Nimbus Labs",
		location: "Global",
	},
	{
		quote:
			"They translated a complex workflow into something effortless. The craft and thinking behind every detail is world-class.",
		name: "Casey Lee",
		role: "Founder, Horizon Works",
		location: "Distributed",
	},
];

const gradientImages = [
	"/gradient-1.jpg",
	"/gradient-2.webp",
	"/gradient-3.jpg",
];

export default function AgencyTestimonials() {
	const sectionRef = useRef<HTMLElement | null>(null);

	const testimonialSlides: SlideData[] = testimonials.map((testimonial, index) => ({
		imageUrl: gradientImages[index % gradientImages.length],
		caption: testimonial.location,
		altText: `${testimonial.name} testimonial`,
		content: (
			<>
				<div className="pointer-events-auto relative z-10 flex h-[32rem] w-full flex-col gap-6 p-10 text-left sm:h-[70vh]">
					<div className="flex items-center gap-4">
						<span className="flex h-16 w-16 items-center justify-center rounded-full bg-clou-gray/20" />
						<div className="flex flex-col gap-1">
							<h1 className="text-lg font-medium text-clou-white">
								{testimonial.name}
							</h1>
							<span className="text-base text-clou-gray">
								{testimonial.role}
							</span>
						</div>
					</div>

					<div className="flex flex-1 items-center justify-center">
						<p className="max-w-3xl text-start text-4xl font-medium leading-tight text-clou-gray lg:text-5xl">
							{testimonial.quote}
						</p>
					</div>
				</div>
				<div className="pointer-events-none absolute inset-0 bg-black/20" />
			</>
		),
	}));

	useGSAP(
		() => {
			const ctx = gsap.context(() => {
				// Section title animation
				gsap.set("[data-testimonial-title]", {
					y: 80,
					opacity: 0,
				});

				gsap.to("[data-testimonial-title]", {
					y: 0,
					opacity: 1,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%",
						toggleActions: "play none none reverse",
					},
				});

				// Outro text animation
				gsap.set("[data-outro-text]", {
					y: 60,
					opacity: 0,
				});

				gsap.to("[data-outro-text]", {
					y: 0,
					opacity: 1,
					duration: 0.9,
					ease: "power3.out",
					stagger: 0.12,
					scrollTrigger: {
						trigger: "[data-outro-section]",
						start: "top 75%",
						toggleActions: "play none none reverse",
					},
				});
			}, sectionRef);

			return () => ctx.revert();
		},
		{ scope: sectionRef }
	);

	return (
		<>
			<section
				ref={sectionRef}
				className="relative rounded-b-2xl bg-clou-black py-24 text-clou-white sm:py-20"
			>
				<div className="flex flex-col gap-16 px-6 lg:px-12">
					<div data-testimonial-title className="text-6xl font-medium tracking-tight sm:text-7xl lg:text-8xl">
						Real stories,
						<br />real results.
					</div>

					<div className="relative my-10 min-h-[70vh]">
						<Slider slides={testimonialSlides} />
					</div>

					<div className="my-16 flex flex-col gap-16 px-4 lg:px-10">
						<div data-outro-text className="text-6xl font-medium leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
							From humans <br />to humans.
						</div>
						<p data-outro-text className="max-w-5xl pt-4 text-2xl leading-relaxed text-clou-gray sm:text-3xl lg:text-4xl">
							We&apos;re real people dedicated to helping others achieve great
							things. We value and respect everyone we work with, and we&apos;re
							grateful that what we love doing also pays our bills.
						</p>
					</div>
				</div>
			</section>

			<section data-outro-section className="relative py-24 text-clou-black sm:py-32 bg-white">
				<div className="mb-40 flex w-full flex-col gap-12 px-6 lg:px-10">
					<div className="flex max-w-2xl flex-col gap-6">
						<h2 data-outro-text className="max-w-xl text-xl leading-relaxed text-clou-black md:text-2xl lg:text-3xl">
							Would you also like to write us something nice like that? Then
							let&apos;s implement a joint project.
						</h2>
						<div data-outro-text className="flex flex-col gap-4 sm:flex-row">
							<Button variant="primary" size="md">
								Make contact
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
