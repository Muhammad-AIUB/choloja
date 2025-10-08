import { NextRequest, NextResponse } from "next/server";
import { BookingRepository } from "@/lib/infrastructure/repositories/BookingRepository";
import { verifyToken } from "@/lib/infrastructure/auth/jwt";

// GET single booking
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { success: false, error: "Invalid token" },
                { status: 401 }
            );
        }

        const bookingRepository = new BookingRepository();
        const booking = await bookingRepository.findById(id);

        if (!booking) {
            return NextResponse.json(
                { success: false, error: "Booking not found" },
                { status: 404 }
            );
        }

        // Verify ownership
        if (booking.userId !== decoded.userId && decoded.role !== "admin") {
            return NextResponse.json(
                { success: false, error: "Forbidden" },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            data: booking,
        });
    } catch (error: unknown) {
        console.error("Get booking error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch booking",
            },
            { status: 500 }
        );
    }
}

// PATCH - Cancel booking
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const authHeader = req.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { success: false, error: "Invalid token" },
                { status: 401 }
            );
        }

        const bookingRepository = new BookingRepository();
        const booking = await bookingRepository.findById(id);

        if (!booking) {
            return NextResponse.json(
                { success: false, error: "Booking not found" },
                { status: 404 }
            );
        }

        // Verify ownership
        if (booking.userId !== decoded.userId && decoded.role !== "admin") {
            return NextResponse.json(
                { success: false, error: "Forbidden" },
                { status: 403 }
            );
        }

        // Check if booking can be cancelled
        if (booking.status === "cancelled") {
            return NextResponse.json(
                { success: false, error: "Booking is already cancelled" },
                { status: 400 }
            );
        }

        if (booking.status === "completed") {
            return NextResponse.json(
                { success: false, error: "Cannot cancel completed booking" },
                { status: 400 }
            );
        }

        // Check cancellation policy (24 hours before check-in)
        const checkInDate = new Date(booking.bookingDetails.checkInDate);
        const now = new Date();
        const hoursUntilCheckIn = (checkInDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (hoursUntilCheckIn < 24) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: "Cannot cancel within 24 hours of check-in" 
                },
                { status: 400 }
            );
        }

        // Cancel the booking
        const updatedBooking = await bookingRepository.cancel(id);

        return NextResponse.json({
            success: true,
            data: updatedBooking,
            message: "Booking cancelled successfully"
        });
    } catch (error: unknown) {
        console.error("Cancel booking error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to cancel booking",
            },
            { status: 500 }
        );
    }
}

