"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Train, Car, Plane, Clock, MapPin, TrendingDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TransportPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white py-16">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Bus className="w-12 h-12" />
                            <h1 className="text-5xl font-bold">교통</h1>
                        </div>
                        <p className="text-2xl">기차, 고속버스, 렌터카, 항공까지 한번에</p>
                    </div>
                </Container>
            </div>

            {/* Main Categories */}
            <Container className="py-12">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
                        <CardContent className="p-6 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Bus className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">고속버스</h3>
                            <p className="text-gray-600 mb-4">전국 어디든 편리하게</p>
                            <Badge className="bg-red-500 text-white">최대 30% 할인</Badge>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
                        <CardContent className="p-6 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Train className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">기차</h3>
                            <p className="text-gray-600 mb-4">KTX, SRT 빠른 예약</p>
                            <Badge className="bg-red-500 text-white">최대 20% 할인</Badge>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
                        <CardContent className="p-6 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Car className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">렌터카</h3>
                            <p className="text-gray-600 mb-4">제주/전국 렌터카</p>
                            <Badge className="bg-red-500 text-white">제주 특가</Badge>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-xl transition-shadow cursor-pointer group">
                        <CardContent className="p-6 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Plane className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">항공</h3>
                            <p className="text-gray-600 mb-4">국내/해외 항공권</p>
                            <Badge className="bg-red-500 text-white">제주 왕복 특가</Badge>
                        </CardContent>
                    </Card>
                </div>

                {/* Featured Promotions */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8">인기 프로모션</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-48">
                                <Image
                                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop"
                                    alt="기차"
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-purple-600 text-white text-lg px-4 py-2">
                                    20% 할인
                                </Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2">기차 할인</h3>
                                <p className="text-gray-600 mb-4">KTX, SRT 전 노선 할인</p>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    <Train className="w-4 h-4 mr-2" />
                                    예약하기
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-48">
                                <Image
                                    src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=600&fit=crop"
                                    alt="고속버스"
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-blue-600 text-white text-lg px-4 py-2">
                                    30% 할인
                                </Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2">고속버스</h3>
                                <p className="text-gray-600 mb-4">전국 고속버스 예매</p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    <Bus className="w-4 h-4 mr-2" />
                                    예약하기
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                            <div className="relative h-48">
                                <Image
                                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop"
                                    alt="제주 렌터카"
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-3 right-3 bg-green-600 text-white text-lg px-4 py-2">
                                    제주 특가
                                </Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2">제주 렌터카</h3>
                                <p className="text-gray-600 mb-4">제주 여행 필수템</p>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    <Car className="w-4 h-4 mr-2" />
                                    예약하기
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-12">
                    <h2 className="text-3xl font-bold text-center mb-12">NOL 교통 예약 혜택</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingDown className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">최저가 보장</h3>
                            <p className="text-gray-600">교통편 최저가로 제공</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">간편 예약</h3>
                            <p className="text-gray-600">3분 안에 예약 완료</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">전국 어디든</h3>
                            <p className="text-gray-600">전국 모든 노선 예약</p>
                        </div>
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
