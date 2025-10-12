"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ShoppingCart, User, Search } from "lucide-react";

export function Header() {
    const t = useTranslations("Header");

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            {/* Sun/Wave Icon for Beach Resort Theme */}
                            <svg 
                                className="h-7 w-7 text-white"
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2.5"
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                {/* Stylized building/hotel with Korean flair */}
                                <path d="M3 21h18" />
                                <path d="M5 21V7l7-4 7 4v14" />
                                <path d="M9 9h6" />
                                <path d="M9 13h6" />
                                <path d="M9 17h6" />
                                {/* Decorative wave/roof element */}
                                <path d="M5 7c0-1 2-2 7-2s7 1 7 2" />
                            </svg>
                            {/* Decorative dot */}
                            <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full shadow-md"></div>
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Choloja
                            </span>
                            <span className="text-[10px] text-gray-500 -mt-1 tracking-wider">
                                TRAVEL & STAY
                            </span>
                        </div>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:flex hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 cursor-pointer"
                            aria-label={t("search")}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 cursor-pointer"
                            aria-label={t("cart")}
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 cursor-pointer"
                            aria-label={t("user")}
                        >
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
}
