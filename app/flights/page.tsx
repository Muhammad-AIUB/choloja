"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Search,
    Plane,
    Calendar,
    Users,
    ArrowLeftRight,
    Clock,
    MapPin,
    Filter,
    SlidersHorizontal,
    Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Flight {
    id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    departure: {
        airport: string;
        city: string;
        time: string;
        date: string;
    };
    arrival: {
        airport: string;
        city: string;
        time: string;
        date: string;
    };
    duration: string;
    stops: number;
    price: number;
    currency: string;
    class: string;
    availableSeats: number;
}

// Mock flight data
const mockFlights: Flight[] = [
    {
        id: "f1",
        airline: "대한항공",
        airlineLogo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop",
        flightNumber: "KE123",
        departure: {
            airport: "ICN",
            city: "서울/인천",
            time: "09:00",
            date: "2025-10-15",
        },
        arrival: {
            airport: "CJU",
            city: "제주",
            time: "10:15",
            date: "2025-10-15",
        },
        duration: "1시간 15분",
        stops: 0,
        price: 89000,
        currency: "₩",
        class: "이코노미",
        availableSeats: 12,
    },
    {
        id: "f2",
        airline: "아시아나항공",
        airlineLogo: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop",
        flightNumber: "OZ456",
        departure: {
            airport: "ICN",
            city: "서울/인천",
            time: "11:30",
            date: "2025-10-15",
        },
        arrival: {
            airport: "CJU",
            city: "제주",
            time: "12:50",
            date: "2025-10-15",
        },
        duration: "1시간 20분",
        stops: 0,
        price: 95000,
        currency: "₩",
        class: "이코노미",
        availableSeats: 8,
    },
    {
        id: "f3",
        airline: "제주항공",
        airlineLogo: "https://images.unsplash.com/photo-1556388158-158f25a6a0c7?w=100&h=100&fit=crop",
        flightNumber: "7C789",
        departure: {
            airport: "ICN",
            city: "서울/인천",
            time: "14:00",
            date: "2025-10-15",
        },
        arrival: {
            airport: "CJU",
            city: "제주",
            time: "15:20",
            date: "2025-10-15",
        },
        duration: "1시간 20분",
        stops: 0,
        price: 65000,
        currency: "₩",
        class: "이코노미",
        availableSeats: 20,
    },
    {
        id: "f4",
        airline: "진에어",
        airlineLogo: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=100&h=100&fit=crop",
        flightNumber: "LJ234",
        departure: {
            airport: "GMP",
            city: "서울/김포",
            time: "16:30",
            date: "2025-10-15",
        },
        arrival: {
            airport: "CJU",
            city: "제주",
            time: "17:45",
            date: "2025-10-15",
        },
        duration: "1시간 15분",
        stops: 0,
        price: 58000,
        currency: "₩",
        class: "이코노미",
        availableSeats: 15,
    },
];

