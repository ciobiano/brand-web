import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import LenisProvider from "./providers/LenisProvider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	display: "swap",
	weight: ["300", "400", "500", "600", "700"],
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
			<html lang="de" className={`${inter.variable} ${poppins.variable}`}>
				<body className={`${inter.className} font-sans`}>
					<LenisProvider>
						{children}
					</LenisProvider>
				</body>
			</html>
		);
}
