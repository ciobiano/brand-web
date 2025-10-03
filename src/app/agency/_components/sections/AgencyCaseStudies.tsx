"use client";

import Slider, { type SlideData } from "@/soul/primitives/Slider";

const slides: SlideData[] = [
	{
		imageUrl:
			"https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/6823861bbf033cf0b7090529_Standard_Mode_the_man_blink_with_one_eye%20(1)-poster-00001.jpg",
		caption: "Transistor • Immersive launch campaign built around real-time product demos.",
	},
	{
		imageUrl:
			"https://cdn.prod.website-files.com/6753439d3da31c3534ed228c/680f204dd3110a6fca214fbd_img-2-big.webp",
		caption: "Tuple • Delivered a collaborative design system used by 40+ product squads.",
	},
	{
		imageUrl:
			"/gradient1.jpg",
		caption: "Reform • Crafted a modular brand kit spanning 14 service verticals.",
	},
];

export default function AgencyCaseStudies() {
	return (
		<section 	
		data-speed="clamp(0.6)"
 		id="work" 
		className="mt-20"
		>
			<div className="w-full px-6 lg:px-10">
				<div className="flex flex-col ">
					<div className="text-5xl font-semibold tracking-[-0.03em] sm:text-7xl lg:text-9xl">
						We deliver.
						<br /> Period.
					</div>
					<Slider slides={slides} theme="light" />
				</div>
			</div>
		</section>
	);
}
