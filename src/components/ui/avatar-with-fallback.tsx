"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarWithFallbackProps {
    src: string;
    alt: string;
    name: string;
    size?: number;
    className?: string;
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function getColorFromName(name: string): string {
    const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500",
        "bg-orange-500",
        "bg-cyan-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}

export function AvatarWithFallback({
    src,
    alt,
    name,
    size = 48,
    className = "",
}: AvatarWithFallbackProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        // Show initials fallback
        return (
            <div
                className={`flex items-center justify-center rounded-full text-white font-semibold ${getColorFromName(name)} ${className}`}
                style={{ width: size, height: size, fontSize: size * 0.4 }}
            >
                {getInitials(name)}
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className={`rounded-full object-cover ${className}`}
            unoptimized
            onError={() => setHasError(true)}
        />
    );
}
