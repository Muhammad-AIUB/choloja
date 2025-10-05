"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Banner {
    id: string;
    imageUrl: string;
    title: string;
    link?: string;
}

interface BannerCarouselProps {
    banners: Banner[];
}

export function BannerCarousel({
    banners,
}: BannerCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative overflow-hidden rounded-2xl">
            {/* Main Banner */}
            <div className="relative aspect-[16/6] w-full md:aspect-[21/6]">
                <Image
                    src={banners[currentIndex].imageUrl}
                    alt={banners[currentIndex].title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-8 left-8 text-white">
                    <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                        {banners[currentIndex].title}
                    </h2>
                </div>
            </div>

            {/* Navigation Buttons */}
            <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={goToPrevious}
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={goToNext}
            >
                <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                            index === currentIndex
                                ? "w-8 bg-white"
                                : "w-2 bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Current Position Badge */}
            <Badge className="absolute right-4 top-4 bg-black/50 text-white backdrop-blur-sm">
                {currentIndex + 1} / {banners.length}
            </Badge>
        </div>
    );
}
