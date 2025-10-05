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
    Waves,
    Sparkles,
    Baby,
    Dog,
    Tent,
    Home as HomeIcon,
    Crown,
    Droplets,
    Building,
} from "lucide-react";

export default function PensionPage() {
    const [selectedCategory, setSelectedCategory] = useState("핫딜");

    const categories = [
        { id: "핫딜", name: "이번주 특가", icon: Flame },
        { id: "풀빌라", name: "풀빌라", icon: Waves },
        { id: "신축", name: "신축/리모델링", icon: Sparkles },
        { id: "키즈", name: "키즈펜션", icon: Baby },
        { id: "애견", name: "애견동반", icon: Dog },
        { id: "글램핑", name: "글램핑", icon: Tent },
        { id: "독채", name: "독채펜션", icon: HomeIcon },
        { id: "프리미엄", name: "프리미엄", icon: Crown },
        { id: "스파", name: "스파펜션", icon: Droplets },
        { id: "게스트", name: "게스트하우스", icon: Building },
    ];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section with Search */}
            <div className="bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 py-12">
                <Container>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">펜션/풀빌라</h1>
                    <p className="text-gray-600 mb-8">가족과 함께하는 완벽한 휴식</p>

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
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <Button className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-8 py-3 h-auto">
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
                                            ? "bg-teal-600 text-white shadow-lg"
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

            {/* 펜션 특가 프로모션 */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <Flame className="w-8 h-8 text-orange-600" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">펜션 특가</h2>
                            <p className="text-gray-600">이번주 놓치면 안될 특가</p>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { title: "풀빌라 특가", discount: "최대 50%", color: "from-blue-500 to-cyan-500" },
                            { title: "신축 펜션", discount: "오픈 특가", color: "from-green-500 to-teal-500" },
                            { title: "독채 펜션", discount: "프라이빗 힐링", color: "from-purple-500 to-pink-500" },
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
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <h2 className="text-2xl font-bold text-gray-900">NOL 라이브</h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "[제주 풀빌라] 오션뷰 특가", time: "방송예정", discount: "최대 60%" },
                            { title: "[강원 프리미엄] 힐링 펜션", time: "다시보기", discount: "50%" },
                            { title: "[경기 독채] 가족 펜션", time: "방송예정", discount: "특별가" },
                            { title: "[남해 글램핑] 자연 속 휴식", time: "방송예정", discount: "45%" },
                        ].map((live, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="relative h-40 bg-gradient-to-br from-teal-400 to-green-500">
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {live.time}
                                    </div>
                                    <div className="absolute bottom-3 right-3 bg-white text-teal-600 text-xs font-bold px-3 py-1 rounded-full">
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

            {/* 인기 펜션 */}
            <div className="bg-white py-12">
                <Container>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">호캉스는 어디로 갈까?</h2>
                    <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
                        {["제주", "강원", "경기", "남해", "동해", "서해"].map((region) => (
                            <button key={region} className="px-6 py-2 bg-white border-2 border-gray-300 rounded-full hover:border-teal-500 hover:text-teal-600 whitespace-nowrap">
                                {region}
                            </button>
                        ))}
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { name: "제주 오션뷰 풀빌라", price: "350,000", discount: "40%", rating: "4.9", image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=400&h=300&fit=crop" },
                            { name: "강릉 힐링 펜션", price: "180,000", discount: "25%", rating: "4.8", image: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=400&h=300&fit=crop" },
                            { name: "가평 독채 펜션", price: "250,000", discount: "30%", rating: "4.7", image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=400&h=300&fit=crop" },
                            { name: "남해 글램핑", price: "150,000", discount: "", rating: "4.8", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop" },
                        ].map((pension, idx) => (
                            <Link key={idx} href={`/pension/${idx + 1}`}>
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                    <div className="relative h-48">
                                        <Image src={pension.image} alt={pension.name} fill className="object-cover" />
                                        {pension.discount && (
                                            <div className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                {pension.discount}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold mb-2">{pension.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>{pension.rating}</span>
                                        </div>
                                        <p className="text-lg font-bold text-teal-600">{pension.price}원~</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>

            {/* 관심 지역 펜션 랭킹 */}
            <div className="bg-gray-50 py-12">
                <Container>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">관심 지역의 인기 펜션</h2>
                        <span className="text-sm text-gray-600">최근 한 주간 예약 많은 순</span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        {[
                            { rank: 1, name: "제주 스위트 풀빌라", price: "420,000", rating: "4.9", reviews: "1,234", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop" },
                            { rank: 2, name: "강릉 바다뷰 펜션", price: "195,000", rating: "4.8", reviews: "892", discount: "35%", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop" },
                            { rank: 3, name: "가평 숲속 독채", price: "280,000", rating: "4.7", reviews: "567", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop" },
                            { rank: 4, name: "양평 힐링 펜션", price: "160,000", rating: "4.8", reviews: "743", discount: "20%", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=300&h=200&fit=crop" },
                            { rank: 5, name: "속초 오션뷰", price: "220,000", rating: "4.9", reviews: "1,045", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=200&fit=crop" },
                        ].map((pension) => (
                            <Link key={pension.rank} href={`/pension/${pension.rank}`}>
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                    <div className="relative h-40">
                                        <Image src={pension.image} alt={pension.name} fill className="object-cover" />
                                        <div className="absolute top-3 left-3 bg-teal-600 text-white font-bold px-3 py-1 rounded-full">
                                            #{pension.rank}
                                        </div>
                                        {pension.discount && (
                                            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                {pension.discount}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-sm mb-2">{pension.name}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>{pension.rating}</span>
                                            <span>({pension.reviews})</span>
                                        </div>
                                        <p className="text-teal-600 font-bold">{pension.price}원~</p>
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
                            { title: "풀빌라 스페셜", subtitle: "프라이빗 풀장과 함께", tag: "이벤트", color: "from-cyan-500 to-blue-500" },
                            { title: "신축 펜션 모음", subtitle: "깨끗하고 쾌적한 신축", tag: "MD추천", color: "from-green-500 to-teal-500" },
                            { title: "가족 펜션 추천", subtitle: "아이와 함께 즐기는", tag: "MD추천", color: "from-orange-500 to-red-500" },
                            { title: "커플 펜션", subtitle: "로맨틱한 휴식", tag: "MD추천", color: "from-pink-500 to-purple-500" },
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
