// /app/page.tsx
import React from "react";
import Hero from "@/soul/sections/hero";
import Cases from "@/soul/sections/cases";
import Journal from "@/soul/sections/journal";
export default function Page() {
	return (
		<main>
			<Hero title="Kainé" cta_text="Scroll" />
			<Cases />
			<Journal />
			{/* additional page sections */}
		</main>
	);
}
