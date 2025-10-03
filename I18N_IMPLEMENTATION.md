# Internationalization (i18n) Implementation

## Overview

The NOL Travel website now supports three languages:

-   🇰🇷 **Korean (ko)** - Default language
-   🇺🇸 **English (en)**
-   🇧🇩 **Bengali (bn)**

## What Was Implemented

### 1. **next-intl Configuration**

-   Created `i18n/request.ts` with cookie-based locale detection
-   Updated `next.config.ts` with next-intl plugin
-   Wrapped app with `NextIntlClientProvider` in `app/layout.tsx`

### 2. **Translation Files Created**

All translation files are located in `/messages/`:

-   `en.json` - English translations
-   `ko.json` - Korean translations (default)
-   `bn.json` - Bengali translations

### 3. **Components Translated**

#### **Header Component** (`components/layout/Header.tsx`)

-   Navigation menu items (Flights, Hotels, Pension, etc.)
-   Mobile menu
-   Search, Cart, and User menu buttons
-   **Integrated Language Switcher**

#### **Language Switcher** (`components/layout/LanguageSwitcher.tsx`)

-   Dropdown with flag emojis for each language
-   Globe icon indicator
-   Cookie-based persistence (NEXT_LOCALE)
-   Smooth transitions with useTransition

#### **Hero Section** (`components/home/HeroSection.tsx`)

-   Main title and subtitle
-   Category tabs (Hotel, Pension, Glamping, etc.)
-   Popular searches label

#### **Search Bar** (`components/home/SearchBar.tsx`)

-   Destination input label and placeholder
-   Check-in/Check-out labels
-   Guests dropdown with localized suffix ("명", " guests", " জন")
-   Search button text

#### **Footer Component** (`components/layout/Footer.tsx`)

-   Brand description
-   Company links section
-   Services section
-   Support section
-   Terms and legal links
-   Company information
-   Copyright notice

#### **Homepage** (`app/page.tsx`)

-   Section titles (Promotions, Hotels, Pensions, etc.)
-   Subtitles for each section
-   Popular destinations names
-   Trust indicators (Platform reliability, Best price, etc.)
-   Accommodations count text

## Translation Structure

The translations are organized hierarchically:

```json
{
    "Header": {
        /* Navigation items */
    },
    "Footer": {
        /* Footer sections and links */
    },
    "Hero": {
        "title": "Where shall we go?",
        "categories": {
            /* Category names */
        }
    },
    "Home": {
        "promotionsTitle": "...",
        "destinations": {
            /* City names */
        },
        "trust": {
            /* Trust indicators */
        }
    },
    "Language": {
        /* Language switcher labels */
    }
}
```

## How to Use

### Switching Languages

Users can change the language by:

1. Clicking the **Globe icon** (🌐) in the header (desktop and mobile)
2. Selecting from the dropdown menu
3. The selection is saved in a cookie (`NEXT_LOCALE`)

### Adding New Translations

To add translations for a new component:

1. **Update translation files** (`messages/en.json`, `ko.json`, `bn.json`):

```json
{
    "ComponentName": {
        "key": "Translated text"
    }
}
```

2. **Use in component**:

```tsx
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
    const t = useTranslations("ComponentName");

    return <div>{t("key")}</div>;
}
```

### For Server Components

Use `getTranslations` instead:

```tsx
import { getTranslations } from "next-intl/server";

export default async function ServerComponent() {
    const t = await getTranslations("ComponentName");

    return <div>{t("key")}</div>;
}
```

## Cookie-Based Locale Storage

The language preference is stored in a cookie named `NEXT_LOCALE`:

-   **Set in**: `components/layout/LanguageSwitcher.tsx`
-   **Read in**: `i18n/request.ts`
-   **Default**: 'ko' (Korean)

This ensures the language preference persists across sessions.

## Testing

To test the implementation:

1. **Start the development server**:

```bash
pnpm dev
```

2. **Visit**: http://localhost:3000

3. **Change language**: Click the Globe icon in the header and select a language

4. **Verify**: All text should update to the selected language

## Key Features

✅ **Three languages**: Korean, English, Bengali
✅ **Language switcher**: Accessible from header (desktop & mobile)
✅ **Persistent selection**: Uses cookies to remember preference
✅ **Smooth transitions**: useTransition for seamless language changes
✅ **Comprehensive coverage**: All major components translated
✅ **SEO-friendly**: next-intl handles locale routing properly

## Files Modified

### Created:

-   `messages/en.json`
-   `messages/ko.json`
-   `messages/bn.json`
-   `i18n/request.ts`
-   `components/layout/LanguageSwitcher.tsx`
-   `I18N_IMPLEMENTATION.md` (this file)

### Modified:

-   `next.config.ts` - Added next-intl plugin
-   `app/layout.tsx` - Added NextIntlClientProvider
-   `components/layout/Header.tsx` - Translations + Language Switcher
-   `components/layout/Footer.tsx` - Full translation
-   `components/home/HeroSection.tsx` - Translations
-   `components/home/SearchBar.tsx` - Translations
-   `app/page.tsx` - Translations for all sections

## Notes

-   Default locale is **Korean** (ko)
-   Language switcher is visible on both desktop and mobile views
-   All translations maintain the original Korean tone and context
-   Bengali translations use proper Bengali script (বাংলা)
-   The implementation follows Next.js 15 App Router best practices

## Future Enhancements

Potential improvements:

-   Add more languages (Japanese, Chinese, Spanish, etc.)
-   Implement locale-specific date/number formatting
-   Add URL-based locale routing (`/en/`, `/ko/`, `/bn/`)
-   Translate dynamic content (mock data)
-   Add locale-specific images/content
