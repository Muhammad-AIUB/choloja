import { NextRequest, NextResponse } from "next/server";
import { BookingRepository } from "@/lib/infrastructure/repositories/BookingRepository";
import { CreateBookingUseCase } from "@/lib/application/use-cases/booking/CreateBooking.usecase";
import { verifyToken } from "@/lib/infrastructure/auth/jwt";

// GET user bookings
export async function GET(req: NextRequest) {
    try {
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

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const status = searchParams.get("status") || undefined;

        const bookingRepository = new BookingRepository();
        const result = await bookingRepository.findAll({
            userId: decoded.userId,
            status,
            page,
            limit,
        });

        return NextResponse.json({
            success: true,
            data: {
                bookings: result.data,
                pagination: result.pagination,
            },
        });
    } catch (error: unknown) {
        console.error("Get bookings error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch bookings",
            },
            { status: 500 }
        );
    }
}

// POST create booking
export async function POST(req: NextRequest) {
    try {
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

        const body = await req.json();
        
        const bookingRepository = new BookingRepository();
        const createBookingUseCase = new CreateBookingUseCase(bookingRepository);
        
        const booking = await createBookingUseCase.execute(body, decoded.userId);

        return NextResponse.json(
            {
                success: true,
                data: {
                    bookingId: booking.id,
                    bookingNumber: booking.bookingNumber,
                    confirmationCode: booking.confirmationCode,
                    status: booking.status,
                    pricing: booking.pricing,
                    paymentStatus: booking.paymentInfo.status,
                    createdAt: booking.createdAt,
                },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Create booking error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to create booking",
            },
            { status: 400 }
        );
    }
}

