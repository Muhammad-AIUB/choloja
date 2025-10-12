"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { DetailedSearchFilters } from "@/components/search/DetailedSearchFilters";
import { MapPin, Star, Calendar } from "lucide-react";
import Link from "next/link";

// Types
interface Accommodation {
    id: string;
    name: string;
    city: string;
    state: string;
    rating: number;
    reviews: number;
    price: number;
    currency: string;
    image: string;
    propertyType: string;
    views: string[];
    amenities: {
        parking: boolean;
        breakfast: boolean;
        pool: boolean;
        wifi: boolean;
        airConditioning: boolean;
        beachfront: boolean;
    };
}

interface AccommodationResponse {
    id?: string;
    _id?: string;
    basicInfo?: {
        name?: string;
        propertyType?: string;
    };
    location?: {
        city?: string;
        state?: string;
    };
    averageRating?: number;
    totalReviews?: number;
    rooms?: Array<{
        basePrice: number;
    }>;
    pricing?: {
        currency?: string;
    };
    images?: {
        main?: string[];
        gallery?: string[];
    };
    features?: {
        views?: string[];
        amenities?: string[];
    };
}

interface FilterOptions {
    minPrice: string;
    maxPrice: string;
    propertyType: string[];
    amenities: string[];
    views: string[];
    parking: boolean;
    breakfast: boolean;
    pool: boolean;
    wifi: boolean;
    airConditioning: boolean;
    beachfront: boolean;
    rating: string;
}

