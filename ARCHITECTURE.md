# 🏗️ Component Architecture

## Component Hierarchy

```
App
├── RootLayout (app/layout.tsx)
│   ├── Header
│   │   ├── Container
│   │   ├── Navigation Items
│   │   ├── Button (Search, Cart, User)
│   │   └── Mobile Menu
│   ├── [Page Content]
│   └── Footer
│       ├── Container
│       ├── Social Links
│       └── Company Info
│
└── Homepage (app/page.tsx)
    ├── HeroSection
    │   ├── Container
    │   ├── Category Tabs (Button)
    │   └── SearchBar
    │       ├── Input (Destination)
    │       ├── Input (Check-in)
    │       ├── Input (Check-out)
    │       ├── Select (Guests)
    │       └── Button (Search)
    │
    ├── Section (Banners)
    │   ├── Container
    │   └── BannerCarousel
    │       ├── Image Slides
    │       ├── Navigation Buttons
    │       └── Indicators
    │
    ├── Section (Promotions)
    │   ├── Container
    │   └── Grid
    │       └── PromotionCard × 4
    │           ├── Card
    │           ├── Image
    │           └── Badge
    │
    ├── Section (Live Commerce)
    │   ├── Container
    │   └── LiveCommerceGrid
    │       └── Grid
    │           └── Card × N
    │               ├── Image
    │               ├── Badge (Live/Scheduled)
    │               └── CardContent
    │
    ├── Section (Hotels)
    │   ├── Container
    │   └── ListingSection
    │       ├── Header (Title + View All Button)
    │       ├── Navigation Buttons
    │       └── Scroll Container
    │           └── ListingCard × N
    │               ├── Card
    │               ├── Image
    │               ├── Badges
    │               └── CardContent
    │                   ├── Title
    │                   ├── Location
    │                   ├── Rating
    │                   └── Price
    │
    ├── Section (Pensions)
    │   └── [Same as Hotels]
    │
    ├── Section (Leisure)
    │   ├── Container
    │   └── DealCarousel
    │       ├── Navigation Buttons
    │       └── Scroll Container
    │           └── Card × N
    │               ├── Image
    │               ├── Badges
    │               └── Content
    │
    ├── Section (Destinations)
    │   ├── Container
    │   └── Grid
    │       └── Destination Card × 3
    │           ├── Image
    │           └── Overlay Text
    │
    └── Section (Trust Indicators)
        ├── Container
        └── Grid
            └── Feature × 4
                ├── Icon
                ├── Title
                └── Description
```

## Component Dependencies

### Base Components (No dependencies)

```
components/ui/
├── badge.tsx
├── button.tsx
└── card.tsx
```

### Layout Components (Depend on Base)

```
components/ui/
├── container.tsx
└── section.tsx
    └── uses: Container

components/layout/
├── Header.tsx
    └── uses: Container, Button, Badge
└── Footer.tsx
    └── uses: Container
```

### Home Components (Depend on Base + Layout)

```
components/home/
├── SearchBar.tsx
│   └── uses: Button
│
├── HeroSection.tsx
│   └── uses: Container, SearchBar, Button
│
├── BannerCarousel.tsx
│   └── uses: Button, Badge
│
├── ListingCard.tsx
│   └── uses: Card, CardContent, Badge
│
├── ListingSection.tsx
│   └── uses: ListingCard, Button
│
├── DealCarousel.tsx
│   └── uses: Card, CardContent, Badge, Button
│
├── LiveCommerceGrid.tsx
│   └── uses: Card, CardContent, Badge
│
└── PromotionCard.tsx
    └── uses: Card, Badge
```

## Data Flow

```
Mock Data (lib/constants/mockData.ts)
    ↓
Homepage (app/page.tsx)
    ↓
Components receive data as props
    ↓
Render UI
```

### Future API Integration:

```
Backend API
    ↓
API Client (lib/api/client.ts) [TO BE CREATED]
    ↓
Data Fetching Functions (lib/api/*.ts) [TO BE CREATED]
    ↓
Server Components (app/**/page.tsx)
    ↓
Props to Child Components
    ↓
Render UI
```

## Component Props Interface

### Reusable Components

#### Button

```typescript
interface ButtonProps {
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    onClick?: () => void;
}
```

#### Badge

```typescript
interface BadgeProps {
    variant?: "default" | "success" | "destructive" | "warning";
    children: React.ReactNode;
}
```

#### Card

```typescript
// Card has no required props, children only
interface CardProps {
    children: React.ReactNode;
    className?: string;
}
```

