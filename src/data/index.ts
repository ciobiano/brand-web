import {
	HeroImage,
	JournalCardPreview,
	JournalEntry,
	JournalTagFilter,
	Project,
	ProjectTagFilter,
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
		src: "/assets/manchester-united-social-post.png",
		alt: "Social media post design for Manchester United",
		link: "/projects/sports-social-media",
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
		title: "The Strategic Pivot: Defining Vision in a Chaos Era",
		summary: "How modern agencies are redefining their core purpose amidst market volatility.",
		tags: ["Strategy", "Management", "Culture"],
		imageSrc: "/assets/journal/journal-01.jpg",
		imageAlt: "Team collaboration on a strategic whiteboard session",
		href: "/journal/strategic-pivot",
	},
	{
		title: "Deconstructing the Creative Process: From Chaos to Clarity",
		summary: "A look behind the curtain at how we turn messy ideas into polished products.",
		tags: ["Design", "Process", "Education"],
		imageSrc: "/assets/journal/journal-02.jpg",
		imageAlt: "Designer sketching concepts in a minimalist studio",
		href: "/journal/creative-process",
	},
	{
		title: "Digital Frontiers: Why Web3 Still Matters for Brands",
		summary: "Navigating the hype cycle to find real value in decentralized technologies.",
		tags: ["Digital", "Technology", "Strategy"],
		imageSrc: "/assets/journal/journal-03.jpg",
		imageAlt: "Abstract digital network visualization",
		href: "/journal/digital-frontiers",
	},
	{
		title: "The Art of the Client Workshop: Building Trust Face-to-Face",
		summary: "Why human connection is still the most powerful tool in our arsenal.",
		tags: ["Management", "Culture", "Process"],
		imageSrc: "/assets/journal/journal-04.jpg",
		imageAlt: "Modern agency meeting room during a client workshop",
		href: "/journal/client-workshops",
	},
	{
		title: "Color Theory in 2026: Beyond the Pantone Forecast",
		summary: "Predicting the next wave of visual trends in a post-digital world.",
		tags: ["Design", "Branding", "Art"],
		imageSrc: "/assets/journal/journal-05.jpg",
		imageAlt: "Color swatches and branding materials spread on a table",
		href: "/journal/color-theory-2026",
	},
	{
		title: "Data-Driven Creativity: When Analytics Meet Aesthetics",
		summary: "Using hard data to inform and inspire softer design decisions.",
		tags: ["Digital", "Strategy", "Technology"],
		imageSrc: "/assets/journal/journal-06.jpg",
		imageAlt: "Data analysis dashboard on a laptop screen",
		href: "/journal/data-driven-creativity",
	},
	{
		title: "Cultivating Agency Culture: More Than Just Ping Pong",
		summary: "Building a team environment that fosters genuine innovation and wellbeing.",
		tags: ["Culture", "Management", "Team"],
		imageSrc: "/assets/journal/journal-07.jpg",
		imageAlt: "Agency team sharing a casual moment in the office",
		href: "/journal/agency-culture",
	},
	{
		title: "Case Study: Rebranding a 100-Year-Old Legacy",
		summary: "The challenges and triumphs of modernizing a heritage brand.",
		tags: ["Branding", "Case Study", "Strategy"],
		imageSrc: "/assets/journal/journal-08.jpg",
		imageAlt: "Before and after rebranding assets on a wall",
		href: "/journal/rebranding-legacy",
	},
	{
		title: "Leadership in Design: Guiding Teams Without Stifling Creativity",
		summary: "Strategies for creative directors to empower rather than micromanage.",
		tags: ["Management", "Leadership", "Culture"],
		imageSrc: "/assets/journal/journal-09.jpg",
		imageAlt: "Creative director mentoring a junior designer",
		href: "/journal/leadership-in-design",
	},
	{
		title: "The Future of UI: Interaction Design Erasure",
		summary: "Why the best interface is no interface at all.",
		tags: ["Design", "Digital", "UI/UX"],
		imageSrc: "/assets/journal/journal-10.jpg",
		imageAlt: "Close-up of a futuristic mobile interface design",
		href: "/journal/future-of-ui",
	},
	{
		title: "Sustainable Design: Reducing Digital Carbon Footprints",
		summary: "Practical steps to make your digital products more eco-friendly.",
		tags: ["Sustainability", "Design", "Technology"],
		imageSrc: "/assets/journal/journal-11.jpg",
		imageAlt: "Green plants in a modern, sustainable office space",
		href: "/journal/sustainable-design",
	},
	{
		title: "Remote vs. Studio: Finding the Hybrid Sweet Spot",
		summary: "Balancing the flexibility of remote work with the energy of the studio.",
		tags: ["Culture", "Management", "Remote Work"],
		imageSrc: "/assets/journal/journal-12.jpg",
		imageAlt: "Designer working from a home office setup",
		href: "/journal/remote-vs-studio",
	},
	{
		title: "Typography as Voice: Choosing the Right Typeface",
		summary: "How type selection influences brand perception and readability.",
		tags: ["Design", "Typography", "Branding"],
		imageSrc: "/assets/journal/journal-13.jpg",
		imageAlt: "Typography specimens and font pairings on a screen",
		href: "/journal/typography-as-voice",
	},
	{
		title: "Client Success Stories: Measuring Impact Beyond Likes",
		summary: "Moving beyond vanity metrics to prove real business value.",
		tags: ["Strategy", "Analytics", "Management"],
		imageSrc: "/assets/journal/journal-14.jpg",
		imageAlt: "Client celebrating a successful campaign launch",
		href: "/journal/client-success-stories",
	},
	{
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

export * from "./types";
