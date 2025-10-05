"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search,
    MapPin,
    Star,
    Ticket,
    Globe,
    TrendingUp,
    Gift,
    Clock,
    Users,
    Camera,
    Utensils,
    Palmtree,
    Mountain,
    Plane,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Tour {
    id: string;
    title: string;
    location: string;
    country: string;
    image: string;
    price: number;
    currency: string;
    originalPrice?: number;
    discount?: string;
    rating: number;
    reviewCount: number;
    duration: string;
    category: string;
    badge?: string;
}

// Popular tour categories
const tourCategories = [
    { id: "all", name: "전체", icon: Globe },
    { id: "attraction", name: "명소·티켓", icon: Ticket },
    { id: "activity", name: "액티비티", icon: Mountain },
    { id: "food", name: "맛집·쿠킹", icon: Utensils },
    { id: "photo", name: "포토·촬영", icon: Camera },
    { id: "transport", name: "교통·패스", icon: Plane },
    { id: "spa", name: "스파·마사지", icon: Palmtree },
];

// Popular destinations
const popularCities = [
    {
        id: "paris",
        name: "파리",
        country: "프랑스",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
        toursCount: 1234,
    },
    {
        id: "tokyo",
        name: "도쿄",
        country: "일본",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
        toursCount: 2341,
    },
    {
        id: "bangkok",
        name: "방콕",
        country: "태국",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=300&fit=crop",
        toursCount: 1876,
    },
    {
        id: "rome",
        name: "로마",
        country: "이탈리아",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop",
        toursCount: 987,
    },
    {
        id: "newyork",
        name: "뉴욕",
        country: "미국",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
        toursCount: 1654,
    },
    {
        id: "london",
        name: "런던",
        country: "영국",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
        toursCount: 1432,
    },
];

// Mock tour data
const mockTours: Tour[] = [
    {
        id: "t1",
        title: "에펠탑 우선입장권 + 세느강 유람선",
        location: "파리",
        country: "프랑스",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
        price: 89000,
        currency: "₩",
        originalPrice: 120000,
        discount: "26%",
        rating: 4.9,
        reviewCount: 3521,
        duration: "4시간",
        category: "명소·티켓",
        badge: "베스트",
    },
    {
        id: "t2",
        title: "도쿄 디즈니랜드 1일 입장권",
        location: "도쿄",
        country: "일본",
        image: "https://images.unsplash.com/photo-1580521942654-0c913e50e1e6?w=800&h=600&fit=crop",
        price: 95000,
        currency: "₩",
        originalPrice: 110000,
        discount: "14%",
        rating: 4.8,
        reviewCount: 5234,
        duration: "하루종일",
        category: "명소·티켓",
        badge: "인기",
    },
    {
        id: "t3",
        title: "방콕 수상시장 + 사원 투어",
        location: "방콕",
        country: "태국",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop",
        price: 45000,
        currency: "₩",
        rating: 4.7,
        reviewCount: 2156,
        duration: "6시간",
        category: "투어",
    },
    {
        id: "t4",
        title: "로마 콜로세움 + 바티칸 투어",
        location: "로마",
        country: "이탈리아",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
        price: 120000,
        currency: "₩",
        originalPrice: 150000,
        discount: "20%",
        rating: 4.9,
        reviewCount: 1876,
        duration: "8시간",
        category: "명소·티켓",
        badge: "추천",
    },
    {
        id: "t5",
        title: "뉴욕 자유의 여신상 + 엠파이어 스테이트",
        location: "뉴욕",
        country: "미국",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
        price: 135000,
        currency: "₩",
        rating: 4.8,
        reviewCount: 2987,
        duration: "5시간",
        category: "명소·티켓",
    },
    {
        id: "t6",
        title: "런던 아이 + 템즈강 크루즈",
        location: "런던",
        country: "영국",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
        price: 98000,
        currency: "₩",
        originalPrice: 115000,
        discount: "15%",
        rating: 4.7,
        reviewCount: 1543,
        duration: "3시간",
        category: "명소·티켓",
    },
    {
        id: "t7",
        title: "싱가포르 가든스 바이 더 베이 + 마리나베이샌즈",
        location: "싱가포르",
        country: "싱가포르",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
        price: 67000,
        currency: "₩",
        rating: 4.9,
        reviewCount: 2234,
        duration: "4시간",
        category: "명소·티켓",
        badge: "HOT",
    },
    {
        id: "t8",
        title: "발리 우붓 라이스테라스 + 원숭이 숲",
        location: "발리",
        country: "인도네시아",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
        price: 52000,
        currency: "₩",
        rating: 4.6,
        reviewCount: 1789,
        duration: "7시간",
        category: "투어",
    },
];

