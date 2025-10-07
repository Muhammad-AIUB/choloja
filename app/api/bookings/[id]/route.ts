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

