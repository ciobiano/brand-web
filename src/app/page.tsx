// /app/page.tsx
import React from "react";
import Hero from "@/app/soul/sections/hero";
import Cases from "@/app/soul/sections/cases";

export default function Page() {
	return (
		<main>
			<Hero title="Kainé" cta_text="Scroll" />
			<Cases />
			{/* additional page sections */}
		</main>
	);
}
