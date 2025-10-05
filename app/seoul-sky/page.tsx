"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Star, Clock, MapPin, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SeoulSkyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="relative h-[500px]">
                <Image
                    src="https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&h=800&fit=crop"
                    alt="Seoul Sky"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <Container className="relative h-full flex items-end pb-12">
                    <div className="text-white max-w-3xl">
                        <Badge className="bg-red-500 text-white mb-4 text-lg px-4 py-2">
                            NOL 단독 특가
                        </Badge>
                        <h1 className="text-5xl font-bold mb-4">
                            롯데월드 아쿠아리움 & 서울스카이
                        </h1>
                        <p className="text-2xl mb-4">한강의 아름다운 야경을 한눈에</p>
                        <div className="flex items-center gap-4">
                            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            <span className="text-xl font-bold">4.9</span>
                            <span className="text-lg">(111개 리뷰)</span>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
                <Container>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-lg mb-2">회원 최대할인가</p>
                            <div className="flex items-baseline gap-4">
                                <span className="text-5xl font-bold">19,400원~</span>
                                <span className="text-2xl line-through opacity-70">35,000원</span>
                                <Badge className="bg-white text-purple-600 text-xl px-4 py-2">44% 할인</Badge>
                            </div>
                        </div>
                        <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                            <Ticket className="w-5 h-5 mr-2" />
                            예매하기
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="py-12">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Features */}
                        <Card className="mb-8">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold mb-6">상품 특징</h2>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                        <span className="font-semibold">당일 사용 가능</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                        <span className="font-semibold">미사용 자동환불</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                        <span className="font-semibold">QR 간편입장</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Gallery */}
                        <Card className="mb-8">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold mb-6">갤러리</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&h=600&fit=crop",
                                        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
                                        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
                                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
                                    ].map((img, idx) => (
                                        <div key={idx} className="relative h-48 rounded-lg overflow-hidden">
                                            <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Info */}
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold mb-6">이용 안내</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                                        <div>
                                            <p className="font-semibold mb-1">위치</p>
                                            <p className="text-gray-600">서울특별시 송파구 올림픽로 300</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-gray-600 mt-1" />
                                        <div>
                                            <p className="font-semibold mb-1">운영시간</p>
                                            <p className="text-gray-600">월-목: 10:00-20:00<br />금-일: 10:00-22:00</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4">선택 옵션</h3>
                                <div className="space-y-3 mb-6">
                                    <div className="p-4 border-2 border-purple-500 rounded-lg cursor-pointer hover:bg-purple-50">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-semibold">서울스카이 1인권</span>
                                            <Badge className="bg-red-500 text-white">44%</Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">10/9~10/31 이용가능</p>
                                        <p className="text-2xl font-bold text-purple-600">19,400원</p>
                                    </div>
                                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                        <span className="font-semibold">아쿠아리움 1인권</span>
                                        <p className="text-sm text-gray-600 mb-2">당일 사용 가능</p>
                                        <p className="text-2xl font-bold text-purple-600">27,000원</p>
                                    </div>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" size="lg">
                                    <Ticket className="w-5 h-5 mr-2" />
                                    예매하기
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
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