export default function TourPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleSearch = () => {
        console.log("Searching:", searchQuery);
    };

    const filteredTours = selectedCategory === "all" 
        ? mockTours 
        : mockTours.filter(tour => tour.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop"
                        alt="World Travel"
                        fill
                        className="object-cover"
                    />
                </div>

                <Container className="relative">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Globe className="w-16 h-16" />
                            <h1 className="text-4xl md:text-5xl font-bold">
                                해외 투어·티켓
                            </h1>
                        </div>
                        <p className="text-2xl text-blue-100 mb-2">
                            전 세계 인기 투어·티켓 지금 예약하세요
                        </p>
                        <p className="text-lg text-blue-200">
                            어디로 떠나세요? 여행 도시 필수템 찾아드려요
                        </p>
                    </div>

                    {/* Search Bar */}
                    <Card className="max-w-4xl mx-auto shadow-2xl">
                        <CardContent className="p-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="도시, 명소, 투어명으로 검색하세요"
                                    className="w-full pl-14 pr-32 py-4 text-lg border-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <Button
                                    onClick={handleSearch}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    size="lg"
                                >
                                    검색
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </div>

            {/* Category Tabs */}
            <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
                <Container>
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
                        {tourCategories.map((category) => {
                            const IconComponent = category.icon;
                            return (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className="flex items-center gap-2 whitespace-nowrap"
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {category.name}
                                </Button>
                            );
                        })}
                    </div>
                </Container>
            </div>

            {/* Popular Cities */}
            <Container className="py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        🌍 인기 여행 도시
                    </h2>
                    <Button variant="outline">전체보기</Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
                    {popularCities.map((city) => (
                        <Card
                            key={city.id}
                            className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                        >
                            <div className="relative h-40">
                                <Image
                                    src={city.image}
                                    alt={city.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-3 left-3 text-white">
                                    <h3 className="text-lg font-bold">{city.name}</h3>
                                    <p className="text-xs text-gray-200">{city.country}</p>
                                </div>
                            </div>
                            <CardContent className="p-3 text-center">
                                <p className="text-sm text-gray-600">
                                    {city.toursCount.toLocaleString()}개 상품
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* Featured Tours */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                🎫 추천 투어 & 티켓
                            </h2>
                            <p className="text-gray-600">
                                전 세계 여행자들이 선택한 베스트 상품
                            </p>
                        </div>
                        <Button variant="outline">전체보기</Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {filteredTours.map((tour) => (
                            <Card
                                key={tour.id}
                                className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                            >
                                <div className="relative h-56">
                                    <Image
                                        src={tour.image}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {tour.badge && (
                                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                                            {tour.badge}
                                        </Badge>
                                    )}
                                    {tour.discount && (
                                        <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                                            {tour.discount}
                                        </Badge>
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    <div className="flex items-center gap-1 mb-2">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">
                                            {tour.location}, {tour.country}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-lg mb-3 line-clamp-2 h-14">
                                        {tour.title}
                                    </h3>

                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold">{tour.rating}</span>
                                            <span className="text-sm text-gray-500">
                                                ({tour.reviewCount.toLocaleString()})
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            {tour.duration}
                                        </div>
                                    </div>

                                    <Badge variant="outline" className="mb-3">
                                        {tour.category}
                                    </Badge>

                                    <div className="border-t pt-3">
                                        {tour.originalPrice && (
                                            <p className="text-sm text-gray-400 line-through">
                                                {tour.currency}{tour.originalPrice.toLocaleString()}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-2xl font-bold text-purple-600">
                                                    {tour.currency}{tour.price.toLocaleString()}
                                                </span>
                                                <span className="text-gray-500 ml-1">~</span>
                                            </div>
                                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                                                예약
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredTours.length > 8 && (
                        <div className="text-center mt-8">
                            <Button variant="outline" size="lg">
                                더 많은 투어 보기
                            </Button>
                        </div>
                    )}
                </Container>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            NOL 투어 예약의 장점
                        </h2>
                        <p className="text-xl text-purple-100">
                            안전하고 편리한 글로벌 투어 예약 서비스
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            {
                                icon: Gift,
                                title: "최저가 보장",
                                description: "최고의 가격으로 제공",
                            },
                            {
                                icon: Ticket,
                                title: "즉시 확정",
                                description: "바로 사용 가능한 티켓",
                            },
                            {
                                icon: Users,
                                title: "실시간 예약",
                                description: "24시간 언제든지",
                            },
                            {
                                icon: TrendingUp,
                                title: "검증된 상품",
                                description: "실제 이용자 리뷰",
                            },
                        ].map((benefit, index) => (
                            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                                <CardContent className="p-6">
                                    <benefit.icon className="w-12 h-12 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-purple-100">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Popular Categories */}
            <Container className="py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    📍 카테고리별 인기 상품
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { name: "테마파크", icon: "🎢", count: 1234, color: "from-pink-500 to-purple-500" },
                        { name: "박물관·미술관", icon: "🎨", count: 987, color: "from-blue-500 to-cyan-500" },
                        { name: "워터파크", icon: "🌊", count: 654, color: "from-cyan-500 to-blue-500" },
                        { name: "스카이다이빙", icon: "🪂", count: 432, color: "from-orange-500 to-red-500" },
                    ].map((cat, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <CardContent className="p-6 text-center">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl`}>
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                                <p className="text-gray-600">
                                    {cat.count.toLocaleString()}개 상품
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* Back to Home */}
            <Container className="py-8 text-center">
                <Link href="/">
                    <Button variant="outline" size="lg">
                        홈으로 돌아가기
                    </Button>
                </Link>
            </Container>
        </div>
    );
}
