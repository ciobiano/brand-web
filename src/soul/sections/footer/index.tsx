"use client";

import Badge from "@/soul/primitives/Badge";
import AnimatedLink from "@/soul/primitives/AnimatedLink";
import { ArrowUp } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { companyInfo, footerLinks } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
	const footerRef = useRef<HTMLElement>(null);
	const footerContainer = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!footerRef.current) return;
		if (!footerContainer.current) return;

		gsap.set(footerRef.current, {
			yPercent: -20,
		});
		const uncover = gsap.timeline({ paused: true });

		uncover.to(footerRef.current, { yPercent: 0, ease: "none" });

		ScrollTrigger.create({
			trigger: ".scroll-trigger",
			start: "bottom bottom",
			end: "+=50%",
			animation: uncover,
			scrub: true,
		});
		gsap.from(footerContainer.current, {
			yPercent: -50,
			ease: "none",
			scrollTrigger: {
				trigger: ".scroll-trigger",
				start: "bottom bottom",
				end: "+=70%",
				scrub: true,
			},
		});

		ScrollTrigger.refresh();
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer
			ref={footerRef}
			className="bg-kainé-black text-white relative min-h-[60svh] flex flex-col"
			data-cursor-invert
		>
			<div className="scroll-trigger relative z-50 h-20 bg-kainé-black before:absolute before:z-10 before:w-full before:h-[calc(100%+0.5rem)] before:mb-[-5px] before:-translate-y-2 before:rounded-b-xl before:bg-kainé-white after:absolute after:top-[2px] after:left-0 after:right-0 after:h-8 after:bg-gradient-to-b after:from-kainé-black after:to-transparent after:opacity-20"/>

			<div
				ref={footerContainer}
				className="flex flex-col mt-10 flex-1 px-4 pt-20 pb-8 md:px-8"
			>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
					<div className="lg:col-span-2">
						<h1 className="text-8xl md:text-9xl lg:text-[12rem] leading-none relative">
							{companyInfo.name}

						</h1>
					</div>

					<div className="space-y-4">
						<Badge
							variant="outline"
							size="sm"
							className="text-kainé-white border-kainé-white"
						>
							Contact
						</Badge>
						<div className="text-sm md:text-2xl font-light">
							<p>{companyInfo.legalName}</p>
							<p>{companyInfo.address.street}</p>
							<p>{companyInfo.address.city}</p>
						</div>
						<div className="text-base md:text-2xl font-light">
							<p>{companyInfo.contact.phone}</p>
							<p>{companyInfo.contact.email}</p>
						</div>
					</div>

					<div className="space-y-4 ">
						{footerLinks.map((group, index) => (

							<div key={index}>
								{group.title && (


									<Badge
										variant="outline"
										size="sm"
										className="text-kainé-white border-kainé-white"
									>
										{group.title}
									</Badge>

								)}
								<div className="flex flex-col  mt-2 space-y-2">
									{group.items.map((link, linkIndex) => (
										<AnimatedLink
											key={linkIndex}
											href={link.href}
											className={group.className}
										>
											{link.text}
										</AnimatedLink>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="mt-auto flex -mb-10  justify-between items-end">
					<div className="text-base md:text-2xl font-light">
						<p>{companyInfo.tagline.split(' and ')[0]} and</p>
						<p>{companyInfo.tagline.split(' and ')[1]}</p>
					</div>
					<div className="hidden md:flex items-center space-x-2 border border-gray-700 px-3 py-1 rounded-md text-sm text-gray-400">
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1.5 0H15.5C19.366 0 22.5 3.13401 22.5 7V10.5H16.5V7C16.5 6.17157 15.8284 5.5 15 5.5H8.5V18.5H15C15.8284 18.5 16.5 17.8284 16.5 17V13.5H22.5V17C22.5 20.866 19.366 24 15.5 24H1.5C0.671573 24 0 23.3284 0 22.5V1.5C0 0.671573 0.671573 0 1.5 0Z" />
						</svg>
						<span>Professional partner</span>
					</div>
					<button
						onClick={scrollToTop}
						className=" border border-gray-500 rounded-full p-2 hover:bg-white hover:text-black transition-colors"
					>
						<ArrowUp size={24} />
					</button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
