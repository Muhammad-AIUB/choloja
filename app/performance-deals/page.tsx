"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Star, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const performances = [
    {
        id: "p1",
        title: "뮤지컬 위키드",
        location: "샤롯데씨어터",
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=600&fit=crop",
        price: 77000,
        originalPrice: 140000,
        discount: "45%",
        rating: 4.9,
        date: "2025.10 - 2026.01",
    },
    {
        id: "p2",
        title: "오페라의 유령",
        location: "블루스퀘어",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
        price: 66000,
        originalPrice: 120000,
        discount: "45%",
        rating: 4.8,
        date: "2025.10 - 2025.12",
    },
    {
        id: "p3",
        title: "김광석 다시 부르기",
        location: "대학로 자유극장",
        image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop",
        price: 33000,
        originalPrice: 60000,
        discount: "45%",
        rating: 4.9,
        date: "상시공연",
    },
    {
        id: "p4",
        title: "난타",
        location: "명동 난타전용관",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
        price: 27500,
        originalPrice: 50000,
        discount: "45%",
        rating: 4.7,
        date: "상시공연",
    },
];

export default function PerformanceDealsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <Badge className="bg-white/20 text-white backdrop-blur-sm mb-4 text-lg px-6 py-2">
                            추석 특가
                        </Badge>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Music className="w-12 h-12" />
                            <h1 className="text-5xl font-bold">공연·전시 추석특가</h1>
                        </div>
                        <p className="text-3xl font-bold text-yellow-300">최대 55% 할인</p>
                    </div>
                </Container>
            </div>

            {/* Performance Grid */}
            <Container className="py-12">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {performances.map((perf) => (
                        <Card key={perf.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-64">
                                <Image
                                    src={perf.image}
                                    alt={perf.title}
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-red-500 text-white text-lg px-3 py-1">
                                    {perf.discount}
                                </Badge>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-1 mb-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{perf.rating}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2">{perf.title}</h3>
                                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                                    <Music className="w-4 h-4" />
                                    {perf.location}
                                </p>
                                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {perf.date}
                                </p>
                                <div className="border-t pt-3">
                                    <p className="text-sm text-gray-400 line-through">
                                        {perf.originalPrice.toLocaleString()}원
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-purple-600">
                                            {perf.price.toLocaleString()}원~
                                        </span>
                                        <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                                            예매
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* Back */}
            <Container className="py-8 text-center">
                <Link href="/">
                    <Button variant="outline" size="lg">홈으로 돌아가기</Button>
                </Link>
            </Container>
        </div>
    );
}
