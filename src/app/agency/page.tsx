import {
	AgencyHero,
	AgencyTeam,
	AgencyExpertise,
	AgencyCaseStudies,
	AgencyClientRoster,
	AgencyTestimonials,
} from "./_components/sections";

export default function AgencyPage() {
	return (
		<main className="min-h-screen">
			<AgencyHero />
			<AgencyTeam />
			<AgencyExpertise />
			<AgencyCaseStudies />
			<AgencyClientRoster />
			<AgencyTestimonials />
		</main>
	);
}
