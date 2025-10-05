"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronLeft,
    Gift,
    Calendar,
    Tag,
    Download,
    Share2,
    Clock,
    Star,
    Crown,
    Ticket,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LucideIcon } from "lucide-react";

// Types
interface Coupon {
    id: string;
    title: string;
    description: string;
    discount: string;
    validUntil: string;
    code: string;
}

interface Prize {
    id: string;
    name: string;
    quantity: string;
    image: string;
}

interface Benefit {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
}

interface Promotion {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    badge: string;
    badgeColor: string;
    coupons?: Coupon[];
    prizes?: Prize[];
    benefits?: Benefit[];
    monthlyCoupons?: Coupon[];
}

// Promotion data based on type
const promotionData: Record<string, Promotion> = {
    coupon: {
        title: "최대 5만원 쿠폰팩",
        subtitle: "지금 바로 받아가세요",
        description:
            "NOL에서 제공하는 다양한 할인 쿠폰을 한 번에 받아보세요. 숙박, 레저, 공연 등 모든 카테고리에서 사용 가능합니다.",
        image: "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=1200&h=600&fit=crop",
        badge: "HOT",
        badgeColor: "red",
        coupons: [
            {
                id: "c1",
                title: "호텔/리조트 5만원 할인",
                description: "10만원 이상 결제시",
                discount: "₩50,000",
                validUntil: "2025.12.31",
                code: "HOTEL50K",
            },
            {
                id: "c2",
                title: "펜션/풀빌라 3만원 할인",
                description: "7만원 이상 결제시",
                discount: "₩30,000",
                validUntil: "2025.12.31",
                code: "PENSION30K",
            },
            {
                id: "c3",
                title: "레저/티켓 1만원 할인",
                description: "3만원 이상 결제시",
                discount: "₩10,000",
                validUntil: "2025.12.31",
                code: "LEISURE10K",
            },
            {
                id: "c4",
                title: "전 카테고리 10% 할인",
                description: "최대 2만원 할인",
                discount: "10%",
                validUntil: "2025.12.31",
                code: "ALL10",
            },
        ],
    },
    draw: {
        title: "NOL 드로우",
        subtitle: "럭키드로우 이벤트",
        description:
            "매일 참여하고 푸짐한 상품을 받아가세요! 최대 100만원 상당의 여행상품권과 숙박권이 당첨자를 기다립니다.",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&h=600&fit=crop",
        badge: "NEW",
        badgeColor: "blue",
        prizes: [
            {
                id: "p1",
                name: "1등: 100만원 여행상품권",
                quantity: "1명",
                image: "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=400&h=300&fit=crop",
            },
            {
                id: "p2",
                name: "2등: 50만원 숙박권",
                quantity: "3명",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
            },
            {
                id: "p3",
                name: "3등: 10만원 할인쿠폰",
                quantity: "10명",
                image: "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=400&h=300&fit=crop",
            },
            {
                id: "p4",
                name: "참가상: 5천원 쿠폰",
                quantity: "100명",
                image: "https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=400&h=300&fit=crop",
            },
        ],
    },
    gold: {
        title: "골드회원 전용 쿠폰",
        subtitle: "특별한 혜택을 만나보세요",
        description:
            "NOL 골드회원만의 프리미엄 혜택! 추가 할인과 무료 업그레이드, 전용 서비스를 경험하세요.",
        image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=1200&h=600&fit=crop",
        badge: "GOLD",
        badgeColor: "purple",
        benefits: [
            {
                id: "b1",
                icon: Crown,
                title: "추가 10% 할인",
                description: "모든 숙박 예약시",
            },
            {
                id: "b2",
                icon: Gift,
                title: "무료 객실 업그레이드",
                description: "월 1회 제공",
            },
            {
                id: "b3",
                icon: Star,
                title: "조식 무료 제공",
                description: "파트너 호텔에서",
            },
            {
                id: "b4",
                icon: Clock,
                title: "레이트 체크아웃",
                description: "14:00까지 무료",
            },
        ],
    },
    monthly: {
        title: "이번달 쿠폰팩",
        subtitle: "매월 업데이트되는 쿠폰",
        description:
            "10월의 특별한 할인! 가을 여행 시즌을 맞아 준비한 특별 쿠폰을 놓치지 마세요.",
        image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&h=600&fit=crop",
        badge: "SALE",
        badgeColor: "pink",
        monthlyCoupons: [
            {
                id: "m1",
                title: "10월 가을여행 특가",
                description: "전국 펜션 20% 할인",
                discount: "20%",
                validUntil: "2025.10.31",
                code: "OCT2025",
            },
            {
                id: "m2",
                title: "단풍놀이 패키지",
                description: "리조트 숙박 + 케이블카",
                discount: "₩30,000",
                validUntil: "2025.10.31",
                code: "AUTUMN30K",
            },
            {
                id: "m3",
                title: "주말 국내여행",
                description: "금-일 숙박시 추가 할인",
                discount: "15%",
                validUntil: "2025.10.31",
                code: "WEEKEND15",
            },
        ],
    },
};

