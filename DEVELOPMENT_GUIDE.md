# 🎯 Frontend Development Guide

## Project Overview

This is a production-ready, modular Next.js 15 frontend for a travel booking platform. Every component is reusable, fully typed, and ready for backend integration.

---

## 📂 Project Structure Explained

### `/app` - Next.js App Router

-   `layout.tsx` - Root layout with Header and Footer
-   `page.tsx` - Homepage with all sections
-   `globals.css` - Global styles and Tailwind configuration

### `/components/home` - Homepage Components

All homepage-specific components are here and can be reused on other pages:

-   **HeroSection.tsx** - Main hero with search and category tabs
-   **SearchBar.tsx** - Reusable search input component
-   **BannerCarousel.tsx** - Auto-rotating banner slider
-   **DealCarousel.tsx** - Horizontal scrolling deal cards
-   **LiveCommerceGrid.tsx** - Grid layout for live commerce
-   **ListingCard.tsx** - Single listing card (hotel, pension, etc.)
-   **ListingSection.tsx** - Section with horizontal scrolling listings
-   **PromotionCard.tsx** - Promotional card with image overlay

### `/components/layout` - Layout Components

-   **Header.tsx** - Top navigation with mobile menu
-   **Footer.tsx** - Footer with links and company info

### `/components/ui` - Base UI Components

Reusable building blocks used throughout the app:

-   **badge.tsx** - Colored badges with variants
-   **button.tsx** - Button with multiple variants
-   **card.tsx** - Card container with header, content, footer
-   **container.tsx** - Max-width container with responsive padding
-   **section.tsx** - Page section wrapper with consistent spacing

### `/types` - TypeScript Types

All data types for the application. Ready for backend integration.

### `/lib` - Utilities

-   **utils.ts** - Helper functions (cn for className merging)
-   **constants/mockData.ts** - Mock data for development

---

## 🎨 Component Usage Guide

### 1. Creating a New Page

```tsx
// app/hotels/page.tsx
import { ListingSection } from "@/components/home/ListingSection";
import { Section } from "@/components/ui/section";

export default function HotelsPage() {
    return (
        <main>
            <Section title="All Hotels">
                <ListingSection
                    title=""
                    listings={hotelData}
                    viewAllLink="/hotels/all"
                />
            </Section>
        </main>
    );
}
```

### 2. Using UI Components

#### Button

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

#### Badge

```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="warning">Warning</Badge>
```

#### Card

```tsx
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

<Card>
    <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text</CardDescription>
    </CardHeader>
    <CardContent>
        <p>Card content goes here</p>
    </CardContent>
</Card>;
```

### 3. Layout Components

#### Container

```tsx
import { Container } from "@/components/ui/container";

<Container size="sm">Small container</Container>
<Container size="md">Medium container</Container>
<Container size="lg">Large container</Container>
<Container size="xl">Extra large (default)</Container>
```

#### Section

```tsx
import { Section } from "@/components/ui/section";

<Section
    title="Section Title"
    subtitle="Optional subtitle"
    background="gray"
    action={<Button>View All</Button>}
>
    Content goes here
</Section>;
```

### 4. Home Components

#### ListingSection

```tsx
import { ListingSection } from "@/components/home/ListingSection";

<ListingSection
    title="Featured Hotels"
    subtitle="Best deals this week"
    listings={listings}
    viewAllLink="/hotels"
/>;
```

#### DealCarousel

```tsx
import { DealCarousel } from "@/components/home/DealCarousel";

<DealCarousel deals={deals} title="Special Deals" />;
```

---

## 🔌 Connecting to Backend

### Step 1: Create API Client

```tsx
// lib/api/client.ts
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/v1";

export async function fetchAPI<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
}
```

### Step 2: Create Data Fetching Functions

```tsx
// lib/api/listings.ts
import { fetchAPI } from "./client";
import { Listing } from "@/types";

export async function getListings(params?: {
    category?: string;
    featured?: boolean;
}): Promise<Listing[]> {
    const searchParams = new URLSearchParams(params as any);
    return fetchAPI<Listing[]>(`/listings?${searchParams}`);
}

export async function getListingById(id: string): Promise<Listing> {
    return fetchAPI<Listing>(`/listings/${id}`);
}
```

### Step 3: Use in Server Components

```tsx
// app/hotels/page.tsx
import { getListings } from "@/lib/api/listings";
import { ListingSection } from "@/components/home/ListingSection";

export default async function HotelsPage() {
    // Fetch data on the server
    const hotels = await getListings({ category: "hotel" });

    return (
        <main>
            <ListingSection
                title="Hotels"
                listings={hotels}
                viewAllLink="/hotels/all"
            />
        </main>
    );
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60; // Revalidate every 60 seconds
```

### Step 4: Client-Side Data Fetching

