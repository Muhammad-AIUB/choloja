"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tent, TreePine, Star, MapPin, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const glampings = [
    {
        id: "1",
        name: "가평 숲속의정원글램핑",
        location: "경기 가평",
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop",
        price: 130500,
        originalPrice: 296000,
        discount: "56%",
        rating: 4.9,
        reviewCount: 234,
    },
    {
        id: "2",
        name: "강릉 바다향 글램핑",
        location: "강원 강릉",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
        price: 145000,
        originalPrice: 280000,
        discount: "48%",
        rating: 4.8,
        reviewCount: 567,
    },
    {
        id: "3",
        name: "제주 한라산 글램핑",
        location: "제주",
        image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800&h=600&fit=crop",
        price: 178000,
        originalPrice: 320000,
        discount: "44%",
        rating: 4.9,
        reviewCount: 892,
    },
    {
        id: "4",
        name: "양평 힐링캠핑",
        location: "경기 양평",
        image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&h=600&fit=crop",
        price: 98000,
        originalPrice: 180000,
        discount: "46%",
        rating: 4.7,
        reviewCount: 345,
    },
    {
        id: "5",
        name: "포천 별빛 카라반",
        location: "경기 포천",
        image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=800&h=600&fit=crop",
        price: 112000,
        originalPrice: 210000,
        discount: "47%",
        rating: 4.8,
        reviewCount: 456,
    },
    {
        id: "6",
        name: "남해 바다뷰 글램핑",
        location: "경남 남해",
        image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&h=600&fit=crop",
        price: 156000,
        originalPrice: 290000,
        discount: "46%",
        rating: 4.9,
        reviewCount: 678,
    },
];

export default function GlampingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="relative h-[500px]">
                <Image
                    src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1920&h=800&fit=crop"
                    alt="Glamping"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/60" />
                <Container className="relative h-full flex items-center">
                    <div className="text-white max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Tent className="w-12 h-12" />
                            <h1 className="text-6xl font-bold">글램핑 / 캠핑</h1>
                        </div>
                        <p className="text-2xl mb-4">자연 속에서 편안한 휴식을</p>
                        <p className="text-xl text-green-100">럭셔리 글램핑부터 오토캠핑까지</p>
                    </div>
                </Container>
            </div>

            {/* Categories */}
            <div className="bg-white border-b py-6">
                <Container>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                        {[
                            { label: "전체", icon: Tent },
                            { label: "글램핑", icon: Tent },
                            { label: "카라반", icon: TreePine },
                            { label: "오토캠핑", icon: Flame },
                            { label: "바다뷰", icon: TreePine },
                            { label: "산속", icon: TreePine },
                        ].map((cat) => (
                            <Button
                                key={cat.label}
                                variant={cat.label === "전체" ? "default" : "outline"}
                                className={cat.label === "전체" ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                                <cat.icon className="w-4 h-4 mr-2" />
                                {cat.label}
                            </Button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Glamping List */}
            <Container className="py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">이번 주 인기 글램핑</h2>
                    <p className="text-gray-600">자연 속에서 특별한 경험을 즐겨보세요</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {glampings.map((glamping) => (
                        <Card key={glamping.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-64">
                                <Image
                                    src={glamping.image}
                                    alt={glamping.name}
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-green-600 text-white text-lg px-4 py-2">
                                    {glamping.discount}
                                </Badge>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{glamping.location}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2">{glamping.name}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{glamping.rating}</span>
                                    <span className="text-sm text-gray-500">({glamping.reviewCount})</span>
                                </div>
                                <div className="border-t pt-3">
                                    <p className="text-sm text-gray-400 line-through">
                                        {glamping.originalPrice.toLocaleString()}원
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-green-600">
                                            {glamping.price.toLocaleString()}원~
                                        </span>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                            예약
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button size="lg" variant="outline">
                        더 많은 글램핑 보기
                    </Button>
                </div>
            </Container>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-16">
                <Container>
                    <h2 className="text-3xl font-bold text-center mb-12">NOL 글램핑 예약 혜택</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Tent className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">프리미엄 시설</h3>
                                <p className="text-gray-600">검증된 럭셔리 글램핑</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">실사용자 리뷰</h3>
                                <p className="text-gray-600">진짜 후기만 모았어요</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TreePine className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">전국 명소</h3>
                                <p className="text-gray-600">자연 속 힐링 스팟</p>
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