#### Container

```typescript
interface ContainerProps {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
    className?: string;
}
```

#### Section

```typescript
interface SectionProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
    background?: "white" | "gray" | "transparent";
    containerSize?: "sm" | "md" | "lg" | "xl" | "full";
}
```

### Home Components

#### SearchBar

```typescript
interface SearchBarProps {
    onSearch?: (params: SearchParams) => void;
}

interface SearchParams {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}
```

#### ListingCard

```typescript
interface ListingCardProps {
    listing: Listing;
}

// Listing type defined in types/index.ts
```

#### ListingSection

```typescript
interface ListingSectionProps {
    title: string;
    subtitle?: string;
    listings: Listing[];
    viewAllLink?: string;
}
```

#### DealCarousel

```typescript
interface DealCarouselProps {
    deals: Deal[];
    title?: string;
}
```

#### BannerCarousel

```typescript
interface BannerCarouselProps {
    banners: Banner[];
    autoPlayInterval?: number; // default: 5000ms
}
```

#### LiveCommerceGrid

```typescript
interface LiveCommerceGridProps {
    items: LiveCommerce[];
    title?: string;
}
```

#### PromotionCard

```typescript
interface PromotionCardProps {
    promotion: Promotion;
}
```

## State Management

### Current State (Static)

All data comes from `mockData.ts` - no state management needed.

### Future State (Dynamic)

#### Server State (Recommended: React Server Components)

```
API Data → Server Component → Props → Client Component
```

#### Client State (When needed)

-   **Local State**: `useState` for component-specific state
-   **URL State**: Search params for filters/pagination
-   **Global State**: Context API or Zustand for user auth, cart, etc.

Example:

```tsx
// Local state for interactive features
const [isFavorited, setIsFavorited] = useState(false);

// URL state for search/filters
const searchParams = useSearchParams();
const category = searchParams.get("category");

// Global state for auth
const { user } = useAuth();
```

## Performance Optimization Strategy

### Server Components (Default)

-   Homepage sections
-   Listing grids
-   Static content
-   **Benefit**: Fast initial load, SEO-friendly

### Client Components (When needed)

-   Interactive elements (clicks, hovers)
-   Form inputs
-   Real-time updates
-   **Benefit**: Rich interactivity

### Image Optimization

-   Use Next.js `<Image>` component
-   Automatic optimization
-   Lazy loading
-   Responsive sizes

### Code Splitting

-   Automatic with Next.js App Router
-   Each route is a separate chunk
-   Dynamic imports for heavy components

## Styling Architecture

### Tailwind Utility Classes (Primary)

```tsx
<div className="flex items-center gap-4 rounded-lg bg-white p-4">
```

### Component Variants (CVA)

```tsx
const buttonVariants = cva("base-classes", {
  variants: { ... },
  defaultVariants: { ... }
});
```

### Custom CSS (Minimal)

Only in `globals.css` for:

-   Global resets
-   Custom animations
-   Utility classes

## Testing Strategy (Future)

### Unit Tests

-   Individual components
-   Utility functions
-   Type checking

### Integration Tests

-   Component interactions
-   Data flow
-   API integration

### E2E Tests

-   User flows (search, booking)
-   Critical paths
-   Cross-browser testing

## Folder Structure Rationale

```
components/
├── ui/              ← Base building blocks (atoms)
├── layout/          ← Page structure (organisms)
└── home/            ← Feature-specific (molecules/organisms)
```

This structure follows **Atomic Design** principles:

-   **Atoms**: Button, Badge, Input
-   **Molecules**: SearchBar, ListingCard
-   **Organisms**: ListingSection, Header, Footer
-   **Templates**: Layout
-   **Pages**: page.tsx files

## Extension Points

### Adding a New Section

1. Create component in `components/home/`
2. Import in `app/page.tsx`
3. Wrap in `<Section>`
4. Pass data as props

### Adding a New Page

1. Create `app/[name]/page.tsx`
2. Reuse existing components
3. Fetch data in server component
4. Add to navigation in `Header.tsx`

### Adding a New UI Component

1. Create in `components/ui/`
2. Follow existing patterns
3. Export from component file
4. Document props interface

---

This architecture is designed to be:

-   **Scalable**: Easy to add new features
-   **Maintainable**: Clear separation of concerns
-   **Reusable**: Components work anywhere
-   **Type-safe**: Full TypeScript coverage
-   **Performant**: Optimized by default

For implementation details, see **DEVELOPMENT_GUIDE.md**.
