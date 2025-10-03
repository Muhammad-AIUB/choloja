# Hotel Detail Page Implementation Guide

## Overview

This document describes the implementation of dynamic hotel and pension detail pages based on the Yanolja website concept.

## Features Implemented

### 1. Dynamic Routing

-   **Hotel Route**: `/hotel/[id]` - Dynamic hotel detail pages
-   **Pension Route**: `/pension/[id]` - Dynamic pension detail pages
-   Homepage cards automatically route to the correct detail page based on category

### 2. Page Components

#### Main Sections

1. **Image Gallery** (`AccommodationGallery`)

    - Full-screen lightbox with keyboard navigation
    - Thumbnail strip at bottom
    - Image counter display
    - Smooth transitions and hover effects

2. **Property Information**

    - Title, location, and rating
    - Badge display (베스트셀러, 프리미엄, etc.)
    - Share and favorite buttons
    - Detailed description

3. **Amenities Grid**

    - Icon-based display
    - Categorized facilities and services
    - WiFi, parking, pool, fitness, restaurant, etc.

4. **Room Listings** (`RoomCard`)

    - Multiple images per room with carousel
    - Capacity information (standard/max persons)
    - Bed type and room size
    - Pricing with discounts
    - Availability status (available, limited, sold out)
    - Amenity badges
    - Package deals
    - Cancellation policy
    - Book now button

5. **Reviews Section** (`ReviewsSection`)

    - Overall rating display
    - AI-powered review summary
    - Individual reviews with ratings
    - Helpful vote counts
    - Show more/less functionality

6. **Location & Check-in**

    - Address display
    - Map placeholder (ready for integration)
    - Check-in/check-out times

7. **Booking Sidebar**
    - Sticky positioning
    - Price range display
    - Date selection inputs
    - Check availability button
    - Free cancellation & instant confirmation badges

### 3. Components Created

#### `/components/accommodation/AccommodationGallery.tsx`

-   Client-side component for image display
-   Lightbox functionality with arrow navigation
-   ESC key to close
-   Thumbnail navigation

#### `/components/accommodation/RoomCard.tsx`

-   Displays individual room details
-   Image carousel for room photos
-   Dynamic availability badges
-   Package information display
-   Translatable content

#### `/components/accommodation/ReviewsSection.tsx`

-   Overall rating with star display
-   AI review summary with gradient background
-   Individual review cards
-   Helpful button
-   Date formatting

### 4. Custom Hook

#### `/lib/hooks/useAccommodationDetail.ts`

-   Fetches accommodation data by ID
-   Loading state management
-   Error handling
-   Mock data for 3 accommodations:
    -   ID 1: 서울 스카이라인 호텔 (Seoul business hotel)
    -   ID 2: 제주 오션뷰 펜션 (Jeju ocean view pension)
    -   ID 3: 부산 해운대 리조트 (Busan Haeundae resort)

### 5. TypeScript Types

#### Added to `/types/index.ts`:

```typescript
- Room: Room details with pricing, capacity, amenities
- RoomPackage: Package deals for rooms
- Amenity: Facility/service information
- Review: Guest review data
- AccommodationDetail: Complete accommodation information
```

### 6. Internationalization

#### Translation Keys Added (3 languages: KO, EN, BN)

```json
HotelDetail: {
  notFound, backToHome, back, reviews,
  aboutProperty, amenities, availableRooms,
  location, checkInOut, checkIn, checkOut,
  perNight, checkAvailability, freeCancellation,
  instantConfirmation, mapPlaceholder, soldOut,
  limitedRooms, capacity, standardPerson, maxPerson,
  bookNow, reviewCount, aiReviewSummary, helpful,
  showAllReviews, showLessReviews
}
```

### 7. Homepage Integration

#### Updated `ListingCard.tsx`:

-   Added dynamic routing logic
-   Automatically detects category (hotel vs pension)
-   Routes to `/hotel/[id]` or `/pension/[id]`
-   Maintains all existing functionality

