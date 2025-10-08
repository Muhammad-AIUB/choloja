import { NextRequest, NextResponse } from "next/server";
import { AccommodationRepository } from "@/lib/infrastructure/repositories/AccommodationRepository";

// Enable caching for this route
export const revalidate = 60; // Revalidate every 60 seconds

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

        const response = NextResponse.json({
            success: true,
            data: accommodation,
        });

        // Add cache headers
        response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
        
        return response;
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

