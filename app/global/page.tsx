"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search,
    MapPin,
    Calendar,
    Users,
    Star,
    Plane,
    Hotel,
    Globe,
    TrendingUp,
    Gift,
    Play,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Accommodation {
    id: string;
    name: string;
    location: string;
    country: string;
    image: string;
    price: number;
    currency: string;
    originalPrice?: number;
    discount?: string;
    rating: number;
    reviewCount: number;
    type: string;
}

// Mock data for popular destinations
const popularDestinations = [
    {
        id: "osaka",
        name: "오사카",
        nameEn: "Osaka",
        country: "일본",
        image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop",
        hotelsCount: 2847,
    },
    {
        id: "bangkok",
        name: "방콕",
        nameEn: "Bangkok",
        country: "태국",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop",
        hotelsCount: 3521,
    },
    {
        id: "hongkong",
        name: "홍콩",
        nameEn: "Hong Kong",
        country: "중국",
        image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&h=600&fit=crop",
        hotelsCount: 1893,
    },
    {
        id: "tokyo",
        name: "도쿄",
        nameEn: "Tokyo",
        country: "일본",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
        hotelsCount: 4156,
    },
    {
        id: "singapore",
        name: "싱가포르",
        nameEn: "Singapore",
        country: "싱가포르",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
        hotelsCount: 1654,
    },
    {
        id: "bali",
        name: "발리",
        nameEn: "Bali",
        country: "인도네시아",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
        hotelsCount: 2341,
    },
];

// Mock popular resort destinations
const resortDestinations = [
    { id: "guam", name: "괌", nameEn: "Guam", icon: "🏝️" },
    { id: "cebu", name: "세부(필리핀)", nameEn: "Cebu", icon: "🌴" },
    { id: "saipan", name: "사이판", nameEn: "Saipan", icon: "🌺" },
    { id: "boracay", name: "보홀(필리핀)", nameEn: "Boracay", icon: "🏖️" },
];

// Mock accommodations
const mockAccommodations: Accommodation[] = [
    {
        id: "h1",
        name: "칸데오 호텔 오사카 난바",
        location: "오사카",
        country: "일본",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        price: 487550,
        currency: "₩",
        originalPrice: 650000,
        discount: "25%",
        rating: 4.7,
        reviewCount: 1243,
        type: "호텔",
    },
    {
        id: "h2",
        name: "스마일 호텔 프리미엄 오사카",
        location: "오사카",
        country: "일본",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        price: 274299,
        currency: "₩",
        rating: 4.5,
        reviewCount: 856,
        type: "호텔",
    },
    {
        id: "h3",
        name: "힐튼 괌 리조트 앤 스파",
        location: "타무닝",
        country: "괌",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        price: 271947,
        currency: "₩",
        rating: 4.8,
        reviewCount: 2341,
        type: "리조트",
    },
    {
        id: "h4",
        name: "두짓타니 방콕",
        location: "방콕",
        country: "태국",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
        price: 493932,
        currency: "₩",
        rating: 4.9,
        reviewCount: 3521,
        type: "호텔",
    },
    {
        id: "h5",
        name: "래디슨 블루 세부",
        location: "세부",
        country: "필리핀",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        price: 155383,
        originalPrice: 170000,
        currency: "₩",
        discount: "9%",
        rating: 4.6,
        reviewCount: 987,
        type: "호텔",
    },
    {
        id: "h6",
        name: "이비스 홍콩 센트럴",
        location: "홍콩",
        country: "중국",
        image: "https://images.unsplash.com/photo-1565031491910-e57fac031c41?w=800&h=600&fit=crop",
        price: 179116,
        currency: "₩",
        rating: 4.4,
        reviewCount: 1654,
        type: "호텔",
    },
];

