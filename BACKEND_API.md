# Backend API Documentation for NOL Travel

This document outlines the complete API structure needed to support the frontend application.

## Base URL

```
Production: https://api.nol-travel.com/v1
Development: http://localhost:4000/v1
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## 📡 API Endpoints

### 1. Authentication & User Management

#### POST `/auth/register`

Register a new user account.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe",
    "phone": "+82-10-1234-5678"
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "user": {
            "id": "user_123",
            "email": "user@example.com",
            "name": "John Doe",
            "role": "user"
        },
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
}
```

#### POST `/auth/login`

Login with email and password.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "securePassword123"
}
```

#### POST `/auth/refresh`

Refresh access token using refresh token.

#### GET `/auth/me` 🔒

Get current authenticated user details.

---

### 2. Search & Discovery

#### POST `/search`

Advanced search for listings.

**Request Body:**

```json
{
    "destination": "서울",
    "checkIn": "2025-10-15",
    "checkOut": "2025-10-17",
    "guests": 2,
    "category": "hotel",
    "priceMin": 50000,
    "priceMax": 500000,
    "amenities": ["wifi", "parking", "pool"],
    "rating": 4.0,
    "sort": "price_asc"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "listings": [...],
    "total": 245,
    "page": 1,
    "pageSize": 20,
    "filters": {
      "priceRange": { "min": 45000, "max": 890000 },
      "availableAmenities": ["wifi", "parking", "pool", "gym"],
      "categories": ["hotel", "pension", "motel"]
    }
  }
}
```

---

### 3. Listings

#### GET `/listings`

Get all listings with filters.

**Query Parameters:**

-   `category` - hotel | pension | motel | glamping
-   `featured` - boolean
-   `page` - number (default: 1)
-   `limit` - number (default: 20)
-   `sort` - price_asc | price_desc | rating | newest

**Response:**

```json
{
    "success": true,
    "data": {
        "listings": [
            {
                "id": "listing_123",
                "title": "호텔 나루 서울-엠갤러리",
                "slug": "hotel-naru-seoul",
                "description": "서울 중심부의 럭셔리 호텔",
                "category": {
                    "id": "cat_1",
                    "name": "호텔",
                    "slug": "hotel"
                },
                "location": {
                    "city": "서울",
                    "country": "대한민국",
                    "coordinates": {
                        "lat": 37.5665,
                        "lng": 126.978
                    }
                },
                "price": {
                    "amount": 583000,
                    "currency": "KRW",
                    "originalAmount": 620000,
                    "discountPercentage": 6
                },
                "images": [
                    {
                        "id": "img_1",
                        "url": "https://cdn.nol-travel.com/hotels/123/main.jpg",
                        "alt": "Hotel main view",
                        "width": 1920,
                        "height": 1080
                    }
                ],
                "rating": 4.8,
                "reviewCount": 1234,
                "amenities": ["wifi", "parking", "pool", "gym", "breakfast"],
                "tags": ["luxury", "business", "family-friendly"],
                "isFeatured": true,
                "isAvailable": true
            }
        ],
        "total": 245,
        "page": 1,
        "limit": 20
    }
}
```

#### GET `/listings/:id`

Get single listing details.

**Response includes additional fields:**

```json
{
    "success": true,
    "data": {
        "...": "all listing fields",
        "rooms": [
            {
                "id": "room_1",
                "name": "디럭스 더블",
                "capacity": 2,
                "price": 250000,
                "amenities": ["king-bed", "city-view"],
                "available": true
            }
        ],
        "availability": {
            "2025-10-15": { "available": true, "price": 250000 },
            "2025-10-16": { "available": false, "price": null }
        },
        "policies": {
            "checkIn": "15:00",
            "checkOut": "11:00",
            "cancellation": "Free cancellation up to 24 hours before check-in"
        },
        "host": {
            "id": "host_1",
            "name": "호텔 나루",
            "verified": true,
            "responseRate": 98,
            "responseTime": "1시간 이내"
        }
    }
}
```

#### GET `/listings/:id/availability`

Check availability for specific dates.

**Query Parameters:**

-   `from` - date (YYYY-MM-DD)
-   `to` - date (YYYY-MM-DD)

---

### 4. Banners & Promotions

#### GET `/banners`

Get homepage banners.

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "banner_1",
            "title": "올가을엔 충북으로 WELL&COME",
            "description": "충북 여행 특가 최대 50% 할인",
            "imageUrl": "https://cdn.nol-travel.com/banners/autumn.jpg",
            "link": "/promotion/chungbuk-autumn",
            "priority": 1
        }
    ]
}
```

#### GET `/promotions`

