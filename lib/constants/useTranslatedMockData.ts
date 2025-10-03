// Helper function to resolve translation keys from mock data
// This transforms the translated mock data structure into the format expected by components

import { useTranslations } from "next-intl";
import { translatedMockData } from "./translatedMockData";

export function useTranslatedMockData() {
    const t = useTranslations();

    // Helper to resolve nested translation keys
    const resolveKey = (key: string): string => {
        // Split the key by dots and traverse the translation object
        const parts = key.split(".");
        return t(key);
    };

    return {
        mockBanners: translatedMockData.banners.map((banner) => ({
            ...banner,
            title: resolveKey(banner.titleKey),
        })),

        mockHotelListings: translatedMockData.hotelListings.map((hotel) => ({
            ...hotel,
            title: resolveKey(hotel.titleKey),
            location: resolveKey(hotel.locationKey),
            category: resolveKey(hotel.categoryKey),
            // Handle price that might be a translation key
            price: hotel.price.startsWith("MockData.")
                ? resolveKey(hotel.price)
                : hotel.price,
        })),

        mockPensionListings: translatedMockData.pensionListings.map(
            (pension) => ({
                ...pension,
                title: resolveKey(pension.titleKey),
                location: resolveKey(pension.locationKey),
                category: resolveKey(pension.categoryKey),
                // Handle price that might be a translation key
                price: pension.price.startsWith("MockData.")
                    ? resolveKey(pension.price)
                    : pension.price,
            })
        ),

        mockLeisureDeals: translatedMockData.leisureDeals.map((deal) => ({
            ...deal,
            title: resolveKey(deal.titleKey),
            subtitle: resolveKey(deal.subtitleKey),
            badge: deal.badgeKey ? resolveKey(deal.badgeKey) : undefined,
        })),

        mockLiveCommerce: translatedMockData.liveCommerce.map((item) => ({
            ...item,
            title: resolveKey(item.titleKey),
            // Handle scheduledAt that might be a translation key
            scheduledAt: item.scheduledAt.startsWith("MockData.")
                ? resolveKey(item.scheduledAt)
                : item.scheduledAt,
        })),

        mockPromotions: translatedMockData.promotions.map((promo) => ({
            ...promo,
            title: resolveKey(promo.titleKey),
            description: resolveKey(promo.descriptionKey),
            badge: resolveKey(promo.badgeKey),
        })),
    };
}