For interactive components that need client-side data:

```tsx
"use client";

import { useState, useEffect } from "react";
import { getListings } from "@/lib/api/listings";

export function InteractiveListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadListings() {
            try {
                const data = await getListings();
                setListings(data);
            } catch (error) {
                console.error("Failed to load listings:", error);
            } finally {
                setLoading(false);
            }
        }

        loadListings();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
        </div>
    );
}
```

---

## 🎯 TypeScript Type Safety

All components use proper TypeScript types. When connecting to backend:

1. **Update types in `/types/index.ts`** to match your API response
2. **Use type assertions** when needed
3. **Validate data** with Zod (optional but recommended)

Example with Zod validation:

```tsx
// lib/schemas/listing.ts
import { z } from "zod";

export const listingSchema = z.object({
    id: z.string(),
    title: z.string(),
    location: z.string(),
    price: z.string(),
    rating: z.number().min(0).max(5).optional(),
    // ... other fields
});

export type Listing = z.infer<typeof listingSchema>;

// Validate API response
export function validateListing(data: unknown): Listing {
    return listingSchema.parse(data);
}
```

---

## 📱 Responsive Design Tips

### Breakpoints

```tsx
// Mobile First
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// Grid layouts
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Hiding Elements

```tsx
// Show only on mobile
<div className="block md:hidden">Mobile only</div>

// Show only on desktop
<div className="hidden md:block">Desktop only</div>
```

---

## 🚀 Performance Optimization

### 1. Image Optimization

Always use Next.js Image component:

```tsx
import Image from "next/image";

<Image
    src="/image.jpg"
    alt="Description"
    width={800}
    height={600}
    priority // For above-the-fold images
    placeholder="blur" // Optional blur placeholder
/>;
```

### 2. Code Splitting

Use dynamic imports for heavy components:

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
    loading: () => <p>Loading...</p>,
    ssr: false, // Disable SSR if not needed
});
```

### 3. Caching Strategy

```tsx
// ISR - Revalidate every 60 seconds
export const revalidate = 60;

// Or use fetch with custom cache
const data = await fetch("https://api.example.com/data", {
    next: { revalidate: 60 },
});
```

---

## 🎨 Styling Best Practices

### 1. Use Tailwind Utility Classes

```tsx
<div className="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm">
```

### 2. Use cn() for Conditional Classes

```tsx
import { cn } from '@/lib/utils';

<button className={cn(
  "rounded px-4 py-2",
  isActive && "bg-blue-500 text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>
```

### 3. Create Reusable Variants

```tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva("rounded font-medium transition-colors", {
    variants: {
        variant: {
            primary: "bg-blue-500 text-white hover:bg-blue-600",
            secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        },
        size: {
            sm: "px-3 py-1 text-sm",
            md: "px-4 py-2",
            lg: "px-6 py-3 text-lg",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});
```

---

## 🐛 Debugging Tips

### 1. Enable React DevTools

Already enabled in development mode.

### 2. Check Network Requests

```tsx
// Add logging to API calls
console.log("Fetching data:", endpoint);
const data = await fetch(endpoint);
console.log("Received:", data);
```

### 3. TypeScript Errors

```bash
# Check types
pnpm tsc --noEmit

# Check lint
pnpm lint
```

---

## 📦 Adding New Features

### Example: Adding a Favorites System

1. **Create the component**

```tsx
// components/features/FavoriteButton.tsx
"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export function FavoriteButton({ listingId }: { listingId: string }) {
    const [isFavorited, setIsFavorited] = useState(false);

    const toggleFavorite = async () => {
        // API call here
        setIsFavorited(!isFavorited);
    };

    return (
        <button onClick={toggleFavorite}>
            <Heart className={isFavorited ? "fill-red-500 text-red-500" : ""} />
        </button>
    );
}
```

2. **Add to ListingCard**

```tsx
// components/home/ListingCard.tsx
import { FavoriteButton } from "@/components/features/FavoriteButton";

// Add in the image overlay
<FavoriteButton listingId={listing.id} />;
```

---

## 🔒 Authentication Flow

### 1. Create Auth Context

```tsx
// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        // API call
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)!;
```

2. **Wrap app in layout.tsx**

```tsx
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <AuthProvider>
                    <Header />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
```

---

## 📚 Further Reading

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)
-   [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

---

## 🆘 Common Issues & Solutions

### Issue: "Module not found"

**Solution**: Check import paths use `@/` alias correctly

### Issue: "Hydration error"

**Solution**: Ensure server and client render the same HTML. Check for date/time formatting or random IDs.

### Issue: Images not loading

**Solution**: Add image domains to `next.config.ts`:

```ts
images: {
  domains: ['images.unsplash.com', 'cdn.your-site.com'],
}
```

---

For questions or issues, check the GitHub repository or contact the development team.
