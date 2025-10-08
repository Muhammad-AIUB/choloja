"use client";

import { Container } from "@/components/ui/container";
import NextImage from "next/image";
import { useEffect, useState } from "react";

// Beautiful beach hotel images
const beachHotelImages = [
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&h=1080&fit=crop&q=80",
];

export function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Preload first image
        const img = new Image();
        img.src = beachHotelImages[0];
        img.onload = () => setIsLoaded(true);

        // Auto change images every 5 seconds
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % beachHotelImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[600px] md:h-[700px] overflow-hidden">
            {/* Background Images Slideshow */}
            {beachHotelImages.map((image, index) => (
                <div
                    key={image}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
                >
                    <NextImage
                        src={image}
                        alt={`Beach Resort ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        quality={90}
                    />
                </div>
            ))}

            {/* Loading State */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 animate-pulse" />
            )}

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10" />

            {/* Hero Content */}
            <div className="relative h-full flex items-center z-10">
                <Container>
                        <div className="max-w-4xl mx-auto text-center text-white">
                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                <span className="block text-white drop-shadow-2xl">
                                    Discover Your Dream
                                </span>
                                <span className="block mt-2 bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                                    Resorts & Hotels
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-white font-semibold drop-shadow-2xl">
                                Luxury Stays by the Ocean
                            </p>
                            <p className="text-lg md:text-xl text-white drop-shadow-lg max-w-3xl mx-auto">
                                Experience breathtaking ocean views, world-class amenities, and unforgettable stays
                            </p>
                        </div>
                </Container>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-white rounded-full animate-scroll" />
                </div>
            </div>
        </div>
    );
}

