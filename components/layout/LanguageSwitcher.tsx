"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
];

export function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const t = useTranslations("Language");

    const currentLanguage =
        languages.find((lang) => lang.code === locale) || languages[1];

    const changeLanguage = (newLocale: string) => {
        startTransition(() => {
            // Set cookie for locale
            document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year
            // Reload to apply new locale
            window.location.reload();
        });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="gap-2 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                disabled={isPending}
            >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">
                    {currentLanguage.flag} {currentLanguage.name}
                </span>
                <span className="sm:hidden">{currentLanguage.flag}</span>
            </Button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border bg-white shadow-lg">
                        <div className="p-2">
                            <p className="mb-2 px-2 text-xs font-semibold text-gray-500">
                                {t("selectLanguage")}
                            </p>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    disabled={isPending}
                                    className={cn(
                                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-all duration-300 cursor-pointer",
                                        locale === lang.code
                                            ? "bg-pink-50 text-pink-600 font-medium shadow-sm"
                                            : "text-gray-700 hover:bg-gray-100 hover:shadow-sm",
                                        isPending &&
                                            "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <span className="text-xl">{lang.flag}</span>
                                    <span>{lang.name}</span>
                                    {locale === lang.code && (
                                        <span className="ml-auto text-pink-600">
                                            ✓
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
