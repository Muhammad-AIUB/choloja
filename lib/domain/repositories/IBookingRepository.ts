// Repository Interface - Defines contract for data access
import { BookingEntity, CreateBookingDTO } from "../entities/Booking.entity";
import { PaginatedResult } from "./IAccommodationRepository";

export interface BookingFilters {
    userId?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export interface IBookingRepository {
    create(data: CreateBookingDTO, userId: string): Promise<BookingEntity>;
    findAll(filters: BookingFilters): Promise<PaginatedResult<BookingEntity>>;
    findById(id: string): Promise<BookingEntity | null>;
    update(id: string, data: Partial<BookingEntity>): Promise<BookingEntity | null>;
    cancel(id: string): Promise<BookingEntity | null>;
}

