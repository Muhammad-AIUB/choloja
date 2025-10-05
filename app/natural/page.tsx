"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, TreePine, Star, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const accommodations = [
    {
        id: "1",
        name: "강원 힐링하우스",
        location: "강원 평창",
        image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop",
        price: 89000,
        originalPrice: 150000,
        discount: "41%",
        rating: 4.9,
        reviewCount: 234,
        tags: ["친환경", "숲속", "힐링"],
    },
    {
        id: "2",
        name: "제주 에코스테이",
        location: "제주 서귀포",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        price: 125000,
        originalPrice: 200000,
        discount: "38%",
        rating: 4.8,
        reviewCount: 567,
        tags: ["오션뷰", "친환경", "힐링"],
    },
    {
        id: "3",
        name: "경주 한옥스테이",
        location: "경북 경주",
        image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=600&fit=crop",
        price: 98000,
        originalPrice: 160000,
        discount: "39%",
        rating: 4.9,
        reviewCount: 432,
        tags: ["전통한옥", "문화체험"],
    },
    {
        id: "4",
        name: "남해 바람의 집",
        location: "경남 남해",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
        price: 110000,
        originalPrice: 180000,
        discount: "39%",
        rating: 4.7,
        reviewCount: 345,
        tags: ["해변", "자연친화"],
    },
    {
        id: "5",
        name: "가평 숲속펜션",
        location: "경기 가평",
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&h=600&fit=crop",
        price: 95000,
        originalPrice: 155000,
        discount: "39%",
        rating: 4.8,
        reviewCount: 456,
        tags: ["숲속", "산책로"],
    },
    {
        id: "6",
        name: "보령 해돋이펜션",
        location: "충남 보령",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        price: 88000,
        originalPrice: 140000,
        discount: "37%",
        rating: 4.6,
        reviewCount: 289,
        tags: ["해변", "일출명소"],
    },
];

export default function NaturalPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="relative h-[500px]">
                <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=800&fit=crop"
                    alt="Natural"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-900/60" />
                <Container className="relative h-full flex items-center">
                    <div className="text-white max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                            <Leaf className="w-12 h-12" />
                            <h1 className="text-6xl font-bold">내추럴</h1>
                        </div>
                        <p className="text-2xl mb-4">자연 속에서 진정한 휴식을</p>
                        <p className="text-xl text-green-100">친환경 숙소와 힐링 여행지</p>
                    </div>
                </Container>
            </div>

            {/* Features */}
            <div className="bg-white py-8 border-b">
                <Container>
                    <div className="grid gap-6 md:grid-cols-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-bold mb-1">친환경 숙소</h3>
                            <p className="text-sm text-gray-600">자연을 생각하는 숙박</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <TreePine className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold mb-1">자연 속 힐링</h3>
                            <p className="text-sm text-gray-600">산과 바다에서 휴식</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Heart className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold mb-1">건강한 여행</h3>
                            <p className="text-sm text-gray-600">몸과 마음의 힐링</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Star className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold mb-1">프리미엄 경험</h3>
                            <p className="text-sm text-gray-600">특별한 자연 체험</p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Accommodations Grid */}
            <Container className="py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">추천 내추럴 숙소</h2>
                    <p className="text-gray-600">자연과 하나되는 특별한 경험</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {accommodations.map((acc) => (
                        <Card key={acc.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-64">
                                <Image
                                    src={acc.image}
                                    alt={acc.name}
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-green-600 text-white text-lg px-3 py-1">
                                    {acc.discount}
                                </Badge>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {acc.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs text-green-600 border-green-600">
                                            #{tag}
                                        </Badge>
                                    ))}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{acc.name}</h3>
                                <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {acc.location}
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{acc.rating}</span>
                                    <span className="text-sm text-gray-500">({acc.reviewCount})</span>
                                </div>
                                <div className="border-t pt-3">
                                    <p className="text-sm text-gray-400 line-through">
                                        {acc.originalPrice.toLocaleString()}원
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-green-600">
                                            {acc.price.toLocaleString()}원~
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
                        더 많은 내추럴 숙소 보기
                    </Button>
                </div>
            </Container>

            {/* Info Section */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-8">내추럴 여행이란?</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                내추럴 여행은 자연을 훼손하지 않고 환경을 생각하는 지속 가능한 여행입니다.
                                친환경 숙소에서 머물며 자연과 교감하고, 지역 문화를 존중하며 여행하는 새로운 방식입니다.
                            </p>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Leaf className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="font-bold mb-2">친환경 실천</h3>
                                    <p className="text-sm text-gray-600">자연을 보호하는 숙소</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <TreePine className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-bold mb-2">자연 체험</h3>
                                    <p className="text-sm text-gray-600">숲, 바다와 함께하는 휴식</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Heart className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-bold mb-2">힐링과 치유</h3>
                                    <p className="text-sm text-gray-600">심신의 재충전</p>
                                </div>
                            </div>
                        </div>
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
