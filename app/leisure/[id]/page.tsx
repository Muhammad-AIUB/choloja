"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronLeft,
    MapPin,
    Clock,
    Users,
    Calendar,
    Star,
    Heart,
    Share2,
    Ticket,
    Info,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Mock leisure activity data
const leisureData: Record<string, any> = {
    l1: {
        id: "l1",
        title: "★NOL 단독 특가★ 안성팜랜드 입장권",
        subtitle: "경기 안성시",
        description:
            "가족과 함께 즐기는 자연 체험 농장! 동물 먹이주기, 트랙터 마차, 치즈 만들기 등 다양한 체험을 즐겨보세요.",
        images: [
            "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=1200&h=800&fit=crop",
        ],
        price: "9,500원",
        originalPrice: "11,000원",
        discount: "13%",
        badge: "인기",
        rating: 4.6,
        reviewCount: 2847,
        location: "경기도 안성시 공도읍 대신두길 28",
        hours: "09:00 - 18:00 (연중무휴)",
        duration: "자유 이용",
        included: ["입장권", "트랙터 마차", "동물 먹이주기 체험"],
        notIncluded: ["개별 유료 체험", "식사", "주차비"],
    },
    l2: {
        id: "l2",
        title: "서울대공원 리프트+서울동물원 입장권",
        subtitle: "서울 과천시",
        description:
            "서울대공원에서 자연과 동물을 만나보세요. 리프트를 타고 편하게 이동하며 다양한 동물들을 관람할 수 있습니다.",
        images: [
            "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&h=800&fit=crop",
        ],
        price: "6,000원",
        originalPrice: "8,000원",
        discount: "25%",
        rating: 4.7,
        reviewCount: 3912,
        location: "경기도 과천시 대공원광장로 102",
        hours: "09:00 - 19:00 (월요일 휴무)",
        duration: "자유 이용",
        included: ["동물원 입장권", "리프트 왕복권"],
        notIncluded: ["스카이리프트", "식사", "주차비"],
    },
    l3: {
        id: "l3",
        title: "제주신화월드(신화테마파크/신화워터파크)",
        subtitle: "제주 서귀포시",
        description:
            "제주에서 가장 큰 테마파크! 신나는 놀이기구와 시원한 워터파크를 한 번에 즐겨보세요.",
        images: [
            "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop",
        ],
        price: "27,600원",
        originalPrice: "44,000원",
        discount: "38%",
        badge: "베스트",
        rating: 4.8,
        reviewCount: 5234,
        location: "제주특별자치도 서귀포시 안덕면 신화역사로 304번길 38",
        hours: "10:00 - 18:00 (계절별 상이)",
        duration: "자유 이용",
        included: ["테마파크 자유이용권", "워터파크 입장권"],
        notIncluded: ["일부 프리미엄 어트랙션", "식사", "주차비"],
    },
    l4: {
        id: "l4",
        title: "에버랜드 자유이용권",
        subtitle: "경기 용인시",
        description:
            "대한민국 대표 테마파크 에버랜드! 짜릿한 놀이기구부터 귀여운 동물들까지 하루 종일 즐겨보세요.",
        images: [
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&h=800&fit=crop",
            "https://images.unsplash.com/photo-1580479174765-6a7a13e1e21e?w=1200&h=800&fit=crop",
        ],
        price: "42,000원",
        originalPrice: "62,000원",
        discount: "32%",
        rating: 4.9,
        reviewCount: 8921,
        location: "경기도 용인시 처인구 포곡읍 에버랜드로 199",
        hours: "10:00 - 21:00 (계절별 상이)",
        duration: "자유 이용",
        included: ["자유이용권", "40여개 어트랙션 이용", "동물원 관람"],
        notIncluded: ["일부 유료 체험", "식사", "주차비"],
    },
};

