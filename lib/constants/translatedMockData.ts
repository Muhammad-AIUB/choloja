// Translated mock data using i18n keys
// This file provides functions to get translated mock data based on the current locale

export interface TranslatedMockData {
    banners: Array<{
        id: string;
        imageUrl: string;
        titleKey: string;
        link: string;
    }>;
    hotelListings: Array<{
        id: string;
        titleKey: string;
        locationKey: string;
        imageUrl: string;
        price: string;
        originalPrice?: string;
        discount?: string;
        rating: number;
        reviewCount: number;
        categoryKey: string;
        isFeatured?: boolean;
    }>;
    pensionListings: Array<{
        id: string;
        titleKey: string;
        locationKey: string;
        imageUrl: string;
        price: string;
        originalPrice?: string;
        discount?: string;
        rating: number;
        reviewCount: number;
        categoryKey: string;
        isFeatured?: boolean;
    }>;
    leisureDeals: Array<{
        id: string;
        titleKey: string;
        subtitleKey: string;
        imageUrl: string;
        price: string;
        originalPrice: string;
        discount: string;
        badgeKey?: string;
    }>;
    liveCommerce: Array<{
        id: string;
        titleKey: string;
        scheduledAt: string;
        status: "scheduled" | "ended";
        thumbnailUrl: string;
        discount?: string;
        viewCount?: number;
    }>;
    promotions: Array<{
        id: string;
        titleKey: string;
        descriptionKey: string;
        imageUrl: string;
        link: string;
        badgeKey: string;
        badgeColor: "red" | "blue" | "purple" | "pink";
    }>;
}

