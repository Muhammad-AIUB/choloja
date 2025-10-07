// Base types for the application

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon?: string;
}

export interface Location {
    city?: string;
    country?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface Price {
    amount: number;
    currency: string;
    originalAmount?: number;
    discountPercentage?: number;
}

export interface Image {
    id: string;
    url: string;
    alt: string;
    width?: number;
    height?: number;
}

export interface Listing {
    id: string;
    title: string;
    slug: string;
    description?: string;
    category: Category;
    location: Location;
    price: Price;
    images: Image[];
    rating?: number;
    reviewCount?: number;
    amenities?: string[];
    tags?: string[];
    isFeatured?: boolean;
    isAvailable?: boolean;
}

// Accommodation Detail Types
export interface Room {
    id: string;
    name: string;
    description: string;
    images: string[];
    capacity: {
        standard: number;
        max: number;
    };
    bedType: string;
    size?: number;
    price: string;
    originalPrice?: string;
    discount?: string;
    checkInTime: string;
    checkOutTime: string;
    amenities: string[];
    packages?: RoomPackage[];
    availability: "available" | "limited" | "soldout";
    remainingRooms?: number;
    cancellationPolicy: string;
}

export interface RoomPackage {
    id: string;
    name: string;
    description: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    benefits: string[];
}

export interface Amenity {
    id: string;
    name: string;
    icon: string;
    category: string;
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    helpful?: number;
    images?: string[];
}

export interface AccommodationDetail {
    id: string;
    title: string;
    location: string;
    address: string;
    rating: number;
    reviewCount: number;
    description: string;
    images: string[];
    priceRange: string;
    checkInTime: string;
    checkOutTime: string;
    amenities: Amenity[];
    rooms: Room[];
    reviews: Review[];
    aiReviewSummary?: string;
    badges: string[];
    policies: {
        cancellation: string;
        children: string;
        pets: string;
        smoking: string;
    };
    nearbyAttractions?: string[];
}

export interface Deal {
    id: string;
    title: string;
    description?: string;
    listing: Listing;
    validFrom: string;
    validTo: string;
    discountPercentage?: number;
    remainingSpots?: number;
}

export interface LiveCommerce {
    id: string;
    title: string;
    scheduledAt: string;
    status: "scheduled" | "live" | "ended";
    thumbnailUrl: string;
    viewCount?: number;
    deal?: Deal;
}

export interface Banner {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    link?: string;
    priority?: number;
}

export interface SearchParams {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    category?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: "user" | "admin";
}

export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    icon?: string;
    badge?: string;
    isNew?: boolean;
}

// Booking & Reservation Types
export interface GuestInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    countryCode: string;
    specialRequests?: string;
}

export interface BookingDetails {
    accommodationId: string;
    accommodationName: string;
    roomId: string;
    roomName: string;
    checkInDate: string;
    checkOutDate: string;
    nights: number;
    guests: {
        adults: number;
        children: number;
    };
    guestInfo: GuestInfo;
}

export interface PaymentMethod {
    id: string;
    type: "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "nol_money";
    name: string;
    icon?: string;
}

export interface PaymentInfo {
    method: PaymentMethod;
    cardNumber?: string;
    cardHolderName?: string;
    expiryDate?: string;
    cvv?: string;
    billingAddress?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

export interface PricingBreakdown {
    roomPrice: number;
    nights: number;
    subtotal: number;
    tax: number;
    serviceFee: number;
    discount?: number;
    total: number;
    currency: string;
}

export interface Booking {
    id: string;
    bookingNumber: string;
    status: "pending" | "confirmed" | "cancelled" | "completed" | "no_show";
    bookingDetails: BookingDetails;
    pricing: PricingBreakdown;
    paymentInfo: Partial<PaymentInfo>;
    createdAt: string;
    updatedAt: string;
    confirmationCode?: string;
}

// Accommodation Registration Types (Admin)
export interface AccommodationRegistration {
    id?: string;
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
    rooms: RoomRegistration[];
    pricing: {
        currency: string;
        taxRate: number;
        serviceFeeRate: number;
    };
    status: "draft" | "pending_review" | "approved" | "rejected";
    ownerId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface RoomRegistration {
    id?: string;
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
