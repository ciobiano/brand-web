export default function NavigationFooter() {
	return (
		<div className="absolute bottom-8 left-0 right-0 px-8 flex justify-between text-lg" data-cursor-invert>
			<div className="hidden md:block">
				Kaine studio<br />
				wall street 7<br />
				6003 Lagos, Nigeria
			</div>

			<div className="flex gap-8 text-center">
				<div>
					hallo@clou.ch<br />
					+41 41 240 56 62
				</div>
				<div className="text-right">
					Instagram<br />
					LinkedIn
				</div>
			</div>
		</div>
	);
}