Get all active promotions.

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "promo_1",
            "title": "최대 5만원 쿠폰팩",
            "description": "지금 바로 받아가세요",
            "imageUrl": "https://cdn.nol-travel.com/promos/coupon.jpg",
            "link": "/promotion/coupon",
            "badge": "HOT",
            "badgeColor": "red",
            "validFrom": "2025-10-01T00:00:00Z",
            "validTo": "2025-10-31T23:59:59Z",
            "discount": {
                "type": "amount",
                "value": 50000
            }
        }
    ]
}
```

---

### 5. Deals & Special Offers

#### GET `/deals`

Get all active deals.

**Query Parameters:**

-   `category` - leisure | hotel | pension
-   `featured` - boolean

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "deal_1",
            "title": "★NOL 단독 특가★ 안성팜랜드 입장권",
            "description": "가족과 함께 즐기는 농장 체험",
            "listing": {
                "id": "listing_456",
                "title": "안성팜랜드",
                "...": "listing fields"
            },
            "validFrom": "2025-10-01T00:00:00Z",
            "validTo": "2025-11-30T23:59:59Z",
            "discountPercentage": 13,
            "remainingSpots": 50
        }
    ]
}
```

---

### 6. Live Commerce

#### GET `/live-commerce`

Get live commerce sessions.

**Query Parameters:**

-   `status` - scheduled | live | ended
-   `upcoming` - boolean (get only upcoming sessions)

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "live_1",
            "title": "[신화월드x진에어] 한 번에 준비하는 제주 여행 특가!",
            "scheduledAt": "2025-10-13T19:00:00Z",
            "status": "scheduled",
            "thumbnailUrl": "https://cdn.nol-travel.com/live/jeju.jpg",
            "viewCount": 0,
            "deal": {
                "discountPercentage": 50,
                "...": "deal fields"
            }
        }
    ]
}
```

---

### 7. Bookings

#### POST `/bookings` 🔒

Create a new booking.

**Request Body:**

```json
{
    "listingId": "listing_123",
    "checkIn": "2025-10-15",
    "checkOut": "2025-10-17",
    "guests": 2,
    "roomId": "room_1",
    "specialRequests": "Late check-in, non-smoking room"
}
```

**Response:**

```json
{
    "success": true,
    "data": {
        "booking": {
            "id": "booking_789",
            "status": "pending_payment",
            "listing": { "...": "listing details" },
            "checkIn": "2025-10-15",
            "checkOut": "2025-10-17",
            "guests": 2,
            "nights": 2,
            "pricing": {
                "basePrice": 500000,
                "discount": 30000,
                "tax": 50000,
                "serviceFee": 20000,
                "total": 540000,
                "currency": "KRW"
            },
            "cancellationPolicy": "Free cancellation until 2025-10-14",
            "createdAt": "2025-10-04T10:30:00Z"
        },
        "paymentIntent": {
            "id": "pi_123",
            "amount": 540000,
            "currency": "KRW",
            "expiresAt": "2025-10-04T10:45:00Z"
        }
    }
}
```

#### GET `/bookings/:id` 🔒

Get booking details.

#### PATCH `/bookings/:id/cancel` 🔒

Cancel a booking.

#### GET `/user/bookings` 🔒

Get all bookings for current user.

**Query Parameters:**

-   `status` - pending | confirmed | completed | cancelled
-   `page`, `limit`

---

### 8. Reviews

#### POST `/reviews` 🔒

Create a review for a completed booking.

**Request Body:**

```json
{
    "bookingId": "booking_789",
    "listingId": "listing_123",
    "rating": 5,
    "title": "Amazing stay!",
    "text": "The hotel was fantastic. Great location, clean rooms...",
    "images": ["img_url_1", "img_url_2"]
}
```

#### GET `/listings/:id/reviews`

Get reviews for a listing.

**Query Parameters:**

-   `sort` - newest | highest_rated | lowest_rated
-   `rating` - 1-5 (filter by rating)
-   `page`, `limit`

---

### 9. Favorites

#### POST `/user/favorites` 🔒

Add listing to favorites.

**Request Body:**

```json
{
    "listingId": "listing_123"
}
```

#### DELETE `/user/favorites/:listingId` 🔒

Remove from favorites.

#### GET `/user/favorites` 🔒

Get all favorited listings.

---

### 10. Notifications

#### GET `/user/notifications` 🔒

Get user notifications.

**Response:**

```json
{
    "success": true,
    "data": [
        {
            "id": "notif_1",
            "type": "booking_confirmed",
            "title": "예약이 확정되었습니다",
            "message": "호텔 나루 서울 예약이 확정되었습니다.",
            "payload": {
                "bookingId": "booking_789",
                "listingId": "listing_123"
            },
            "readAt": null,
            "createdAt": "2025-10-04T10:35:00Z"
        }
    ],
    "unreadCount": 3
}
```

#### PATCH `/user/notifications/:id/read` 🔒

Mark notification as read.

---

## 🔐 Error Responses

All errors follow this format:

```json
{
    "success": false,
    "error": {
        "code": "INVALID_CREDENTIALS",
        "message": "Email or password is incorrect",
        "details": {}
    }
}
```

### Common Error Codes

-   `UNAUTHORIZED` - 401
-   `FORBIDDEN` - 403
-   `NOT_FOUND` - 404
-   `VALIDATION_ERROR` - 422
-   `RATE_LIMIT_EXCEEDED` - 429
-   `INTERNAL_SERVER_ERROR` - 500

---

## 📊 Database Schema

### users

```sql
id: UUID PRIMARY KEY
email: VARCHAR(255) UNIQUE NOT NULL
password_hash: VARCHAR(255) NOT NULL
name: VARCHAR(100) NOT NULL
phone: VARCHAR(20)
avatar: VARCHAR(500)
role: ENUM('user', 'admin', 'host')
email_verified: BOOLEAN DEFAULT false
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### listings

