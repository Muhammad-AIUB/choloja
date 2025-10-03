# 🎯 Quick Reference Card

## 🚀 Running the Project

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # Lint code
```

## 📂 Key Files

| File                        | Purpose                     |
| --------------------------- | --------------------------- |
| `app/page.tsx`              | Homepage                    |
| `app/layout.tsx`            | Root layout (Header/Footer) |
| `components/home/*`         | Homepage components         |
| `components/ui/*`           | Reusable UI components      |
| `types/index.ts`            | TypeScript types            |
| `lib/constants/mockData.ts` | Mock data                   |

## 🎨 Component Quick Reference

### Button

```tsx
<Button variant="default|outline|ghost" size="sm|md|lg">
    Click me
</Button>
```

### Badge

```tsx
<Badge variant="default|success|destructive|warning">Label</Badge>
```

### Card

```tsx
<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
    </CardHeader>
    <CardContent>Content</CardContent>
</Card>
```

### Section

```tsx
<Section title="Title" subtitle="Subtitle" background="white|gray">
    Content
</Section>
```

### ListingSection

```tsx
<ListingSection title="Hotels" listings={data} viewAllLink="/hotels" />
```

## 📱 Responsive Classes

```tsx
// Mobile first
<div className="text-sm md:text-base lg:text-lg">

// Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// Hide/Show
<div className="hidden md:block">        // Desktop only
<div className="block md:hidden">        // Mobile only
```

## 🔧 Utilities

```tsx
import { cn } from "@/lib/utils";

// Merge classes conditionally
cn("base-class", condition && "conditional-class");
```

## 🎯 Common Patterns

### Server Component (Default)

```tsx
export default async function Page() {
    const data = await fetch("...");
    return <div>{data}</div>;
}
```

### Client Component

```tsx
'use client';

export function Interactive() {
  const [state, setState] = useState();
  return <button onClick={...}>
}
```

### Loading State

```tsx
// app/loading.tsx
export default function Loading() {
    return <div>Loading...</div>;
}
```

### Error Handling

```tsx
// app/error.tsx
"use client";

export default function Error({ error, reset }) {
    return <div>Error: {error.message}</div>;
}
```

## 🔌 API Integration

```tsx
// Fetch on server
async function getData() {
    const res = await fetch("https://api.../data", {
        next: { revalidate: 60 }, // Cache for 60s
    });
    return res.json();
}

// Fetch on client
("use client");
import { useEffect, useState } from "react";

function Component() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/data")
            .then((res) => res.json())
            .then(setData);
    }, []);
}
```

## 🎨 Tailwind Shortcuts

| Class                                          | Effect                   |
| ---------------------------------------------- | ------------------------ |
| `flex items-center justify-between`            | Flex with space-between  |
| `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`     | Responsive grid          |
| `rounded-lg shadow-lg`                         | Rounded corners + shadow |
| `hover:scale-110 transition-transform`         | Hover scale effect       |
| `bg-gradient-to-r from-pink-500 to-purple-600` | Gradient                 |
| `line-clamp-2`                                 | Truncate to 2 lines      |

## 📦 Import Aliases

```tsx
import { Component } from "@/components/..."; // components/
import { Type } from "@/types"; // types/
import { util } from "@/lib/utils"; // lib/
```

## 🔐 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.your-backend.com
NEXT_PUBLIC_SITE_URL=https://your-site.com
```

Use in code:

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## 🛠️ TypeScript

```tsx
// Define props
interface Props {
    title: string;
    optional?: number;
}

// Use in component
export function Component({ title, optional = 0 }: Props) {
    return <div>{title}</div>;
}
```

## 📝 File Naming

-   Components: PascalCase (`MyComponent.tsx`)
-   Utilities: camelCase (`myUtil.ts`)
-   Pages: lowercase (`page.tsx`, `layout.tsx`)
-   Types: PascalCase (`MyType.ts`)

## 🚨 Common Issues

### Images not loading?

Add domain to `next.config.ts`:

```ts
images: {
    remotePatterns: [{ protocol: "https", hostname: "your-domain.com" }];
}
```

### Hydration error?

-   Check date formatting
-   Ensure server/client render same HTML
-   Remove random IDs

### Module not found?

-   Check import path uses `@/`
-   Verify file exists
-   Restart dev server

## 📚 Documentation Files

1. **README.md** - Quick start
2. **BACKEND_API.md** - API specification
3. **DEVELOPMENT_GUIDE.md** - Detailed guide
4. **PROJECT_SUMMARY.md** - Overview
5. **This file** - Quick reference

## 🎯 URLs

-   **Dev Server**: http://localhost:3001
-   **Documentation**: See files above
-   **Next.js Docs**: https://nextjs.org/docs

---

**Keep this file handy for quick lookups!** 📌
