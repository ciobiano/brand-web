
const startups = [
	{ name: "Nimbus Labs", location: "Lagos, Nigeria" },
	{ name: "Aurora Analytics", location: "Berlin, Germany" },
	{ name: "Marble AI", location: "Austin, USA" },
	{ name: "Kite Commerce", location: "Toronto, Canada" },
	{ name: "Verve Studios", location: "Nairobi, Kenya" },
	{ name: "Pulse Robotics", location: "Seoul, South Korea" },
	{ name: "Orbit Health", location: "London, United Kingdom" },
	{ name: "Drift Finance", location: "San Francisco, USA" },
];

export default function AgencyClientRoster() {
	return (
		<section className="relative bg-clou-black py-24 text-clou-gray sm:py-40">
			<div className="absolute inset-0 rounded-t-2xl translate-y-[-97.5%] bg-clou-black h-4" />

			<div className="px-6 lg:px-12">
				<div className="space-y-6 max-w-5xl select-none text-[clamp(2.2rem,4.8vw,3.8rem)] font-semibold leading-[75px]">
					We&apos;re not just about flashy logos. We collaborate with anyone who
					values high quality – from local startups to global giants.
				</div>

				<div className="mt-20 w-full">
					<div className="grid grid-cols-1 gap-y-0 sm:grid-cols-2 sm:gap-16">
						{startups.map((startup) => (
							<div
								key={startup.name}
								className="flex items-center justify-between border-b border-clou-gray/50 py-12 text-center"
							>
								<div className="flex-shrink-0 pr-4 text-right text-lg sm:text-xl">
									{startup.name}
								</div>
								<div className="min-w-0">
									<h3 className="uppercase leading-tight">
										{startup.location}.
									</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