```sql
id: UUID PRIMARY KEY
host_id: UUID FOREIGN KEY -> users.id
title: VARCHAR(255) NOT NULL
slug: VARCHAR(255) UNIQUE NOT NULL
description: TEXT
category_id: UUID FOREIGN KEY -> categories.id
location_city: VARCHAR(100)
location_country: VARCHAR(100)
location_lat: DECIMAL(10, 8)
location_lng: DECIMAL(11, 8)
price: DECIMAL(10, 2) NOT NULL
currency: VARCHAR(3) DEFAULT 'KRW'
images: JSONB
amenities: JSONB
rating: DECIMAL(3, 2)
review_count: INTEGER DEFAULT 0
is_featured: BOOLEAN DEFAULT false
is_available: BOOLEAN DEFAULT true
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### bookings

```sql
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY -> users.id
listing_id: UUID FOREIGN KEY -> listings.id
check_in: DATE NOT NULL
check_out: DATE NOT NULL
guests: INTEGER NOT NULL
nights: INTEGER NOT NULL
base_price: DECIMAL(10, 2)
discount: DECIMAL(10, 2)
tax: DECIMAL(10, 2)
total_price: DECIMAL(10, 2) NOT NULL
status: ENUM('pending', 'confirmed', 'completed', 'cancelled')
payment_id: VARCHAR(255)
special_requests: TEXT
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### reviews

```sql
id: UUID PRIMARY KEY
booking_id: UUID FOREIGN KEY -> bookings.id
listing_id: UUID FOREIGN KEY -> listings.id
user_id: UUID FOREIGN KEY -> users.id
rating: INTEGER CHECK (rating >= 1 AND rating <= 5)
title: VARCHAR(255)
text: TEXT
images: JSONB
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

---

## 🚀 Implementation Guidelines

### 1. Rate Limiting

-   Implement rate limiting per IP and per user
-   Suggested: 100 requests/minute per IP, 1000 requests/hour per authenticated user

### 2. Caching Strategy

-   Cache listings: 5-15 minutes
-   Cache search results: 2-5 minutes
-   Cache user data: Session duration
-   Use Redis for caching

### 3. Image Upload

-   Use signed URLs for direct S3 upload
-   Support formats: JPG, PNG, WebP
-   Max size: 10MB per image
-   Generate thumbnails: 400x300, 800x600, 1600x1200

### 4. Search Optimization

-   Use Elasticsearch or Algolia for full-text search
-   Index: title, description, location, amenities
-   Support fuzzy matching and autocomplete

### 5. Payment Integration

-   Integrate Stripe or local payment gateway
-   Support: Credit card, bank transfer, mobile payment
-   Implement payment webhooks for status updates

### 6. Real-time Features

-   WebSocket for live commerce view counts
-   Server-Sent Events for notifications
-   Real-time availability updates

---

## 📝 Notes for Backend Developer

1. **Validation**: Use Zod or Joi for request validation
2. **Authentication**: JWT with refresh tokens (15min access, 7d refresh)
3. **Logging**: Structure logs with request ID, user ID, timestamp
4. **Testing**: Write integration tests for all endpoints
5. **Documentation**: Auto-generate API docs with Swagger/OpenAPI
6. **Monitoring**: Set up health checks, metrics, and alerts
7. **Deployment**: Use Docker, CI/CD with GitHub Actions

---

For questions or clarifications, please contact the frontend team.
