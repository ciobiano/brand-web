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
	| "Interior"
	| "Luxury"
	| "Hotel"
	| "Culture"
	| "Nonprofit"
	| "Campaign"
	| "Destination"
	| "Music"
	| "Album"
	| "Care"
	| "Wellness"
	| "Food"
	| "Gastronomy"
	| "Design"
	| "Management";

export type CaseCardAccent = "accent-1" | "accent-2" | "accent-3" | "accent-4";

export interface Project {
	id: string;
	accentColor?: CaseCardAccent;
	info?: string;
	title: string;
	subtitle?: string;
	description: string;
	tags: ProjectTag[];
	imageSrc: string;
	imageAlt: string;
	href: string;
	badge?: ProjectBadge;
}

export type ProjectTagFilter = "Show all" | ProjectTag;

export type JournalTag = string;

export interface JournalBadge {
	label: string;
	tone?: ProjectBadgeTone;
}

export interface JournalEntry {
	id: string;
	title: string;
	summary?: string;
	tags: JournalTag[];
	imageSrc: string;
	imageAlt: string;
	href: string;
}

export type JournalTagFilter = "Show all" | JournalTag;

export interface JournalCardPreview {
	image: string;
	alt: string;
	title: string;
	description?: string;
	badge?: string;
	href: string;
}

export interface HeroImage {
	src: string;
	alt: string;
	link: string;
}

export interface NavigationItem {
	name: string;
	href: string;
	message: string;
	image: string;
	className: string;
}

export interface FooterLink {
	href: string;
	text: string;
}

export interface FooterLinkGroup {
	title?: string;
	items: FooterLink[];
	className?: string;
}

export interface TeamMember {
	name: string;
	role: string;
	skills: string[];
	bio: string;
	image: string;
	email?: string;
}

export interface Service {
	id: string;
	title: string;
	description: string;
	services: string[];
	image: string;
}

export interface CaseStudy {
	id: number;
	image: string;
	title: string;
	testimonial: string;
	client: string;
	role: string;
	className: string;
}

export interface Client {
	name: string;
	image: string;
}

export interface MapConfig {
	longitude: number;
	latitude: number;
	zoom: number;
}

export interface LogoSize {
	width: number;
	height: number;
}

export interface CompanyInfo {
	name: string;
	legalName: string;
	address: {
		street: string;
		city: string;
		country: string;
		full: string;
	};
	contact: {
		email: string;
		phone: string;
	};
	social: {
		instagram: string;
		linkedin: string;
	};
	tagline: string;
}
