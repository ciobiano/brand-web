"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type LabelVariant = "center" | "none";

type SlideLogoLabel = {
	type: "logo";
	src: string;
	alt: string;
	width: number;
	height: number;
};

type SlideLabel = SlideLogoLabel;

type VideoSlide = {
	type: "video";
	sources: {
		src: string;
		type: string;
	}[];
	poster: string;
	label?: SlideLabel;
	labelVariant?: LabelVariant;
};

type ImageSlide = {
	type: "image";
	src: string;
	label?: SlideLabel;
	labelVariant?: LabelVariant;
};

type Slide = VideoSlide | ImageSlide;

const defaultLabelVariant: Record<Slide["type"], LabelVariant> = {
	video: "center",
	image: "none",
};

const labelContainerClasses: Record<LabelVariant, string> = {
	center: "left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2",
	none: "",
};

const slides: Slide[] = [
	{
		type: "video" as const,
		sources: [
			{
				src: "https://cdn.prod.website-files.com/6753439d3da31c3534ed228c%2F6823861bbf033cf0b7090529_Standard_Mode_the_man_blink_with_one_eye%20%281%29-transcode.mp4",
				type: "video/mp4",
			},
			{
				src: "https://cdn.prod.website-files.com/6753439d3da31c3534ed228c%2F6823861bbf033cf0b7090529_Standard_Mode_the_man_blink_with_one_eye%20%281%29-transcode.webm",
				type: "video/webm",
			},
		],
		poster:
			"https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/6823861bbf033cf0b7090529_Standard_Mode_the_man_blink_with_one_eye%20(1)-poster-00001.jpg",
		label: {
			type: "logo",
			src: "https://tailwindui.com/img/logos/158x48/transistor-logo-dark.svg",
			alt: "Transistor",
			width: 158,
			height: 48,
		},
	},
	{
		type: "image" as const,
		src: "https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/680f204dd3110a6fca214fbd_img-2-big.webp",
		label: {
			type: "logo",
			src: "https://tailwindui.com/img/logos/158x48/tuple-logo-dark.svg",
			alt: "Tuple",
			width: 158,
			height: 48,
		},
	},
	{
		type: "image" as const,
		src: "https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/680f205015fb858aa5c81abc_img-1-big.webp",
		label: {
			type: "logo",
			src: "https://tailwindui.com/img/logos/158x48/reform-logo-dark.svg",
			alt: "Reform",
			width: 158,
			height: 48,
		},
	},
];

export default function WeDeliverSlider() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const cardsWrapperRef = useRef<HTMLDivElement | null>(null);
	const cardsRef = useRef<HTMLDivElement | null>(null);

	// useGSAP(
	// 	() => {
	// 		const ctx = gsap.context(() => {
	// 			if (!sectionRef.current || !pinRef.current || !trackRef.current) {
	// 				return;
	// 			}

	// 			const track = trackRef.current;
	// 			const pinTarget = pinRef.current;

	// 			const getScrollAmount = () => {
	// 				const overflow = track.scrollWidth - pinTarget.clientWidth;
	// 				return overflow > 0 ? overflow : 0;
	// 			};

	// 			gsap.set(track, { x: 0 });

	// 			const amount = getScrollAmount();

	// 			if (amount <= 0) {
	// 				return;
	// 			}

	// 			gsap.to(track, {
	// 				x: () => -getScrollAmount(),
	// 				ease: "none",
	// 				scrollTrigger: {
	// 					trigger: sectionRef.current,
	// 					start: "top top",
	// 					end: () => `+=${getScrollAmount()}`,
	// 					scrub: 1,
	// 					pin: pinTarget,
	// 					anticipatePin: 1,
	// 					invalidateOnRefresh: true,
	// 				},
	// 			});
	// 		}, sectionRef);

	// 		return () => ctx.revert();
	// 	},
	// 	{ scope: sectionRef },
	// );

	return (
		<section ref={sectionRef} id="work" className="py-28 sm:py-32">
			<div className="w-full px-6 lg:px-12">
				<div className="flex flex-col gap-40">
					<div className="text-9xl  font-semibold  tracking-[-0.03em]">
						We deliver.
						<br /> Period.
					</div>

					<div>
						<div ref={cardsWrapperRef} className="relative">
							<div
								ref={cardsRef}
								className="inline-grid grid-flow-col auto-cols-[75vw] gap-4 md:gap-8"
								data-hero-cards
							>
								{slides.map((slide, index) => {
									const labelVariant =
										slide.labelVariant ?? defaultLabelVariant[slide.type];
									const shouldRenderLabel =
										Boolean(slide.label) && labelVariant !== "none";

									return (
										<div
											key={index}
											className="relative w-full overflow-hidden rounded-[32px] border border-black/5 bg-black/5"
										>
											<div className="relative  w-full ">
												{slide.type === "video" ? (
													<video
														onContextMenu={(event) => event.preventDefault()}
														draggable={false}
														controlsList="nodownload"
														disablePictureInPicture
														className="h-full w-full object-cover"
														autoPlay
														loop
														muted
														playsInline
														poster={slide.poster}
													>
														{slide.sources.map((source) => (
															<source
																key={source.src}
																src={source.src}
																type={source.type}
															/>
														))}
													</video>
												) : (
													<Image
														onContextMenu={(event) => event.preventDefault()}
														draggable={false}
														src={slide.src}
														alt={slide.label?.alt ?? "Agency case study"}
														fill
														className="object-cover"
														sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 45vw, 100vw"
														priority={index === 0}
													/>
												)}
												{shouldRenderLabel && slide.label?.type === "logo" && (
													<div
														className={`absolute z-10 pointer-events-none ${labelContainerClasses[labelVariant]}`}
													>
														<div className="inline-flex items-center justify-center rounded-full bg-black/60 px-6 py-4 backdrop-blur">
															<Image
																src={slide.label.src}
																alt={slide.label.alt}
																width={slide.label.width}
																height={slide.label.height}
																className="h-12 w-auto object-contain"
															/>
														</div>
													</div>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
