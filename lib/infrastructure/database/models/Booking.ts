import mongoose, { Schema, Model } from "mongoose";

export interface IBooking {
    _id: string;
    bookingNumber: string;
    userId: string;
    accommodationId: string;
    roomId: string;
    status: "pending" | "confirmed" | "cancelled" | "completed" | "no_show";
    bookingDetails: {
        accommodationName: string;
        roomName: string;
        checkInDate: string;
        checkOutDate: string;
        nights: number;
        guests: {
            adults: number;
            children: number;
        };
        guestInfo: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            countryCode: string;
            specialRequests?: string;
        };
    };
    pricing: {
        roomPrice: number;
        nights: number;
        subtotal: number;
        tax: number;
        serviceFee: number;
        discount?: number;
        total: number;
        currency: string;
    };
    paymentInfo: {
        method: string;
        status: "pending" | "completed" | "failed" | "refunded";
        transactionId?: string;
    };
    confirmationCode: string;
    createdAt: Date;
    updatedAt: Date;
    cancelledAt?: Date;
    completedAt?: Date;
}

const bookingSchema = new Schema<IBooking>(
    {
        bookingNumber: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: String,
            required: true,
            ref: "User",
        },
        accommodationId: {
            type: String,
            required: true,
            ref: "Accommodation",
        },
        roomId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed", "no_show"],
            default: "pending",
        },
        bookingDetails: {
            accommodationName: { type: String, required: true },
            roomName: { type: String, required: true },
            checkInDate: { type: String, required: true },
            checkOutDate: { type: String, required: true },
            nights: { type: Number, required: true },
            guests: {
                adults: { type: Number, required: true },
                children: { type: Number, default: 0 },
            },
            guestInfo: {
                firstName: { type: String, required: true },
                lastName: { type: String, required: true },
                email: { type: String, required: true },
                phone: { type: String, required: true },
                countryCode: { type: String, required: true },
                specialRequests: String,
            },
        },
        pricing: {
            roomPrice: { type: Number, required: true },
            nights: { type: Number, required: true },
            subtotal: { type: Number, required: true },
            tax: { type: Number, required: true },
            serviceFee: { type: Number, required: true },
            discount: Number,
            total: { type: Number, required: true },
            currency: { type: String, default: "KRW" },
        },
        paymentInfo: {
            method: { type: String, required: true },
            status: {
                type: String,
                enum: ["pending", "completed", "failed", "refunded"],
                default: "pending",
            },
            transactionId: String,
        },
        confirmationCode: {
            type: String,
            required: true,
            unique: true,
        },
        cancelledAt: Date,
        completedAt: Date,
    },
    {
        timestamps: true,
    }
);

// Indexes (bookingNumber and confirmationCode are already indexed via unique: true)
bookingSchema.index({ userId: 1, createdAt: -1 });
bookingSchema.index({ accommodationId: 1 });
bookingSchema.index({ status: 1 });

export default (mongoose.models.Booking as Model<IBooking>) ||
    mongoose.model<IBooking>("Booking", bookingSchema);

