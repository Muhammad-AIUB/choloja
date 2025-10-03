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
