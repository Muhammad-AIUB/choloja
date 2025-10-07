// Repository Implementation - Data access layer
import {
    IAccommodationRepository,
    AccommodationFilters,
    PaginatedResult,
} from "@/lib/domain/repositories/IAccommodationRepository";
import {
    AccommodationEntity,
    CreateAccommodationDTO,
} from "@/lib/domain/entities/Accommodation.entity";
import Accommodation from "@/lib/infrastructure/database/models/Accommodation";
import connectDB from "@/lib/infrastructure/database/mongodb";

export class AccommodationRepository implements IAccommodationRepository {
    async create(
        data: CreateAccommodationDTO,
        ownerId: string
    ): Promise<AccommodationEntity> {
        await connectDB();

        const accommodation = await Accommodation.create({
            ...data,
            ownerId,
        });

        return this.toEntity(accommodation);
    }

    async findAll(
        filters: AccommodationFilters
    ): Promise<PaginatedResult<AccommodationEntity>> {
        await connectDB();

        const { page = 1, limit = 20, city, type, status = "approved", sortBy = "createdAt" } = filters;

        const query: Record<string, unknown> = { status };
        if (city) query["location.city"] = new RegExp(city, "i");
        if (type) query["basicInfo.type"] = type;

        const skip = (page - 1) * limit;

        let sort: Record<string, 1 | -1> = { createdAt: -1 };
        if (sortBy === "price") sort = { "rooms.0.basePrice": 1 };
        else if (sortBy === "rating") sort = { averageRating: -1 };

        const [accommodations, total] = await Promise.all([
            Accommodation.find(query).sort(sort).skip(skip).limit(limit),
            Accommodation.countDocuments(query),
        ]);

        return {
            data: accommodations.map(this.toEntity),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findById(id: string): Promise<AccommodationEntity | null> {
        await connectDB();

        const accommodation = await Accommodation.findById(id);
        if (!accommodation) return null;

        return this.toEntity(accommodation);
    }

    async update(
        id: string,
        data: Partial<AccommodationEntity>
    ): Promise<AccommodationEntity | null> {
        await connectDB();

        const accommodation = await Accommodation.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!accommodation) return null;

        return this.toEntity(accommodation);
    }

    async delete(id: string): Promise<boolean> {
        await connectDB();

        const result = await Accommodation.findByIdAndDelete(id);
        return result !== null;
    }

    private toEntity(doc: {
        _id: { toString(): string };
        ownerId: string;
        basicInfo: AccommodationEntity["basicInfo"];
        location: AccommodationEntity["location"];
        contact: AccommodationEntity["contact"];
        amenities: string[];
        policies: AccommodationEntity["policies"];
        images: AccommodationEntity["images"];
        rooms: AccommodationEntity["rooms"];
        pricing: AccommodationEntity["pricing"];
        status: AccommodationEntity["status"];
        averageRating: number;
        totalReviews: number;
        createdAt: Date;
        updatedAt: Date;
    }): AccommodationEntity {
        return {
            id: doc._id.toString(),
            ownerId: doc.ownerId,
            basicInfo: doc.basicInfo,
            location: doc.location,
            contact: doc.contact,
            amenities: doc.amenities,
            policies: doc.policies,
            images: doc.images,
            rooms: doc.rooms,
            pricing: doc.pricing,
            status: doc.status,
            averageRating: doc.averageRating,
            totalReviews: doc.totalReviews,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
}