export default function PromotionPage() {
    const params = useParams();
    const t = useTranslations("Promotion");
    const promotionType = params.type as string;
    const promotion = promotionData[promotionType];

    if (!promotion) {
        return (
            <Container className="py-8">
                <div className="text-center py-16">
                    <h1 className="text-2xl font-bold mb-4">{t("notFound")}</h1>
                    <Link href="/">
                        <Button>{t("backToHome")}</Button>
                    </Link>
                </div>
            </Container>
        );
    }

    const badgeColors: Record<string, string> = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        pink: "bg-pink-500",
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Button */}
            <Container className="py-4">
                <Link href="/">
                    <Button variant="ghost" size="sm">
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        {t("back")}
                    </Button>
                </Link>
            </Container>

            {/* Hero Section */}
            <div className="relative h-[400px] overflow-hidden">
                <Image
                    src={promotion.image}
                    alt={promotion.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <Container className="relative h-full flex items-end pb-12">
                    <div className="text-white">
                        <Badge
                            className={`${
                                badgeColors[promotion.badgeColor]
                            } text-white mb-4`}
                        >
                            {promotion.badge}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            {promotion.title}
                        </h1>
                        <p className="text-xl text-gray-200">
                            {promotion.subtitle}
                        </p>
                    </div>
                </Container>
            </div>

            {/* Content */}
            <Container className="py-12">
                {/* Description */}
                <div className="bg-white rounded-xl p-8 mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        {promotion.description}
                    </p>
                </div>

                {/* Coupon Type Content */}
                {promotionType === "coupon" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-6">
                            받을 수 있는 쿠폰
                        </h2>
                        {promotion.coupons?.map((coupon: Coupon) => (
                            <Card
                                key={coupon.id}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Ticket className="w-6 h-6 text-pink-600" />
                                                <h3 className="text-xl font-bold">
                                                    {coupon.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                {coupon.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        유효기간:{" "}
                                                        {coupon.validUntil}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Tag className="w-4 h-4" />
                                                    <span>
                                                        코드: {coupon.code}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right ml-6">
                                            <div className="text-3xl font-bold text-pink-600 mb-2">
                                                {coupon.discount}
                                            </div>
                                            <Button size="lg">
                                                <Download className="w-4 h-4 mr-2" />
                                                받기
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Draw Type Content */}
                {promotionType === "draw" && (
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                오늘의 럭키드로우
                            </h2>
                            <p className="text-xl mb-6">
                                참여하고 푸짐한 상품을 받아가세요!
                            </p>
                            <Button
                                size="lg"
                                className="bg-white text-pink-600 hover:bg-gray-100"
                            >
                                <Gift className="w-5 h-5 mr-2" />
                                지금 참여하기
                            </Button>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6">
                                당첨 상품
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {promotion.prizes?.map((prize: Prize) => (
                                    <Card
                                        key={prize.id}
                                        className="overflow-hidden"
                                    >
                                        <div className="relative h-48">
                                            <Image
                                                src={prize.image}
                                                alt={prize.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-6">
                                            <h3 className="font-bold text-lg mb-2">
                                                {prize.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                당첨 인원: {prize.quantity}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Gold Type Content */}
                {promotionType === "gold" && (
                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
                            <Crown className="w-16 h-16 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold mb-4">
                                골드 멤버십
                            </h2>
                            <p className="text-xl mb-6">프리미엄 여행의 시작</p>
                            <Button
                                size="lg"
                                className="bg-white text-purple-600 hover:bg-gray-100"
                            >
                                골드 멤버 가입하기
                            </Button>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-6">
                                골드 전용 혜택
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {promotion.benefits?.map((benefit: Benefit) => {
                                    const IconComponent = benefit.icon;
                                    return (
                                        <Card
                                            key={benefit.id}
                                            className="hover:shadow-lg transition-shadow"
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-purple-100 p-3 rounded-lg">
                                                        <IconComponent className="w-6 h-6 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg mb-2">
                                                            {benefit.title}
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {
                                                                benefit.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Monthly Type Content */}
                {promotionType === "monthly" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-6">
                            10월 특별 쿠폰
                        </h2>
                        {promotion.monthlyCoupons?.map((coupon: Coupon) => (
                            <Card
                                key={coupon.id}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2">
                                                {coupon.title}
                                            </h3>
                                            <p className="text-gray-600 mb-2">
                                                {coupon.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        유효기간:{" "}
                                                        {coupon.validUntil}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Tag className="w-4 h-4" />
                                                    <span>
                                                        코드: {coupon.code}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right ml-6">
                                            <div className="text-3xl font-bold text-pink-600 mb-2">
                                                {coupon.discount}
                                            </div>
                                            <Button size="lg">
                                                <Download className="w-4 h-4 mr-2" />
                                                받기
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Share Section */}
                <div className="mt-12 text-center">
                    <Button variant="outline" size="lg">
                        <Share2 className="w-5 h-5 mr-2" />
                        친구에게 공유하기
                    </Button>
                </div>
            </Container>
        </div>
    );
}
