// Use Case - Business logic orchestration
import { IBookingRepository } from "@/lib/domain/repositories/IBookingRepository";
import { CreateBookingDTO, BookingEntity } from "@/lib/domain/entities/Booking.entity";

export class CreateBookingUseCase {
    constructor(private bookingRepository: IBookingRepository) {}

    async execute(data: CreateBookingDTO, userId: string): Promise<BookingEntity> {
        // Business rules validation
        if (!data.accommodationId || !data.roomId) {
            throw new Error("Accommodation and room are required");
        }

        if (!data.bookingDetails.checkInDate || !data.bookingDetails.checkOutDate) {
            throw new Error("Check-in and check-out dates are required");
        }

        // Validate dates
        const checkIn = new Date(data.bookingDetails.checkInDate);
        const checkOut = new Date(data.bookingDetails.checkOutDate);
        
        if (checkIn >= checkOut) {
            throw new Error("Check-out must be after check-in");
        }

        if (checkIn < new Date()) {
            throw new Error("Check-in date must be in the future");
        }

        // Create booking
        return this.bookingRepository.create(data, userId);
    }
}

