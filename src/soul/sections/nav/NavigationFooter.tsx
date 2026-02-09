import { companyInfo } from "@/data";

export default function NavigationFooter() {
	return (
		<div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between text-lg" data-cursor-invert>
			<div className="hidden md:block">
				{companyInfo.name}<br />
				{companyInfo.address.street}<br />
				{companyInfo.address.city}
			</div>

			<div className="flex gap-8 text-center">
				<div>
					{companyInfo.contact.email}<br />
					{companyInfo.contact.phone}
				</div>
				<div className="text-right">
					Instagram<br />
					LinkedIn
				</div>
			</div>
		</div>
	);
}