## Mock Data Structure

### Accommodation Example:

```typescript
{
  id: '1',
  title: '서울 스카이라인 호텔',
  location: '서울 강남구',
  address: 'Full address',
  rating: 4.8,
  reviewCount: 342,
  description: 'Detailed description',
  images: ['url1', 'url2', ...],
  priceRange: '₩80,000 - ₩250,000',
  checkInTime: '15:00',
  checkOutTime: '11:00',
  badges: ['베스트셀러', '프리미엄'],
  amenities: [{ id, name, icon, category }],
  rooms: [Room objects],
  reviews: [Review objects],
  aiReviewSummary: 'AI-generated summary',
  policies: { cancellation, children, pets, smoking }
}
```

## User Flow

1. **Homepage**: User clicks on a hotel/pension card
2. **Navigation**: Routes to `/hotel/[id]` or `/pension/[id]`
3. **Detail Page**: Shows complete accommodation information
4. **Gallery**: Click images to open lightbox
5. **Room Selection**: Browse available rooms with pricing
6. **Booking**: Click "Book Now" (modal to be implemented)
7. **Reviews**: Read guest reviews and AI summary
8. **Language Switch**: All content translates (KO/EN/BN)

## Technical Details

### Loading States

-   Skeleton loading animation while fetching data
-   Graceful error handling with "not found" page

### Responsive Design

-   Mobile-first approach
-   Grid layout adapts to screen size
-   Sticky booking card on desktop
-   Touch-friendly controls

### Performance

-   Next.js Image optimization
-   Dynamic imports for components
-   Lazy loading for images below fold

## Future Enhancements (TODO)

1. **Booking Modal**: Date selection and confirmation
2. **Map Integration**: Google Maps or Kakao Map
3. **Real API Integration**: Replace mock data with backend
4. **Image Optimization**: Add blur placeholders
5. **SEO Optimization**: Add meta tags and structured data
6. **Analytics**: Track user interactions
7. **Wishlist Feature**: Save favorite properties
8. **Social Sharing**: Share accommodation details
9. **Filter & Sort Rooms**: By price, capacity, amenities
10. **Availability Calendar**: Visual date selection

## Files Modified/Created

### Created:

-   `/app/hotel/[id]/page.tsx`
-   `/app/pension/[id]/page.tsx`
-   `/components/accommodation/AccommodationGallery.tsx`
-   `/components/accommodation/RoomCard.tsx`
-   `/components/accommodation/ReviewsSection.tsx`
-   `/lib/hooks/useAccommodationDetail.ts`

### Modified:

-   `/types/index.ts` - Added accommodation types
-   `/components/home/ListingCard.tsx` - Added routing logic
-   `/messages/en.json` - Added HotelDetail translations
-   `/messages/ko.json` - Added HotelDetail translations
-   `/messages/bn.json` - Added HotelDetail translations

## Testing Checklist

-   [x] Hotel detail page loads correctly
-   [x] Pension detail page loads correctly
-   [x] Image gallery lightbox works
-   [x] Room cards display properly
-   [x] Reviews section shows correctly
-   [x] Language switching works
-   [x] Responsive design on mobile
-   [x] Loading states display
-   [x] Error handling for invalid IDs
-   [x] Back button navigation
-   [ ] Booking flow (pending modal implementation)
-   [ ] Date selection validation
-   [ ] Map integration

## Development Server

Run the development server:

```bash
pnpm dev
```

Visit:

-   Homepage: http://localhost:3000
-   Hotel Example: http://localhost:3000/hotel/1
-   Pension Example: http://localhost:3000/pension/2
-   Resort Example: http://localhost:3000/hotel/3

## Notes

-   All accommodation IDs are currently hardcoded (1, 2, 3)
-   Images use Unsplash placeholder URLs
-   Mock data simulates API responses with 500ms delay
-   Translation keys follow the existing i18n pattern
-   Component structure follows Next.js 15 best practices
-   Uses Tailwind CSS for all styling
