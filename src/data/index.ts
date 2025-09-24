// Your existing 15 images
const allImages = [
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/6792613a5d497ebec43738c6_RZ_Clou_Portfolio_LIV_Achte_auf_dich_Home_04_Tiny.jpg",
		alt: "Thumbnail 11",
		link: "/projekte/achte-auf-dich",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e882afc6a8848e76033_Clou_Canvas-Stans-Lacht.jpg",
		alt: "Thumbnail 01",
		link: "/projekte/stans-lacht",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e630aae6142f4b68632_Clou_Canvas-Die-Goettliche-Ordnung.jpg",
		alt: "Thumbnail 06",
		link: "/projekte/die-goettliche-ordnung",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e52ade312753d5f2878_Clou_Canvas-Vitality-Cards.jpg",
		alt: "Thumbnail 08",
		link: "/projekte/vitality-cards",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e82c8259eeb5be828b6_Clou_Canvas-Spinnerei.jpg",
		alt: "Thumbnail 02",
		link: "/projekte/spinnerei",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e0a059ea93d0fb2bc73_Clou_Canvas-Arcon.jpg",
		alt: "Thumbnail 15",
		link: "/projekte/arcon",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e40966b042051b90fb8_Clou_Canvas-Charles-Nguela.jpg",
		alt: "Thumbnail 10",
		link: "/projekte/charles-nguela",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e5d29ee280117f3ef87_Clou_Canvas-Beialge-Magazin.jpg",
		alt: "Thumbnail 07",
		link: "/projekte/tavolago",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/685d53d9bc63d9b6aa4bed95_RZ_Clou_Portfolio_TFL_Tiny.jpg",
		alt: "Thumbnail 14",
		link: "/projekte/tourismus-awards",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e1f86f3c86d869d5c41_Clou_Canvas-New-Hope.jpg",
		alt: "Thumbnail 13",
		link: "/projekte/new-hope-sa",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e4b966b042051b9156f_Clou_Canvas-Lostly.jpg",
		alt: "Thumbnail 09",
		link: "/projekte/lostly",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e733244c9eb3d3ffa63_Clou_Canvas-Loris-Mate.jpg",
		alt: "Thumbnail 04",
		link: "/projekte/loris-mate",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e7cc8bfba6d6cb0a1d0_Clou_Canvas-Sachaklemm.jpg",
		alt: "Thumbnail 03",
		link: "/projekte/atelier-sacha-klemm",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e27f634a4a4761eb4ad_Clou_Canvas-BelArosa-Chalet.jpg",
		alt: "Thumbnail 12",
		link: "/projekte/belarosa-chalet",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e6c5240bf0d97fdef51_Clou_Canvas-TCS-Iceteam.jpg",
		alt: "Thumbnail 05",
		link: "/projekte/tcs-camping-bio-tea",
	},
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder1.jpg",
	// 	alt: "Additional Image 16",
	// 	link: "/projekte/additional-1",
	// },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder2.jpg",
	// 	alt: "Additional Image 17",
	// 	link: "/projekte/additional-2",
	// },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder3.jpg",
	// 	alt: "Additional Image 18",
	// 	link: "/projekte/additional-3",
	// },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder4.jpg",
	// 	alt: "Additional Image 19",
	// 	link: "/projekte/additional-4",
	// },
	// {
	// 	src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/placeholder5.jpg",
	// 	alt: "Additional Image 20",
	// 	link: "/projekte/additional-5",
	// },
];

// Use a deterministic shuffle to prevent hydration mismatches
function getDeterministicImages(count: number = 15) {
	// Use a fixed seed for consistent ordering between server and client
	const seed = 42;
	const shuffled = [...allImages].sort((a, b) => {
		// Create a simple hash from the alt text for deterministic sorting
		const hashA = a.alt
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const hashB = b.alt
			.split("")
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		return (hashA + seed) % 2 === 0 ? -1 : 1;
	});
	return shuffled.slice(0, count);
}

