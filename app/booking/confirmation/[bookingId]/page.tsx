"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CancelBookingModal } from "@/components/booking/CancelBookingModal";
import {
    CheckCircle,
    Calendar,
    MapPin,
    Users,
    Mail,
    Phone,
    Download,
    Share2,
    XCircle,
} from "lucide-react";

export default function BookingConfirmationPage() {
    const params = useParams();
    const router = useRouter();
    const bookingId = params.bookingId as string;
    
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [bookingStatus, setBookingStatus] = useState<"confirmed" | "cancelled">("confirmed");

    // Mock booking data (in real app, would fetch from API)
    const booking = {
        id: bookingId,
        bookingNumber: `NOL-${bookingId}`,
        confirmationCode: "ABC123XYZ",
        status: "confirmed" as const,
        accommodation: {
            name: "Grand Seoul Luxury Hotel",
            address: "123 Teheran-ro, Gangnam-gu, Seoul",
            phone: "+82-2-1234-5678",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        },
        room: {
            name: "Deluxe Double Room",
            bedType: "1 King Bed",
        },
        checkIn: "2025-10-15",
        checkOut: "2025-10-18",
        nights: 3,
        guests: {
            adults: 2,
            children: 0,
        },
        guestInfo: {
            name: "Kim Min Jun",
            email: "minjun@example.com",
            phone: "+82-10-1234-5678",
        },
        pricing: {
            total: 940000,
            currency: "KRW",
        },
        createdAt: new Date().toISOString(),
    };

    const handleCancelBooking = async () => {
        try {
            // In real app, would call API to cancel booking
            // const response = await fetch(`/api/bookings/${bookingId}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //     },
            // });
            // if (!response.ok) throw new Error('Failed to cancel booking');
            
            setBookingStatus("cancelled");
            // Show success message or redirect
            setTimeout(() => {
                router.push("/bookings");
            }, 2000);
        } catch (error) {
            throw error;
        }
    };

    const canCancel = bookingStatus === "confirmed";

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <Container className="max-w-4xl">
                {/* Success Header */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center mb-8">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold mb-2">
                        Booking Confirmed!
                    </h1>
                    <p className="text-pink-100 text-lg">
                        Your reservation has been successfully processed
                    </p>
                </div>

                {/* Booking Details Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                    {/* Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Booking Number
                                </p>
                                <p className="text-2xl font-bold">
                                    {booking.bookingNumber}
                                </p>
                            </div>
                            {bookingStatus === "confirmed" ? (
                                <Badge className="bg-green-100 text-green-700 border-green-300">
                                    Confirmed
                                </Badge>
                            ) : (
                                <Badge className="bg-red-100 text-red-700 border-red-300">
                                    Cancelled
                                </Badge>
                            )}
                        </div>
                        <div className="mt-3">
                            <p className="text-sm text-gray-500">
                                Confirmation Code
                            </p>
                            <p className="text-lg font-mono font-bold text-pink-600">
                                {booking.confirmationCode}
                            </p>
                        </div>
                    </div>

                    {/* Accommodation Info */}
                    <div className="p-6 border-b">
                        <div className="flex gap-4">
                            <div
                                style={{
                                    backgroundImage: `url(${booking.accommodation.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                className="w-32 h-32 rounded-lg"
                            />
                            <div className="flex-1">
                                <h2 className="text-xl font-bold mb-2">
                                    {booking.accommodation.name}
                                </h2>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 mt-0.5" />
                                        <span>
                                            {booking.accommodation.address}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4" />
                                        <span>
                                            {booking.accommodation.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-6 border-b">
                        <h3 className="font-bold mb-4">Reservation Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Room Type
                                </p>
                                <p className="font-medium">
                                    {booking.room.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {booking.room.bedType}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Guests
                                </p>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <p className="font-medium">
                                        {booking.guests.adults} Adults
                                        {booking.guests.children > 0 &&
                                            `, ${booking.guests.children} Children`}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Check-in
                                </p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <p className="font-medium">
                                        {booking.checkIn}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Check-out
                                </p>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <p className="font-medium">
                                        {booking.checkOut}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guest Information */}
                    <div className="p-6 border-b">
                        <h3 className="font-bold mb-4">Guest Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span>{booking.guestInfo.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span>{booking.guestInfo.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span>{booking.guestInfo.phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-6">
                        <h3 className="font-bold mb-4">Payment Summary</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Paid</span>
                            <span className="text-2xl font-bold text-pink-600">
                                {booking.pricing.total.toLocaleString()}원
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {booking.nights} nights • Payment completed on{" "}
                            {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Download Confirmation
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                    >
                        <Share2 className="h-4 w-4" />
                        Share Booking
                    </Button>
                </div>

                {/* Cancel Booking Button */}
                {canCancel && (
                    <div className="mb-8">
                        <Button
                            variant="outline"
                            onClick={() => setIsCancelModalOpen(true)}
                            className="w-full flex items-center justify-center gap-2 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-500"
                        >
                            <XCircle className="h-4 w-4" />
                            Cancel Booking
                        </Button>
                    </div>
                )}

                {/* Cancelled Message */}
                {bookingStatus === "cancelled" && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <XCircle className="h-6 w-6 text-red-600" />
                            <h3 className="font-bold text-red-900">Booking Cancelled</h3>
                        </div>
                        <p className="text-sm text-red-800">
                            Your booking has been cancelled successfully. Refund will be processed within 5-7 business days.
                        </p>
                    </div>
                )}

                {/* Important Information */}
                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-blue-900 mb-3">
                        Important Information
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                        <li>
                            ✓ A confirmation email has been sent to{" "}
                            {booking.guestInfo.email}
                        </li>
                        <li>
                            ✓ Please present your confirmation code at check-in
                        </li>
                        <li>
                            ✓ Check-in time: 15:00 | Check-out time: 11:00
                        </li>
                        <li>
                            ✓ Free cancellation up to 24 hours before check-in
                        </li>
                    </ul>
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                    <Link href="/bookings" className="flex-1">
                        <Button variant="outline" className="w-full">
                            View My Bookings
                        </Button>
                    </Link>
                    <Link href="/" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Cancel Booking Modal */}
                <CancelBookingModal
                    isOpen={isCancelModalOpen}
                    onClose={() => setIsCancelModalOpen(false)}
                    onConfirm={handleCancelBooking}
                    bookingNumber={booking.bookingNumber}
                    hotelName={booking.accommodation.name}
                />
            </Container>
        </div>
    );
}

