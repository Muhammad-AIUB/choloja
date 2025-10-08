"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CancelBookingModal } from "@/components/booking/CancelBookingModal";
import {
    Calendar,
    MapPin,
    ChevronRight,
    Clock,
    Filter,
    Search,
    XCircle,
} from "lucide-react";

type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

interface UserBooking {
    id: string;
    bookingNumber: string;
    status: BookingStatus;
    accommodation: {
        name: string;
        location: string;
        image: string;
    };
    room: {
        name: string;
    };
    checkIn: string;
    checkOut: string;
    nights: number;
    guests: number;
    total: number;
    createdAt: string;
}

const mockBookings: UserBooking[] = [
    {
        id: "BK1728123456",
        bookingNumber: "NOL-BK1728123456",
        status: "confirmed",
        accommodation: {
            name: "Grand Seoul Luxury Hotel",
            location: "Seoul, Gangnam-gu",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        },
        room: {
            name: "Deluxe Double Room",
        },
        checkIn: "2025-10-15",
        checkOut: "2025-10-18",
        nights: 3,
        guests: 2,
        total: 940000,
        createdAt: "2025-10-07",
    },
    {
        id: "BK1728023456",
        bookingNumber: "NOL-BK1728023456",
        status: "completed",
        accommodation: {
            name: "Jeju Ocean View Resort & Spa",
            location: "Jeju Island, Seogwipo",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
        },
        room: {
            name: "Ocean View Double Room",
        },
        checkIn: "2025-09-20",
        checkOut: "2025-09-23",
        nights: 3,
        guests: 2,
        total: 540000,
        createdAt: "2025-09-15",
    },
    {
        id: "BK1727923456",
        bookingNumber: "NOL-BK1727923456",
        status: "cancelled",
        accommodation: {
            name: "Busan Central Business Hotel",
            location: "Busan, Haeundae-gu",
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
        },
        room: {
            name: "Superior Business Room",
        },
        checkIn: "2025-09-10",
        checkOut: "2025-09-12",
        nights: 2,
        guests: 1,
        total: 300000,
        createdAt: "2025-09-05",
    },
];

export default function BookingsPage() {
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<UserBooking | null>(null);
    const [bookings, setBookings] = useState<UserBooking[]>(mockBookings);

    const filteredBookings = bookings.filter((booking) => {
        const matchesStatus =
            selectedStatus === "all" || booking.status === selectedStatus;
        const matchesSearch =
            booking.accommodation.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            booking.bookingNumber
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleCancelClick = (booking: UserBooking, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedBookingForCancel(booking);
        setIsCancelModalOpen(true);
    };

    const handleCancelBooking = async () => {
        if (!selectedBookingForCancel) return;

        try {
            // In real app, would call API to cancel booking
            // const response = await fetch(`/api/bookings/${selectedBookingForCancel.id}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //     },
            // });
            // if (!response.ok) throw new Error('Failed to cancel booking');
            
            // Update local state
            setBookings(prevBookings =>
                prevBookings.map(b =>
                    b.id === selectedBookingForCancel.id
                        ? { ...b, status: "cancelled" as const }
                        : b
                )
            );

            setIsCancelModalOpen(false);
            setSelectedBookingForCancel(null);
        } catch (error) {
            throw error;
        }
    };

    const getStatusBadge = (status: BookingStatus) => {
        const variants = {
            confirmed: "bg-green-100 text-green-700 border-green-300",
            pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
            cancelled: "bg-red-100 text-red-700 border-red-300",
            completed: "bg-gray-100 text-gray-700 border-gray-300",
        };

        const labels = {
            confirmed: "Confirmed",
            pending: "Pending",
            cancelled: "Cancelled",
            completed: "Completed",
        };

        return (
            <Badge className={variants[status]}>{labels[status]}</Badge>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Container>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
                    <p className="text-gray-600">
                        Manage and view your accommodation reservations
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by hotel name or booking number..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <select
                                value={selectedStatus}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                            >
                                <option value="all">All Bookings</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                        <div className="max-w-md mx-auto">
                            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">
                                No bookings found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {searchQuery || selectedStatus !== "all"
                                    ? "Try adjusting your filters"
                                    : "Start planning your next adventure!"}
                            </p>
                            <Link href="/">
                                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                                    Browse Accommodations
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="relative">
                                <Link href={`/booking/confirmation/${booking.id}`}>
                                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        {/* Image */}
                                        <div className="md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                            <div
                                                style={{
                                                    backgroundImage: `url(${booking.accommodation.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                                className="w-full h-full"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold mb-1">
                                                        {
                                                            booking
                                                                .accommodation
                                                                .name
                                                        }
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>
                                                            {
                                                                booking
                                                                    .accommodation
                                                                    .location
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                {getStatusBadge(
                                                    booking.status
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                                                <div>
                                                    <p className="text-gray-500">
                                                        Room
                                                    </p>
                                                    <p className="font-medium">
                                                        {booking.room.name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">
                                                        Check-in
                                                    </p>
                                                    <p className="font-medium">
                                                        {booking.checkIn}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">
                                                        Check-out
                                                    </p>
                                                    <p className="font-medium">
                                                        {booking.checkOut}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">
                                                        Nights
                                                    </p>
                                                    <p className="font-medium">
                                                        {booking.nights}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        <span>
                                                            Booked on{" "}
                                                            {booking.createdAt}
                                                        </span>
                                                    </div>
                                                    <div className="hidden md:block">
                                                        •
                                                    </div>
                                                    <span className="hidden md:block">
                                                        {booking.bookingNumber}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-500">
                                                        Total
                                                    </p>
                                                    <p className="text-lg font-bold text-pink-600">
                                                        {booking.total.toLocaleString()}
                                                        원
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        <div className="hidden md:flex items-center">
                                            <ChevronRight className="h-6 w-6 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Cancel Button (outside Link, positioned absolutely) */}
                            {booking.status === "confirmed" && (
                                <div className="absolute bottom-6 right-6 z-10">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={(e) => handleCancelClick(booking, e)}
                                        className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-500 shadow-sm"
                                    >
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                        ))}
                    </div>
                )}

                {/* Cancel Booking Modal */}
                {selectedBookingForCancel && (
                    <CancelBookingModal
                        isOpen={isCancelModalOpen}
                        onClose={() => {
                            setIsCancelModalOpen(false);
                            setSelectedBookingForCancel(null);
                        }}
                        onConfirm={handleCancelBooking}
                        bookingNumber={selectedBookingForCancel.bookingNumber}
                        hotelName={selectedBookingForCancel.accommodation.name}
                    />
                )}
            </Container>
        </div>
    );
}

