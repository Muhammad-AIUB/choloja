"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search,
    Star,
    Ticket,
    Flame,
    FerrisWheel,
    Fish,
    TreePine,
    Waves,
    Baby,
    Camera,
    Dumbbell,
    Palette,
    TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LeisureItem {
    id: string;
    title: string;
    location: string;
    image: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    rating?: number;
    reviewCount?: number;
    badge?: string;
    category: string;
}

// Category tabs
const categories = [
    { id: "hot", name: "HOT!", icon: Flame },
    { id: "theme", name: "테마파크", icon: FerrisWheel },
    { id: "jeju", name: "제주입장권", icon: TreePine },
    { id: "aquarium", name: "아쿠아리움", icon: Fish },
    { id: "zoo", name: "동물원", icon: TreePine },
    { id: "water", name: "물놀이/스파", icon: Waves },
    { id: "kids", name: "키즈", icon: Baby },
    { id: "tour", name: "관광", icon: Camera },
    { id: "sports", name: "레저스포츠", icon: Dumbbell },
    { id: "class", name: "체험/클래스", icon: Palette },
];

// Filter tabs
const filterTabs = [
    { id: "special", name: "NOL 스페셜" },
    { id: "md", name: "MD추천" },
    { id: "inland", name: "내륙" },
    { id: "jeju", name: "제주" },
];

// Popular brands
const popularBrands = [
    {
        id: "b1",
        name: "비발디파크",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
        badge: "단독구성특가",
    },
    {
        id: "b2",
        name: "롯데월드",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=200&fit=crop",
    },
    {
        id: "b3",
        name: "에버랜드",
        image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=300&h=200&fit=crop",
    },
    {
        id: "b4",
        name: "곤지암리조트",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=300&h=200&fit=crop",
    },
    {
        id: "b5",
        name: "화담숲",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
        badge: "단독구성특가",
    },
    {
        id: "b6",
        name: "아쿠아필드",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    },
];

// Mock leisure items
const mockLeisureItems: LeisureItem[] = [
    {
        id: "l1",
        title: "[NOL LIVE] 25/26 비발디파크 스키시즌패스+시즌락커 OPEN",
        location: "홍천",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
        price: 598500,
        originalPrice: 630000,
        discount: "5%",
        badge: "NOL LIVE",
        category: "레저스포츠",
    },
    {
        id: "l2",
        title: "화담숲 입장권 (10.24-11.16)",
        location: "경기",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        price: 11000,
        category: "관광",
    },
    {
        id: "l3",
        title: "25/26 곤지암리조트 스키시즌권 선착순판매",
        location: "경기",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&h=600&fit=crop",
        price: 580000,
        badge: "선착순",
        category: "레저스포츠",
    },
    {
        id: "l4",
        title: "메가박스 예매권 특가 (구매일로부터 60일 사용 가능)",
        location: "전국",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
        price: 10900,
        originalPrice: 15000,
        discount: "27%",
        rating: 4.8,
        reviewCount: 12453,
        category: "관광",
    },
    {
        id: "l5",
        title: "★NOL 단독 특가★ 안성팜랜드 입장권",
        location: "경기 안성",
        image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&h=600&fit=crop",
        price: 9500,
        originalPrice: 11000,
        discount: "13%",
        rating: 4.6,
        reviewCount: 2847,
        badge: "단독특가",
        category: "테마파크",
    },
    {
        id: "l6",
        title: "N서울타워 전망대 이용권 특가",
        location: "서울",
        image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&h=600&fit=crop",
        price: 20800,
        originalPrice: 26000,
        discount: "20%",
        rating: 4.7,
        reviewCount: 8934,
        category: "관광",
    },
    {
        id: "l7",
        title: "롯데월드 종일권",
        location: "서울",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=600&fit=crop",
        price: 59000,
        originalPrice: 62000,
        discount: "5%",
        rating: 4.9,
        reviewCount: 15234,
        badge: "베스트",
        category: "테마파크",
    },
    {
        id: "l8",
        title: "에버랜드 자유이용권",
        location: "경기 용인",
        image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop",
        price: 56000,
        originalPrice: 62000,
        discount: "10%",
        rating: 4.8,
        reviewCount: 21543,
        badge: "인기",
        category: "테마파크",
    },
    {
        id: "l9",
        title: "[NOL LIVE] 아쿠아플라넷 제주 입장권",
        location: "제주",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
        price: 68100,
        originalPrice: 88500,
        discount: "23%",
        rating: 4.7,
        reviewCount: 5643,
        badge: "제주",
        category: "아쿠아리움",
    },
    {
        id: "l10",
        title: "제주 신화월드(신화테마파크/워터파크)",
        location: "제주",
        image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=800&h=600&fit=crop",
        price: 27600,
        originalPrice: 44000,
        discount: "38%",
        rating: 4.8,
        reviewCount: 9876,
        badge: "제주",
        category: "테마파크",
    },
    {
        id: "l11",
        title: "서울랜드 자유이용권",
        location: "경기",
        image: "https://images.unsplash.com/photo-1580479174765-6a7a13e1e21e?w=800&h=600&fit=crop",
        price: 46000,
        originalPrice: 56000,
        discount: "18%",
        rating: 4.6,
        reviewCount: 6754,
        category: "테마파크",
    },
    {
        id: "l12",
        title: "스파디움24 - 도심속 멀티힐링 스팟",
        location: "서울",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
        price: 16100,
        originalPrice: 23000,
        discount: "30%",
        rating: 4.5,
        reviewCount: 3421,
        category: "물놀이/스파",
    },
];