export const translatedMockData: TranslatedMockData = {
    banners: [
        {
            id: "1",
            imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=600&fit=crop",
            titleKey: "MockData.banners.banner1Title",
            link: "/promotion/chungbuk-autumn",
        },
        {
            id: "2",
            imageUrl:
                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&h=600&fit=crop",
            titleKey: "MockData.banners.banner2Title",
            link: "/promotion/japan-travel",
        },
        {
            id: "3",
            imageUrl:
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&h=600&fit=crop",
            titleKey: "MockData.banners.banner3Title",
            link: "/promotion/chuseok-deals",
        },
    ],
    hotelListings: [
        {
            id: "1",
            titleKey: "MockData.hotels.hotel1",
            locationKey: "MockData.locations.seoulJunggu",
            imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
            price: "583,000원",
            originalPrice: "620,000원",
            discount: "6%",
            rating: 4.8,
            reviewCount: 1234,
            categoryKey: "MockData.categories.hotel",
            isFeatured: true,
        },
        {
            id: "2",
            titleKey: "MockData.hotels.hotel2",
            locationKey: "MockData.locations.seoulGuro",
            imageUrl:
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
            price: "189,000원",
            originalPrice: "199,000원",
            discount: "5%",
            rating: 4.6,
            reviewCount: 856,
            categoryKey: "MockData.categories.hotel",
        },
        {
            id: "3",
            titleKey: "MockData.hotels.hotel3",
            locationKey: "MockData.locations.seoulSeocho",
            imageUrl:
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
            price: "232,000원",
            originalPrice: "297,000원",
            discount: "22%",
            rating: 4.7,
            reviewCount: 967,
            categoryKey: "MockData.categories.hotel",
        },
        {
            id: "4",
            titleKey: "MockData.hotels.hotel4",
            locationKey: "MockData.locations.seoulYongsan",
            imageUrl:
                "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
            price: "450,000원",
            originalPrice: "580,000원",
            discount: "22%",
            rating: 4.9,
            reviewCount: 2341,
            categoryKey: "MockData.categories.hotel",
            isFeatured: true,
        },
    ],
    pensionListings: [
        {
            id: "5",
            titleKey: "MockData.pensions.pension1",
            locationKey: "MockData.locations.gyeonggiGapyeong",
            imageUrl:
                "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&h=600&fit=crop",
            price: "140,000원",
            originalPrice: "200,000원",
            discount: "30%",
            rating: 4.5,
            reviewCount: 432,
            categoryKey: "MockData.categories.pension",
        },
        {
            id: "6",
            titleKey: "MockData.pensions.pension2",
            locationKey: "MockData.locations.chungnamTaean",
            imageUrl:
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
            price: "MockData.status.checkDates",
            rating: 4.7,
            reviewCount: 289,
            categoryKey: "MockData.categories.poolVilla",
        },
        {
            id: "7",
            titleKey: "MockData.pensions.pension3",
            locationKey: "MockData.locations.gangwonHongcheon",
            imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
            price: "MockData.status.checkDates",
            rating: 4.8,
            reviewCount: 567,
            categoryKey: "MockData.categories.poolVilla",
            isFeatured: true,
        },
        {
            id: "8",
            titleKey: "MockData.pensions.pension4",
            locationKey: "MockData.locations.jejuSeogwipo",
            imageUrl:
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
            price: "320,000원",
            rating: 4.9,
            reviewCount: 891,
            categoryKey: "MockData.categories.pension",
        },
    ],
    leisureDeals: [
        {
            id: "l1",
            titleKey: "MockData.leisure.leisure1Title",
            subtitleKey: "MockData.locations.gyeonggiAnseong",
            imageUrl:
                "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&h=600&fit=crop",
            price: "9,500원~",
            originalPrice: "11,000원",
            discount: "13%",
            badgeKey: "MockData.badges.popular",
        },
        {
            id: "l2",
            titleKey: "MockData.leisure.leisure2Title",
            subtitleKey: "MockData.locations.seoulGwacheon",
            imageUrl:
                "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
            price: "6,000원~",
            originalPrice: "8,000원",
            discount: "25%",
        },
        {
            id: "l3",
            titleKey: "MockData.leisure.leisure3Title",
            subtitleKey: "MockData.locations.jejuSeogwipo",
            imageUrl:
                "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800&h=600&fit=crop",
            price: "27,600원~",
            originalPrice: "44,000원",
            discount: "38%",
            badgeKey: "MockData.badges.best",
        },
        {
            id: "l4",
            titleKey: "MockData.leisure.leisure4Title",
            subtitleKey: "MockData.locations.gyeonggiYongin",
            imageUrl:
                "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop",
            price: "42,000원~",
            originalPrice: "62,000원",
            discount: "32%",
        },
    ],
    liveCommerce: [
        {
            id: "lc1",
            titleKey: "MockData.liveCommerce.live1Title",
            scheduledAt: "10.13(월) 19:00",
            status: "scheduled" as const,
            thumbnailUrl:
                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
            discount: "최대 50%",
        },
        {
            id: "lc2",
            titleKey: "MockData.liveCommerce.live2Title",
            scheduledAt: "10.15(수) 11:00",
            status: "scheduled" as const,
            thumbnailUrl:
                "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
            discount: "40%",
        },
        {
            id: "lc3",
            titleKey: "MockData.liveCommerce.live3Title",
            scheduledAt: "MockData.status.replay",
            status: "ended" as const,
            thumbnailUrl:
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
            viewCount: 33000,
        },
        {
            id: "lc4",
            titleKey: "MockData.liveCommerce.live4Title",
            scheduledAt: "MockData.status.replay",
            status: "ended" as const,
            thumbnailUrl:
                "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop",
            viewCount: 21600,
            discount: "47%",
        },
    ],
    promotions: [
        {
            id: "p1",
            titleKey: "MockData.promotions.promo1Title",
            descriptionKey: "MockData.promotions.promo1Desc",
            imageUrl:
                "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=800&h=600&fit=crop",
            link: "/promotion/coupon",
            badgeKey: "MockData.badges.hot",
            badgeColor: "red" as const,
        },
        {
            id: "p2",
            titleKey: "MockData.promotions.promo2Title",
            descriptionKey: "MockData.promotions.promo2Desc",
            imageUrl:
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=600&fit=crop",
            link: "/promotion/draw",
            badgeKey: "MockData.badges.new",
            badgeColor: "blue" as const,
        },
        {
            id: "p3",
            titleKey: "MockData.promotions.promo3Title",
            descriptionKey: "MockData.promotions.promo3Desc",
            imageUrl:
                "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=800&h=600&fit=crop",
            link: "/promotion/gold",
            badgeKey: "MockData.badges.gold",
            badgeColor: "purple" as const,
        },
        {
            id: "p4",
            titleKey: "MockData.promotions.promo4Title",
            descriptionKey: "MockData.promotions.promo4Desc",
            imageUrl:
                "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop",
            link: "/promotion/monthly",
            badgeKey: "MockData.badges.sale",
            badgeColor: "pink" as const,
        },
    ],
};
