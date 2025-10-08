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
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
                            <span className="text-xl font-bold text-white">
                                NOL
                            </span>
                        </div>
                        <span className="hidden text-xl font-bold sm:inline-block">
                            NOL Travel
                        </span>
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