function SearchResults() {
    const searchParams = useSearchParams();
    const location = searchParams.get("location") || "";
    const checkIn = searchParams.get("checkIn") || "";
    const checkOut = searchParams.get("checkOut") || "";

    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch accommodations (mock data for now)
    useEffect(() => {
        const fetchAccommodations = async () => {
            setIsLoading(true);
            try {
                // In production, this would be an API call with search params
                const response = await fetch("/api/accommodations?limit=100");
                const result = await response.json();
                
                // The API returns data.data.accommodations
                const accommodations = result.data?.accommodations || [];
                
                // Transform the data to match our interface
                const transformedData: Accommodation[] = accommodations.map((acc: AccommodationResponse) => ({
                    id: acc.id || acc._id || "",
                    name: acc.basicInfo?.name || "Unnamed Property",
                    city: acc.location?.city || "",
                    state: acc.location?.state || "",
                    rating: acc.averageRating || 0,
                    reviews: acc.totalReviews || 0,
                    price: acc.rooms && acc.rooms.length > 0 
                        ? Math.min(...acc.rooms.map((r) => r.basePrice))
                        : 0,
                    currency: acc.pricing?.currency || "KRW",
                    image: acc.images?.main?.[0] || acc.images?.gallery?.[0] || "/placeholder.jpg",
                    propertyType: acc.basicInfo?.propertyType || "Hotel",
                    views: acc.features?.views || [],
                    amenities: {
                        parking: acc.features?.amenities?.includes("Free Parking") || false,
                        breakfast: acc.features?.amenities?.includes("Free Breakfast") || false,
                        pool: acc.features?.amenities?.includes("Swimming Pool") || false,
                        wifi: acc.features?.amenities?.includes("Free WiFi") || false,
                        airConditioning: acc.features?.amenities?.includes("Air Conditioning") || false,
                        beachfront: acc.features?.amenities?.includes("Beachfront") || false,
                    },
                })) || [];
                
                setAccommodations(transformedData);
                
                // Apply location filter immediately after loading
                let initialFiltered = transformedData;
                if (location) {
                    initialFiltered = transformedData.filter(acc => {
                        const locationLower = location.toLowerCase();
                        const cityMatch = acc.city.toLowerCase().includes(locationLower);
                        const stateMatch = acc.state.toLowerCase().includes(locationLower);
                        const fullLocation = `${acc.city}, ${acc.state}`.toLowerCase();
                        const fullLocationMatch = fullLocation.includes(locationLower);
                        
                        return cityMatch || stateMatch || fullLocationMatch;
                    });
                }
                setFilteredAccommodations(initialFiltered);
            } catch (error) {
                console.error("Error fetching accommodations:", error);
                setAccommodations([]);
                setFilteredAccommodations([]);
            }
            setIsLoading(false);
        };

        fetchAccommodations();
    }, [location, checkIn, checkOut]);

    const handleFilterChange = (filters: FilterOptions) => {
        let filtered = [...accommodations];

        // Location filter - filter by search location if provided
        if (location) {
            filtered = filtered.filter(acc => {
                const locationLower = location.toLowerCase();
                const cityMatch = acc.city.toLowerCase().includes(locationLower);
                const stateMatch = acc.state.toLowerCase().includes(locationLower);
                const fullLocation = `${acc.city}, ${acc.state}`.toLowerCase();
                const fullLocationMatch = fullLocation.includes(locationLower);
                
                return cityMatch || stateMatch || fullLocationMatch;
            });
        }

        // Price filter
        if (filters.minPrice) {
            filtered = filtered.filter(acc => acc.price >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(acc => acc.price <= parseFloat(filters.maxPrice));
        }

        // Property type filter
        if (filters.propertyType.length > 0) {
            filtered = filtered.filter(acc => filters.propertyType.includes(acc.propertyType));
        }

        // Views filter
        if (filters.views.length > 0) {
            filtered = filtered.filter(acc => 
                filters.views.some((view: string) => acc.views.includes(view))
            );
        }

        // Amenities filter
        if (filters.parking) {
            filtered = filtered.filter(acc => acc.amenities.parking);
        }
        if (filters.breakfast) {
            filtered = filtered.filter(acc => acc.amenities.breakfast);
        }
        if (filters.pool) {
            filtered = filtered.filter(acc => acc.amenities.pool);
        }
        if (filters.wifi) {
            filtered = filtered.filter(acc => acc.amenities.wifi);
        }
        if (filters.airConditioning) {
            filtered = filtered.filter(acc => acc.amenities.airConditioning);
        }
        if (filters.beachfront) {
            filtered = filtered.filter(acc => acc.amenities.beachfront);
        }

        // Rating filter
        if (filters.rating) {
            filtered = filtered.filter(acc => acc.rating >= parseFloat(filters.rating));
        }

        setFilteredAccommodations(filtered);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <Container className="py-8">
                {/* Search Summary */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">Search Results</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                        {location && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                <span>{location}</span>
                            </div>
                        )}
                        {checkIn && checkOut && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>{new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        {filteredAccommodations.length} properties found
                    </p>
                </div>

                {/* Main Content: Filters + Results */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <DetailedSearchFilters onFilterChange={handleFilterChange} />
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="lg:col-span-3">
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-600 border-r-transparent"></div>
                                <p className="mt-4 text-gray-600">Loading accommodations...</p>
                            </div>
                        ) : filteredAccommodations.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                                <p className="text-gray-500 mb-4">No accommodations found matching your criteria.</p>
                                <p className="text-sm text-gray-400">Try adjusting your filters or search terms.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredAccommodations.map((accommodation) => (
                                    <Link
                                        key={accommodation.id}
                                        href={`/hotel/${accommodation.id}`}
                                        className="group block cursor-pointer"
                                    >
                                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                            {/* Image */}
                                            <div className="relative h-56 overflow-hidden">
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${accommodation.image})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                                    {accommodation.name}
                                                </h3>

                                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{accommodation.city}, {accommodation.state}</span>
                                                </div>

                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="font-semibold text-gray-900">
                                                            {accommodation.rating.toFixed(1)}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        ({accommodation.reviews.toLocaleString()} reviews)
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between pt-3 border-t">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-1">
                                                            Starting from
                                                        </p>
                                                        <p className="text-xl font-bold text-pink-600">
                                                            {new Intl.NumberFormat('ko-KR', {
                                                                style: 'currency',
                                                                currency: accommodation.currency,
                                                                minimumFractionDigits: 0
                                                            }).format(accommodation.price)}
                                                        </p>
                                                    </div>
                                                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium group-hover:from-pink-600 group-hover:to-purple-700 transition-all duration-300">
                                                        View Details
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <SearchResults />
        </Suspense>
    );
}

