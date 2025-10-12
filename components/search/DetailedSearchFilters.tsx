"use client";

import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

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

interface DetailedSearchFiltersProps {
    onFilterChange: (filters: FilterOptions) => void;
}

export function DetailedSearchFilters({ onFilterChange }: DetailedSearchFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [filters, setFilters] = useState<FilterOptions>({
        minPrice: "",
        maxPrice: "",
        propertyType: [],
        amenities: [],
        views: [],
        parking: false,
        breakfast: false,
        pool: false,
        wifi: false,
        airConditioning: false,
        beachfront: false,
        rating: "",
    });

    const handleFilterChange = (key: keyof FilterOptions, value: string | string[] | boolean) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleArrayToggle = (key: keyof FilterOptions, value: string) => {
        const currentArray = filters[key] as string[];
        const newArray = currentArray.includes(value)
            ? currentArray.filter(item => item !== value)
            : [...currentArray, value];
        handleFilterChange(key, newArray);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Header */}
            <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-pink-600" />
                    <h2 className="text-xl font-bold">Detailed Filters</h2>
                </div>
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
            </div>

            {/* Filters Content */}
            {isExpanded && (
                <div className="mt-6 space-y-6">
                    {/* Price Range */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                                <input
                                    type="number"
                                    placeholder="$0"
                                    value={filters.minPrice}
                                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                                <input
                                    type="number"
                                    placeholder="$1000"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Property Type */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Property Type</h3>
                        <div className="space-y-2">
                            {["Hotel", "Resort", "Villa", "Apartment", "Guest House"].map((type) => (
                                <label key={type} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.propertyType.includes(type)}
                                        onChange={() => handleArrayToggle("propertyType", type)}
                                        className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                    />
                                    <span className="text-gray-700">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Views */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Views</h3>
                        <div className="space-y-2">
                            {["Ocean View", "Mountain View", "City View", "Garden View", "Pool View"].map((view) => (
                                <label key={view} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filters.views.includes(view)}
                                        onChange={() => handleArrayToggle("views", view)}
                                        className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                    />
                                    <span className="text-gray-700">{view}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.parking}
                                    onChange={(e) => handleFilterChange("parking", e.target.checked)}
                                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="text-gray-700">Free Parking</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.breakfast}
                                    onChange={(e) => handleFilterChange("breakfast", e.target.checked)}
                                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="text-gray-700">Free Breakfast</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.pool}
                                    onChange={(e) => handleFilterChange("pool", e.target.checked)}
                                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="text-gray-700">Swimming Pool</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.wifi}
                                    onChange={(e) => handleFilterChange("wifi", e.target.checked)}
                                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="text-gray-700">Free WiFi</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.airConditioning}
                                    onChange={(e) => handleFilterChange("airConditioning", e.target.checked)}
                                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="text-gray-700">Air Conditioning</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.beachfront}
                                    onChange={(e) => handleFilterChange("beachfront", e.target.checked)}
                                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                                />
                                <span className="text-gray-700">Beachfront</span>
                            </label>
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                        <div className="space-y-2">
                            {["4.5", "4.0", "3.5", "3.0"].map((rating) => (
                                <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                                    <input
                                        type="radio"
                                        name="rating"
                                        checked={filters.rating === rating}
                                        onChange={() => handleFilterChange("rating", rating)}
                                        className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                                    />
                                    <span className="text-gray-700">{rating}+ Stars</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Clear Filters Button */}
                    <button
                        onClick={() => {
                            const emptyFilters: FilterOptions = {
                                minPrice: "",
                                maxPrice: "",
                                propertyType: [],
                                amenities: [],
                                views: [],
                                parking: false,
                                breakfast: false,
                                pool: false,
                                wifi: false,
                                airConditioning: false,
                                beachfront: false,
                                rating: "",
                            };
                            setFilters(emptyFilters);
                            onFilterChange(emptyFilters);
                        }}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
}

