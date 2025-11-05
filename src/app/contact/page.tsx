"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import Image from "next/image";
import Badge from "@/soul/primitives/Badge";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { InquiryForm } from "./_components/form";

gsap.registerPlugin(ScrollTrigger);

const MAP_CONFIG = {
	longitude: -149.8936,
	latitude: 61.2155,
	zoom: 12,
} as const;

const LOGO_SIZES = {
	width: 64,
	height: 64,
} as const;

const VISUAL_BLOCK_CLASS =
	"mt-10 w-full h-full max-w-[1220px] min-h-[709px] rounded-xl border border-zinc-800";

export default function ContactPage() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const logoSrc = "/images/www.clou.ch_.png";
	const pageRef = useRef<HTMLElement | null>(null);
	const outroRef = useRef<HTMLElement | null>(null);

useGSAP(
	({ selector }) => {
		const sections = gsap.utils.toArray<HTMLElement>(
			selector?.(".vertical-section") ?? ".vertical-section"
		);

		sections.forEach((section, index) => {
			const largeChild = section.querySelector<HTMLElement>(".large-child");
			if (!largeChild) return;

			const isLast = index === sections.length - 1;
			const nextSection = sections[index + 1];
			const getY= () =>
				window.innerHeight * 0.3 - largeChild.clientHeight;

			gsap.to(largeChild, {
				y: getY,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					pin: true,
					// Last section: no added spacing (prevents bottom gap)
					pinSpacing: isLast ? false : false,
					start: "top 20%",
					pinType: isLast ? "transform" : undefined,
					endTrigger: isLast ? section : nextSection,
					end: isLast ? "bottom bottom" : "top 65%",
					scrub: 1,
					anticipatePin: 1,
					markers: false,
					invalidateOnRefresh: true,
				
				},
			});
		});

		const outro = outroRef.current;
		if (!outro) return;

		gsap.to(outro, {
			marginLeft: 0,
					marginRight: 0,
					duration: 1.35,
			ease: "none",
			scrollTrigger: {
				trigger: outro,
				start: "top 100%", 
				end: "top 10%", 
				scrub: 1,
				// scroller: ".smooth-content",
			},
		});
	},
	{ scope: pageRef }
);


	return (
		<main ref={pageRef} className=" bg-clou-black ">
			<section className="flex flex-col text-clou-white bg-clou-black -mt-16 pt-16">
				<div className="px-4 sm:px-6 lg:px-8">
					<h1 className="text-[223px] f mb-12">Hello!</h1>
				</div>

				{/* ADD horizontal padding to this row to avoid full-bleed feel */}
				<div className="vertical-section w-full flex px-6 md:px-10 lg:px-20">
					<div className="w-full max-w-md flex flex-col gap-6 p-8">
						<span>
							<Badge
								variant="outline"
								size="sm"
								className="text-clou-white border-clou-white"
							>
								Address
							</Badge>
						</span>
						<p className="text-3xl font-medium leading-10">
							413 West Fireweed Ln, Anchorage , Alaska
						</p>
						<p className="text-lg text-gray-500">
							Whoever searches will find. If you&apos;re reading this, you
							don&apos;t need to search and you&apos;ll find us right in the
							courtyard, to the left of the Parterre restaurant.
						</p>
					</div>
					<div className="py-10"></div>
					<div className="w-full flex flex-col large-child">
						<div className="w-full flex flex-col items-center p-8">
							<div className="flex flex-col gap-8 w-full max-w-md">
								<span>
									<Badge
										variant="outline"
										size="sm"
										className="text-clou-white border-clou-white"
									>
										Address
									</Badge>
								</span>
								<p className="text-3xl mb-4 leading-10">
									Whoever searches will find. If you&apos;re reading this, you
									don&apos;t need to search
								</p>
								<p className="text-3xl flex flex-col gap-4">
									Hello.kaine@outlook.com
									<span>+2349038432630</span>
								</p>
							</div>

							<div className={VISUAL_BLOCK_CLASS}>
								{mapboxToken ? (
									<Map
										mapboxAccessToken={mapboxToken}
										mapStyle="mapbox://styles/mapbox/dark-v11"
										initialViewState={{
											longitude: MAP_CONFIG.longitude,
											latitude: MAP_CONFIG.latitude,
											zoom: MAP_CONFIG.zoom,
										}}
										style={{ width: "100%", height: "100%" }}
										attributionControl={false}
										onLoad={() => ScrollTrigger.refresh()}
										dragPan={false}
										scrollZoom={false}
										boxZoom={false}
										doubleClickZoom={false}
										keyboard={false}
										dragRotate={false}
										touchZoomRotate={false}
									>
										<Marker
											longitude={MAP_CONFIG.longitude}
											latitude={MAP_CONFIG.latitude}
											anchor="bottom"
										>
											<div
												style={{
													width: LOGO_SIZES.width,
													height: LOGO_SIZES.height,
													backgroundImage: `url(${logoSrc})`,
													backgroundSize: "contain",
													backgroundRepeat: "no-repeat",
													backgroundPosition: "center",
												}}
											/>
										</Marker>
										<NavigationControl
											position="top-right"
											showCompass={false}
											visualizePitch={false}
										/>
									</Map>
								) : (
									<div className="w-full h-full flex items-center justify-center bg-zinc-900 text-sm text-zinc-400">
										Set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to display the map.
									</div>
								)}
							</div>

							<div className={`${VISUAL_BLOCK_CLASS} relative`}>
								<Image
									src="/images/placeholder1.jpg"
									alt="Studio exterior"
									fill
									onLoad={() => ScrollTrigger.refresh()}
									className="object-cover"
									sizes="(min-width: 1280px) 1220px, 100vw"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* OUTRO: starts at px-6 (≈24px) but GSAP grows it to ~96px on scroll */}
			<section
				ref={outroRef}
				className="relative mx-20 bg-white text-black rounded-t-xl transition-[padding] duration-500 overflow-hidden"
			>
				<div className="m-20 -mb-20 -p-20 p-20 overflow-hidden">

				<div className="vertical-section mx-auto max-w-7xl  ">
					{" "}
					<div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
						<div className="space-y-10 text-2xl">
							<Badge variant="outline" size="sm">
								Request a project
							</Badge>
							<h1 className="text-[56px] font-medium pb-4">Hello!</h1>

							<p className="max-w-prose text-zinc-700">
								Contact form? Yes—this makes it easier for all of us. It makes
								your inquiry more concrete and gives us the first important
								reference points for your project.
							</p>
							<p className="max-w-prose text-zinc-700">
								For more extensive inquiries you can also send us an{" "}
								<a href="#" className="underline">
									email
								</a>
								. We’ll also gladly provide our{" "}
								<a href="#" className="underline">
									agency briefing checklist
								</a>
								. It helps you prepare for our initial conversation and to write
								a thoughtful brief, because good briefs are the foundation for
								good results.
							</p>
							<p className="max-w-prose text-zinc-700">
								Either way, we’re excited about your project and look forward to
								hearing more.
							</p>
						</div>

						<div className="large-child">
							<InquiryForm />
						</div>
					</div>
				</div>
				</div>

				<div className="pointer-events-none absolute inset-x-0 top-0 h-8 -translate-y-1/2 rounded-t-2xl bg-white" />
			</section>
		</main>
	);
}
