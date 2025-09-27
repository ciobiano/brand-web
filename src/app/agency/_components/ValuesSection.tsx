const sections = [
	{
		kicker: "From humans to humans",
		title:
			"We’re real people dedicated to helping teams bring great ideas to life.",
		paragraphs: [
			"We value and respect every partner we work with and feel lucky that what we love doing helps others hit their milestones.",
			"Great products happen when trust and transparency are standard. We show up as collaborators invested in your mission.",
		],
	},
	{
		kicker: "Following our core founding principle",
		title:
			"We prioritize your needs over ours, knowing your wins fuel the partnership.",
		paragraphs: [
			"Every engagement is tailored to the outcomes you’re chasing. We help focus the team on the moments that matter most to your customers.",
			"We integrate with your rituals, align stakeholders, and keep shipping even when the terrain gets tricky.",
		],
	},
];

export default function ValuesSection() {
	return (
		<section className="bg-black text-white">
			{sections.map((section, index) => (
				<div
					key={section.kicker}
					className={`border-t border-white/10 ${index === 0 ? "pt-28" : "pt-24"} pb-24`}
				>
					<div className="mx-auto max-w-6xl px-6 lg:px-12">
						<p className="text-xs uppercase tracking-[0.35em] text-white/40">
							{section.kicker}
						</p>
						<div className="mt-6 max-w-4xl space-y-8">
							<h2 className="text-[clamp(2.6rem,4.6vw,4rem)] font-semibold leading-[1.08]">
								{section.title}
							</h2>
							{section.paragraphs.map((paragraph, idx) => (
								<p
									key={idx}
									className="text-base leading-relaxed text-white/65 sm:text-lg"
								>
									{paragraph}
								</p>
							))}
						</div>
					</div>
				</div>
			))}

			<div className="border-t border-white/10 py-24">
				<div className="mx-auto max-w-6xl px-6 lg:px-12">
					<div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-[#16161a] via-[#101012] to-[#050506] px-10 py-16 sm:px-16">
						<h3 className="text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-tight text-white">
							Ultimately, it&apos;s not magic. It&apos;s skill, experience, and dedication.
						</h3>
						<p className="mt-6 max-w-3xl text-base text-white/60 sm:text-lg">
							We stay close after launch, measure outcomes, and evolve the product alongside your team. Momentum turns into compounding impact.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
