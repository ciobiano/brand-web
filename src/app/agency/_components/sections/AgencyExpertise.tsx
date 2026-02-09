"use client";

import { useRef } from "react";
import Image from "next/image";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/soul/primitives/Accordion";
import Button from "@/soul/primitives/Button";
import FloatingPreview from "../FloatingPreview";
import Badge from "@/soul/primitives/Badge";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function AgencyExpertise() {
	const containerRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const pinTl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "center top",
				end: "+=100%",
				pin: true,
				pinSpacing: false,
			},
		});

		pinTl.to(containerRef.current, {
			y: "10%",
			duration: 0.5,
			ease: "none",
		});
	});

	return (
		<>
			<section
				ref={containerRef}
				className=" px-4 sm:px-6 bg-kainé-white text-kainé-black"
			>
				<div className="w-full mx-auto h-full min-h-screen">
					<h2 className="text-5xl sm:text-5xl lg:text-6xl mb-8 pb-8 border-b border-neutral-200">
						Expertise
					</h2>

					<div ref={listRef} className="relative pb-20 ">
						<Accordion>
							<FloatingPreview items={services} containerRef={listRef} />
							{services.map((item) => (
								<AccordionItem key={item.id} value={item.id}>
									<div data-expertise-row>
										<AccordionTrigger value={item.id}>
											<span className="text-3xl ">{item.title}</span>
										</AccordionTrigger>
									</div>

									<AccordionContent value={item.id}>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-20 pb-12 pt-4">
											<div className="flex flex-col ">
												<p className="text-neutral-600 text-lg mb-8 leading-relaxed ">
													{item.description}
												</p>
												<Button
													variant="secondary"
													size="md"
													href="/projects"
													className="self-start"
												>
													View projects
												</Button>
											</div>

											<div className="space-y-2 ml-auto">
												{item.services.map((service) => (
													<div
														key={service}
														className="flex text-lg items-center gap-2 text-neutral-700"
													>
														<span className="text-neutral-400">→</span>
														<span>{service}</span>
													</div>
												))}
											</div>

											<div className="bg-violet-200 rounded-lg w-full max-w-[25rem] overflow-hidden aspect-square ml-auto relative">
												<Image
													src={item.image}
													alt={item.title}
													fill
													className="object-cover "
												/>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
					<div className="w-full py-12">
						<div className=" ml-auto w-1/2">
							<h2 className="text-2xl sm:text-3xl lg:text-4xl pb-8">
								Full Service ?
							</h2>

							<div className="max-w-lg ">
								<p className="text-base md:text-lg leading-relaxed font-light">
									You do your thing. You love it and would like to tell the
									whole world about it. Great! Your passion is contagious. Tell
									us more about your passion project
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		
		</>
	);
}
