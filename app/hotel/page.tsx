"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Search,
    MapPin,
    Star,
    Flame,
    Crown,
    Umbrella,
    Clock,
    Sunrise,
    Dog,
    Baby,
    Gift,
    Calendar,
} from "lucide-react";

export default function HotelPage() {
    const [selectedCategory, setSelectedCategory] = useState("핫딜");

    const categories = [
        { id: "핫딜", name: "이번주 핫딜", icon: Flame },
        { id: "프리미엄", name: "프리미엄호텔", icon: Crown },
        { id: "리조트", name: "리조트", icon: Umbrella },
        { id: "마감임박", name: "마감임박특가", icon: Clock },
        { id: "얼리버드", name: "얼리버드특가", icon: Sunrise },
        { id: "애견", name: "애견동반", icon: Dog },
        { id: "키즈", name: "키즈 호텔", icon: Baby },
        { id: "호캉스", name: "호캉스패키지", icon: Gift },
        { id: "쿠폰", name: "놀 쿠폰", icon: Gift },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section with Search */}
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
                <Container>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">호텔/리조트</h1>
                    <p className="text-gray-600 mb-8">프리미엄 휴식을 경험하세요</p>

                    {/* Search Bar */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex gap-4 items-end flex-wrap">
                            <div className="flex-1 min-w-[250px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    어디로 갈까요?
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="지역선택"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 h-auto">
                                <Search className="w-5 h-5 mr-2" />
                                검색
                            </Button>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all ${
                                        selectedCategory === cat.id
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                </Container>
            </div>

            {/* Special Promotions */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-8 h-8 text-blue-600" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">숙페셜데이</h2>
                            <p className="text-gray-600">금주의 특가</p>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { title: "주차별 기획전", discount: "최대 60%", color: "from-blue-500 to-cyan-500" },
                            { title: "스탬프 프로모션", discount: "추가 할인", color: "from-purple-500 to-pink-500" },
                            { title: "브랜드 기획전", discount: "특별 혜택", color: "from-orange-500 to-red-500" },
                        ].map((promo, idx) => (
                            <div key={idx} className={`bg-gradient-to-br ${promo.color} rounded-xl p-6 text-white cursor-pointer hover:shadow-xl transition-shadow`}>
                                <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                                <p className="text-lg opacity-90">{promo.discount}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* NOL Live Section */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <h2 className="text-2xl font-bold text-gray-900">NOL 라이브</h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "[롯데리조트] 전국 리조트 특가", time: "방송예정", discount: "최대 70%" },
                            { title: "[켄싱턴 호텔] 가을 호캉스", time: "다시보기", discount: "66%" },
                            { title: "[파라다이스 부산] 씨메르 혜택", time: "방송예정", discount: "특별가" },
                            { title: "[서울 호캉스] 프리미엄 호텔", time: "방송예정", discount: "최대 50%" },
                        ].map((live, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="relative h-40 bg-gradient-to-br from-blue-400 to-purple-500">
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {live.time}
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full">
                                        {live.discount}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-sm">{live.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* 우리도 호캉스 갈까? */}
            <div className="bg-white py-12">
                <Container>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">우리도 호캉스 갈까?</h2>
                    <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
                        {["휴가에딱", "경인강원", "서울", "전국인기"].map((tab) => (
                            <button key={tab} className="px-6 py-2 bg-white border-2 border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 whitespace-nowrap">
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { name: "신라모노그램 강릉 호텔", price: "444,000", discount: "57%", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop" },
                            { name: "시그니엘 부산", price: "750,200", discount: "8%", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop" },
                            { name: "인스파이어 리조트", price: "605,000", discount: "", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop" },
                            { name: "호텔 탑스텐 정동진", price: "357,000", discount: "32%", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop" },
                        ].map((hotel, idx) => (
                            <Link key={idx} href={`/hotel/${idx + 1}`}>
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                    <div className="relative h-48">
                                        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
                                        {hotel.discount && (
                                            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {hotel.discount}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold mb-2">{hotel.name}</h3>
                                        <p className="text-lg font-bold text-blue-600">{hotel.price}원~</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>

            {/* 관심 지역의 많이 찾는 숙소 */}
            <div className="bg-gray-50 py-12">
                <Container>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">관심 지역의 많이 찾는 숙소</h2>
                        <span className="text-sm text-gray-600">최근 한 주간 구매 많은 순</span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        {[
                            { rank: 1, name: "스카이베이 호텔 경포", price: "288,400", rating: "4.6", reviews: "7,086", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&h=200&fit=crop" },
                            { rank: 2, name: "블루오션 호텔3차", price: "86,000", rating: "4.6", reviews: "265", discount: "57%", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=300&h=200&fit=crop" },
                            { rank: 3, name: "센텀마크 호텔 양양", price: "99,000", rating: "4.7", reviews: "885", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=300&h=200&fit=crop" },
                            { rank: 4, name: "신라스테이 서초", price: "189,000", rating: "4.7", reviews: "5,352", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&h=200&fit=crop" },
                            { rank: 5, name: "신라스테이 구로", price: "160,000", rating: "4.7", reviews: "8,780", discount: "5%", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop" },
                        ].map((hotel) => (
                            <Link key={hotel.rank} href={`/hotel/${hotel.rank}`}>
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                    <div className="relative h-40">
                                        <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
                                        <div className="absolute top-3 left-3 bg-blue-600 text-white font-bold px-3 py-1 rounded-full">
                                            #{hotel.rank}
                                        </div>
                                        {hotel.discount && (
                                            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                {hotel.discount}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-sm mb-2">{hotel.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>{hotel.rating}</span>
                                            <span>({hotel.reviews})</span>
                                        </div>
                                        <p className="text-blue-600 font-bold">{hotel.price}원~</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>

            {/* 기획전 모음 */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">기획전 모음</h2>
                        <Button variant="outline">전체보기</Button>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "이번주 호텔 특가 오픈!", subtitle: "국내숙소 쿠폰팩 받고 예약하기", tag: "이벤트", color: "from-blue-500 to-purple-500" },
                            { title: "신라스테이 플러스 이호테우", subtitle: "[단독 기획전★]17만원대 부터~", tag: "MD추천", color: "from-purple-500 to-pink-500" },
                            { title: "파라다이스 호텔 부산", subtitle: "씨메르 + 오션풀 혜택까지!", tag: "MD추천", color: "from-pink-500 to-red-500" },
                            { title: "라발스 호텔 부산", subtitle: "부산의 새로운 랜드마크", tag: "MD추천", color: "from-orange-500 to-yellow-500" },
                        ].map((item, idx) => (
                            <div key={idx} className={`bg-gradient-to-br ${item.color} rounded-xl p-6 text-white cursor-pointer hover:shadow-xl transition-shadow relative overflow-hidden`}>
                                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {item.tag}
                                </div>
                                <div className="mt-8">
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm opacity-90">{item.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </main>
    );
}
