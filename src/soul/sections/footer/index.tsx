import { ArrowUp } from "lucide-react"; // Using lucide-react for the arrow icon

const Footer = () => {
	return (
		<footer className="bg-black text-white p-8 md:p-12 font-sans relative">
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{/* Section 1: Large "CLOU" text */}
				<div className="lg:col-span-2">
					<h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none relative">
						CLOU
						<span className="absolute text-purple-400 text-4xl top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
							.
						</span>
					</h1>
				</div>

				{/* Section 2: Contact Info */}
				<div className="space-y-4">
					<button className="border border-gray-500 rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black transition-colors">
						Contact
					</button>
					<div>
						<p>Clou advertising agency</p>
						<p>Mythenstrasse 7</p>
						<p>CH-6003 Lucerne</p>
					</div>
					<div>
						<p>+41 41 240 56 62</p>
						<p>hallo@clou.ch</p>
					</div>
				</div>

				{/* Section 3: Links */}
				<div className="space-y-4">
					<button className="border border-gray-500 rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black transition-colors">
						Left-hand
					</button>
					<div className="flex flex-col space-y-2">
						<a href="#" className="hover:underline">
							Instagram
						</a>
						<a href="#" className="hover:underline">
							LinkedIn
						</a>
						<a href="#" className="hover:underline">
							Newsletter
						</a>
					</div>
					<div className="flex flex-col space-y-2">
						<a href="#" className="hover:underline">
							Webflow
						</a>
					</div>
					<div className="flex flex-col space-y-2 text-gray-400">
						<a href="#" className="hover:underline">
							Imprint
						</a>
						<a href="#" className="hover:underline">
							Privacy Policy
						</a>
						<a href="#" className="hover:underline">
							Terms and Conditions
						</a>
					</div>
				</div>
			</div>

			{/* Bottom Row */}
			<div className="mt-16 md:mt-24 flex justify-between items-end">
				{/* Agency Description */}
				<div>
					<p>Agency for Sense-Based</p>
					<p>Graphics and Communication</p>
				</div>

				{/* Professional Partner */}
				<div className="hidden md:flex items-center space-x-2 border border-gray-700 px-3 py-1 rounded-md text-sm text-gray-400">
					{/* You can replace this with an actual Webflow icon if you have one */}
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M1.5 0H15.5C19.366 0 22.5 3.13401 22.5 7V10.5H16.5V7C16.5 6.17157 15.8284 5.5 15 5.5H8.5V18.5H15C15.8284 18.5 16.5 17.8284 16.5 17V13.5H22.5V17C22.5 20.866 19.366 24 15.5 24H1.5C0.671573 24 0 23.3284 0 22.5V1.5C0 0.671573 0.671573 0 1.5 0Z" />
					</svg>
					<span>Professional partner</span>
				</div>
			</div>

			{/* Scroll to Top Button */}
			<button className="absolute bottom-8 right-8 border border-gray-500 rounded-full p-2 hover:bg-white hover:text-black transition-colors">
				<ArrowUp size={24} />
			</button>
		</footer>
	);
};

export default Footer;