export default function GlobalPage() {
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("2025-10-05");
    const [checkOut, setCheckOut] = useState("2025-10-06");
    const [rooms] = useState(1);
    const [adults] = useState(2);
    const [children] = useState(0);

    const handleSearch = () => {
        console.log("Searching:", { destination, checkIn, checkOut, rooms, adults, children });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Search */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=600&fit=crop"
                        alt="Global Travel"
                        fill
                        className="object-cover"
                    />
                </div>

                <Container className="relative">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Globe className="w-12 h-12" />
                            <h1 className="text-4xl md:text-5xl font-bold">해외숙소</h1>
                        </div>
                        <p className="text-xl text-blue-100">
                            전 세계 최고의 숙소를 최저가로 예약하세요
                        </p>
                    </div>

                    {/* Search Card */}
                    <Card className="max-w-5xl mx-auto shadow-2xl">
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {/* Destination Search */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        도시, 명소, 숙소명으로 찾아보세요
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={destination}
                                            onChange={(e) => setDestination(e.target.value)}
                                            placeholder="어디로 떠날까요?"
                                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    {/* Check-in / Check-out */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            날짜
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={checkIn}
                                                    onChange={(e) => setCheckIn(e.target.value)}
                                                    className="w-full pl-10 pr-2 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    value={checkOut}
                                                    onChange={(e) => setCheckOut(e.target.value)}
                                                    className="w-full pl-10 pr-2 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            객실 및 인원
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                value={`객실 ${rooms}, 성인 ${adults}, 아동 ${children}`}
                                                readOnly
                                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <Button
                                    onClick={handleSearch}
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg"
                                >
                                    <Search className="w-5 h-5 mr-2" />
                                    검색하기
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </div>

            {/* Popular Destinations */}
            <Container className="py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        🌍 인기 여행지
                    </h2>
                    <Button variant="outline">전체보기</Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {popularDestinations.map((dest) => (
                        <Card
                            key={dest.id}
                            className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <div className="relative h-64">
                                <Image
                                    src={dest.image}
                                    alt={dest.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                                    <p className="text-sm text-gray-200">{dest.country}</p>
                                    <Badge className="mt-2 bg-white/20 backdrop-blur-sm text-white">
                                        {dest.hotelsCount.toLocaleString()}개 숙소
                                    </Badge>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* Video Short Form Section */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-8">
                        <Play className="w-8 h-8 text-purple-600" />
                        <h2 className="text-3xl font-bold text-gray-900">
                            숏폼으로 떠나는 해외여행
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {mockAccommodations.slice(0, 4).map((hotel) => (
                            <Card
                                key={hotel.id}
                                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="relative h-56">
                                    <Image
                                        src={hotel.image}
                                        alt={hotel.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                            <Play className="w-6 h-6 text-purple-600 ml-1" />
                                        </div>
                                    </div>
                                    {hotel.discount && (
                                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                            {hotel.discount}
                                        </Badge>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <p className="text-sm text-gray-600 mb-1">
                                        [{hotel.country} {hotel.location}]
                                    </p>
                                    <h3 className="font-bold mb-2 line-clamp-2">{hotel.name}</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-purple-600">
                                            {hotel.currency}{hotel.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm text-gray-500">~</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Popular Resort Destinations */}
            <Container className="py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            🏝️ 예약이 많은 인기 휴양지
                        </h2>
                        <p className="text-gray-600">11.4 (화) 기준</p>
                    </div>
                </div>

                {/* Resort Destination Tabs */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {resortDestinations.map((dest) => (
                        <Button
                            key={dest.id}
                            variant="outline"
                            className="flex items-center gap-2 whitespace-nowrap"
                        >
                            <span className="text-xl">{dest.icon}</span>
                            {dest.name}
                        </Button>
                    ))}
                </div>

                {/* Resort Hotels Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {mockAccommodations.slice(2, 6).map((hotel) => (
                        <Card
                            key={hotel.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={hotel.image}
                                    alt={hotel.name}
                                    fill
                                    className="object-cover"
                                />
                                {hotel.discount && (
                                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                                        {hotel.discount}
                                    </Badge>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <Badge variant="outline" className="mb-2">
                                    {hotel.type}
                                </Badge>
                                <h3 className="font-bold mb-1 line-clamp-2">{hotel.name}</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    {hotel.location}/{hotel.country}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        {hotel.originalPrice && (
                                            <p className="text-sm text-gray-400 line-through">
                                                {hotel.currency}{hotel.originalPrice.toLocaleString()}
                                            </p>
                                        )}
                                        <p className="text-lg font-bold text-purple-600">
                                            {hotel.currency}{hotel.price.toLocaleString()}~
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold">{hotel.rating}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Button variant="outline" size="lg">
                        전체보기
                    </Button>
                </div>
            </Container>

            {/* Popular City Hotels - Osaka */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                🇯🇵 인기있는 여행지! 일본 오사카
                            </h2>
                            <p className="text-gray-600">인기 가성비 숙소 추천!</p>
                        </div>
                        <Button variant="outline">전체보기</Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {mockAccommodations.map((hotel) => (
                            <Card
                                key={hotel.id}
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={hotel.image}
                                        alt={hotel.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {hotel.discount && (
                                        <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                                            {hotel.discount}
                                        </Badge>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-1 mb-2">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold">{hotel.rating}</span>
                                        <span className="text-sm text-gray-500">
                                            ({hotel.reviewCount.toLocaleString()})
                                        </span>
                                    </div>
                                    <Badge variant="outline" className="mb-2">
                                        {hotel.type} · {hotel.location}/{hotel.country}
                                    </Badge>
                                    <h3 className="font-bold mb-3 line-clamp-2 h-12">
                                        {hotel.name}
                                    </h3>
                                    <div>
                                        {hotel.originalPrice ? (
                                            <>
                                                <p className="text-sm text-gray-400 line-through">
                                                    {hotel.currency}{hotel.originalPrice.toLocaleString()}
                                                </p>
                                                <p className="text-xl font-bold text-purple-600">
                                                    {hotel.currency}{hotel.price.toLocaleString()}~
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-lg text-gray-600">다른 날짜 확인</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Benefits Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            NOL과 함께하는 해외여행
                        </h2>
                        <p className="text-xl text-purple-100">
                            특별한 혜택과 최저가 보장으로 더 스마트하게
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Gift,
                                title: "최대 50% 할인",
                                description: "회원 전용 특가 및 쿠폰 제공",
                            },
                            {
                                icon: TrendingUp,
                                title: "최저가 보장",
                                description: "더 저렴한 가격을 찾으면 차액 환불",
                            },
                            {
                                icon: Hotel,
                                title: "검증된 숙소",
                                description: "실제 이용자 리뷰로 안심 예약",
                            },
                        ].map((benefit, index) => (
                            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                                <CardContent className="p-8 text-center">
                                    <benefit.icon className="w-16 h-16 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-purple-100">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Quick Links */}
            <Container className="py-8 flex items-center justify-center gap-4">
                <Link href="/">
                    <Button variant="outline" size="lg">
                        <Plane className="w-5 h-5 mr-2" />
                        항공권 예약
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="outline" size="lg">
                        홈으로 돌아가기
                    </Button>
                </Link>
            </Container>
        </div>
    );
}
