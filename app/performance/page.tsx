"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Ticket, Star, Calendar, MapPin, Drama } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const performances = [
    {
        id: "p1",
        title: "뮤지컬 위키드",
        venue: "샤롯데씨어터",
        location: "서울 송파구",
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=600&fit=crop",
        price: 77000,
        originalPrice: 140000,
        discount: "45%",
        rating: 4.9,
        reviewCount: 1234,
        date: "2025.10 - 2026.01",
        category: "뮤지컬",
    },
    {
        id: "p2",
        title: "오페라의 유령",
        venue: "블루스퀘어",
        location: "서울 용산구",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
        price: 66000,
        originalPrice: 120000,
        discount: "45%",
        rating: 4.8,
        reviewCount: 987,
        date: "2025.10 - 2025.12",
        category: "뮤지컬",
    },
    {
        id: "p3",
        title: "김광석 다시 부르기",
        venue: "대학로 자유극장",
        location: "서울 종로구",
        image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop",
        price: 33000,
        originalPrice: 60000,
        discount: "45%",
        rating: 4.9,
        reviewCount: 2345,
        date: "상시공연",
        category: "콘서트",
    },
    {
        id: "p4",
        title: "난타",
        venue: "명동 난타전용관",
        location: "서울 중구",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop",
        price: 27500,
        originalPrice: 50000,
        discount: "45%",
        rating: 4.7,
        reviewCount: 3456,
        date: "상시공연",
        category: "공연",
    },
    {
        id: "p5",
        title: "시카고",
        venue: "디큐브아트센터",
        location: "서울 구로구",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
        price: 88000,
        originalPrice: 150000,
        discount: "41%",
        rating: 4.8,
        reviewCount: 876,
        date: "2025.10 - 2025.12",
        category: "뮤지컬",
    },
    {
        id: "p6",
        title: "모네전: 빛과 그림자",
        venue: "예술의전당",
        location: "서울 서초구",
        image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=600&fit=crop",
        price: 18000,
        originalPrice: 25000,
        discount: "28%",
        rating: 4.9,
        reviewCount: 1567,
        date: "2025.10 - 2026.02",
        category: "전시",
    },
];

export default function PerformancePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Drama className="w-12 h-12" />
                            <h1 className="text-5xl font-bold">공연 / 전시</h1>
                        </div>
                        <p className="text-2xl mb-2">문화생활을 즐기는 가장 쉬운 방법</p>
                        <p className="text-xl text-purple-100">뮤지컬, 콘서트, 전시회 최대 55% 할인</p>
                    </div>
                </Container>
            </div>

            {/* Categories */}
            <div className="bg-white border-b py-6">
                <Container>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {[
                            { label: "전체", icon: Music },
                            { label: "뮤지컬", icon: Drama },
                            { label: "콘서트", icon: Music },
                            { label: "연극", icon: Drama },
                            { label: "클래식/오페라", icon: Music },
                            { label: "전시/행사", icon: Ticket },
                        ].map((cat) => (
                            <Button
                                key={cat.label}
                                variant={cat.label === "전체" ? "default" : "outline"}
                                className={cat.label === "전체" ? "bg-purple-600 hover:bg-purple-700" : ""}
                            >
                                <cat.icon className="w-4 h-4 mr-2" />
                                {cat.label}
                            </Button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Performances Grid */}
            <Container className="py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">추천 공연·전시</h2>
                    <p className="text-gray-600">지금 가장 인기있는 공연과 전시를 만나보세요</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {performances.map((perf) => (
                        <Card key={perf.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-72">
                                <Image
                                    src={perf.image}
                                    alt={perf.title}
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                                    {perf.category}
                                </Badge>
                                <Badge className="absolute top-3 right-3 bg-red-500 text-white text-lg px-3 py-1">
                                    {perf.discount}
                                </Badge>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-1 mb-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{perf.rating}</span>
                                    <span className="text-sm text-gray-500">({perf.reviewCount})</span>
                                </div>
                                <h3 className="font-bold text-xl mb-2">{perf.title}</h3>
                                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                                    <Music className="w-4 h-4" />
                                    {perf.venue}
                                </p>
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
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

                <div className="text-center">
                    <Button size="lg" variant="outline">
                        더 많은 공연 보기
                    </Button>
                </div>
            </Container>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16">
                <Container>
                    <h2 className="text-3xl font-bold text-center mb-12">NOL 공연·전시 예매 혜택</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Ticket className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">최대 55% 할인</h3>
                                <p className="text-gray-600">인기 공연 특별 할인가</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">실시간 좌석</h3>
                                <p className="text-gray-600">원하는 좌석 바로 예매</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Music className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">간편 예매</h3>
                                <p className="text-gray-600">모바일 티켓 즉시 발송</p>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </div>

            {/* Back */}
            <Container className="py-8 text-center">
                <Link href="/">
                    <Button variant="outline" size="lg">홈으로 돌아가기</Button>
                </Link>
            </Container>
        </div>
    );
}
