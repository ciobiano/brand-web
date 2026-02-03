import { useEffect, useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";

interface MousePosition {
	x: number;
	y: number;
}

interface UseInteractiveCanvasOptions {
	intensity?: number;
	maxDistance?: number;
	animationDuration?: number;
	ease?: string;
}

const DEFAULT_OPTIONS: Required<UseInteractiveCanvasOptions> = {
	intensity: 300,
	maxDistance: 800,
	animationDuration: 0.05,
	ease: "none",
};

export const useInteractiveCanvas = (
	containerRef: React.RefObject<HTMLElement>,
	options: UseInteractiveCanvasOptions = {}
) => {
	const config = { ...DEFAULT_OPTIONS, ...options };
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});
	const [isActive, setIsActive] = useState(false);

	// Memoized movement calculation
	const calculateMovement = useCallback(
		(
			mouseX: number,
			mouseY: number,
			containerWidth: number,
			containerHeight: number
		) => {
			const centerX = containerWidth / 2;
			const centerY = containerHeight / 2;

			const offsetX = mouseX - centerX;
			const offsetY = mouseY - centerY;

			const force = config.intensity * 4;

			return {
				x: -(offsetX / containerWidth) * force,
				y: -(offsetY / containerHeight) * force,
			};
		},
		[config.intensity]
	);

	// Memoized animation config
	const animationConfig = useMemo(
		() => ({
			duration: config.animationDuration,
			ease: config.ease,
			overwrite: "auto" as const,
		}),
		[config.animationDuration, config.ease]
	);

	// Apply movement to all cards
	useEffect(() => {
		if (!isActive || !containerRef.current) return;

		const container = containerRef.current;
		const cards = container.querySelectorAll(".canvas-card");
		const containerRect = container.getBoundingClientRect();

		const movement = calculateMovement(
			mousePosition.x,
			mousePosition.y,
			containerRect.width,
			containerRect.height
		);

		cards.forEach((card) => {
			gsap.to(card, {
				x: movement.x,
				y: movement.y,
				...animationConfig,
			});
		});
	}, [
		mousePosition,
		isActive,
		containerRef,
		calculateMovement,
		animationConfig,
	]);

	// Mouse event handlers
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleMouseMove = (e: MouseEvent) => {
			const containerRect = container.getBoundingClientRect();
			const x = e.clientX - containerRect.left;
			const y = e.clientY - containerRect.top;

			setMousePosition({ x, y });
		};

		const handleMouseEnter = () => {
			setIsActive(true);
		};

		container.addEventListener("mousemove", handleMouseMove);
		container.addEventListener("mouseenter", handleMouseEnter);

		return () => {
			container.removeEventListener("mousemove", handleMouseMove);
			container.removeEventListener("mouseenter", handleMouseEnter);
		};
	}, [containerRef]);

	return {
		mousePosition,
		isActive,
	};
};