export default function LeisurePage() {
    const [selectedCategory, setSelectedCategory] = useState("hot");
    const [selectedFilter, setSelectedFilter] = useState("special");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = mockLeisureItems.filter(item => {
        if (selectedCategory === "hot") return true;
        return item.category === selectedCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-12">
                <Container>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Ticket className="w-12 h-12" />
                        <h1 className="text-4xl md:text-5xl font-bold">국내레저</h1>
                    </div>
                    <p className="text-center text-xl text-orange-100 mb-8">
                        대한민국 최고의 레저·티켓을 한 곳에서
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="레저, 테마파크, 워터파크 검색..."
                                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </Container>
            </div>

            {/* Category Tabs */}
            <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
                <Container>
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
                        {categories.map((category) => {
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
                        <Button variant="outline" className="whitespace-nowrap">
                            더보기
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Popular Brands Section */}
            <Container className="py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        🔥 추천 인기 브랜드
                    </h2>
                    <Button variant="ghost" size="sm">
                        전체보기
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {popularBrands.map((brand) => (
                        <Card
                            key={brand.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                        >
                            <div className="relative h-32">
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {brand.badge && (
                                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                                        {brand.badge}
                                    </Badge>
                                )}
                            </div>
                            <CardContent className="p-3 text-center">
                                <p className="font-semibold text-sm">{brand.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* Filter Tabs */}
            <div className="bg-gray-100 border-y">
                <Container>
                    <div className="flex gap-2 py-3">
                        {filterTabs.map((tab) => (
                            <Button
                                key={tab.id}
                                variant={selectedFilter === tab.id ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setSelectedFilter(tab.id)}
                            >
                                {tab.name}
                            </Button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Main Content - Leisure Items Grid */}
            <Container className="py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        국내 레저, 오늘 가장 인기 있는 곳
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {filteredItems.map((item) => (
                        <Link key={item.id} href={`/leisure/${item.id}`}>
                            <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group h-full">
                                <div className="relative h-56">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {item.badge && (
                                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                                            {item.badge}
                                        </Badge>
                                    )}
                                    {item.discount && (
                                        <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                                            {item.discount}
                                        </Badge>
                                    )}
                                </div>

                                <CardContent className="p-4">
                                    <h3 className="font-bold mb-2 line-clamp-2 h-12 text-sm">
                                        {item.title}
                                    </h3>

                                    {item.rating && (
                                        <div className="flex items-center gap-1 mb-3">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-sm">{item.rating}</span>
                                            <span className="text-xs text-gray-500">
                                                ({item.reviewCount?.toLocaleString()})
                                            </span>
                                        </div>
                                    )}

                                    <div className="border-t pt-3">
                                        {item.originalPrice && (
                                            <p className="text-sm text-gray-400 line-through">
                                                {item.originalPrice.toLocaleString()}원
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-bold text-purple-600">
                                                {item.price.toLocaleString()}원~
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                    <Button variant="outline" size="lg">
                        더 많은 상품 보기
                    </Button>
                </div>
            </Container>

            {/* Regional Rankings */}
            <div className="bg-white py-12">
                <Container>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        🏆 지역별 인기 순위
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {["경기", "서울", "강원", "제주"].map((region) => (
                            <div key={region}>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 border-purple-600">
                                    {region}
                                </h3>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map((rank) => (
                                        <div
                                            key={rank}
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                        >
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                                    rank <= 3
                                                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                                                        : "bg-gray-200 text-gray-600"
                                                }`}
                                            >
                                                {rank}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold truncate">
                                                    {mockLeisureItems[rank - 1]?.title}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {mockLeisureItems[rank - 1]?.price.toLocaleString()}원~
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Benefits Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            NOL 국내레저의 특별함
                        </h2>
                        <p className="text-xl text-purple-100">
                            더 저렴하고 편리한 레저 예약
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: TrendingUp,
                                title: "최저가 보장",
                                description: "어디보다 저렴한 가격",
                            },
                            {
                                icon: Ticket,
                                title: "즉시 사용",
                                description: "구매 후 바로 입장",
                            },
                            {
                                icon: Star,
                                title: "실시간 예약",
                                description: "24시간 언제든지",
                            },
                        ].map((benefit, index) => (
                            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                                <CardContent className="p-8">
                                    <benefit.icon className="w-12 h-12 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-purple-100">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Container>
            </div>

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
