import { NextRequest, NextResponse } from "next/server";
import { AccommodationRepository } from "@/lib/infrastructure/repositories/AccommodationRepository";

// GET single accommodation
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const accommodationRepository = new AccommodationRepository();
        const accommodation = await accommodationRepository.findById(id);

        if (!accommodation) {
            return NextResponse.json(
                { success: false, error: "Accommodation not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: accommodation,
        });
    } catch (error: unknown) {
        console.error("Get accommodation error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : "Failed to fetch accommodation",
            },
            { status: 500 }
        );
    }
}

