"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Star, Clock, Zap, PartyPopper, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const motels = [
    {
        id: "1",
        name: "신촌 바론드호텔",
        location: "서울 마포구",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        price: 75000,
        discount: "6%",
        rating: 4.6,
        reviewCount: 1474,
        badges: ["프리미엄모텔", "QR체크인"],
    },
    {
        id: "2",
        name: "역삼 루미에르",
        location: "서울 강남구",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        price: 55000,
        discount: "15%",
        rating: 4.8,
        reviewCount: 771,
        badges: ["스파모텔", "늦은퇴실"],
    },
    {
        id: "3",
        name: "성신여대역 H Avenue",
        location: "서울 성북구",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
        price: 65000,
        discount: "7%",
        rating: 4.7,
        reviewCount: 19312,
        badges: ["부티크브랜드"],
    },
    {
        id: "4",
        name: "역삼 벤",
        location: "서울 강남구",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
        price: 54000,
        discount: "10%",
        rating: 4.8,
        reviewCount: 10234,
        badges: ["무한대실"],
    },
    {
        id: "5",
        name: "선릉 HOTEL GRAY",
        location: "서울 강남구",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
        price: 54900,
        discount: "8%",
        rating: 4.7,
        reviewCount: 10921,
        badges: ["신축/리모델링"],
    },
    {
        id: "6",
        name: "홍대 라온스테이",
        location: "서울 마포구",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        price: 68000,
        discount: "12%",
        rating: 4.9,
        reviewCount: 2345,
        badges: ["파티룸", "QR체크인"],
    },
];

export default function MotelPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-12">
                <Container>
                    <div className="flex items-center gap-4 mb-4">
                        <Building className="w-10 h-10" />
                        <h1 className="text-5xl font-bold">모텔</h1>
                    </div>
                    <p className="text-xl">프리미엄부터 가성비까지, 다양한 모텔을 만나보세요</p>
                </Container>
            </div>

            {/* Search & Filter */}
            <div className="bg-white shadow-md py-6">
                <Container>
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="어디로 갈까요?"
                            className="flex-1 px-4 py-3 border rounded-lg"
                        />
                        <Button className="bg-orange-600 hover:bg-orange-700">
                            <MapPin className="w-4 h-4 mr-2" />
                            내 주변
                        </Button>
                    </div>

                    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                        {[
                            { label: "프리미엄모텔", icon: Sparkles },
                            { label: "무한대실", icon: Clock },
                            { label: "늦은 퇴실", icon: Clock },
                            { label: "스파 모텔", icon: Sparkles },
                            { label: "파티룸", icon: PartyPopper },
                            { label: "QR체크인", icon: Zap },
                        ].map((filter) => (
                            <Button key={filter.label} variant="outline" className="whitespace-nowrap">
                                <filter.icon className="w-4 h-4 mr-2" />
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Promotions */}
            <Container className="py-8">
                <div className="grid gap-4 md:grid-cols-3 mb-12">
                    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2">☕ 커피값으로 가는 대실</h3>
                            <p className="text-gray-700">1시간 5천원 아래 가성비 최고</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-300">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2">⏰ 레이트 체크아웃</h3>
                            <p className="text-gray-700">여유로운 퇴실로 편하게 즐겨요!</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2">🎫 선착순 쿠폰</h3>
                            <p className="text-gray-700">오늘의 특가 쿠폰 받기</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Motel List */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6">관심 지역의 많이 찾는 숙소</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {motels.map((motel, index) => (
                            <Card key={motel.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="relative h-56">
                                    <Image
                                        src={motel.image}
                                        alt={motel.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                                        랭킹 {index + 1}등
                                    </Badge>
                                    {motel.discount && (
                                        <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                                            {motel.discount}
                                        </Badge>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {motel.badges.map((badge) => (
                                            <Badge key={badge} variant="outline" className="text-xs">
                                                {badge}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{motel.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {motel.location}
                                    </p>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold">{motel.rating}</span>
                                        <span className="text-sm text-gray-500">({motel.reviewCount.toLocaleString()})</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <span className="text-2xl font-bold text-orange-600">
                                            {motel.price.toLocaleString()}원~
                                        </span>
                                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                            예약
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <Button variant="outline" size="lg">
                        더 많은 모텔 보기
                    </Button>
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
