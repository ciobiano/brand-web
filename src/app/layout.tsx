import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ScrollSmootherWrapper from "../soul/primitives/ScrollSmootherWrapper";
import Footer from "@/soul/sections/footer";
import {  Providers } from "@/soul/primitives/PageTransition";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Clou - Agentur für sinnbasierte Grafik und Kommunikation",
	description:
		"Hallo! Wir sind Clou, deine Agentur in Luzern mit Fokus auf Branding, Purpose und Websites mit Wirkung.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
		return (
			<html lang="de" className={`${inter.variable} `}>
				<body className={`${inter.className} font-sans `}>
					<Providers>
						<ScrollSmootherWrapper>
							{children}
							<Footer />
						</ScrollSmootherWrapper>
					</Providers>
				</body>
			</html>
		);
}
