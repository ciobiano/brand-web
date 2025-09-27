const clients = [
	{ name: "Client Alpha", country: "North America" },
	{ name: "Client Beta", country: "Europe" },
	{ name: "Client Gamma", country: "Asia-Pacific" },
	{ name: "Client Delta", country: "Latin America" },
	{ name: "Client Epsilon", country: "Middle East" },
	{ name: "Client Zeta", country: "Africa" },
	{ name: "Client Eta", country: "North America" },
	{ name: "Client Theta", country: "Europe" },
	{ name: "Client Iota", country: "Asia-Pacific" },
	{ name: "Client Kappa", country: "Latin America" },
	{ name: "Client Lambda", country: "Middle East" },
	{ name: "Client Mu", country: "Africa" },
];

export default function CollaborateSection() {
	return (
		<section className="bg-[#09090A] py-28 text-white sm:py-32">
			<div className="mx-auto max-w-6xl px-6 lg:px-12">
				<div className="max-w-4xl space-y-6">
					<p className="text-xs uppercase tracking-[0.35em] text-white/50">
						Global partnerships
					</p>
					<h2 className="text-[clamp(2.5rem,4.5vw,3.8rem)] font-semibold leading-[1.08]">
						We&apos;re not just about flashy logos. We partner with teams that value considered outcomes—from emerging startups to global players.
					</h2>
					<p className="max-w-2xl text-base text-white/60">
						We embed alongside your teams during critical launches, high-stakes migrations, and the everyday maintenance that keeps products thriving.
					</p>
				</div>

				<div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{clients.map((client) => (
						<div
							key={client.name}
							className="flex h-full flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
						>
							<div>
								<p className="text-xl font-semibold text-white sm:text-2xl">
									{client.name}
								</p>
								<p className="mt-2 text-xs uppercase tracking-[0.35em] text-white/40">
									{client.country}
								</p>
							</div>
							<div className="mt-6 h-px w-full bg-white/10" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
