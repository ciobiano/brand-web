import { cn } from "@/lib/utils";

type ArrowDirection = "left" | "right";

interface ArrowIconProps {
	direction?: ArrowDirection;
	className?: string;
}

const directionRotation: Record<ArrowDirection, string> = {
	left: "",
	right: "rotate-180",
};

const ArrowIcon = ({ direction = "right", className }: ArrowIconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 17 12"
		fill="none"
		className={cn("h-4 w-6", directionRotation[direction], className)}
		aria-hidden="true"
	>
		<path
			d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z"
			fill="currentColor"
		/>
	</svg>
);

export default ArrowIcon;
