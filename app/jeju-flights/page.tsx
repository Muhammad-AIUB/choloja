"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Calendar, Clock, TrendingDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const flights = [
    {
        id: "f1",
        airline: "제주항공",
        from: "김포",
        to: "제주",
        departTime: "07:00",
        arriveTime: "08:10",
        duration: "1시간 10분",
        price: 45000,
        originalPrice: 89000,
        discount: "49%",
        seats: 8,
    },
    {
        id: "f2",
        airline: "에어부산",
        from: "김포",
        to: "제주",
        departTime: "09:30",
        arriveTime: "10:40",
        duration: "1시간 10분",
        price: 48000,
        originalPrice: 92000,
        discount: "48%",
        seats: 12,
    },
    {
        id: "f3",
        airline: "진에어",
        from: "김포",
        to: "제주",
        departTime: "12:00",
        arriveTime: "13:10",
        duration: "1시간 10분",
        price: 42000,
        originalPrice: 85000,
        discount: "51%",
        seats: 5,
    },
    {
        id: "f4",
        airline: "티웨이항공",
        from: "김포",
        to: "제주",
        departTime: "15:30",
        arriveTime: "16:40",
        duration: "1시간 10분",
        price: 46000,
        originalPrice: 88000,
        discount: "48%",
        seats: 15,
    },
    {
        id: "f5",
        airline: "제주항공",
        from: "김포",
        to: "제주",
        departTime: "18:00",
        arriveTime: "19:10",
        duration: "1시간 10분",
        price: 44000,
        originalPrice: 87000,
        discount: "49%",
        seats: 9,
    },
    {
        id: "f6",
        airline: "에어부산",
        from: "김포",
        to: "제주",
        departTime: "20:30",
        arriveTime: "21:40",
        duration: "1시간 10분",
        price: 47000,
        originalPrice: 90000,
        discount: "48%",
        seats: 6,
    },
];

export default function JejuFlightsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="relative h-[400px]">
                <Image
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=800&fit=crop"
                    alt="Jeju Island"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-cyan-600/90" />
                <Container className="relative h-full flex items-center">
                    <div className="text-white max-w-3xl">
                        <Badge className="bg-orange-500 text-white mb-4 text-lg px-4 py-2 font-bold">
                            특가 항공권
                        </Badge>
                        <div className="flex items-center gap-4 mb-4">
                            <Plane className="w-12 h-12" />
                            <h1 className="text-5xl font-bold">제주 항공권</h1>
                        </div>
                        <p className="text-3xl font-bold mb-2">가을 여행 시즌 특가</p>
                        <p className="text-2xl">최저가 42,000원부터</p>
                    </div>
                </Container>
            </div>

            {/* Search Bar */}
            <div className="bg-white shadow-md py-6">
                <Container>
                    <div className="grid gap-4 md:grid-cols-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">출발지</label>
                            <input
                                type="text"
                                value="김포 (GMP)"
                                className="w-full px-4 py-2 border rounded-lg"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">도착지</label>
                            <input
                                type="text"
                                value="제주 (CJU)"
                                className="w-full px-4 py-2 border rounded-lg"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">출발일</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <Plane className="w-4 h-4 mr-2" />
                                항공권 검색
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Flights List */}
            <Container className="py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">오늘의 특가 항공권</h2>
                    <p className="text-gray-600">김포 ↔ 제주 편도 기준</p>
                </div>

                <div className="space-y-4">
                    {flights.map((flight) => (
                        <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="grid gap-6 md:grid-cols-12 items-center">
                                    <div className="md:col-span-2">
                                        <p className="font-bold text-lg">{flight.airline}</p>
                                    </div>

                                    <div className="md:col-span-6">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <p className="text-3xl font-bold">{flight.departTime}</p>
                                                <p className="text-sm text-gray-600">{flight.from}</p>
                                            </div>
                                            <div className="flex-1 relative">
                                                <div className="border-t-2 border-gray-300 relative">
                                                    <Plane className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600" />
                                                </div>
                                                <p className="text-center text-sm text-gray-600 mt-2 flex items-center justify-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {flight.duration}
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-3xl font-bold">{flight.arriveTime}</p>
                                                <p className="text-sm text-gray-600">{flight.to}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-4 text-right">
                                        <div className="mb-2">
                                            <Badge className="bg-red-500 text-white mb-2">
                                                {flight.discount} 할인
                                            </Badge>
                                            {flight.seats < 10 && (
                                                <Badge className="bg-orange-500 text-white ml-2">
                                                    {flight.seats}석 남음
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-400 line-through">
                                            {flight.originalPrice.toLocaleString()}원
                                        </p>
                                        <p className="text-3xl font-bold text-blue-600 mb-3">
                                            {flight.price.toLocaleString()}원
                                        </p>
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            예약하기
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
                <Container>
                    <h2 className="text-3xl font-bold text-center mb-12">NOL 항공권 예약 혜택</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingDown className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">최저가 보장</h3>
                                <p className="text-gray-600">제주 항공권 최저가로 제공</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">간편 예약</h3>
                                <p className="text-gray-600">3분 안에 예약 완료</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Plane className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">즉시 발권</h3>
                                <p className="text-gray-600">모바일 탑승권 즉시 전송</p>
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
