// components/Transition.tsx
"use client";
import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TransitionContextValue {
	isTransitioning: boolean;
	startTransition: (message?: string) => void;
	finishTransition: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);
export function useTransition() {
	const ctx = useContext(TransitionContext);
	if (!ctx)
		throw new Error("useTransition must be used inside TransitionProvider");
	return ctx;
}

export function TransitionProvider({
	children,
	minDuration = 300,
}: {
	children: React.ReactNode;
	minDuration?: number;
}) {
	const [visible, setVisible] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(true);
	const [message, setMessage] = useState<string | null>(null);
	const startedAt = useRef<number | null>(Date.now());

	const startTransition = (msg?: string) => {
		startedAt.current = Date.now();
		setMessage(msg ?? null);
		setVisible(true);
		setIsTransitioning(true);
		document.body.classList.add("no-scroll");
	};

	const finishTransition = () => {
		const elapsed = startedAt.current ? Date.now() - startedAt.current : 0;
		const wait = Math.max(0, minDuration - elapsed);
		setTimeout(() => {
			setVisible(false);
			setIsTransitioning(false);
			document.body.classList.remove("no-scroll");
			startedAt.current = null;
		}, wait);
	};

	useEffect(() => {
		const t = window.setTimeout(() => {
			setVisible(false);
			setIsTransitioning(false);
			startedAt.current = null;
		}, 500);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		const onPageShow = (e: PageTransitionEvent) => {
			if (e.persisted) {
				setVisible(true);
				setIsTransitioning(true);
				document.body.classList.add("no-scroll");
				setTimeout(() => finishTransition(), 220);
			}
		};
		window.addEventListener("pageshow", onPageShow);
		return () => window.removeEventListener("pageshow", onPageShow);
	}, []);

	return (
		<TransitionContext.Provider
			value={{ isTransitioning, startTransition, finishTransition }}
		>
			<div
				className={`__page-transition ${visible ? "visible" : "hidden"}`}
				aria-hidden
			>
				<div className="panel" />
				<div className="msg">{message}</div>
			</div>

			{/* Hide children while transitioning */}
			<div
				style={{
					opacity: isTransitioning ? 0 : 1,
					transition: "opacity 300ms ease",
				}}
			>
				{children}
			</div>

			<style jsx>{`
				.__page-transition {
					position: fixed;
					inset: 0;
					z-index: 9999;
					display: flex;
					align-items: center;
					justify-content: center;
					pointer-events: none;
				}
				.panel {
					position: absolute;
					inset: 0;
					background: #000000;
					transform: translateY(100%);
					opacity: 0;
					transition: transform 380ms cubic-bezier(0.22, 0.9, 0.28, 1),
						opacity 300ms ease;
				}
				.__page-transition.visible .panel {
					transform: translateY(0);
					opacity: 1;
					pointer-events: auto;
				}
				.__page-transition.hidden .panel {
					transform: translateY(-100%);
					opacity: 0;
				}

				.msg {
					position: relative;
					z-index: 2;
					color: #fff;
					font-weight: 600;
					pointer-events: none;
					opacity: 0;
					transition: opacity 140ms ease 40ms;
				}
				.__page-transition.visible .msg {
					opacity: 1;
				}
			`}</style>
		</TransitionContext.Provider>
	);
}

/** TransitionLink: opt-in Link that can pass a message */
export function TransitionLink({
	href,
	children,
	message,
	delay = 120,
	...rest
}: React.ComponentProps<typeof Link> & { message?: string; delay?: number }) {
	const router = useRouter();
	const { startTransition, finishTransition } = useTransition();

	const onClick = async (e: React.MouseEvent) => {
		if (
			e.metaKey ||
			e.ctrlKey ||
			e.shiftKey ||
			e.altKey ||
			(e.nativeEvent && (e.nativeEvent as any).button === 1)
		)
			return;
		e.preventDefault();
		startTransition(message ?? "Loading…");
		setTimeout(async () => {
			try {
				await router.push(typeof href === "string" ? href : (href as any).href);
			} catch {
				if (typeof href === "string") window.location.href = href;
			} finally {
				finishTransition();
			}
		}, delay);
	};

	return (
		<Link href={href} onClick={onClick} {...rest}>
			{children}
		</Link>
	);
}
