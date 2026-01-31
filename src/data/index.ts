import {
	CaseCard,
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
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/6792613a5d497ebec43738c6_RZ_kainé_Portfolio_LIV_Achte_auf_dich_Home_04_Tiny.jpg",
		alt: "Thumbnail 11",
		link: "/projekte/achte-auf-dich",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e882afc6a8848e76033_kainé_Canvas-Stans-Lacht.jpg",
		alt: "Thumbnail 01",
		link: "/projekte/stans-lacht",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e630aae6142f4b68632_kainé_Canvas-Die-Goettliche-Ordnung.jpg",
		alt: "Thumbnail 06",
		link: "/projekte/die-goettliche-ordnung",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e52ade312753d5f2878_kainé_Canvas-Vitality-Cards.jpg",
		alt: "Thumbnail 08",
		link: "/projekte/vitality-cards",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e82c8259eeb5be828b6_kainé_Canvas-Spinnerei.jpg",
		alt: "Thumbnail 02",
		link: "/projekte/spinnerei",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e0a059ea93d0fb2bc73_kainé_Canvas-Arcon.jpg",
		alt: "Thumbnail 15",
		link: "/projekte/arcon",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e40966b042051b90fb8_kainé_Canvas-Charles-Nguela.jpg",
		alt: "Thumbnail 10",
		link: "/projekte/charles-nguela",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e5d29ee280117f3ef87_kainé_Canvas-Beialge-Magazin.jpg",
		alt: "Thumbnail 07",
		link: "/projekte/tavolago",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/685d53d9bc63d9b6aa4bed95_RZ_kainé_Portfolio_TFL_Tiny.jpg",
		alt: "Thumbnail 14",
		link: "/projekte/tourismus-awards",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e1f86f3c86d869d5c41_kainé_Canvas-New-Hope.jpg",
		alt: "Thumbnail 13",
		link: "/projekte/new-hope-sa",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e4b966b042051b9156f_kainé_Canvas-Lostly.jpg",
		alt: "Thumbnail 09",
		link: "/projekte/lostly",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e733244c9eb3d3ffa63_kainé_Canvas-Loris-Mate.jpg",
		alt: "Thumbnail 04",
		link: "/projekte/loris-mate",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e7cc8bfba6d6cb0a1d0_kainé_Canvas-Sachaklemm.jpg",
		alt: "Thumbnail 03",
		link: "/projekte/atelier-sacha-klemm",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e27f634a4a4761eb4ad_kainé_Canvas-BelArosa-Chalet.jpg",
		alt: "Thumbnail 12",
		link: "/projekte/belarosa-chalet",
	},
	{
		src: "https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e6c5240bf0d97fdef51_kainé_Canvas-TCS-Iceteam.jpg",
		alt: "Thumbnail 05",
		link: "/projekte/tcs-camping-bio-tea",
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

export const cardData: CaseCard[] = [
	{
		id: "card-1",
		accentColor: "accent-1",
		info: "A surreal dive into neon hues and playful decay",
		title: "Reverie",
		description:
			"A psychedelic skull study exploring the tension between playfulness and decay. Bold candy tones, liquid forms, and crisp vectors bring a surreal, pop-art mood meant for covers and prints.",
		imageSrc: "/images/placeholder1.jpg",
		imageAlt: "Reverie artwork",
	},
	{
		id: "card-2",
		accentColor: "accent-2",
		info: "A retro-futurist scene where nostalgia meets glitch",
		title: "Vaporwave",
		description:
			"An 80s-UI dreamscape: stacked windows, checkerboard floors, and a sunset gradient. Built to feel like a loading screen to another world—nostalgic, glossy, and a bit uncanny.",
		imageSrc: "/images/placeholder2.jpg",
		imageAlt: "Vaporwave artwork",
	},
	{
		id: "card-3",
		accentColor: "accent-3",
		info: "A kaleidoscope of folk motifs reimagined in digital form",
		title: "Kaleido",
		description:
			"Ornamental symmetry inspired by folk motifs and stained-glass glow. Designed as a seamless, tileable pattern for textiles, wallpapers, and rich UI backgrounds.",
		imageSrc: "/images/placeholder3.jpg",
		imageAlt: "Kaleido artwork",
	},
	{
		id: "card-4",
		accentColor: "accent-4",
		info: "A portrait framed by oddball creatures and doodles",
		title: "Menagerie",
		description:
			"A playful portrait surrounded by oddball companions—mascots, monsters, and midnight snacks. Loose linework meets pastel whimsy, perfect for merch, stickers, and editorial spots.",
		imageSrc: "/images/placeholder4.jpg",
		imageAlt: "Menagerie artwork",
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
] satisfies ReadonlyArray<ProjectTagFilter>;

export const projectsData: Project[] = [
	{
		id: "hotel-schweizerhof-luzern",
		title: "Hotel Schweizerhof Lucerne",
		subtitle: "VICO invites you",
		description:
			"An iconic grand hotel rediscovered through warm hospitality cues and confident storytelling.",
		tags: ["Branding", "Hospitality", "Interior"],
		imageSrc:
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e7cc8bfba6d6cb0a1d0_kainé_Canvas-Sachaklemm.jpg",
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
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e630aae6142f4b68632_kainé_Canvas-Die-Goettliche-Ordnung.jpg",
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
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/685d53d9bc63d9b6aa4bed95_RZ_kainé_Portfolio_TFL_Tiny.jpg",
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
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e4b966b042051b9156f_kainé_Canvas-Lostly.jpg",
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
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e1f86f3c86d869d5c41_kainé_Canvas-New-Hope.jpg",
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
			"https://cdn.prod.website-files.com/65dc5814c929e36853491dc5/66389e5d29ee280117f3ef87_kainé_Canvas-Beialge-Magazin.jpg",
		imageAlt: "Editorial layout for Tavolago magazine",
		href: "/projekte/tavolago",
	},
];

export const journalTags = [
	"Show all",
	"Humans",
	"Flash",
	"Agency",
	"Strategy",
	"Digital",
] satisfies ReadonlyArray<JournalTagFilter>;

export const journalEntries: JournalEntry[] = [
	{
		id: "valencia-field-notes",
		title: "Mucho Fiesta, very little Siesta",
		summary: "An ordinary workday on time out. But make it Spanish.",
		tags: ["Humans", "Agency"],
		cover: {
			src: "/images/placeholder1.jpg",
			alt: "Team members exploring Valencia's streets at dusk",
		},
		link: "/journal/valencia-field-notes",
		
	},
	{
		id: "valencia-leap-of-courage",
		title: "Time for a leap of courage",
				summary:
			"Laila follows the sun south and finds it between paella and tinto verano.",
		tags: ["Humans", "Flash"],
		cover: {
			src: "/images/placeholder2.jpg",
			alt: "Collage of travel moments from Valencia",
		},
		link: "/journal/time-for-a-leap-of-courage",
		
	},
	{
		id: "copenhagen-city-guide",
		title: "An unforgettable trip to Copenhagen",
		
		summary: "Where to eat, shop, and unwind when design is your compass.",
		tags: ["Strategy", "Digital"],
		cover: {
			src: "/images/placeholder2.jpg",
			alt: "Illustrated map of Copenhagen with design hotspots",
		},
		link: "/journal/an-unforgettable-trip-to-copenhagen",
		
	},
	{
		id: "copenhagen-time-out",
		title: "Hello from Copenhagen!",
				summary: "Michelle experiences her first time out in Denmark's design capital.",
		tags: ["Humans", "Agency"],
		cover: {
			src: "/images/placeholder2.jpg",
			alt: "Portrait of Michelle cycling through Copenhagen",
		},
		link: "/journal/hello-from-copenhagen",
		
	},
	{
		id: "flash-lab-pop-up",
		title: "Inside our Flash Lab pop-up",
		summary:
			"Rapid prototyping, late-night sketches, and how the team ships ideas before sunrise.",
		tags: ["Flash", "Digital"],
		cover: {
			src: "/images/placeholder1.jpg",
			alt: "Designers collaborating in a neon-lit studio",
		},
		link: "/journal/flash-lab-pop-up",
		
	},
	{
		id: "strategy-summit-retrospective",
		title: "What we learned at Strategy Summit",
		summary:
			"The three takeaways shaping how we lead digital-first brands in 2025.",
		tags: ["Strategy", "Agency"],
		cover: {
			src: "/images/placeholder5.jpg",
			alt: "Speakers on stage at a design strategy conference",
		},
		link: "/journal/strategy-summit-retrospective",
	
	},
];

export const journalData: JournalCardPreview[] = journalEntries.map(
	({ cover, title, summary, tags, link }) => ({
		image: cover.src,
		alt: cover.alt,
		title,
		description: summary,
	
		link,
	})
);

export * from "./types";
