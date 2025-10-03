"use client";

import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    ChevronRight as ArrowRight,
} from "lucide-react";
import { useRef } from "react";
import { ListingCard } from "./ListingCard";
import Link from "next/link";

interface Listing {
    id: string;
    title: string;
    location: string;
    imageUrl: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    rating?: number;
    reviewCount?: number;
    category?: string;
    isFeatured?: boolean;
}

interface ListingSectionProps {
    title: string;
    subtitle?: string;
    listings: Listing[];
    viewAllLink?: string;
}

export function ListingSection({
    title,
    subtitle,
    listings,
    viewAllLink,
}: ListingSectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = direction === "left" ? -400 : 400;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-1 text-sm text-gray-600 md:text-base">
                            {subtitle}
                        </p>
                    )}
                </div>
                {viewAllLink && (
                    <Link href={viewAllLink}>
                        <Button variant="ghost" className="group">
                            전체보기
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                )}
            </div>

            {/* Scrollable Container */}
            <div className="relative">
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white shadow-lg hover:bg-gray-50 md:flex"
                    onClick={() => scroll("left")}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white shadow-lg hover:bg-gray-50 md:flex"
                    onClick={() => scroll("right")}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </div>
        </div>
    );
}
