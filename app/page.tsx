"use client";

import { useTranslations } from "next-intl";
import { HeroSection } from "@/components/home/HeroSection";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import { ListingSection } from "@/components/home/ListingSection";
import { DealCarousel } from "@/components/home/DealCarousel";
import { LiveCommerceGrid } from "@/components/home/LiveCommerceGrid";
import { PromotionCard } from "@/components/home/PromotionCard";
import { Section } from "@/components/ui/section";
import { useTranslatedMockData } from "@/lib/constants/useTranslatedMockData";

export default function Home() {
    const t = useTranslations("Home");
    const {
        mockBanners,
        mockHotelListings,
        mockPensionListings,
        mockLeisureDeals,
        mockLiveCommerce,
        mockPromotions,
    } = useTranslatedMockData();
    return (
        <main className="min-h-screen">
            {/* Hero Section with Search */}
            <HeroSection />

            {/* Main Banner */}
            <Section>
                <BannerCarousel banners={mockBanners} />
            </Section>

            {/* Promotions Grid */}
            <Section title={t("promotionsTitle")} background="gray">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {mockPromotions.map((promo) => (
                        <PromotionCard key={promo.id} promotion={promo} />
                    ))}
                </div>
            </Section>

            {/* Live Commerce Section */}
            <Section
                title={t("liveCommerceTitle")}
                subtitle={t("liveCommerceSubtitle")}
            >
                <LiveCommerceGrid items={mockLiveCommerce} />
            </Section>

            {/* Hotels Section */}
            <Section title={t("hotelsTitle")} background="gray">
                <ListingSection
                    title=""
                    listings={mockHotelListings}
                    viewAllLink="/hotel"
                />
            </Section>

            {/* Pensions Section */}
            <Section
                title={t("pensionsTitle")}
                subtitle={t("pensionsSubtitle")}
            >
                <ListingSection
                    title=""
                    listings={mockPensionListings}
                    viewAllLink="/pension"
                />
            </Section>

            {/* Leisure Activities */}
            <Section title={t("leisureTitle")} background="gray">
                <DealCarousel deals={mockLeisureDeals} />
            </Section>

            {/* Popular Destinations */}
            <Section
                title={t("destinationsTitle")}
                subtitle={t("destinationsSubtitle")}
            >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            id: "dest1",
                            name: t("destinations.jeju"),
                            imageUrl:
                                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
                            count: "3,245",
                        },
                        {
                            id: "dest2",
                            name: t("destinations.busan"),
                            imageUrl:
                                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
                            count: "1,892",
                        },
                        {
                            id: "dest3",
                            name: t("destinations.gangneung"),
                            imageUrl:
                                "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop",
                            count: "1,456",
                        },
                    ].map((dest) => (
                        <div
                            key={dest.id}
                            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
                        >
                            <img
                                src={dest.imageUrl}
                                alt={dest.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="mb-1 text-2xl font-bold">
                                    {dest.name}
                                </h3>
                                <p className="text-sm opacity-90">
                                    {dest.count} {t("accommodations")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Trust Indicators */}
            <Section background="gray">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: "🏆",
                            titleKey: "trust.trusted",
                            descriptionKey: "trust.trustedDesc",
                        },
                        {
                            icon: "💰",
                            titleKey: "trust.bestPrice",
                            descriptionKey: "trust.bestPriceDesc",
                        },
                        {
                            icon: "🎁",
                            titleKey: "trust.benefits",
                            descriptionKey: "trust.benefitsDesc",
                        },
                        {
                            icon: "💬",
                            titleKey: "trust.support",
                            descriptionKey: "trust.supportDesc",
                        },
                    ].map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="mb-4 text-4xl">{feature.icon}</div>
                            <h3 className="mb-2 font-semibold text-gray-900">
                                {t(feature.titleKey)}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {t(feature.descriptionKey)}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>
        </main>
    );
}
