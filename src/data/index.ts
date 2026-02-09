import {
	CaseStudy,
	Client,
	CompanyInfo,
	FooterLinkGroup,
	HeroImage,
	JournalCardPreview,
	JournalEntry,
	JournalTagFilter,
	LogoSize,
	MapConfig,
	NavigationItem,
	Project,
	ProjectTagFilter,
	Service,
	TeamMember,
} from "./types";

const HERO_IMAGE_SEED = 42;
const HERO_IMAGE_LIMIT = 15;

const heroImagePool: readonly HeroImage[] = [
	{
		src: "/assets/tote-bag-mockup.jpg",
		alt: "Minimalist tote bag mockup with geometric shapes",
		link: "/projects/tote-bag-design",
	},
	{
		src: "/assets/pottery-workshop-moodboard.jpg",
		alt: "Moodboard for a pottery workshop with earthy tones",
		link: "/projects/pottery-studio",
	},
	{
		src: "/assets/archiving-history-collage.jpg",
		alt: "Collage of historical archiving documents and photos",
		link: "/projects/archiving-project",
	},
	{
		src: "/assets/photography-education-magazine.jpg",
		alt: "Open magazine layout featuring photography education",
		link: "/projects/education-magazine",
	},
	{
		src: "/assets/solar-energy-dashboard-ui.jpeg",
		alt: "Clean solar energy monitoring dashboard UI",
		link: "/projects/solar-energy",
	},
	{
		src: "/assets/lagos-street-vibe.jpg",
		alt: "Vibrant street scene from Lagos with local life",
		link: "/projects/lagos-exploration",
	},
	{
		src: "/assets/red-macrame-bag.jpg",
		alt: "Close-up of a handcrafted red macrame bag",
		link: "/projects/macrame-handicraft",
	},
	{
		src: "/assets/street-fashion-orange.jpg",
		alt: "Modern street fashion photography in bright orange",
		link: "/projects/fashion-editorial",
	},
	{
		src: "/assets/caribou-coffee-branding.jpg",
		alt: "Branding identity design for Caribou Coffee",
		link: "/projects/coffee-branding",
	},
	{
		src: "/assets/cultural-procession-costumes.jpg",
		alt: "Traditional costumes at a cultural procession",
		link: "/projects/cultural-identity",
	},
	{
		src: "/assets/minimal-app-ui-showcase.jpg",
		alt: "Showcase of a minimalist app user interface",
		link: "/projects/app-showcase",
	},
	
	{
		src: "/assets/aesthetic-collage-moodboard.jpg",
		alt: "Curated aesthetic moodboard with various textures",
		link: "/projects/aesthetic-direction",
	},
	{
		src: "/assets/digital-designer-portfolio-ui.jpg",
		alt: "Clean portfolio UI for a digital designer",
		link: "/projects/portfolio-design",
	},
	{
		src: "/assets/mighty-killers-hoodie-mockup.jpg",
		alt: "Streetwear hoodie mockup for Mighty Killers branding",
		link: "/projects/streetwear-branding",
	},
];

const createSeededRandom = (seed: number) => () => {
	const x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
};

