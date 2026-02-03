import Link from "next/link";
import Image from "next/image";

import { Project } from "@/data";

import ArrowIcon from "@/soul/primitives/icons/ArrowIcon";
import Badge from "@/soul/primitives/Badge";

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<Link
			href={project.href}
			className="group relative flex h-full flex-col gap-4 rounded-xl p-2  transition-transform duration-500 hover:-translate-y-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 z-20"
		>
			<div className="relative overflow-hidden rounded-lg bg-white-200/40">
				<div className="relative aspect-[15/10] overflow-hidden rounded-[.5rem] transition-[border-radius] duration-500 ease-out md:group-hover:rounded-[40rem]">
					<Image
						src={project.imageSrc}
						alt={project.imageAlt}
						fill
						className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
						sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
						quality={90}
					/>
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
						<div className="relative w-[58%] max-w-xs translate-y-[7%] scale-[0.82] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-[1%] group-hover:scale-100 group-hover:opacity-100">
							<div className="relative aspect-[296/197] overflow-hidden rounded-xl shadow-2xl shadow-black/20 ring-1 ring-black/5">
								<Image
									src={project.imageSrc}
									alt={project.imageAlt}
									fill
									className="object-cover brightness-110"
									sizes="(max-width: 768px) 55vw, 320px"
									quality={90}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="">
				<div className="relative flex items-center overflow-hidden ">
					<ArrowIcon
						className="pointer-events-none absolute left-0 -translate-x-full text-neutral-900 transition-transform duration-500 ease-out md:group-hover:translate-x-0 h-4 w-5"
						direction="right"
					/>
					<h3 className="pl-0 text-2xl leading-tight text-neutral-900 transition-all duration-500 ease-out md:group-hover:pl-8">
						{project.title}
					</h3>
				</div>
				<p className="text-xl text-neutral-400">{project.subtitle}</p>
			</div>
			<div className=" flex flex-wrap gap-2">
				{project.tags.map((tag) => (
					<Badge
						key={`${project.id}-${tag}`}
						variant="outline"
						size="sm"
						className="border-neutral-500/80 text-neutral-500 tracking-[0.12em]"
					>
						{tag}
					</Badge>
				))}
			</div>
		</Link>
	);
}
