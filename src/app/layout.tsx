import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollSmootherWrapper from "../soul/primitives/ScrollSmootherWrapper";
import Footer from "@/soul/sections/footer";
import { Providers } from "@/soul/primitives/page-transition";
import Navigation from "@/soul/sections/nav/Navigation";
import CustomCursor from "@/soul/primitives/CustomCursor";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "kainé - Agency for purpose-driven design and communication",
	description:
		"Hello! We are kainé, your agency in Lagos, Nigeria focused on branding, purpose, and websites with impact.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${inter.variable} `}>
			<body className={`${inter.className} font-athletics `}>
				<Providers>
					<CustomCursor />
					<Navigation />
					<ScrollSmootherWrapper contentClassName="pt-16">
						<>
							{children}
							<Footer />
						</>
					</ScrollSmootherWrapper>
				</Providers>
			</body>
		</html>
	);
}
