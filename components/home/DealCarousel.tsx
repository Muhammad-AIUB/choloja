"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Deal {
    id: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    price?: string;
    originalPrice?: string;
    discount?: string;
    badge?: string;
}

interface DealCarouselProps {
    deals: Deal[];
    title?: string;
}

export function DealCarousel({ deals, title }: DealCarouselProps) {
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
        <div className="relative">
            {title && (
                <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
                    {title}
                </h2>
            )}

            <div className="relative">
                {/* Navigation Buttons */}
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

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {deals.map((deal) => (
                        <Link key={deal.id} href={`/leisure/${deal.id}`}>
                            <Card className="group min-w-[280px] flex-shrink-0 cursor-pointer overflow-hidden transition-all hover:shadow-xl md:min-w-[320px]">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={deal.imageUrl}
                                        alt={deal.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-110"
                                    />
                                    {deal.badge && (
                                        <Badge className="absolute left-3 top-3 bg-pink-500 text-white">
                                            {deal.badge}
                                        </Badge>
                                    )}
                                    {deal.discount && (
                                        <Badge className="absolute right-3 top-3 bg-red-500 text-white">
                                            {deal.discount}
                                        </Badge>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="mb-1 line-clamp-2 font-semibold text-gray-900">
                                        {deal.title}
                                    </h3>
                                    {deal.subtitle && (
                                        <p className="mb-2 line-clamp-1 text-sm text-gray-600">
                                            {deal.subtitle}
                                        </p>
                                    )}
                                    {deal.price && (
                                        <div className="flex items-center gap-2">
                                            {deal.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    {deal.originalPrice}
                                                </span>
                                            )}
                                            <span className="text-lg font-bold text-pink-600">
                                                {deal.price}
                                            </span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
