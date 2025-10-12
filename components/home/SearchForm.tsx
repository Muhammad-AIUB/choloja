"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Search } from "lucide-react";

interface LocationOption {
    city: string;
    state: string;
    country: string;
    count: number;
}

interface AccommodationData {
    location?: {
        city?: string;
        state?: string;
        country?: string;
    };
}

export function SearchForm() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [availableLocations, setAvailableLocations] = useState<LocationOption[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<LocationOption[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Fetch available locations from the database
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("/api/accommodations?limit=100");
                const result = await response.json();
                
                console.log("Fetched accommodations response:", result);
                
                // The API returns data.data.accommodations
                const accommodations = result.data?.accommodations || [];
                
                console.log("Accommodations array:", accommodations);
                
                if (Array.isArray(accommodations) && accommodations.length > 0) {
                    // Extract unique locations from accommodations
                    const locationMap = new Map<string, LocationOption>();
                    
                    accommodations.forEach((acc: AccommodationData) => {
                        if (acc.location?.city && acc.location?.state) {
                            const key = `${acc.location.city}, ${acc.location.state}`;
                            const existing = locationMap.get(key);
                            
                            if (existing) {
                                existing.count++;
                            } else {
                                locationMap.set(key, {
                                    city: acc.location.city,
                                    state: acc.location.state,
                                    country: acc.location.country || "South Korea",
                                    count: 1,
                                });
                            }
                        }
                    });
                    
                    const locations = Array.from(locationMap.values())
                        .sort((a, b) => b.count - a.count); // Sort by number of properties
                    
                    console.log("Extracted locations:", locations);
                    setAvailableLocations(locations);
                    setFilteredLocations(locations);
                } else {
                    console.warn("No accommodations found in database");
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };
        
        fetchLocations();
    }, []);

    // Handle location input change with autocomplete
    const handleLocationChange = (value: string) => {
        setLocation(value);
        
        if (value.trim().length > 0) {
            const filtered = availableLocations.filter(loc => 
                loc.city.toLowerCase().includes(value.toLowerCase()) ||
                loc.state.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredLocations(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredLocations(availableLocations);
            setShowSuggestions(false);
        }
    };

    // Handle location selection
    const handleLocationSelect = (loc: LocationOption) => {
        setLocation(`${loc.city}, ${loc.state}`);
        setShowSuggestions(false);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Build query params
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        
        // Navigate to search results page
        router.push(`/search?${params.toString()}`);
    };

    // For test data, no date restrictions needed
    const today = "2024-01-01"; // Set a fixed past date for testing

    return (
        <div className="w-full max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Location Input with Autocomplete */}
                    <div className="relative" ref={searchRef}>
                        <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                            Where
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            <input
                                id="location"
                                type="text"
                                placeholder="Search destinations"
                                value={location}
                                onChange={(e) => handleLocationChange(e.target.value)}
                                onFocus={() => {
                                    console.log("Input focused, available locations:", availableLocations.length);
                                    if (availableLocations.length > 0) {
                                        setFilteredLocations(availableLocations);
                                        setShowSuggestions(true);
                                    }
                                }}
                                onClick={() => {
                                    console.log("Input clicked");
                                    if (availableLocations.length > 0) {
                                        setFilteredLocations(availableLocations);
                                        setShowSuggestions(true);
                                    }
                                }}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all text-base font-medium text-gray-900 bg-white placeholder:text-gray-400"
                                autoComplete="off"
                            />
                            
                            {/* Autocomplete Dropdown */}
                            {showSuggestions && (
                                <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto">
                                    {filteredLocations.length > 0 ? (
                                        <div className="py-2">
                                            {filteredLocations.map((loc, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleLocationSelect(loc)}
                                                    className="w-full px-4 py-3 text-left hover:bg-pink-50 transition-colors flex items-start gap-3 group"
                                                >
                                                    <MapPin className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-900 group-hover:text-pink-600">
                                                            {loc.city}, {loc.state}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {loc.country} • {loc.count} {loc.count === 1 ? 'property' : 'properties'}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="px-4 py-6 text-center text-gray-500">
                                            <p className="text-sm">No locations available</p>
                                            <p className="text-xs mt-1">Please add some accommodations first</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Check-in Date */}
                    <div className="relative">
                        <label htmlFor="checkIn" className="block text-sm font-semibold text-gray-700 mb-2">
                            Check-in
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                            <input
                                id="checkIn"
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all text-base font-medium text-gray-900 bg-white cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-datetime-edit]:text-gray-900 [&::-webkit-datetime-edit-fields-wrapper]:text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Check-out Date */}
                    <div className="relative">
                        <label htmlFor="checkOut" className="block text-sm font-semibold text-gray-700 mb-2">
                            Check-out
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                            <input
                                id="checkOut"
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all text-base font-medium text-gray-900 bg-white cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-datetime-edit]:text-gray-900 [&::-webkit-datetime-edit-fields-wrapper]:text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full md:w-auto md:min-w-[200px] mx-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <Search className="h-5 w-5" />
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}

