// Repository Interface - Defines contract for data access
import { AccommodationEntity, CreateAccommodationDTO } from "../entities/Accommodation.entity";

export interface AccommodationFilters {
    city?: string;
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
    sortBy?: "price" | "rating" | "createdAt";
}

export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface IAccommodationRepository {
    create(data: CreateAccommodationDTO, ownerId: string): Promise<AccommodationEntity>;
    findAll(filters: AccommodationFilters): Promise<PaginatedResult<AccommodationEntity>>;
    findById(id: string): Promise<AccommodationEntity | null>;
    update(id: string, data: Partial<AccommodationEntity>): Promise<AccommodationEntity | null>;
    delete(id: string): Promise<boolean>;
}

