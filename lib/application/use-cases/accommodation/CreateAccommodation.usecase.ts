// Use Case - Business logic orchestration
import { IAccommodationRepository } from "@/lib/domain/repositories/IAccommodationRepository";
import { CreateAccommodationDTO, AccommodationEntity } from "@/lib/domain/entities/Accommodation.entity";
import { generateRoomId } from "@/lib/infrastructure/utils/generators";

export class CreateAccommodationUseCase {
    constructor(private accommodationRepository: IAccommodationRepository) {}

    async execute(data: CreateAccommodationDTO, ownerId: string): Promise<AccommodationEntity> {
        // Business rules validation
        if (!data.basicInfo.name || !data.basicInfo.type) {
            throw new Error("Name and type are required");
        }

        if (!data.rooms || data.rooms.length === 0) {
            throw new Error("At least one room is required");
        }

        // Generate room IDs if not present
        const roomsWithIds = data.rooms.map(room => ({
            ...room,
            id: room.id || generateRoomId(),
        }));

        // Create accommodation
        return this.accommodationRepository.create(
            { ...data, rooms: roomsWithIds },
            ownerId
        );
    }
}

