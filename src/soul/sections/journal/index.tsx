"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { journalEntries, JournalEntry } from "@/data";
import Badge from "../../primitives/Badge";
import Button from "../../primitives/Button";
import AnimatedLink from "../../primitives/AnimatedLink";
import JournalCard from "@/app/journal/_components/entry-card";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePinDrift } from "@/hooks/usePinDrift";
import { useTextReveal } from "@/hooks/useTextReveal";


gsap.registerPlugin(ScrollTrigger);

const JournalSection = () => {

	const introRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const whyKaineParaRef = useRef<HTMLParagraphElement>(null);
	const whyYouParaRef = useRef<HTMLParagraphElement>(null);

	usePinDrift(introRef, {
		yPercent: -15,
		start: "50% top",
		containerRef,
	});

	useTextReveal(whyKaineParaRef, {
		isReady: true,
		animateOnScroll: true,
		start: "top 75%",
		stagger: 0.18,
	});

	useTextReveal(whyYouParaRef, {
		isReady: true,
		animateOnScroll: true,
		start: "top 80%",
	});
	return (

		<>

			<section ref={introRef} className="relative bg-kainé-black text-white z-10 " data-cursor-invert>
				<div className="absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-kainé-black h-4" />
				<div className="max-w-[90rem] mx-auto  py-28">
					<div className="mb-16">
						<Badge
							variant="outline"
							size="sm"
							className="mb-8 text-white border-white"
						>
							Why kainé?
						</Badge>

						<div className="max-w-5xl mb-12">
							<p ref={whyKaineParaRef} data-body-text className="text-2xl md:text-6xl leading-relaxed font-light">
								We&apos;re interested in your idea, your brand, your thing. We connect your company with the people who identify with the values and attitude of your brand.
							</p>
						</div>

						<Button variant="secondary" size="lg" href="/team">
							meet the team
						</Button>
					</div>

					<div className="relative">
						<div className="rounded-[80px] overflow-hidden aspect-[16/9] ">
							<Image
								width={500}
								height={500}
								src="/images/www.kainé.ch_.png"
								alt="kainé team members sitting together"
								className="w-full h-full object-cover "
							/>
						</div>
					</div>
					<div className="my-20 ml-auto w-1/2">
						<Badge
							variant="outline"
							size="sm"
							className="mb-8 text-white border-white"
						>
							Why you?
						</Badge>

						<div className="max-w-md mb-12">
							<p ref={whyYouParaRef} data-body-text className="text-base md:text-xl leading-relaxed font-light">
								You do your thing. You love it and would like to tell the whole
								world about it. Great! Your passion is contagious. Tell us more
								about your passion project
							</p>
						</div>

						<Button variant="primary" size="md" href="/contact">
							Make Contact
						</Button>
					</div>
				</div>
			</section>
			<section ref={containerRef} className="relative bg-kainé-white z-20 md:mb-64">
				<div className="absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-kainé-white h-4" />

				<div className="flex flex-col gap-y-6 max-w-[90rem] md:mx-auto  py-24">
					<div className="mb-6">
						<Badge variant="outline" size="sm">
							Journal
						</Badge>
					</div>

					<div className="mb-20">
						<h2 className="text-xl md:text-2xl lg:text-3xl text-kainé-black leading-10 max-w-3xl">
							We go out so as not to stand still. Reports to share experiences and
							ideas. We portray, tell and show, let us look deeper and come
							closer.
						</h2>
					</div>
				</div>
				<div className="relative w-full px-4">
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
						{journalEntries.map((entry) => (
							<SwiperSlide
								key={entry.id}
								className="!w-[300px] md:!w-[350px] lg:!w-[400px]"
							>
								<JournalCard entry={entry} />
							</SwiperSlide>
						))}
					</Swiper>

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

					<div className="flex flex-col max-w-2xl py-40">
						<h2 className="text-xl md:text-[2rem] max-w-lg text-kainé-black leading-10 mb-2">
							Scrolled all the way to the bottom? Then it really starts now. What
							do you want next?
						</h2>
						<div className="flex flex-col md:flex-row gap-4 mt-4">
							<Button variant="primary" size="md">
								Make contact
							</Button>
							<Button variant="secondary" size="md">
								Discover projects
							</Button>
							<Button variant="secondary" size="md">
								Let&apos;s talk
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default JournalSection;
