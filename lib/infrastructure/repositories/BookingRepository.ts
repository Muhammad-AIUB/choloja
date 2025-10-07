// Repository Implementation - Data access layer
import {
    IBookingRepository,
    BookingFilters,
} from "@/lib/domain/repositories/IBookingRepository";
import { PaginatedResult } from "@/lib/domain/repositories/IAccommodationRepository";
import {
    BookingEntity,
    CreateBookingDTO,
} from "@/lib/domain/entities/Booking.entity";
import Booking from "@/lib/infrastructure/database/models/Booking";
import connectDB from "@/lib/infrastructure/database/mongodb";
import {
    generateBookingNumber,
    generateConfirmationCode,
} from "@/lib/infrastructure/utils/generators";

export class BookingRepository implements IBookingRepository {
    async create(data: CreateBookingDTO, userId: string): Promise<BookingEntity> {
        await connectDB();

        const bookingNumber = generateBookingNumber();
        const confirmationCode = generateConfirmationCode();

        const booking = await Booking.create({
            ...data,
            userId,
            bookingNumber,
            confirmationCode,
            status: "confirmed",
            paymentInfo: {
                ...data.paymentInfo,
                status: "completed",
            },
        });

        return this.toEntity(booking);
    }

    async findAll(
        filters: BookingFilters
    ): Promise<PaginatedResult<BookingEntity>> {
        await connectDB();

        const { page = 1, limit = 20, userId, status } = filters;

        const query: Record<string, unknown> = {};
        if (userId) query.userId = userId;
        if (status && status !== "all") query.status = status;

        const skip = (page - 1) * limit;

        const [bookings, total] = await Promise.all([
            Booking.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            Booking.countDocuments(query),
        ]);

        return {
            data: bookings.map(this.toEntity),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: string): Promise<BookingEntity | null> {
        await connectDB();

        const booking = await Booking.findById(id);
        if (!booking) return null;

        return this.toEntity(booking);
    }

    async update(
        id: string,
        data: Partial<BookingEntity>
    ): Promise<BookingEntity | null> {
        await connectDB();

        const booking = await Booking.findByIdAndUpdate(id, data, { new: true });
        if (!booking) return null;

        return this.toEntity(booking);
    }

    async cancel(id: string): Promise<BookingEntity | null> {
        await connectDB();

        const booking = await Booking.findByIdAndUpdate(
            id,
            {
                status: "cancelled",
                cancelledAt: new Date(),
            },
            { new: true }
        );

        if (!booking) return null;

        return this.toEntity(booking);
    }

    private toEntity(doc: {
        _id: { toString(): string };
        bookingNumber: string;
        userId: string;
        accommodationId: string;
        roomId: string;
        status: BookingEntity["status"];
        bookingDetails: BookingEntity["bookingDetails"];
        pricing: BookingEntity["pricing"];
        paymentInfo: BookingEntity["paymentInfo"];
        confirmationCode: string;
        createdAt: Date;
        updatedAt: Date;
    }): BookingEntity {
        return {
            id: doc._id.toString(),
            bookingNumber: doc.bookingNumber,
            userId: doc.userId,
            accommodationId: doc.accommodationId,
            roomId: doc.roomId,
            status: doc.status,
            bookingDetails: doc.bookingDetails,
            pricing: doc.pricing,
            paymentInfo: doc.paymentInfo,
            confirmationCode: doc.confirmationCode,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
}

