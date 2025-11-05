"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import Image from "next/image";
import Badge from "@/soul/primitives/Badge";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

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

	useGSAP(
		(context) => {
			const sections = gsap.utils.toArray<HTMLElement>(
				context.selector?.(".vertical-section") ?? ".vertical-section"
			);
			sections.forEach((section) => {
				const largeChild = section.querySelector<HTMLElement>(".large-child");
				if (!largeChild) return;

				// const getTravelDistance = () => {
				// 	const distance = window.innerHeight - largeChild.clientHeight - 100;
				// 	return Math.max(0, distance);
				// };

				gsap.to(largeChild, {
					y: () => window.innerHeight - largeChild.clientHeight ,
					ease: "none",
					scrollTrigger: {
						trigger: section,
						pin: true,
						start: "top 20%",
						end: () => `+=${window.innerHeight + largeChild.clientHeight}`,
						scrub: 1,
						anticipatePin: 1,
						markers: true,
						invalidateOnRefresh: true,
					},
				});
			});
		},
		{ scope: pageRef }
	);

	return (
		<main ref={pageRef} className=" w-full z-10 bg-black -mt-16">
			<section className=" flex flex-col text-clou-white pt-16">
				<div className="px-4 sm:px-6 lg:px-8">
					<h1 className="text-[223px] f mb-12">Hello!</h1>
				</div>
				<div className="vertical-section w-full flex ">
					<div className="w-full max-w-md bg-sky-600 p-8  flex flex-col gap-6  ">
						<span>
							<Badge variant="outline" size="sm">
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
					<div className=" w-full  border border-grey-200 mb-20 large-child ">
						<div className=" w-full flex flex-col items-center ">
							<div className="flex flex-col  gap-8 w-full max-w-md  ">
								<span>
									<Badge variant="outline" size="sm">
										Address
									</Badge>
								</span>
								<p className="text-3xl mb-4  leading-10">
									Whoever searches will find. If you&apos;re reading this, you
									don&apos;t need to search
								</p>
								<p className="text-3xl flex flex-col gap-4  ">
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
			<section
				className=" flex flex-col text-clou-white pt-16"
			>
				<div className="px-4 sm:px-6 lg:px-8">
					<h1 className="text-[223px] f mb-12">Hello!</h1>
				</div>
				<div className="vertical-section w-full flex ">
					<div className="w-full max-w-md bg-sky-600 p-8  flex flex-col gap-6  ">
						<span>
							<Badge variant="outline" size="sm">
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
					<div className=" w-full  border border-grey-200 mb-20 large-child ">
						<div className=" w-full flex flex-col items-center ">
							<div className="flex flex-col  gap-8 w-full max-w-md  ">
								<span>
									<Badge variant="outline" size="sm">
										Address
									</Badge>
								</span>
								<p className="text-3xl mb-4  leading-10">
									Whoever searches will find. If you&apos;re reading this, you
									don&apos;t need to search
								</p>
								<p className="text-3xl flex flex-col gap-4  ">
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
		</main>
	);
}
