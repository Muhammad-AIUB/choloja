"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { BookingStepIndicator } from "@/components/booking/BookingStepIndicator";
import { GuestInfoForm } from "@/components/booking/GuestInfoForm";
import { PaymentForm } from "@/components/booking/PaymentForm";
import { useAccommodationDetail } from "@/lib/hooks/useAccommodationDetail";
import {
    GuestInfo,
    PaymentInfo,
    BookingDetails,
    PricingBreakdown,
} from "@/types";
import { Calendar, Users, MapPin } from "lucide-react";

const BOOKING_STEPS = [
    { id: 1, name: "Details", description: "Booking details" },
    { id: 2, name: "Guest Info", description: "Your information" },
    { id: 3, name: "Payment", description: "Complete booking" },
];

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const accommodationId = params.accommodationId as string;
    const roomId = params.roomId as string;

    const [currentStep, setCurrentStep] = useState(2); // Start at guest info
    const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);

    // Fetch accommodation data
    const { accommodation, loading } = useAccommodationDetail(accommodationId);
    const room = accommodation?.rooms.find((r) => r.id === roomId);

    // Calculate booking details
    const roomPricePerNight = room ? parseInt(room.price.replace(/[^0-9]/g, "")) : 0;
    const nights = 3; // Default, could come from URL params
    const subtotal = roomPricePerNight * nights;
    const tax = Math.round(subtotal * 0.1);
    const serviceFee = Math.round(subtotal * 0.05);
    const total = subtotal + tax + serviceFee;

    const bookingDetails: BookingDetails = {
        accommodationId: accommodationId,
        accommodationName: accommodation?.title || "Loading...",
        roomId: roomId,
        roomName: room?.name || "Loading...",
        checkInDate: "2025-10-15",
        checkOutDate: "2025-10-18",
        nights: nights,
        guests: {
            adults: 2,
            children: 0,
        },
        guestInfo: guestInfo || {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            countryCode: "+82",
        },
    };

    const pricing: PricingBreakdown = {
        roomPrice: roomPricePerNight,
        nights: nights,
        subtotal,
        tax,
        serviceFee,
        total,
        currency: "KRW",
    };

    const handleGuestInfoSubmit = (info: GuestInfo) => {
        setGuestInfo(info);
        setCurrentStep(3);
    };

    const handlePaymentSubmit = (paymentInfo: PaymentInfo) => {
        // In real app, would make API call to process payment
        console.log("Processing payment:", {
            bookingDetails: { ...bookingDetails, guestInfo },
            paymentInfo,
            pricing,
        });

        // Generate booking ID and redirect to confirmation
        const bookingId = "BK" + Date.now();
        router.push(`/booking/confirmation/${bookingId}`);
    };

    if (!accommodation || !room) {
        return (
            <Container className="py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Accommodation or room not found
                    </h1>
                    <button
                        onClick={() => router.push("/")}
                        className="text-pink-600 hover:underline"
                    >
                        Return to home
                    </button>
                </div>
            </Container>
        );
    }

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <Container>
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 w-64 bg-gray-200 rounded" />
                        <div className="h-96 bg-gray-200 rounded-xl" />
                    </div>
                </Container>
            </div>
        );
    }

    // Show error if accommodation or room not found
    if (!accommodation || !room) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <Container>
                    <div className="bg-white rounded-xl p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Room Not Found</h2>
                        <p className="text-gray-600 mb-6">
                            The room you&apos;re trying to book doesn&apos;t exist or is no longer available.
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
                        >
                            Back to Home
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Container>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Complete Your Booking
                    </h1>
                    <p className="text-gray-600">
                        Just a few more steps to confirm your reservation
                    </p>
                </div>

                {/* Step Indicator */}
                <BookingStepIndicator
                    currentStep={currentStep}
                    steps={BOOKING_STEPS}
                />

                {/* Booking Summary */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                            <div
                                style={{
                                    backgroundImage: `url(${room.images[0]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                className="w-full h-full"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold mb-1">
                                {room.name}
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <MapPin className="h-4 w-4" />
                                <span>{accommodation.title}</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="text-gray-500">Check-in</p>
                                        <p className="font-medium">
                                            {bookingDetails.checkInDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="text-gray-500">
                                            Check-out
                                        </p>
                                        <p className="font-medium">
                                            {bookingDetails.checkOutDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <p className="text-gray-500">Guests</p>
                                        <p className="font-medium">
                                            {bookingDetails.guests.adults} Adults
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="md:text-right">
                            <p className="text-sm text-gray-500 mb-1">
                                Total Price
                            </p>
                            <p className="text-2xl font-bold text-pink-600">
                                {pricing.total.toLocaleString()}원
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {pricing.nights} nights
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step Content */}
                {currentStep === 2 && (
                    <GuestInfoForm
                        onSubmit={handleGuestInfoSubmit}
                        onBack={() => router.back()}
                        initialData={guestInfo || undefined}
                    />
                )}

                {currentStep === 3 && (
                    <PaymentForm
                        pricing={pricing}
                        onSubmit={handlePaymentSubmit}
                        onBack={() => setCurrentStep(2)}
                    />
                )}
            </Container>
        </div>
    );
}

