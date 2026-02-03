"use client";

import Image from "next/image";
import React, { useState } from "react";

type Props = {
	src: string;
	alt?: string;
	link?: string;
	priority?: boolean;
	className?: string;
};

const EnhancedImageCard: React.FC<Props> = ({
	src,
	alt = "",
	link = "#",
	priority = false,
	className = "",
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`rounded-lg z-20 ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<a href={link} className="block w-full h-full">
				<div
					className={`relative w-full h-full transition-all duration-300 ease-out ${isHovered ? "scale-110" : "scale-100"
						}`}
				>
					<Image
						src={src}
						alt={alt}
						fill
						sizes="(max-width: 768px) 100vw, 50vw"
						quality={90}
						priority={priority}
						className="object-cover rounded-lg shadow-lg"
					/>
				</div>
			</a>
		</div>
	);
};

export default EnhancedImageCard;
