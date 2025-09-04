"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { StaticImageData } from "next/image";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { journalData } from "@/data";
import Badge from "../../primitives/Badge";
import Button from "../../primitives/Button";

interface JournalCardProps {
	image: StaticImageData | string;
	alt: string;
	title: string;
	description: string;
	badge?: string;
}

const JournalCard = ({
	image,
	alt,
	title,
	description,
	badge,
}: JournalCardProps) => (
	<div className=" overflow-hidden  h-full w-full flex flex-col gap-2">
		<div className="relative aspect-square overflow-hidden rounded-lg flex-shrink-0">
			<Image
				src={image}
				alt={alt}
				width={500}
				height={500}
				priority
				className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
			/>
			{badge && (
				<Badge
					variant="secondary"
					size="sm"
					className="absolute top-3 left-3 z-10 bg-white"
				>
					{badge}
				</Badge>
			)}
		</div>
		<div className=" flex-1 flex flex-col justify-between max-w-sm">
			<div>
				<h3 className="text-xl font-medium  text-clou-black mb-3 leading-7">
					{title}
				</h3>
				<p className="text-gray-600 text-lg mb-4  leading-7">{description}</p>
			</div>
			<a
				href="#"
				className="flex flex-col text-gray-900 text-sm font-medium   items-center mt-auto "
			>
				<ArrowRight size={20} />
				weiterlesen
				<span className="w-full border-b border-clou-black block" />
			</a>
		</div>
	</div>
);

const JournalSection = () => {
	return (
		<section className="relative overflow-hidden rounded-b-2xl bg-white py-40  rounded-lg">
			<div className="absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-clou-white h-4" />
			<div className="flex flex-col my-20 gap-y-6 max-w-7xl md:mx-auto  px-4   ">
				{/* Journal Badge */}
				<div className="mb-6">
					<Badge variant="outline" size="sm">
						Journal
					</Badge>
				</div>

				{/* Header Text */}
				<div className="mb-20">
					<h2 className="text-xl md:text-2xl lg:text-3xl  text-clou-black leading-10 max-w-3xl">
						We go out so as not to stand still. Reports to share experiences and
						ideas. We portray, tell and show, let us look deeper and come
						closer.
					</h2>
				</div>

				{/* Swiper Slider */}
			</div>
			<div className="relative w-full px-4 ">
				<Swiper
					modules={[Navigation]}
					spaceBetween={24}
					slidesPerView="auto"
					breakpoints={{
						640: { slidesPerView: "auto", spaceBetween: 20 },
						768: { slidesPerView: "auto", spaceBetween: 24 },
						1024: { slidesPerView: "auto", spaceBetween: 24 },
					}}
					navigation={{
						nextEl: ".journal-swiper-button-next",
						prevEl: ".journal-swiper-button-prev",
					}}
				>
					{journalData.map((slide, index) => (
						<SwiperSlide
							key={index}
							className="!w-[300px] md:!w-[350px] lg:!w-[400px] "
						>
							<JournalCard {...slide} />
						</SwiperSlide>
					))}
				</Swiper>

				{/* Custom Navigation Arrows */}
				{/* Custom Navigation Arrows */}
				<div className="absolute -top-16 right-0 flex gap-2 px-8 z-10">
					<button className="journal-swiper-button-prev w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg">
						<ChevronLeft size={20} />
					</button>
					<button className="journal-swiper-button-next w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg">
						<ChevronRight size={20} />
					</button>
				</div>
				<div className="flex justify-center mt-8 sm:mt-10 lg:mt-20">
					<Button variant="primary" size="md">
						More Journal
					</Button>
				</div>

				<div className="flex flex-col  max-w-2xl  mt-40">
					<h2 className="text-xl md:text-[2rem] max-w-lg  text-clou-black leading-10 mb-2 ">
						Scrolled all the way to the bottom? Then it really starts now. What
						do you want next?
					</h2>
					<div className="flex flex-col md:flex-row   gap-4 mt-4 ">
						<Button variant="primary" size="md">
							Make contact
						</Button>
						<Button variant="secondary" size="md">
							Discover projects
						</Button>
						<Button variant="secondary" size="md">
							Get to know the agency
						</Button>
					</div>

					<h1>
						herllo
					</h1>
				</div>
			</div>
		
		</section>
	);
};

export default JournalSection;