export default function LeisureDetailPage() {
    const params = useParams();
    const t = useTranslations('Leisure');
    const leisureId = params.id as string;
    const leisure = leisureData[leisureId];
    const [selectedDate, setSelectedDate] = useState("");
    const [quantity, setQuantity] = useState(1);

    if (!leisure) {
        return (
            <Container className="py-8">
                <div className="text-center py-16">
                    <h1 className="text-2xl font-bold mb-4">
                        {t('notFound')}
                    </h1>
                    <Link href="/">
                        <Button>{t('backToHome')}</Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <Container className="py-4">
                <Link href="/">
                    <Button variant="ghost" size="sm">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        {t('back')}
                    </Button>
                </Link>
            </Container>

            {/* Image Gallery */}
            <Container className="mb-8">
                <div className="grid grid-cols-4 gap-2 h-[400px] overflow-hidden rounded-lg">
                    <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg">
                        <Image
                            src={leisure.images[0]}
                            alt={leisure.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    {leisure.images
                        .slice(1, 3)
                        .map((image: string, index: number) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-lg"
                            >
                                <Image
                                    src={image}
                                    alt={`${leisure.title} - ${index + 2}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                </div>
            </Container>

            {/* Main Content */}
            <Container>
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2">
                        {/* Title & Info */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    {leisure.badge && (
                                        <Badge className="mb-2 bg-pink-500 text-white">
                                            {leisure.badge}
                                        </Badge>
                                    )}
                                    <h1 className="text-3xl font-bold mb-2">
                                        {leisure.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{leisure.subtitle}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold">
                                                {leisure.rating}
                                            </span>
                                            <span>
                                                (
                                                {leisure.reviewCount.toLocaleString()}
                                                개 리뷰)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                상품 소개
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {leisure.description}
                            </p>
                        </div>

                        {/* Information */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                이용 안내
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold mb-1">
                                            위치
                                        </p>
                                        <p className="text-gray-600">
                                            {leisure.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold mb-1">
                                            운영시간
                                        </p>
                                        <p className="text-gray-600">
                                            {leisure.hours}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                                    <div>
                                        <p className="font-semibold mb-1">
                                            이용 기간
                                        </p>
                                        <p className="text-gray-600">
                                            {leisure.duration}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Included */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">
                                포함 사항
                            </h2>
                            <div className="space-y-2">
                                {leisure.included.map(
                                    (item: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-gray-700"
                                        >
                                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                                            <span>{item}</span>
                                        </div>
                                    )
                                )}
                            </div>
                            <h3 className="font-semibold mt-6 mb-3">
                                불포함 사항
                            </h3>
                            <div className="space-y-2">
                                {leisure.notIncluded.map(
                                    (item: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-gray-500"
                                        >
                                            <div className="w-2 h-2 bg-gray-300 rounded-full" />
                                            <span>{item}</span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Notice */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <div className="flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-2">
                                        유의사항
                                    </h3>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>
                                            • 모바일 티켓을 매표소에서 실물
                                            티켓으로 교환 후 입장해주세요
                                        </li>
                                        <li>
                                            • 기상 상황에 따라 일부 시설 운영이
                                            제한될 수 있습니다
                                        </li>
                                        <li>
                                            • 예약일 기준 24시간 전까지 취소
                                            가능합니다
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-xl p-6 shadow-lg">
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2 mb-1">
                                    {leisure.originalPrice && (
                                        <span className="text-lg text-gray-400 line-through">
                                            {leisure.originalPrice}
                                        </span>
                                    )}
                                    {leisure.discount && (
                                        <Badge className="bg-red-500 text-white">
                                            {leisure.discount}
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-3xl font-bold text-pink-600">
                                    {leisure.price}
                                </div>
                                <p className="text-sm text-gray-600">
                                    1인 기준
                                </p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        이용 날짜
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        value={selectedDate}
                                        onChange={(e) =>
                                            setSelectedDate(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        인원
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setQuantity(
                                                    Math.max(1, quantity - 1)
                                                )
                                            }
                                        >
                                            -
                                        </Button>
                                        <span className="text-lg font-semibold w-12 text-center">
                                            {quantity}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setQuantity(quantity + 1)
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span>총 결제금액</span>
                                    <span className="text-pink-600">
                                        {(
                                            parseInt(
                                                leisure.price.replace(
                                                    /[^\d]/g,
                                                    ""
                                                )
                                            ) * quantity
                                        ).toLocaleString()}
                                        원
                                    </span>
                                </div>
                            </div>

                            <Button
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                                size="lg"
                            >
                                <Ticket className="w-5 h-5 mr-2" />
                                예매하기
                            </Button>

                            <div className="mt-6 pt-6 border-t space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Star className="h-4 w-4" />
                                    <span>즉시 사용 가능</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Star className="h-4 w-4" />
                                    <span>24시간 전 무료 취소</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
