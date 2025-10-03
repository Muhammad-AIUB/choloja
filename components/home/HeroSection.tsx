"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function HeroSection() {
    const [activeCategory, setActiveCategory] = useState("hotel");
    const t = useTranslations("Hero");

    const categories = [
        { id: "hotel", key: "hotel", emoji: "🏨" },
        { id: "pension", key: "pension", emoji: "🏡" },
        { id: "glamping", key: "glamping", emoji: "⛺" },
        { id: "motel", key: "motel", emoji: "🏢" },
        { id: "leisure", key: "leisure", emoji: "🎢" },
        { id: "global", key: "global", emoji: "✈️" },
        { id: "flights", key: "flights", emoji: "🛫" },
        { id: "tour", key: "tour", emoji: "🌏" },
    ];

    return (
        <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 md:py-20">
            <Container>
                {/* Title */}
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                        <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                            {t("title")}
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 md:text-xl">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="mb-6 flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={
                                activeCategory === category.id
                                    ? "default"
                                    : "outline"
                            }
                            size="sm"
                            onClick={() => setActiveCategory(category.id)}
                            className={cn(
                                "rounded-full transition-all",
                                activeCategory === category.id &&
                                    "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
                            )}
                        >
                            <span className="mr-1">{category.emoji}</span>
                            {t(`categories.${category.key}`)}
                        </Button>
                    ))}
                </div>

                {/* Search Bar */}
                <SearchBar
                    onSearch={(params) => console.log("Search:", params)}
                />

                {/* Quick Links */}
                <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
                    <span className="text-gray-600">
                        {t("popularSearches")}
                    </span>
                    {["서울", "부산", "제주도", "강릉", "여수", "경주"].map(
                        (city) => (
                            <button
                                key={city}
                                className="rounded-full bg-white px-4 py-1.5 font-medium text-gray-700 shadow-sm transition-all hover:shadow-md"
                            >
                                {city}
                            </button>
                        )
                    )}
                </div>
            </Container>
        </section>
    );
}
