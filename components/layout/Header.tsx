"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
import { useState } from "react";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 md:flex">
                        <Link
                            href="/flights"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t("flights")}
                        </Link>
                        <Link
                            href="/global"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t("globalAccommodation")}
                        </Link>
                        <Link
                            href="/tour"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t("globalTour")}
                        </Link>
                        <Link
                            href="/leisure"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t("domesticLeisure")}
                        </Link>
                        <Link
                            href="/hotel"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t("hotel")}
                        </Link>
                        <Link
                            href="/pension"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t("pension")}
                        </Link>
                        <Link
                            href="/glamping"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t("glamping")}
                        </Link>
                        <Link
                            href="/motel"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            {t("motel")}
                        </Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:flex"
                            aria-label={t("search")}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t("cart")}
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t("user")}
                        >
                            <User className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="border-t py-4 md:hidden">
                        <nav className="flex flex-col space-y-2">
                            <Link
                                href="/flights"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("flights")}
                            </Link>
                            <Link
                                href="/global"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("globalAccommodation")}
                            </Link>
                            <Link
                                href="/tour"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("globalTour")}
                            </Link>
                            <Link
                                href="/leisure"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("domesticLeisure")}
                            </Link>
                            <Link
                                href="/entertainment"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("performance")}
                            </Link>
                            <Link
                                href="/hotel"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("hotel")}
                            </Link>
                            <Link
                                href="/pension"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("pension")}
                            </Link>
                            <Link
                                href="/glamping"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("glamping")}
                            </Link>
                            <Link
                                href="/motel"
                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("motel")}
                            </Link>
                            <Link
                                href="/transportation"
                                className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span>{t("transportation")}</span>
                                <Badge variant="destructive">NEW</Badge>
                            </Link>
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
}
