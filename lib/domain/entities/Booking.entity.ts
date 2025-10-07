// Domain Entity - Pure business logic
export interface BookingEntity {
    id: string;
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
}

export interface CreateBookingDTO {
    accommodationId: string;
    roomId: string;
    bookingDetails: BookingEntity["bookingDetails"];
    pricing: BookingEntity["pricing"];
    paymentInfo: {
        method: string;
    };
}

