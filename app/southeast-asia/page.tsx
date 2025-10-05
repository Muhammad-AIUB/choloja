"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palmtree, Ticket, Star, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const tours = [
    {
        id: "t1",
        title: "방콕 수상시장 & 왓팟 & 왓아룬 투어",
        location: "방콕, 태국",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop",
        price: 45000,
        originalPrice: 95000,
        discount: "최대 5만원 할인",
        rating: 4.8,
        reviewCount: 342,
    },
    {
        id: "t2",
        title: "싱가포르 가든스 바이 더 베이 입장권",
        location: "싱가포르",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
        price: 28000,
        originalPrice: 48000,
        discount: "42% 할인",
        rating: 4.9,
        reviewCount: 521,
    },
    {
        id: "t3",
        title: "다낭 바나힐 골든브릿지 & 케이블카",
        location: "다낭, 베트남",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
        price: 52000,
        originalPrice: 85000,
        discount: "39% 할인",
        rating: 4.7,
        reviewCount: 289,
    },
    {
        id: "t4",
        title: "푸켓 피피섬 & 마야베이 스노클링",
        location: "푸켓, 태국",
        image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop",
        price: 68000,
        originalPrice: 110000,
        discount: "38% 할인",
        rating: 4.8,
        reviewCount: 456,
    },
    {
        id: "t5",
        title: "발리 우붓 원숭이 숲 & 테갈랄랑 계단식 논",
        location: "발리, 인도네시아",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
        price: 42000,
        originalPrice: 72000,
        discount: "42% 할인",
        rating: 4.9,
        reviewCount: 387,
    },
    {
        id: "t6",
        title: "코타키나발루 사피섬 & 마누칸섬 호핑투어",
        location: "코타키나발루, 말레이시아",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
        price: 55000,
        originalPrice: 90000,
        discount: "39% 할인",
        rating: 4.7,
        reviewCount: 234,
    },
];

export default function SoutheastAsiaPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="relative h-[400px]">
                <Image
                    src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920&h=800&fit=crop"
                    alt="Southeast Asia"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-blue-600/90" />
                <Container className="relative h-full flex items-center">
                    <div className="text-white max-w-3xl">
                        <Badge className="bg-yellow-500 text-gray-900 mb-4 text-lg px-4 py-2 font-bold">
                            황금연휴 특가
                        </Badge>
                        <div className="flex items-center gap-4 mb-4">
                            <Palmtree className="w-12 h-12" />
                            <h1 className="text-5xl font-bold">동남아 투어·티켓</h1>
                        </div>
                        <p className="text-3xl font-bold mb-2">추석 황금연휴</p>
                        <p className="text-2xl">최대 5만원 할인</p>
                    </div>
                </Container>
            </div>

            {/* Categories */}
            <div className="bg-white border-b py-6">
                <Container>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {[
                            "전체",
                            "태국",
                            "베트남",
                            "싱가포르",
                            "말레이시아",
                            "인도네시아",
                            "필리핀",
                            "캄보디아",
                        ].map((cat) => (
                            <Button
                                key={cat}
                                variant={cat === "전체" ? "default" : "outline"}
                                className={cat === "전체" ? "bg-teal-600 hover:bg-teal-700" : ""}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Tours Grid */}
            <Container className="py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">추천 투어 & 티켓</h2>
                    <p className="text-gray-600">황금연휴 최대 할인! 지금 바로 예약하세요</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tours.map((tour) => (
                        <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-56">
                                <Image
                                    src={tour.image}
                                    alt={tour.title}
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-red-500 text-white text-sm px-3 py-1">
                                    {tour.discount}
                                </Badge>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{tour.location}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-3 line-clamp-2">{tour.title}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{tour.rating}</span>
                                    <span className="text-sm text-gray-500">({tour.reviewCount})</span>
                                </div>
                                <div className="border-t pt-3">
                                    <p className="text-sm text-gray-400 line-through">
                                        {tour.originalPrice.toLocaleString()}원
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-teal-600">
                                            {tour.price.toLocaleString()}원~
                                        </span>
                                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                                            예약
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button size="lg" variant="outline">
                        더 많은 투어 보기
                    </Button>
                </div>
            </Container>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 py-16">
                <Container>
                    <h2 className="text-3xl font-bold text-center mb-12">NOL 투어 예약 혜택</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Tag className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">최저가 보장</h3>
                                <p className="text-gray-600">동남아 투어 최저가로 제공</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Ticket className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">즉시 확정</h3>
                                <p className="text-gray-600">예약 즉시 바로 사용 가능</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">실사용자 리뷰</h3>
                                <p className="text-gray-600">검증된 상품만 엄선</p>
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
