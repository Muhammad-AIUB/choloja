"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import Image from "next/image";

interface LiveCommerce {
    id: string;
    title: string;
    scheduledAt: string;
    status: "scheduled" | "live" | "ended";
    thumbnailUrl: string;
    viewCount?: number;
    discount?: string;
}

interface LiveCommerceGridProps {
    items: LiveCommerce[];
    title?: string;
}

export function LiveCommerceGrid({ items, title }: LiveCommerceGridProps) {
    return (
        <div>
            {title && (
                <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
                    {title}
                </h2>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                    <Card
                        key={item.id}
                        className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={item.thumbnailUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                            />

                            {/* Status Badge */}
                            {item.status === "live" ? (
                                <Badge className="absolute left-3 top-3 animate-pulse bg-red-500 text-white">
                                    🔴 LIVE
                                </Badge>
                            ) : item.status === "scheduled" ? (
                                <Badge className="absolute left-3 top-3 bg-blue-500 text-white">
                                    방송예정
                                </Badge>
                            ) : (
                                <Badge className="absolute left-3 top-3 bg-gray-500 text-white">
                                    다시보기
                                </Badge>
                            )}

                            {/* Discount Badge */}
                            {item.discount && (
                                <Badge className="absolute right-3 top-3 bg-pink-500 text-white">
                                    {item.discount}
                                </Badge>
                            )}

                            {/* Overlay for Live Status */}
                            {item.status === "live" && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            )}
                        </div>

                        <CardContent className="p-4">
                            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                                {item.title}
                            </h3>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{item.scheduledAt}</span>
                                </div>
                                {item.viewCount && (
                                    <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>
                                            {item.viewCount.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
