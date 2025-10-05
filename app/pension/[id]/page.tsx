"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Star,
    ChevronLeft,
    Heart,
    Share2,
    Wifi,
    Car,
    UtensilsCrossed,
    Dumbbell,
    Waves,
    Coffee,
    Users,
    Clock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AccommodationGallery } from "@/components/accommodation/AccommodationGallery";
import { RoomCard } from "@/components/accommodation/RoomCard";
import { ReviewsSection } from "@/components/accommodation/ReviewsSection";
import { useAccommodationDetail } from "@/lib/hooks/useAccommodationDetail";

export default function PensionDetailPage() {
    const params = useParams();
    const t = useTranslations("HotelDetail");
    const accommodationId = params.id as string;

    const { accommodation, loading } = useAccommodationDetail(accommodationId);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: "",
        checkOut: "",
    });

    if (loading) {
        return (
            <Container className="py-8">
                <div className="animate-pulse">
                    <div className="h-8 w-32 bg-gray-200 rounded mb-4" />
                    <div className="h-96 bg-gray-200 rounded-xl mb-8" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-48 bg-gray-200 rounded-xl"
                            />
                        ))}
                    </div>
                </div>
            </Container>
        );
    }

    if (!accommodation) {
        return (
            <Container className="py-8">
                <div className="text-center py-16">
                    <h1 className="text-2xl font-bold mb-4">{t("notFound")}</h1>
                    <Link href="/">
                        <Button>{t("backToHome")}</Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <Container className="py-4">
                <Link href="/">
                    <Button variant="ghost" size="sm">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        {t("back")}
                    </Button>
                </Link>
            </Container>

            {/* Gallery */}
            <Container className="mb-8">
                <AccommodationGallery
                    images={accommodation.images}
                    title={accommodation.title}
                />
            </Container>

            {/* Main Content */}
            <Container>
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2">
                        {/* Title & Info */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">
                                        {accommodation.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>
                                                {accommodation.location}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold">
                                                {accommodation.rating}
                                            </span>
                                            <span>
                                                (
                                                {accommodation.reviewCount.toLocaleString()}{" "}
                                                {t("reviews")})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {accommodation.badges.map(
                                    (badge: string, index: number) => (
                                        <Badge key={index} variant="secondary">
                                            {badge}
                                        </Badge>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                {t("aboutProperty")}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {accommodation.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                {t("amenities")}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {accommodation.amenities.map(
                                    (amenity: {
                                        id: string;
                                        name: string;
                                        icon: string;
                                    }) => (
                                        <div
                                            key={amenity.id}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="h-10 w-10 rounded-lg bg-pink-50 flex items-center justify-center">
                                                {getAmenityIcon(amenity.icon)}
                                            </div>
                                            <span className="text-sm font-medium">
                                                {amenity.name}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Rooms */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-6">
                                {t("availableRooms")}
                            </h2>
                            <div className="space-y-4">
                                {accommodation.rooms.map((room) => (
                                    <RoomCard
                                        key={room.id}
                                        room={room}
                                        onBookingClick={() => {
                                            console.log("Booking room:", room);
                                            // TODO: Open booking modal
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-6">
                                {t("reviews")}
                            </h2>
                            <ReviewsSection
                                overallRating={accommodation.rating}
                                reviews={accommodation.reviews}
                                aiSummary={accommodation.aiReviewSummary}
                            />
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                {t("location")}
                            </h2>
                            <div className="mb-4">
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-gray-600 mt-0.5" />
                                    <span className="text-gray-600">
                                        {accommodation.address}
                                    </span>
                                </div>
                            </div>
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    {t("mapPlaceholder")}
                                </div>
                            </div>
                        </div>

                        {/* Check-in Info */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                {t("checkInOut")}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            {t("checkIn")}
                                        </p>
                                        <p className="font-semibold">
                                            {accommodation.checkInTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            {t("checkOut")}
                                        </p>
                                        <p className="font-semibold">
                                            {accommodation.checkOutTime}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-xl p-6 shadow-lg">
                            <div className="mb-6">
                                <div className="text-3xl font-bold text-pink-600 mb-1">
                                    {accommodation.priceRange}
                                </div>
                                <p className="text-sm text-gray-600">
                                    {t("perNight")}
                                </p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        {t("checkIn")}
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        value={selectedDate.checkIn}
                                        onChange={(e) =>
                                            setSelectedDate({
                                                ...selectedDate,
                                                checkIn: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        {t("checkOut")}
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        value={selectedDate.checkOut}
                                        onChange={(e) =>
                                            setSelectedDate({
                                                ...selectedDate,
                                                checkOut: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                                {t("checkAvailability")}
                            </Button>

                            <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Star className="h-4 w-4" />
                                    <span>{t("freeCancellation")}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Star className="h-4 w-4" />
                                    <span>{t("instantConfirmation")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

function getAmenityIcon(iconName: string) {
    const iconClass = "h-5 w-5 text-pink-600";
    const icons: Record<string, React.ReactElement> = {
        Wifi: <Wifi className={iconClass} />,
        Car: <Car className={iconClass} />,
        Utensils: <UtensilsCrossed className={iconClass} />,
        Dumbbell: <Dumbbell className={iconClass} />,
        Waves: <Waves className={iconClass} />,
        Coffee: <Coffee className={iconClass} />,
        Bell: <Wifi className={iconClass} />,
        User: <Users className={iconClass} />,
    };
    return icons[iconName] || <Wifi className={iconClass} />;
}