export default function FlightsPage() {
    const t = useTranslations("Flights");
    const [tripType, setTripType] = useState<"roundtrip" | "oneway">("roundtrip");
    const [from, setFrom] = useState("서울/인천 (ICN)");
    const [to, setTo] = useState("제주 (CJU)");
    const [departDate, setDepartDate] = useState("2025-10-15");
    const [returnDate, setReturnDate] = useState("2025-10-18");
    const [passengers, setPassengers] = useState(2);
    const [classType, setClassType] = useState("economy");
    const [showResults, setShowResults] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<string | null>(null);

    const handleSearch = () => {
        setShowResults(true);
    };

    const handleSwapCities = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const handleBookFlight = (flightId: string) => {
        setSelectedFlight(flightId);
        // Here you would typically navigate to booking page or show booking modal
        alert(`항공권 예약이 시작되었습니다. Flight ID: ${flightId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section with Search */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=600&fit=crop"
                        alt="Flight"
                        fill
                        className="object-cover"
                    />
                </div>
                
                <Container className="relative">
                    <div className="text-center mb-12">
                        <Plane className="w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            항공권 검색 및 예약
                        </h1>
                        <p className="text-xl text-blue-100">
                            최저가 항공권을 빠르고 편리하게 예약하세요
                        </p>
                    </div>

                    {/* Search Form */}
                    <Card className="max-w-5xl mx-auto shadow-2xl">
                        <CardContent className="p-6">
                            {/* Trip Type Selector */}
                            <div className="flex gap-4 mb-6">
                                <Button
                                    variant={tripType === "roundtrip" ? "default" : "outline"}
                                    onClick={() => setTripType("roundtrip")}
                                    className="flex-1"
                                >
                                    왕복
                                </Button>
                                <Button
                                    variant={tripType === "oneway" ? "default" : "outline"}
                                    onClick={() => setTripType("oneway")}
                                    className="flex-1"
                                >
                                    편도
                                </Button>
                            </div>

                            {/* Search Fields */}
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
                                {/* From */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        출발지
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={from}
                                            onChange={(e) => setFrom(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="출발지"
                                        />
                                    </div>
                                </div>

                                {/* Swap Button */}
                                <div className="flex items-end justify-center pb-3 lg:order-none order-last lg:col-span-1 col-span-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={handleSwapCities}
                                        className="rounded-full"
                                    >
                                        <ArrowLeftRight className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* To */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        도착지
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={to}
                                            onChange={(e) => setTo(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="도착지"
                                        />
                                    </div>
                                </div>

                                {/* Passengers */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        탑승객
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <select
                                            value={passengers}
                                            onChange={(e) => setPassengers(Number(e.target.value))}
                                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                                <option key={num} value={num}>
                                                    성인 {num}명
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3 mb-6">
                                {/* Departure Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        출발일
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="date"
                                            value={departDate}
                                            onChange={(e) => setDepartDate(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Return Date */}
                                {tripType === "roundtrip" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            귀국일
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="date"
                                                value={returnDate}
                                                onChange={(e) => setReturnDate(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Class Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        좌석 등급
                                    </label>
                                    <select
                                        value={classType}
                                        onChange={(e) => setClassType(e.target.value)}
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="economy">이코노미</option>
                                        <option value="premium">프리미엄 이코노미</option>
                                        <option value="business">비즈니스</option>
                                        <option value="first">퍼스트 클래스</option>
                                    </select>
                                </div>
                            </div>

                            {/* Search Button */}
                            <Button
                                onClick={handleSearch}
                                size="lg"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg"
                            >
                                <Search className="w-5 h-5 mr-2" />
                                항공권 검색
                            </Button>
                        </CardContent>
                    </Card>
                </Container>
            </div>

            {/* Flight Results */}
            {showResults && (
                <Container className="py-12">
                    {/* Filter Bar */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            검색 결과 ({mockFlights.length}개)
                        </h2>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                                <Filter className="w-4 h-4 mr-2" />
                                필터
                            </Button>
                            <Button variant="outline" size="sm">
                                <SlidersHorizontal className="w-4 h-4 mr-2" />
                                정렬
                            </Button>
                        </div>
                    </div>

                    {/* Flight Cards */}
                    <div className="space-y-4">
                        {mockFlights.map((flight) => (
                            <Card
                                key={flight.id}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                        {/* Airline Info */}
                                        <div className="flex items-center gap-4 lg:w-1/5">
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={flight.airlineLogo}
                                                    alt={flight.airline}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {flight.airline}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {flight.flightNumber}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Flight Route */}
                                        <div className="flex items-center gap-4 lg:flex-1">
                                            {/* Departure */}
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {flight.departure.time}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {flight.departure.airport}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {flight.departure.city}
                                                </p>
                                            </div>

                                            {/* Flight Path */}
                                            <div className="flex-1 relative">
                                                <div className="flex items-center justify-center">
                                                    <div className="flex-1 border-t-2 border-gray-300" />
                                                    <Plane className="w-6 h-6 text-blue-600 mx-2" />
                                                    <div className="flex-1 border-t-2 border-gray-300" />
                                                </div>
                                                <div className="text-center mt-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {flight.duration}
                                                    </Badge>
                                                </div>
                                                {flight.stops === 0 && (
                                                    <p className="text-xs text-green-600 text-center mt-1">
                                                        직항
                                                    </p>
                                                )}
                                            </div>

                                            {/* Arrival */}
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {flight.arrival.time}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {flight.arrival.airport}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {flight.arrival.city}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Price and Book */}
                                        <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 lg:w-1/5 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                                            <div className="text-right">
                                                <p className="text-3xl font-bold text-blue-600">
                                                    {flight.currency}
                                                    {flight.price.toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    1인 기준
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    잔여 {flight.availableSeats}석
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() => handleBookFlight(flight.id)}
                                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                            >
                                                <Check className="w-4 h-4 mr-2" />
                                                예약하기
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-8">
                        <Button variant="outline" size="lg">
                            더 많은 항공편 보기
                        </Button>
                    </div>
                </Container>
            )}

            {/* Popular Routes */}
            <Container className="py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    인기 노선
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            from: "서울",
                            to: "제주",
                            price: "₩58,000~",
                            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
                        },
                        {
                            from: "서울",
                            to: "부산",
                            price: "₩45,000~",
                            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
                        },
                        {
                            from: "서울",
                            to: "오사카",
                            price: "₩189,000~",
                            image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&h=300&fit=crop",
                        },
                        {
                            from: "서울",
                            to: "방콕",
                            price: "₩220,000~",
                            image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=300&fit=crop",
                        },
                    ].map((route, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={route.image}
                                    alt={`${route.from} to ${route.to}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="text-xl font-bold">
                                        {route.from} → {route.to}
                                    </p>
                                    <p className="text-lg text-blue-200">
                                        {route.price}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* Benefits Section */}
            <div className="bg-gray-50 py-16">
                <Container>
                    <h2 className="text-3xl font-bold text-center mb-12">
                        NOL 항공권 예약의 장점
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: "💰",
                                title: "최저가 보장",
                                description: "항상 최저가로 항공권을 제공합니다",
                            },
                            {
                                icon: "⚡",
                                title: "빠른 예약",
                                description: "간편한 예약 프로세스로 3분 안에 완료",
                            },
                            {
                                icon: "🎫",
                                title: "즉시 발권",
                                description: "예약 즉시 모바일 티켓 발송",
                            },
                        ].map((benefit, index) => (
                            <Card key={index} className="text-center p-8">
                                <div className="text-5xl mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-bold mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600">{benefit.description}</p>
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
