"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
    onSearch?: (params: SearchParams) => void;
}

interface SearchParams {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const t = useTranslations("Hero");
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(2);

    const handleSearch = () => {
        onSearch?.({ destination, checkIn, checkOut, guests });
    };

    return (
        <div className="w-full rounded-xl border bg-white p-4 shadow-lg md:p-6">
            <div className="grid gap-4 md:grid-cols-4">
                {/* Destination */}
                <div className="flex items-center gap-3 rounded-lg border p-3 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            {t("destination")}
                        </label>
                        <input
                            type="text"
                            placeholder={t("destinationPlaceholder")}
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full border-none p-0 text-sm outline-none placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Check In */}
                <div className="flex items-center gap-3 rounded-lg border p-3 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            {t("checkIn")}
                        </label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full border-none p-0 text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Check Out */}
                <div className="flex items-center gap-3 rounded-lg border p-3 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            {t("checkOut")}
                        </label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full border-none p-0 text-sm outline-none"
                        />
                    </div>
                </div>

                {/* Guests */}
                <div className="flex items-center gap-3 rounded-lg border p-3 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-200">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            {t("guests")}
                        </label>
                        <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full border-none p-0 text-sm outline-none"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                    {t("guestsSuffix")}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Search Button */}
            <Button
                onClick={handleSearch}
                className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                size="lg"
            >
                <Search className="mr-2 h-5 w-5" />
                {t("searchButton")}
            </Button>
        </div>
    );
}
