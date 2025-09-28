import Header from "./_components/Header";
import BenefitsSection from "./_components/BenefitsSection";
import WeDeliverSlider from "./_components/WeDeliverSlider";
import CapabilitiesSection from "./_components/CapabilitiesSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import PartnershipSection from "./_components/PartnershipSection";
import ContactBanner from "./_components/ContactBanner";

export default function AgencyPage() {
  return (
		<main className="gap-16">
			<Header />
			<BenefitsSection />
			<WeDeliverSlider />
			<CapabilitiesSection />
			<TestimonialsSection />
			<PartnershipSection />
		
		</main>
	);
}
