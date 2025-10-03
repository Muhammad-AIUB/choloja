"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Users, Bed, Maximize, Clock } from "lucide-react";
import { Room } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RoomCardProps {
    room: Room;
    onBookingClick: (room: Room) => void;
}

export function RoomCard({ room, onBookingClick }: RoomCardProps) {
    const t = useTranslations("HotelDetail");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePreviousImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? room.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === room.images.length - 1 ? 0 : prev + 1
        );
    };

    const getAvailabilityBadge = () => {
        switch (room.availability) {
            case "soldout":
                return (
                    <Badge
                        variant="destructive"
                        className="absolute top-2 right-2"
                    >
                        {t("soldOut")}
                    </Badge>
                );
            case "limited":
                return (
                    <Badge
                        variant="secondary"
                        className="absolute top-2 right-2 bg-yellow-500 text-white"
                    >
                        {t("limitedRooms", { count: room.remainingRooms || 0 })}
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-5 gap-4">
                {/* Room Image Gallery */}
                <div className="md:col-span-2 relative h-64 md:h-auto">
                    <Image
                        src={
                            room.images[currentImageIndex] || "/placeholder.jpg"
                        }
                        alt={room.name}
                        fill
                        className="object-cover"
                    />
                    {getAvailabilityBadge()}

                    {room.images.length > 1 && (
                        <>
                            <button
                                onClick={handlePreviousImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                aria-label="Previous image"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                aria-label="Next image"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                {currentImageIndex + 1}/{room.images.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Room Details */}
                <div className="md:col-span-3 p-4 flex flex-col justify-between">
                    <div>
                        {/* Room Name & Discount Badge */}
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">
                                {room.name}
                            </h3>
                            {room.discount && (
                                <Badge variant="destructive" className="ml-2">
                                    {room.discount}
                                </Badge>
                            )}
                        </div>

                        {/* Room Description */}
                        <p className="text-gray-600 text-sm mb-4">
                            {room.description}
                        </p>

                        {/* Room Specs */}
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>
                                    {t("capacity")}:{" "}
                                    {t("standardPerson", {
                                        count: room.capacity.standard,
                                    })}{" "}
                                    /{" "}
                                    {t("maxPerson", {
                                        count: room.capacity.max,
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Bed className="w-4 h-4" />
                                <span>{room.bedType}</span>
                            </div>
                            {room.size && (
                                <div className="flex items-center gap-1">
                                    <Maximize className="w-4 h-4" />
                                    <span>{room.size}㎡</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                    {t("checkIn")} {room.checkInTime} /{" "}
                                    {t("checkOut")} {room.checkOutTime}
                                </span>
                            </div>
                        </div>

                        {/* Room Amenities */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities
                                .slice(0, 5)
                                .map((amenity, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        {amenity}
                                    </Badge>
                                ))}
                            {room.amenities.length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                    +{room.amenities.length - 5}
                                </Badge>
                            )}
                        </div>

                        {/* Packages */}
                        {room.packages && room.packages.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {room.packages.map((pkg) => (
                                    <div
                                        key={pkg.id}
                                        className="border rounded p-2 text-sm"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold">
                                                {pkg.name}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {pkg.originalPrice && (
                                                    <span className="line-through text-gray-400 text-xs">
                                                        {pkg.originalPrice}
                                                    </span>
                                                )}
                                                <span className="font-bold text-blue-600">
                                                    {pkg.price}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-xs">
                                            {pkg.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Cancellation Policy */}
                        <p className="text-xs text-gray-500">
                            {room.cancellationPolicy}
                        </p>
                    </div>

                    {/* Pricing & Booking */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div>
                            {room.originalPrice && (
                                <p className="text-sm text-gray-400 line-through">
                                    {room.originalPrice}
                                </p>
                            )}
                            <p className="text-2xl font-bold text-blue-600">
                                {room.price}
                                <span className="text-sm font-normal text-gray-600">
                                    {" "}
                                    / {t("perNight")}
                                </span>
                            </p>
                        </div>
                        <Button
                            onClick={() => onBookingClick(room)}
                            disabled={room.availability === "soldout"}
                            size="lg"
                            className="min-w-[120px]"
                        >
                            {room.availability === "soldout"
                                ? t("soldOut")
                                : t("bookNow")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
