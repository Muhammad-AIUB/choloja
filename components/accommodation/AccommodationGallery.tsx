"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface AccommodationGalleryProps {
    images: string[];
    title: string;
}

export function AccommodationGallery({
    images,
    title,
}: AccommodationGalleryProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") goToPrevious();
        if (e.key === "ArrowRight") goToNext();
    };

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-4 gap-2 h-[400px] overflow-hidden rounded-lg">
                {/* Main Image */}
                <button
                    onClick={() => openLightbox(0)}
                    className="col-span-2 row-span-2 relative group overflow-hidden"
                >
                    <Image
                        src={images[0] || "/placeholder.jpg"}
                        alt={`${title} - Main`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </button>

                {/* Secondary Images */}
                {images.slice(1, 5).map((image, index) => (
                    <button
                        key={index}
                        onClick={() => openLightbox(index + 1)}
                        className="relative group overflow-hidden"
                    >
                        <Image
                            src={image}
                            alt={`${title} - ${index + 2}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {index === 3 && images.length > 5 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                                +{images.length - 5} photos
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                    onKeyDown={handleKeyDown}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery"
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors z-10"
                        aria-label="Close gallery"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Previous Button */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors z-10"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Image */}
                    <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto">
                        <Image
                            src={images[currentImageIndex]}
                            alt={`${title} - ${currentImageIndex + 1}`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        className="absolute right-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors z-10"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
                        {currentImageIndex + 1} / {images.length}
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                                    index === currentImageIndex
                                        ? "ring-2 ring-white"
                                        : "opacity-60"
                                }`}
                            >
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
