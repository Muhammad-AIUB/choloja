# Translated Mock Data Guide

## Overview

The mock data has been fully internationalized to support Korean, English, and Bengali translations. All hardcoded text in the mock data is now translatable.

## File Structure

```
lib/constants/
├── mockData.ts                    # Original mock data (kept for reference)
├── translatedMockData.ts          # Mock data with translation keys
└── useTranslatedMockData.ts       # Hook to get translated mock data
```

## How It Works

### 1. Translation Keys Structure

All translatable text from mock data is stored in translation files under the `MockData` namespace:

```json
{
    "MockData": {
        "banners": {
            "banner1Title": "올가을엔 충북으로 WELL&COME"
        },
        "hotels": {
            "hotel1": "호텔 나루 서울-엠갤러리"
        },
        "locations": {
            "seoulJunggu": "서울 중구"
        },
        "badges": {
            "hot": "HOT",
            "popular": "인기"
        }
    }
}
```

### 2. Translated Mock Data Structure

`translatedMockData.ts` contains the mock data with translation keys instead of hardcoded strings:

```typescript
{
  id: "1",
  titleKey: "MockData.hotels.hotel1",      // Translation key
  locationKey: "MockData.locations.seoulJunggu",
  price: "583,000원",                      // Numeric data stays as-is
  rating: 4.8
}
```

### 3. Using the Hook

The `useTranslatedMockData` hook automatically resolves all translation keys:

```tsx
import { useTranslatedMockData } from "@/lib/constants/useTranslatedMockData";

function MyComponent() {
    const { mockBanners, mockHotelListings } = useTranslatedMockData();

    // mockBanners now has 'title' instead of 'titleKey'
    // All translations are resolved based on current locale
}
```

## What Was Translated

### Banners (3 items)

-   Banner titles for promotional campaigns

### Hotels (4 items)

-   Hotel names
-   Location descriptions
-   Category labels

### Pensions (4 items)

-   Pension/villa names
-   Location descriptions
-   Category labels (Pension, Pool Villa)

### Leisure Deals (4 items)

-   Attraction titles
-   Location descriptions
-   Badge labels (Popular, Best)

### Live Commerce (4 items)

-   Live streaming event titles
-   Status text (Replay)

### Promotions (4 items)

-   Promotion titles
-   Promotion descriptions
-   Badge labels (HOT, NEW, GOLD, SALE)

### Locations (11 locations)

All Korean location names are translated:

-   Seoul districts (Jung-gu, Guro-gu, Seocho-gu, Yongsan-gu)
-   Gyeonggi regions (Gapyeong, Anseong, Yongin)
-   Gangwon, Chungnam, Jeju regions

### Categories & Badges

-   Hotel, Pension, Pool Villa
-   HOT, NEW, GOLD, SALE, Popular, Best
-   Status messages (Check other dates, Replay)

## Usage Example

### Before (Old Way)

```tsx
import { mockHotelListings } from "@/lib/constants/mockData";

// Hardcoded Korean text
const hotel = mockHotelListings[0];
console.log(hotel.title); // "호텔 나루 서울-엠갤러리"
```

### After (New Way)

```tsx
import { useTranslatedMockData } from "@/lib/constants/useTranslatedMockData";

function HotelList() {
    const { mockHotelListings } = useTranslatedMockData();

    const hotel = mockHotelListings[0];
    console.log(hotel.title);
    // Korean: "호텔 나루 서울-엠갤러리"
    // English: "Hotel Naru Seoul - MGallery"
    // Bengali: "হোটেল নারু সিউল - এমগ্যালারি"
}
```

## Implementation in Homepage

The homepage (`app/page.tsx`) has been updated to use the translated mock data:

```tsx
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
        <main>
            <BannerCarousel banners={mockBanners} />
            <ListingSection listings={mockHotelListings} />
            {/* All data is now translated! */}
        </main>
    );
}
```

## Adding New Mock Data

To add new translatable mock data:

1. **Add translation keys** to all three language files:

```json
// messages/ko.json
"MockData": {
  "newCategory": {
    "item1": "새로운 아이템"
  }
}

// messages/en.json
"MockData": {
  "newCategory": {
    "item1": "New Item"
  }
}

// messages/bn.json
"MockData": {
  "newCategory": {
    "item1": "নতুন আইটেম"
  }
}
```

2. **Add to translatedMockData.ts**:

```typescript
export const translatedMockData = {
    // ... existing data
    newItems: [
        {
            id: "1",
            titleKey: "MockData.newCategory.item1",
            // other fields...
        },
    ],
};
```

3. **Update useTranslatedMockData.ts**:

```typescript
export function useTranslatedMockData() {
    const t = useTranslations();

    return {
        // ... existing data
        mockNewItems: translatedMockData.newItems.map((item) => ({
            ...item,
            title: t(item.titleKey),
        })),
    };
}
```

## Benefits

✅ **Full i18n Support**: All mock data text is now translatable
✅ **Automatic Translation**: Hook automatically resolves current locale
✅ **Type Safety**: TypeScript interfaces ensure correct structure
✅ **Easy Maintenance**: Centralized translations in JSON files
✅ **No Component Changes**: Existing components work without modification
✅ **Language Switching**: Data updates instantly when language changes

## Notes

-   Prices are kept in original format (원) - can be localized further if needed
-   Dates and times are kept in original format - can be localized with Intl API
-   Images URLs remain unchanged across languages
-   Numeric data (ratings, review counts) remain unchanged

## Future Enhancements

Potential improvements:

-   Localize price formatting (KRW, USD, BDT)
-   Localize date/time formats
-   Add locale-specific images
-   Implement dynamic data fetching from API with locale parameter
