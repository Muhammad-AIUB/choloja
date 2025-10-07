import { NextRequest, NextResponse } from "next/server";
import { AccommodationRepository } from "@/lib/infrastructure/repositories/AccommodationRepository";
import { CreateAccommodationUseCase } from "@/lib/application/use-cases/accommodation/CreateAccommodation.usecase";
import { verifyToken } from "@/lib/infrastructure/auth/jwt";

// GET all accommodations
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const city = searchParams.get("city") || undefined;
        const type = searchParams.get("type") || undefined;
        const sortBy = (searchParams.get("sortBy") as "price" | "rating" | "createdAt") || "createdAt";

        const accommodationRepository = new AccommodationRepository();
        const result = await accommodationRepository.findAll({
            page,
            limit,
            city,
            type,
            sortBy,
        });

        return NextResponse.json({
            success: true,
            data: {
                accommodations: result.data,
                pagination: result.pagination,
            },
        });
    } catch (error: unknown) {
        console.error("Get accommodations error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch accommodations",
            },
            { status: 500 }
        );
    }
}

// POST create accommodation
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
        
        const accommodationRepository = new AccommodationRepository();
        const createAccommodationUseCase = new CreateAccommodationUseCase(accommodationRepository);
        
        const accommodation = await createAccommodationUseCase.execute(body, decoded.userId);

        return NextResponse.json(
            {
                success: true,
                data: {
                    accommodationId: accommodation.id,
                    status: accommodation.status,
                    message: "Accommodation created successfully",
                },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Create accommodation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to create accommodation",
            },
            { status: 400 }
        );
    }
}

