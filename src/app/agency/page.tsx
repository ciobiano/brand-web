import Button from "@/soul/primitives/Button";
import {
	AgencyHero,
	AgencyTeam,
	AgencyExpertise,
	AgencyCaseStudies,
	AgencyClientRoster,
} from "./_components/sections";

export default function AgencyPage() {
	return (
		<main className="min-h-screen">
			<AgencyHero />
			<AgencyTeam />
			<AgencyExpertise />
			<AgencyClientRoster />
			<section className="mt-40 text-kainé-black   flex flex-col min-h-[50svh] ">
				<div className="px-4 w-1/2">
					<div className="max-w-lg ">
						<p className="text-2xl sm:text-3xl lg:text-4xl pb-8">
							Du möchtest uns auch mal sowas Nettes schreiben? Dann lass uns ein
							gemeinsames Projekt umsetzen.{" "}
						</p>
						<Button variant="primary" size="md" href="/contact">
							Contact us
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