export const heroImages = getDeterministicImages(15);

export const cardData = [
	{
		id: "card-1",
		accentColor: "accent-1" as const,
		info: "A surreal dive into neon hues and playful decay",
		title: "Reverie",
		description:
			"A psychedelic skull study exploring the tension between playfulness and decay. Bold candy tones, liquid forms, and crisp vectors bring a surreal, pop-art mood meant for covers and prints.",
		imageSrc: "/images/placeholder1.jpg",
		imageAlt: "Reverie artwork",
	},
	{
		id: "card-2",
		accentColor: "accent-2" as const,
		info: "A retro-futurist scene where nostalgia meets glitch",
		title: "Vaporwave",
		description:
			"An 80s-UI dreamscape: stacked windows, checkerboard floors, and a sunset gradient. Built to feel like a loading screen to another world—nostalgic, glossy, and a bit uncanny.",
		imageSrc: "/images/placeholder2.jpg",
		imageAlt: "Vaporwave artwork",
	},
	{
		id: "card-3",
		accentColor: "accent-3" as const,
		info: "A kaleidoscope of folk motifs reimagined in digital form",
		title: "Kaleido",
		description:
			"Ornamental symmetry inspired by folk motifs and stained-glass glow. Designed as a seamless, tileable pattern for textiles, wallpapers, and rich UI backgrounds.",
		imageSrc: "/images/placeholder3.jpg",
		imageAlt: "Kaleido artwork",
	},
	{
		id: "card-4",
		accentColor: "accent-4" as const,
		info: "A portrait framed by oddball creatures and doodles",
		title: "Menagerie",
		description:
			"A playful portrait surrounded by oddball companions—mascots, monsters, and midnight snacks. Loose linework meets pastel whimsy, perfect for merch, stickers, and editorial spots.",
		imageSrc: "/images/placeholder4.jpg",
		imageAlt: "Menagerie artwork",
	},
];

export type ProjectTag =
	| "Purpose"
	| "Branding"
	| "Webflow"
	| "Strategy"
	| "Digital"
	| "Graphic Design"
	| "Content"
	| "Packaging"
	| "Editorial"
	| "Illustration"
	| "Concept"
	| "Tourism"
	| "Hospitality"
	| "Education"
	| "Health"
	| "Comedy"
	| "Cinema"
	| "Interior";

export interface Project {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	tags: ProjectTag[];
	imageSrc: string;
	imageAlt: string;
	href: string;
	badge?: {
		title: string;
		subtitle: string;
		tone?: "coral" | "charcoal";
	};
}

export const projectTags: ("Show all" | ProjectTag)[] = [
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
];

