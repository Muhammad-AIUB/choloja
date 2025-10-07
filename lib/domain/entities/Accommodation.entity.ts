// Domain Entity - Pure business logic
export interface AccommodationEntity {
    id: string;
    ownerId: string;
    basicInfo: {
        name: string;
        type: "hotel" | "pension" | "motel" | "glamping" | "resort";
        description: string;
        starRating?: number;
    };
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    contact: {
        phone: string;
        email: string;
        website?: string;
    };
    amenities: string[];
    policies: {
        checkInTime: string;
        checkOutTime: string;
        cancellationPolicy: string;
        childrenPolicy: string;
        petsPolicy: string;
        smokingPolicy: string;
    };
    images: {
        main: string[];
        gallery: string[];
    };
    rooms: RoomEntity[];
    pricing: {
        currency: string;
        taxRate: number;
        serviceFeeRate: number;
    };
    status: "draft" | "pending_review" | "approved" | "rejected";
    averageRating: number;
    totalReviews: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoomEntity {
    id: string;
    name: string;
    description: string;
    type: string;
    bedType: string;
    size: number;
    capacity: {
        standard: number;
        max: number;
    };
    quantity: number;
    basePrice: number;
    images: string[];
    amenities: string[];
    availability: boolean;
}

export interface CreateAccommodationDTO {
    basicInfo: AccommodationEntity["basicInfo"];
    location: AccommodationEntity["location"];
    contact: AccommodationEntity["contact"];
    amenities: string[];
    policies: AccommodationEntity["policies"];
    images: AccommodationEntity["images"];
    rooms: RoomEntity[];
    pricing: AccommodationEntity["pricing"];
}

