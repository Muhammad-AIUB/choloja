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