export const projectsData: Project[] = [
	{
		id: "hotel-schweizerhof-luzern",
		title: "Hotel Schweizerhof Lucerne",
		subtitle: "VICO invites you",
		description:
			"An iconic grand hotel rediscovered through warm hospitality cues and confident storytelling.",
		tags: ["Branding", "Hospitality", "Interior"],
		imageSrc:
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e7cc8bfba6d6cb0a1d0_Clou_Canvas-Sachaklemm.jpg",
		imageAlt: "Interior shot of Hotel Schweizerhof Lucerne",
		href: "/projekte/hotel-schweizerhof-luzern",
	},
	{
		id: "albert-koechlin-stiftung",
		title: "Albert Koechlin Foundation",
		subtitle: "Everything paletti?",
		description:
			"A digital identity that translates cultural funding diversity into modular color bands.",
		tags: ["Webflow", "Branding", "Graphic Design"],
		imageSrc:
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e630aae6142f4b68632_Clou_Canvas-Die-Goettliche-Ordnung.jpg",
		imageAlt: "Colorful panel arrangement for Albert Koechlin Foundation",
		href: "/projekte/albert-koechlin-stiftung",
		badge: {
			title: "W.",
			subtitle: "Site of the Day",
			tone: "coral",
		},
	},
	{
		id: "tourismus-luzern",
		title: "Lucerne Tourism",
		subtitle: "More attitude, fewer postcards",
		description:
			"Strategic brand leadership and digital storytelling that position Lucerne beyond clichés.",
		tags: ["Strategy", "Tourism", "Digital"],
		imageSrc:
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/685d53d9bc63d9b6aa4bed95_RZ_Clou_Portfolio_TFL_Tiny.jpg",
		imageAlt: "People overlooking the lake in Lucerne",
		href: "/projekte/tourismus-luzern",
	},
	{
		id: "lostly",
		title: "Lostly",
		subtitle: "Album launch with attitude",
		description:
			"Illustration, editorial design, and content packs that spotlight the artists behind Lostly.",
		tags: ["Content", "Illustration", "Editorial"],
		imageSrc:
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e4b966b042051b9156f_Clou_Canvas-Lostly.jpg",
		imageAlt: "Editorial spread for Lostly album launch",
		href: "/projekte/lostly",
	},
	{
		id: "new-hope-sa",
		title: "New Hope SA",
		subtitle: "Care reimagined",
		description:
			"Purpose-led brand work that balances healthcare expertise with genuine empathy.",
		tags: ["Purpose", "Health", "Branding"],
		imageSrc:
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e1f86f3c86d869d5c41_Clou_Canvas-New-Hope.jpg",
		imageAlt: "Soft gradient abstractions for New Hope SA",
		href: "/projekte/new-hope-sa",
	},
	{
		id: "tavolago",
		title: "Tavolago",
		subtitle: "A magazine to sink your teeth into",
		description:
			"Packaging and editorial design that make local gastronomy feel vivid and irresistible.",
		tags: ["Packaging", "Hospitality", "Content"],
		imageSrc:
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e5d29ee280117f3ef87_Clou_Canvas-Beialge-Magazin.jpg",
		imageAlt: "Editorial layout for Tavolago magazine",
		href: "/projekte/tavolago",
	},
];

const slides = [
	{
		image: "/images/placeholder1.jpg",
		alt: "Mucho Fiesta, very little Siesta",
		title: "Mucho Fiesta, very little Siesta",
		description:
			"An ordinary workday on time out. But make it Spanish.",
		badge: "Time Out",
		link: "https://www.clou.ch/",
	},
	{
		image: "/images/www.clou.ch_.png",
		alt: "Time for a leap of courage",
		title: "Time for a leap of courage",
		description:
			"Laila follows the sun south and finds it between paella and tinto verano. Time out in Valencia. Vamos!",
		badge: "Time Out",
		link: "https://www.clou.ch/",
	},
	{
		image: "/images/www.clou.ch_.png",
		alt: "An unforgettable trip to Copenhagen",
		title: "An unforgettable trip to Copenhagen",
		description: "Where to eat, shop, and unwind",
		badge: "Time Out",
		link: "https://www.clou.ch/",
	},
	{
		image: "/images/www.clou.ch_.png",
		alt: "Hello from Copenhagen!",
		title: "Hello from Copenhagen!",
		description:
			"Michelle experiences her first time out in Denmark's design capital.",
		badge: "Time Out",
		link: "https://www.clou.ch/",
	},
	{
		image: "/images/www.clou.ch_.png",
		alt: "Hello from Copenhagen!",
		title: "Hello from Copenhagen!",
		description:
			"Michelle experiences her first time out in Denmark's design capital.",
		badge: "Time Out",
		link: "https://www.clou.ch/",
	},
	{
		image: "/images/www.clou.ch_.png",
		alt: "Hello from Copenhagen!",
		title: "Hello from Copenhagen!",
		description:
			"Michelle experiences her first time out in Denmark's design capital.",
		badge: "Time Out",
		link: "https://www.clou.ch/",
	},
];

export const journalData = slides;
