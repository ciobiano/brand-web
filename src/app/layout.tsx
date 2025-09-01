import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "./soul/primitives/transition-page";
import ScrollSmootherWrapper from "./soul/primitives/ScrollSmootherWrapper";

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
				<TransitionProvider>
					<ScrollSmootherWrapper>{children}</ScrollSmootherWrapper>
				</TransitionProvider>
			</body>
		</html>
	);
}