const deterministicShuffle = <T,>(items: readonly T[], seed: number): T[] => {
	const random = createSeededRandom(seed);
	const copy = [...items];

	for (let i = copy.length - 1; i > 0; i -= 1) {
		const j = Math.floor(random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}

	return copy;
};

export const heroImages: HeroImage[] = deterministicShuffle(
	heroImagePool,
	HERO_IMAGE_SEED
).slice(0, HERO_IMAGE_LIMIT);

export const allHeroImages = heroImagePool;

export const getHeroImages = (count: number = HERO_IMAGE_LIMIT): HeroImage[] =>
	deterministicShuffle(heroImagePool, HERO_IMAGE_SEED).slice(0, count);

export const projectsData: Project[] = [
	{
		id: "caribou-coffee",
		accentColor: "accent-1",
		title: "Caribou Coffee",
		subtitle: "Wildly Crafted",
		info: "A rustic-modern brand identity for the adventure-seeking brewer",
		description:
			"A comprehensive brand identity that balances rustic heritage with modern adventure, redefining the coffee ritual for a new generation of explorers.",
		tags: ["Branding", "Concept", "Food", "Gastronomy"],
		imageSrc: "/assets/caribou-coffee-branding.jpg",
		imageAlt: "Packaging and branding materials for Caribou Coffee",
		href: "/projects/caribou-coffee",
	},
	{
		id: "ekhi-solar",
		accentColor: "accent-2",
		title: "Ekhi Solar",
		subtitle: "The Power of Data",
		info: "Translating renewable energy performance into intuitive digital insights",
		description:
			"A high-performance monitoring dashboard that simplifies complex solar energy data into actionable insights for Spanish utility providers.",
		tags: ["Digital", "Webflow", "Strategy", "Health"],
		imageSrc: "/assets/solar-energy-dashboard-ui.jpeg",
		imageAlt: "Clean solar energy monitoring dashboard UI",
		href: "/projects/ekhi-solar",
	},
	{
		id: "mighty-killers",
		accentColor: "accent-3",
		title: "Mighty Killers",
		subtitle: "The World is Ours",
		info: "Visual storytelling for an underground streetwear collective",
		description:
			"A raw, high-impact visual direction that captures the grit and community spirit of a global streetwear movement.",
		tags: ["Branding", "Graphic Design", "Music", "Culture"],
		imageSrc: "/assets/mighty-killers-hoodie-mockup.jpg",
		imageAlt: "Mighty Killers streetwear hoodie mockup and branding",
		href: "/projects/mighty-killers",
	},
	{
		id: "education-magazine",
		accentColor: "accent-4",
		title: "Education Magazine",
		subtitle: "The Silent Language",
		info: "An editorial deep-dive into the philosophy of design education",
		description:
			"A minimalist magazine layout that explores the intersection of photographic theory and contemporary design pedagogy.",
		tags: ["Editorial", "Concept", "Education", "Culture"],
		imageSrc: "/assets/photography-education-magazine.jpg",
		imageAlt: "Open editorial spread from Education Magazine",
		href: "/projects/education-magazine",
	},
	{
		id: "bare-minerals",
		accentColor: "accent-1",
		title: "Bare Minerals",
		subtitle: "Naturally Raw",
		info: "Elevating social storytelling through clean, mindful content",
		description:
			"A digital content strategy focused on authenticity, showcasing natural beauty through raw, unscripted mobile-first narratives.",
		tags: ["Digital", "Content", "Wellness", "Luxury"],
		imageSrc: "/assets/bare-minerals-social-ui.jpg",
		imageAlt: "Bare Minerals social media content showcase on mobile",
		href: "/projects/bare-minerals",
	},
	{
		id: "lagos-living",
		accentColor: "accent-2",
		title: "Lagos Living",
		subtitle: "Echoes of the Street",
		info: "A digital photo essay capturing the pulse of the city",
		description:
			"An immersive storytelling experience that documents the daily rhythm and architectural textures of Lagos, Nigeria.",
		tags: ["Strategy", "Content", "Destination", "Tourism"],
		imageSrc: "/assets/lagos-street-vibe.jpg",
		imageAlt: "A vibrant street scene captured in Lagos",
		href: "/projects/lagos-living",
	},
	{
		id: "heritage-archive",
		accentColor: "accent-3",
		title: "Heritage Archive",
		subtitle: "Preserving the Present",
		info: "A modular identity system for digital history preservation",
		description:
			"A visual framework designed to organize and protect cultural history in the digital age, blending archival discipline with modern accessibility.",
		tags: ["Branding", "Culture", "Nonprofit", "Editorial"],
		imageSrc: "/assets/archiving-history-collage.jpg",
		imageAlt: "A collage of historical documents and archival identity fragments",
		href: "/projects/heritage-archive",
	},
	{
		id: "sharjah-arts",
		accentColor: "accent-4",
		title: "Sharjah Arts",
		subtitle: "Geometric Roots",
		info: "Reimagining regional identity through mathematical elegance",
		description:
			"A brand system for an arts festival that derives its visual language from local architectural motifs and Islamic geometry.",
		tags: ["Graphic Design", "Tourism", "Destination", "Branding"],
		imageSrc: "/assets/sharjah-tote-bag-orange.jpg",
		imageAlt: "Sharjah Arts branded tote bag with geometric motif",
		href: "/projects/sharjah-arts",
	},
	{
		id: "workflow-os",
		accentColor: "accent-1",
		title: "WorkFlow OS",
		subtitle: "Agency Operations, Refined",
		info: "A bespoke project management suite for creative teams",
		description:
			"A digital platform that streamlines complex creative workflows, focusing on clarity, speed, and collaborative precision.",
		tags: ["Digital", "Strategy", "Management", "Digital"],
		imageSrc: "/assets/project-management-ui.jpg",
		imageAlt: "A clean, data-rich user interface for WorkFlow OS",
		href: "/projects/workflow-os",
	},
	{
		id: "editor-pro",
		accentColor: "accent-2",
		title: "Editor Pro",
		subtitle: "Precision for Creators",
		info: "A developer-centric visual editor built for performance",
		description:
			"A tool designed for high-fidelity design work, offering granular control over layouts without compromising performance.",
		tags: ["Digital", "Concept", "Webflow", "Design"],
		imageSrc: "/assets/app-editor-interface.jpg",
		imageAlt: "The precise control panel of a high-fidelity design editor",
		href: "/projects/editor-pro",
	},
];

export const projectTags = [
	"Show all",
	"Purpose",
	"Branding",
	"Webflow",
	"Strategy",
	"Digital",
	"Graphic Design",
	"Content",
	"Packaging",
	"Editorial",
	"Illustration",
	"Concept",
	"Tourism",
	"Hospitality",
	"Education",
	"Health",
	"Comedy",
	"Cinema",
	"Interior",
	"Luxury",
	"Hotel",
	"Culture",
	"Nonprofit",
	"Campaign",
	"Destination",
	"Music",
	"Album",
	"Care",
	"Wellness",
	"Food",
	"Gastronomy",
	"Design",
	"Management",
	
] satisfies ReadonlyArray<ProjectTagFilter>;

export const journalTags = [
	"Agency",
	"Culture",
	"Design",
	"Process",
	"Technology",
	"Trends",
	"Strategy",
	"Branding",
	"Digital",
	"Insights",
	"Management",
	"Education",
	"Art",
	"Team",
	"Case Study",
	"Leadership",
	"UI/UX",
	"Sustainability",
	"Remote Work",
	"Typography",
	"Analytics",
] satisfies ReadonlyArray<JournalTagFilter>;

export const journalEntries: JournalEntry[] = [
	{
		id: "strategic-pivot",
		title: "The Strategic Pivot: Defining Vision in a Chaos Era",
		summary: "How modern agencies are redefining their core purpose amidst market volatility.",
		tags: ["Strategy", "Management", "Culture"],
		imageSrc: "/assets/journal/journal-01.jpg",
		imageAlt: "Team collaboration on a strategic whiteboard session",
		href: "/journal/strategic-pivot",
	},
	{
		id: "creative-process",
		title: "Deconstructing the Creative Process: From Chaos to Clarity",
		summary: "A look behind the curtain at how we turn messy ideas into polished products.",
		tags: ["Design", "Process", "Education"],
		imageSrc: "/assets/journal/journal-02.jpg",
		imageAlt: "Designer sketching concepts in a minimalist studio",
		href: "/journal/creative-process",
	},
	{
		id: "digital-frontiers",
		title: "Digital Frontiers: Why Web3 Still Matters for Brands",
		summary: "Navigating the hype cycle to find real value in decentralized technologies.",
		tags: ["Digital", "Technology", "Strategy"],
		imageSrc: "/assets/journal/journal-03.jpg",
		imageAlt: "Abstract digital network visualization",
		href: "/journal/digital-frontiers",
	},
	{
		id: "client-workshops",
		title: "The Art of the Client Workshop: Building Trust Face-to-Face",
		summary: "Why human connection is still the most powerful tool in our arsenal.",
		tags: ["Management", "Culture", "Process"],
		imageSrc: "/assets/journal/journal-04.jpg",
		imageAlt: "Modern agency meeting room during a client workshop",
		href: "/journal/client-workshops",
	},
	{
		id: "color-theory-2026",
		title: "Color Theory in 2026: Beyond the Pantone Forecast",
		summary: "Predicting the next wave of visual trends in a post-digital world.",
		tags: ["Design", "Branding", "Art"],
		imageSrc: "/assets/journal/journal-05.jpg",
		imageAlt: "Color swatches and branding materials spread on a table",
		href: "/journal/color-theory-2026",
	},
	{
		id: "data-driven-creativity",
		title: "Data-Driven Creativity: When Analytics Meet Aesthetics",
		summary: "Using hard data to inform and inspire softer design decisions.",
		tags: ["Digital", "Strategy", "Technology"],
		imageSrc: "/assets/journal/journal-06.jpg",
		imageAlt: "Data analysis dashboard on a laptop screen",
		href: "/journal/data-driven-creativity",
	},
	{
		id: "agency-culture",
		title: "Cultivating Agency Culture: More Than Just Ping Pong",
		summary: "Building a team environment that fosters genuine innovation and wellbeing.",
		tags: ["Culture", "Management", "Team"],
		imageSrc: "/assets/journal/journal-07.jpg",
		imageAlt: "Agency team sharing a casual moment in the office",
		href: "/journal/agency-culture",
	},
	{
		id: "rebranding-legacy",
		title: "Case Study: Rebranding a 100-Year-Old Legacy",
		summary: "The challenges and triumphs of modernizing a heritage brand.",
		tags: ["Branding", "Case Study", "Strategy"],
		imageSrc: "/assets/journal/journal-08.jpg",
		imageAlt: "Before and after rebranding assets on a wall",
		href: "/journal/rebranding-legacy",
	},
	{
		id: "leadership-in-design",
		title: "Leadership in Design: Guiding Teams Without Stifling Creativity",
		summary: "Strategies for creative directors to empower rather than micromanage.",
		tags: ["Management", "Leadership", "Culture"],
		imageSrc: "/assets/journal/journal-09.jpg",
		imageAlt: "Creative director mentoring a junior designer",
		href: "/journal/leadership-in-design",
	},
	{
		id: "future-of-ui",
		title: "The Future of UI: Interaction Design Erasure",
		summary: "Why the best interface is no interface at all.",
		tags: ["Design", "Digital", "UI/UX"],
		imageSrc: "/assets/journal/journal-10.jpg",
		imageAlt: "Close-up of a futuristic mobile interface design",
		href: "/journal/future-of-ui",
	},
	{
		id: "sustainable-design",
		title: "Sustainable Design: Reducing Digital Carbon Footprints",
		summary: "Practical steps to make your digital products more eco-friendly.",
		tags: ["Sustainability", "Design", "Technology"],
		imageSrc: "/assets/journal/journal-11.jpg",
		imageAlt: "Green plants in a modern, sustainable office space",
		href: "/journal/sustainable-design",
	},
	{
		id: "remote-vs-studio",
		title: "Remote vs. Studio: Finding the Hybrid Sweet Spot",
		summary: "Balancing the flexibility of remote work with the energy of the studio.",
		tags: ["Culture", "Management", "Remote Work"],
		imageSrc: "/assets/journal/journal-12.jpg",
		imageAlt: "Designer working from a home office setup",
		href: "/journal/remote-vs-studio",
	},
	{
		id: "typography-as-voice",
		title: "Typography as Voice: Choosing the Right Typeface",
		summary: "How type selection influences brand perception and readability.",
		tags: ["Design", "Typography", "Branding"],
		imageSrc: "/assets/journal/journal-13.jpg",
		imageAlt: "Typography specimens and font pairings on a screen",
		href: "/journal/typography-as-voice",
	},
	{
		id: "client-success-stories",
		title: "Client Success Stories: Measuring Impact Beyond Likes",
		summary: "Moving beyond vanity metrics to prove real business value.",
		tags: ["Strategy", "Analytics", "Management"],
		imageSrc: "/assets/journal/journal-14.jpg",
		imageAlt: "Client celebrating a successful campaign launch",
		href: "/journal/client-success-stories",
	},
	{
		id: "perfect-pitch",
		title: "The Perfect Pitch: Storytelling for New Business",
		summary: "Crafting narratives that win hearts, minds, and contracts.",
		tags: ["Management", "Strategy", "Process"],
		imageSrc: "/assets/journal/journal-15.jpg",
		imageAlt: "Agency presenter delivering a pitch deck",
		href: "/journal/perfect-pitch",
	},
];

export const journalData: JournalCardPreview[] = journalEntries.map(
	({ imageSrc, imageAlt, title, summary, tags, href }) => ({
		image: imageSrc,
		alt: imageAlt,
		title,
		description: summary,
		tags,
		href,
	})
);

export const navigationItems: NavigationItem[] = [
	{
		name: "Projects",
		href: "/projects",
		message: "kaine projects",
		image: "/images/placeholder1.jpg",
		className: "md:top-[20%] md:left-[55%] md:-translate-x-1/2",
	},
	{
		name: "Agency",
		href: "/agency",
		message: "kaine projects",
		image: "/images/placeholder2.jpg",
		className: "md:top-[35%] md:left-[%]",
	},
	{
		name: "Journal",
		href: "/journal",
		message: "kaine projects",
		image: "/images/placeholder3.jpg",
		className: "md:top-[50%] md:right-[25%] md",
	},
	{
		name: "Contact",
		href: "/contact",
		message: "kaine projects",
		image: "/images/placeholder4.jpg",
		className: "md:bottom-[20%] md:left-[50%] md:-translate-x-1/2",
	},
];

export const companyInfo: CompanyInfo = {
	name: "kainé",
	legalName: "kainé advertising agency",
	address: {
		street: "Mythenstrasse 7",
		city: "CH-6003 Lucerne",
		country: "Switzerland",
		full: "Mythenstrasse 7, CH-6003 Lucerne",
	},
	contact: {
		email: "hallo@kainé.ch",
		phone: "+41 41 240 56 62",
	},
	social: {
		instagram: "https://instagram.com",
		linkedin: "https://linkedin.com",
	},
	tagline: "Agency for Sense-Based Graphics and Communication",
};

export const footerLinks: FooterLinkGroup[] = [
	{
		title: "Links",
		items: [
			{ href: companyInfo.social.instagram, text: "Instagram" },
			{ href: companyInfo.social.linkedin, text: "LinkedIn" },
			{ href: "/newsletter", text: "Newsletter" },
		],
	},
	{
		items: [{ href: "https://webflow.com", text: "Webflow" }],
	},
	{
		items: [
			{ href: "/imprint", text: "Imprint" },
			{ href: "/privacy", text: "Privacy Policy" },
			{ href: "/terms", text: "Terms and Conditions" },
		],
		className: "text-gray-400 hover:text-purple-400",
	},
];

export const teamMembers: TeamMember[] = [
	{
		name: "Albi Christen",
		role: "Owner & Creative Director",
		skills: ["Concept", "Strategy", "Consulting"],
		bio: "I love my work and I love racking my brain for others – be it as creative director, designer, consultant, or sparring partner.",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
		email: "christen@kaine.in",
	},
	{
		name: "Sarah Mitchell",
		role: "Senior Brand Strategist",
		skills: ["Brand Strategy", "Market Research", "Workshop Facilitation"],
		bio: "Bridging the gap between business objectives and creative expression through data-informed storytelling.",
		image:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face",
		email: "sarah@kaine.in",
	},
	{
		name: "Marcus Chen",
		role: "Lead Digital Designer",
		skills: ["UI/UX", "Webflow", "Prototyping"],
		bio: "Crafting digital experiences that are both beautiful and functional, with a focus on accessibility and performance.",
		image:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=face",
		email: "marcus@kaine.in",
	},
	{
		name: "Elena Rodriguez",
		role: "Art Director",
		skills: ["Visual Identity", "Print Design", "Typography"],
		bio: "Obsessed with the intersection of type, color, and space. Every project is an opportunity to push visual boundaries.",
		image:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face",
		email: "elena@kaine.in",
	},
	{
		name: "Thomas Weber",
		role: "Senior Developer",
		skills: ["React", "Next.js", "GSAP"],
		bio: "Turning design visions into performant, scalable code. I thrive on complex animations and seamless interactions.",
		image:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&crop=face",
		email: "thomas@kaine.in",
	},
	{
		name: "Nia Okafor",
		role: "Content Strategist",
		skills: ["Copywriting", "Content Planning", "SEO"],
		bio: "Words matter. I help brands find their voice and communicate with clarity, empathy, and impact.",
		image:
			"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=800&fit=crop&crop=face",
		email: "nia@kaine.in",
	},
	{
		name: "Lars Andersson",
		role: "Motion Designer",
		skills: ["Animation", "Video Editing", "After Effects"],
		bio: "Bringing static visuals to life through motion. Animation is storytelling in its purest form.",
		image:
			"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&crop=face",
		email: "lars@kaine.in",
	},
	{
		name: "Priya Sharma",
		role: "Project Manager",
		skills: ["Project Planning", "Client Relations", "Team Coordination"],
		bio: "Keeping the chaos organized and the team energized. Every project is a puzzle I love solving.",
		image:
			"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&crop=face",
		email: "priya@kaine.in",
	},
];

export const services: Service[] = [
	{
		id: "strategy",
		title: "strategy",
		description:
			"Where do we stand, where do we want to go, and how do we get there? This is where we start.",
		services: [
			"Location determination",
			"Brand workshop",
			"Insights",
			"Brand positioning",
			"Visual language",
			"Communication measures",
			"Consulting",
			"Concept",
		],
		image: "/images/placeholder1.jpg",
	},
	{
		id: "branding",
		title: "branding",
		description:
			"Your brand is more than a logo – it's the entire experience. We design identities that resonate.",
		services: [
			"Naming",
			"Logo design",
			"Corporate identity",
			"Brand guidelines",
			"Visual systems",
			"Rebranding",
		],
		image: "/images/placeholder2.jpg",
	},
	{
		id: "digital",
		title: "digital",
		description:
			"Digital-first thinking with a human touch. We build platforms that perform and engage.",
		services: [
			"UX/UI Design",
			"Responsive design",
			"Digital strategy",
			"App design",
			"Prototyping",
			"User testing",
		],
		image: "/images/placeholder3.jpg",
	},
	{
		id: "webflow",
		title: "webflow",
		description:
			"We're Webflow experts. Fast, flexible, and fully custom websites without the development overhead.",
		services: [
			"Website design & development",
			"CMS setup",
			"E-commerce",
			"Animations & interactions",
			"SEO optimization",
			"Maintenance & support",
		],
		image: "/images/placeholder4.jpg",
	},
	{
		id: "graphic-design",
		title: "graphic design",
		description:
			"From print to packaging, we design with intention. Every detail matters.",
		services: [
			"Print collateral",
			"Packaging design",
			"Editorial design",
			"Illustration",
			"Signage & wayfinding",
			"Art direction",
		],
		image: "/images/placeholder1.jpg",
	},
	{
		id: "content",
		title: "content",
		description:
			"Content that connects. We craft narratives that engage, inspire, and convert.",
		services: [
			"Copywriting",
			"Content strategy",
			"Photography",
			"Video production",
			"Social media content",
			"Brand storytelling",
		],
		image: "/images/placeholder2.jpg",
	},
];

export const caseStudies: CaseStudy[] = [
	{
		id: 1,
		image:
			"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
		title: "Mäsi celebrates 10 years!",
		testimonial:
			"Kainé captured our heritage while pushing us into the future. Their team's ability to balance tradition with innovation is unmatched.",
		client: "Sarah Mueller",
		role: "CEO, Mäsi",
		className: "w-[70vw] sm:w-[420px] aspect-square",
	},
	{
		id: 2,
		image:
			"https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop",
		title: "Redefining energy monitoring with Ekhi",
		testimonial:
			"Working with Kainé transformed how we present complex data. They made our product intuitive and beautiful.",
		client: "Carlos Ruiz",
		role: "Product Lead, Ekhi Solar",
		className: "w-[70vw] sm:w-[420px] aspect-square",
	},
	{
		id: 3,
		image:
			"https://images.unsplash.com/photo-1618005198906-07f79ecc11e0?q=80&w=2574&auto=format&fit=crop",
		title: "Building a movement with Mighty Killers",
		testimonial:
			"They didn't just design for us – they became part of the crew. Real collaboration, real impact.",
		client: "Jay Thompson",
		role: "Founder, Mighty Killers Collective",
		className: "w-[70vw] sm:w-[420px] aspect-square",
	},
	{
		id: 4,
		image:
			"https://images.unsplash.com/photo-1618004912476-29818d81ae2e?q=80&w=2574&auto=format&fit=crop",
		title: "Heritage Archive: Preserving culture digitally",
		testimonial:
			"Kainé helped us build a system that honors the past while embracing the future. Their attention to detail is remarkable.",
		client: "Dr. Amina Youssef",
		role: "Director, Heritage Archive Foundation",
		className: "w-[70vw] sm:w-[420px] aspect-square",
	},
	{
		id: 5,
		image:
			"https://images.unsplash.com/photo-1618005198920-f0cb6201c115?q=80&w=2574&auto=format&fit=crop",
		title: "Lagos Living: Capturing the heartbeat of a city",
		testimonial:
			"They saw our city through fresh eyes and helped us tell stories we didn't know how to tell ourselves.",
		client: "Chidi Okonkwo",
		role: "Creative Director, Lagos Tourism Board",
		className: "w-[70vw] sm:w-[420px] aspect-square",
	},
];

export const clients: Client[] = [
	{ name: "ARCON", image: "https://picsum.photos/seed/arcon/400/400" },
	{
		name: "Albert Koechlin Stiftung",
		image: "https://picsum.photos/seed/albert/400/400",
	},
	{ name: "andermatt", image: "https://picsum.photos/seed/andermatt/400/400" },
	{
		name: "Bellevue Group",
		image: "https://picsum.photos/seed/bellevue/400/400",
	},
	{
		name: "Brütsch Elektronik",
		image: "https://picsum.photos/seed/brutsch/400/400",
	},
	{ name: "bs style", image: "https://picsum.photos/seed/bsstyle/400/400" },
	{
		name: "Corine Schupfer",
		image: "https://picsum.photos/seed/corine/400/400",
	},
	{ name: "Dosenbach", image: "https://picsum.photos/seed/dosenbach/400/400" },
	{ name: "e.a.s.y.", image: "https://picsum.photos/seed/easy/400/400" },
	{
		name: "Eichenberger Metallbau",
		image: "https://picsum.photos/seed/eichenberger/400/400",
	},
	{ name: "Elite", image: "https://picsum.photos/seed/elite/400/400" },
	{ name: "ELSA", image: "https://picsum.photos/seed/elsa/400/400" },
	{ name: "Engelberg", image: "https://picsum.photos/seed/engelberg/400/400" },
	{ name: "family", image: "https://picsum.photos/seed/family/400/400" },
	{
		name: "Feller Immobilien",
		image: "https://picsum.photos/seed/feller/400/400",
	},
	{ name: "Flyer", image: "https://picsum.photos/seed/flyer/400/400" },
	{
		name: "Galerie Valentien",
		image: "https://picsum.photos/seed/valentien/400/400",
	},
	{
		name: "Gerber Communications",
		image: "https://picsum.photos/seed/gerber/400/400",
	},
	{ name: "Gonski", image: "https://picsum.photos/seed/gonski/400/400" },
	{ name: "Himmel", image: "https://picsum.photos/seed/himmel/400/400" },
	{
		name: "Hotelleriesuisse",
		image: "https://picsum.photos/seed/hotellerie/400/400",
	},
	{ name: "keller", image: "https://picsum.photos/seed/keller/400/400" },
	{ name: "kickstart", image: "https://picsum.photos/seed/kickstart/400/400" },
	{
		name: "Klinik Adelheid",
		image: "https://picsum.photos/seed/adelheid/400/400",
	},
	{
		name: "Luzern Tourismus",
		image: "https://picsum.photos/seed/luzern/400/400",
	},
	{ name: "mäsi", image: "https://picsum.photos/seed/masi/400/400" },
	{ name: "mesonic", image: "https://picsum.photos/seed/mesonic/400/400" },
	{
		name: "Messmer Foundation",
		image: "https://picsum.photos/seed/messmer/400/400",
	},
	{ name: "Miele", image: "https://picsum.photos/seed/miele/400/400" },
	{ name: "my Coach", image: "https://picsum.photos/seed/mycoach/400/400" },
	{
		name: "naBe Tagesklinik",
		image: "https://picsum.photos/seed/nabe/400/400",
	},
	{ name: "OceanCare", image: "https://picsum.photos/seed/oceancare/400/400" },
	{
		name: "Pro Juventute",
		image: "https://picsum.photos/seed/juventute/400/400",
	},
	{
		name: "Pro Senectute",
		image: "https://picsum.photos/seed/senectute/400/400",
	},
	{
		name: "Puls Berufsbildung",
		image: "https://picsum.photos/seed/puls/400/400",
	},
	{ name: "RATAG", image: "https://picsum.photos/seed/ratag/400/400" },
	{ name: "Renggli", image: "https://picsum.photos/seed/renggli/400/400" },
	{
		name: "Schindler Hotel",
		image: "https://picsum.photos/seed/schindler/400/400",
	},
	{
		name: "Schoren Clinic",
		image: "https://picsum.photos/seed/schoren/400/400",
	},
	{ name: "schweiz.fm", image: "https://picsum.photos/seed/schweizfm/400/400" },
	{
		name: "Schwyz Tourismus",
		image: "https://picsum.photos/seed/schwyz/400/400",
	},
	{ name: "Seetal", image: "https://picsum.photos/seed/seetal/400/400" },
	{
		name: "Stadtcasino Basel",
		image: "https://picsum.photos/seed/stadtcasino/400/400",
	},
	{ name: "Stocker", image: "https://picsum.photos/seed/stocker/400/400" },
	{
		name: "Swiss Olympic",
		image: "https://picsum.photos/seed/swissolympic/400/400",
	},
	{ name: "Swiss Ski", image: "https://picsum.photos/seed/swisski/400/400" },
	{ name: "Tellco", image: "https://picsum.photos/seed/tellco/400/400" },
	{ name: "Toni", image: "https://picsum.photos/seed/toni/400/400" },
	{ name: "Vitromed", image: "https://picsum.photos/seed/vitromed/400/400" },
	{
		name: "Wellness Clinic",
		image: "https://picsum.photos/seed/wellness/400/400",
	},
	{
		name: "Wildenstein Media",
		image: "https://picsum.photos/seed/wildenstein/400/400",
	},
	{
		name: "Wirtschaft Luzern",
		image: "https://picsum.photos/seed/wirtschaft/400/400",
	},
	{ name: "WIRZ", image: "https://picsum.photos/seed/wirz/400/400" },
	{
		name: "World Wilderness Congress",
		image: "https://picsum.photos/seed/wwc/400/400",
	},
	{ name: "Zürcher Kantonalbank", image: "https://picsum.photos/seed/zkb/400/400" },
];

export const contactFormOptions: string[] = [
	"Web Design",
	"Logo / Branding",
	"Define Purpose",
	"Strategy",
	"Content",
	"UX Design",
	"Packaging",
	"Editorial",
	"Illustrations",
	"Other",
];

export const mapConfig: MapConfig = {
	longitude: -149.8936,
	latitude: 61.2155,
	zoom: 12,
};

export const logoSize: LogoSize = {
	width: 64,
	height: 64,
};

export const transitionWords: string[] = [
	"is a Studio",
	"great Collective",
	"collaborate",
	"Works",
	" the missing piece in your puzzle",
];

export * from "./types";
