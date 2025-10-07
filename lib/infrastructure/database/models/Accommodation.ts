import mongoose, { Schema, Model } from "mongoose";

export interface IAccommodation {
    _id: string;
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
    rooms: Array<{
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
    }>;
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

const accommodationSchema = new Schema<IAccommodation>(
    {
        ownerId: {
            type: String,
            required: true,
            ref: "User",
        },
        basicInfo: {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            type: {
                type: String,
                required: true,
                enum: ["hotel", "pension", "motel", "glamping", "resort"],
            },
            description: {
                type: String,
                required: true,
            },
            starRating: {
                type: Number,
                min: 1,
                max: 5,
            },
        },
        location: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            zipCode: { type: String, required: true },
            coordinates: {
                lat: Number,
                lng: Number,
            },
        },
        contact: {
            phone: { type: String, required: true },
            email: { type: String, required: true },
            website: String,
        },
        amenities: [String],
        policies: {
            checkInTime: { type: String, required: true },
            checkOutTime: { type: String, required: true },
            cancellationPolicy: { type: String, required: true },
            childrenPolicy: { type: String, required: true },
            petsPolicy: { type: String, required: true },
            smokingPolicy: { type: String, required: true },
        },
        images: {
            main: [String],
            gallery: [String],
        },
        rooms: [
            {
                id: { type: String, required: true },
                name: { type: String, required: true },
                description: { type: String, required: true },
                type: { type: String, required: true },
                bedType: { type: String, required: true },
                size: { type: Number, required: true },
                capacity: {
                    standard: { type: Number, required: true },
                    max: { type: Number, required: true },
                },
                quantity: { type: Number, required: true },
                basePrice: { type: Number, required: true },
                images: [String],
                amenities: [String],
                availability: { type: Boolean, default: true },
            },
        ],
        pricing: {
            currency: { type: String, default: "KRW" },
            taxRate: { type: Number, default: 10 },
            serviceFeeRate: { type: Number, default: 5 },
        },
        status: {
            type: String,
            enum: ["draft", "pending_review", "approved", "rejected"],
            default: "draft",
        },
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
accommodationSchema.index({ "basicInfo.name": "text", "basicInfo.description": "text" });
accommodationSchema.index({ "location.city": 1, "location.state": 1 });
accommodationSchema.index({ status: 1 });
accommodationSchema.index({ averageRating: -1 });

export default (mongoose.models.Accommodation as Model<IAccommodation>) ||
    mongoose.model<IAccommodation>("Accommodation", accommodationSchema);

