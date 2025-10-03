"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="border-t bg-gray-50">
            <Container>
                {/* Main Footer Content */}
                <div className="grid gap-8 py-12 md:grid-cols-4">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
                            <span className="text-xl font-bold text-white">
                                NOL
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            {t("description")}
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="https://facebook.com"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link
                                href="https://youtube.com"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Youtube className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="mb-4 font-semibold">{t("company")}</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-gray-900"
                                >
                                    {t("about")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/careers"
                                    className="hover:text-gray-900"
                                >
                                    {t("careers")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/partnership"
                                    className="hover:text-gray-900"
                                >
                                    {t("partnership")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Service Links */}
                    <div>
                        <h3 className="mb-4 font-semibold">{t("services")}</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link
                                    href="/hotel"
                                    className="hover:text-gray-900"
                                >
                                    {t("hotelResort")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/pension"
                                    className="hover:text-gray-900"
                                >
                                    {t("pensionVilla")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/leisure"
                                    className="hover:text-gray-900"
                                >
                                    {t("leisure")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/flights"
                                    className="hover:text-gray-900"
                                >
                                    {t("flights")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="mb-4 font-semibold">{t("support")}</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <Link
                                    href="/help"
                                    className="hover:text-gray-900"
                                >
                                    {t("help")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-gray-900"
                                >
                                    {t("faq")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-gray-900"
                                >
                                    {t("contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <Link href="/terms" className="hover:text-gray-900">
                                {t("terms")}
                            </Link>
                            <Link
                                href="/privacy"
                                className="font-semibold hover:text-gray-900"
                            >
                                {t("privacy")}
                            </Link>
                            <Link href="/youth" className="hover:text-gray-900">
                                {t("youth")}
                            </Link>
                            <Link
                                href="/location"
                                className="hover:text-gray-900"
                            >
                                {t("location")}
                            </Link>
                        </div>
                        <p className="text-xs text-gray-500">
                            {t("copyright")}
                        </p>
                    </div>

                    {/* Company Info */}
                    <div className="mt-4 text-xs text-gray-500">
                        <p>{t("companyInfo")}</p>
                        <p className="mt-1">{t("businessInfo")}</p>
                        <p className="mt-1">{t("addressInfo")}</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
