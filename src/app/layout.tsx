import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollSmootherWrapper from "../soul/primitives/ScrollSmootherWrapper";
import Footer from "@/soul/sections/footer";
import { Providers } from "@/soul/primitives/page-transition";
import Navigation from "@/soul/sections/nav/Navigation";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "kainé - Agentur für sinnbasierte Grafik und Kommunikation",
	description:
		"Hallo! Wir sind kainé, deine Agentur in Luzern mit Fokus auf Branding, Purpose und Websites mit Wirkung.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="de" className={`${inter.variable} `}>
			<body className={`${inter.className} font-athletics `}>
				<Providers>
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
