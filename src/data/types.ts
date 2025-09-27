export type ProjectBadgeTone = "coral" | "charcoal";

export interface ProjectBadge {
	title: string;
	subtitle: string;
	tone?: ProjectBadgeTone;
}

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
	badge?: ProjectBadge;
}

export type ProjectTagFilter = "Show all" | ProjectTag;

export type JournalTag = "Humans" | "Flash" | "Agency" | "Strategy" | "Digital";

export interface JournalBadge {
	label: string;
	tone?: ProjectBadgeTone;
}

export interface JournalEntry {
	id: string;
	title: string;
	summary: string;
	tags: JournalTag[];
	cover: {
		src: string;
		alt: string;
	};
	link: string;
	
}

export type JournalTagFilter = "Show all" | JournalTag;

export interface JournalCardPreview {
	image: string;
	alt: string;
	title: string;
	description: string;
	badge?: string;
	link: string;
}

export type CaseCardAccent = "accent-1" | "accent-2" | "accent-3" | "accent-4";

export interface CaseCard {
	id: string;
	accentColor: CaseCardAccent;
	info: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
}

export interface HeroImage {
	src: string;
	alt: string;
	link: string;
}
