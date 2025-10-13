"use client";

import Link from "next/link";
import Image from "next/image";
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
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 overflow-hidden bg-white border-2 border-gray-100 group-hover:border-pink-200">
                            {/* Your Custom Choloja Image */}
                            <Image 
                                src="/choloja-icon.jpeg" 
                                alt="Choloja Logo" 
                                width={64}
                                height={64}
                                className="h-full w-full object-cover rounded-2xl group-hover:brightness-110 transition-all duration-300"
                                priority
                            />
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="hidden sm:flex flex-col ml-3">
                            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-300">
                                Choloja
                            </span>
                            <span className="text-[11px] text-gray-500 -mt-1 tracking-widest font-medium">
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
