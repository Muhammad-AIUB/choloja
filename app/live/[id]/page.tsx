"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    ChevronLeft,
    Play,
    Users,
    Heart,
    Share2,
    Clock,
    Calendar,
    Bell,
    ShoppingCart,
    Tag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock live commerce data
const liveData: Record<string, any> = {
    lc1: {
        id: "lc1",
        title: "[신화월드x진에어] 한 번에 준비하는 제주 여행 특가!",
        scheduledAt: "2025년 10월 13일 (월) 19:00",
        status: "scheduled",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop",
        discount: "최대 50%",
        host: "여행 전문가 김소희",
        hostImage:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        description:
            "제주 여행의 모든 것을 한 번에! 신화월드 입장권부터 진에어 항공권까지 특가로 만나보세요.",
        products: [
            {
                id: "p1",
                name: "신화월드 테마파크 입장권",
                price: "22,000원",
                originalPrice: "44,000원",
                discount: "50%",
                image: "https://images.unsplash.com/photo-1594818379496-da1e345b0ded?w=400&h=300&fit=crop",
            },
            {
                id: "p2",
                name: "진에어 제주 왕복 항공권",
                price: "89,000원",
                originalPrice: "150,000원",
                discount: "41%",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
            },
            {
                id: "p3",
                name: "제주 신화월드 호텔 숙박",
                price: "120,000원",
                originalPrice: "200,000원",
                discount: "40%",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
            },
        ],
    },
    lc2: {
        id: "lc2",
        title: "[비발디파크 일반시즌패스] 겨울 레포츠 왕국 준비 특가",
        scheduledAt: "2025년 10월 15일 (수) 11:00",
        status: "scheduled",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=800&fit=crop",
        discount: "40%",
        host: "겨울 스포츠 전문가 이준호",
        hostImage:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        description:
            "겨울 스키장 시즌권 미리 준비하세요! 올 겨울 비발디파크에서 신나게 즐기기",
        products: [
            {
                id: "p1",
                name: "비발디파크 시즌패스",
                price: "299,000원",
                originalPrice: "499,000원",
                discount: "40%",
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
            },
        ],
    },
    lc3: {
        id: "lc3",
        title: "[경상 호텔&리조트] 가을엔 경주&부산&거제 여행!",
        scheduledAt: "다시보기 가능",
        status: "ended",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=800&fit=crop",
        viewCount: 33000,
        host: "국내 여행 큐레이터 박민지",
        hostImage:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        description:
            "가을 경상도 여행의 모든 것! 경주 역사 투어부터 부산 해변, 거제 풍경까지",
        products: [
            {
                id: "p1",
                name: "경주 한옥 스테이",
                price: "85,000원",
                originalPrice: "120,000원",
                discount: "29%",
                image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
            },
            {
                id: "p2",
                name: "부산 해운대 리조트",
                price: "95,000원",
                originalPrice: "150,000원",
                discount: "37%",
                image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
            },
        ],
    },
    lc4: {
        id: "lc4",
        title: "[제주 레저 특집] 제주여행 필수코스 총집합 특가!",
        scheduledAt: "다시보기 가능",
        status: "ended",
        thumbnailUrl:
            "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=800&fit=crop",
        viewCount: 21600,
        discount: "47%",
        host: "제주 토박이 가이드 강민수",
        hostImage:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        description:
            "제주 레저의 모든 것! 스쿠버다이빙, 승마, ATV, 패러글라이딩까지",
        products: [
            {
                id: "p1",
                name: "제주 스쿠버다이빙 체험",
                price: "65,000원",
                originalPrice: "120,000원",
                discount: "46%",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
            },
            {
                id: "p2",
                name: "제주 승마 체험",
                price: "45,000원",
                originalPrice: "80,000원",
                discount: "44%",
                image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop",
            },
        ],
    },
};

export default function LiveCommercePage() {
    const params = useParams();
    const t = useTranslations("Live");
    const liveId = params.id as string;
    const live = liveData[liveId];

    if (!live) {
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

    const getStatusBadge = () => {
        if (live.status === "live") {
            return (
                <Badge className="animate-pulse bg-red-500 text-white">
                    🔴 LIVE
                </Badge>
            );
        } else if (live.status === "scheduled") {
            return <Badge className="bg-blue-500 text-white">방송예정</Badge>;
        } else {
            return <Badge className="bg-gray-500 text-white">다시보기</Badge>;
        }
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

            {/* Main Content */}
            <Container>
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Video Player */}
                    <div className="lg:col-span-2">
                        {/* Video/Thumbnail */}
                        <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
                            <Image
                                src={live.thumbnailUrl}
                                alt={live.title}
                                fill
                                className="object-cover"
                            />
                            {getStatusBadge()}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {live.status === "ended" && (
                                    <Button size="lg" className="gap-2">
                                        <Play className="w-6 h-6" />
                                        다시보기
                                    </Button>
                                )}
                                {live.status === "scheduled" && (
                                    <div className="text-white text-center">
                                        <Clock className="w-16 h-16 mx-auto mb-4" />
                                        <p className="text-xl font-bold">
                                            방송 예정
                                        </p>
                                    </div>
                                )}
                            </div>
                            {live.viewCount && (
                                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 text-white px-3 py-1 rounded-full">
                                    <Users className="w-4 h-4" />
                                    <span>
                                        {live.viewCount.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Title & Host Info */}
                        <div className="bg-white rounded-xl p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold flex-1">
                                    {live.title}
                                </h1>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Heart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={live.hostImage}
                                        alt={live.host}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold">{live.host}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>{live.scheduledAt}</span>
                                    </div>
                                </div>
                            </div>

                            {live.discount && (
                                <Badge className="bg-pink-500 text-white text-lg px-4 py-2">
                                    {live.discount} 할인
                                </Badge>
                            )}

                            <p className="text-gray-600 mt-4 leading-relaxed">
                                {live.description}
                            </p>
                        </div>

                        {/* Products */}
                        <div className="bg-white rounded-xl p-6">
                            <h2 className="text-xl font-bold mb-6">
                                라이브 특가 상품
                            </h2>
                            <div className="space-y-4">
                                {live.products.map((product: any) => (
                                    <Card
                                        key={product.id}
                                        className="hover:shadow-lg transition-shadow"
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex gap-4">
                                                <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold mb-2">
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {product.originalPrice && (
                                                            <span className="text-sm text-gray-400 line-through">
                                                                {
                                                                    product.originalPrice
                                                                }
                                                            </span>
                                                        )}
                                                        {product.discount && (
                                                            <Badge className="bg-red-500 text-white">
                                                                {
                                                                    product.discount
                                                                }
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-2xl font-bold text-pink-600">
                                                            {product.price}
                                                        </span>
                                                        <Button size="sm">
                                                            <ShoppingCart className="w-4 h-4 mr-1" />
                                                            구매하기
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Info Card */}
                    <div className="lg:col-span-1">
                        {live.status === "scheduled" ? (
                            <div className="sticky top-24 bg-white rounded-xl p-6 shadow-lg">
                                <div className="text-center mb-6">
                                    <Clock className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                                    <h3 className="text-xl font-bold mb-2">
                                        방송 예정
                                    </h3>
                                    <p className="text-gray-600">
                                        {live.scheduledAt}
                                    </p>
                                </div>

                                <Button
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 mb-4"
                                    size="lg"
                                >
                                    <Bell className="w-5 h-5 mr-2" />
                                    알림 신청
                                </Button>

                                <div className="space-y-3 text-sm text-gray-600">
                                    <p>
                                        • 방송 시작 전 알림을 받으실 수 있습니다
                                    </p>
                                    <p>• 라이브 중 특가 상품을 만나보세요</p>
                                    <p>• 실시간 채팅으로 소통하세요</p>
                                </div>
                            </div>
                        ) : (
                            <div className="sticky top-24 bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-4">
                                    라이브 정보
                                </h3>

                                {live.viewCount && (
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b">
                                        <span className="text-gray-600">
                                            시청자
                                        </span>
                                        <span className="font-bold">
                                            {live.viewCount.toLocaleString()}명
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                                    <span className="text-gray-600">
                                        상품 수
                                    </span>
                                    <span className="font-bold">
                                        {live.products.length}개
                                    </span>
                                </div>

                                {live.discount && (
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b">
                                        <span className="text-gray-600">
                                            최대 할인
                                        </span>
                                        <Badge className="bg-pink-500 text-white">
                                            {live.discount}
                                        </Badge>
                                    </div>
                                )}

                                <div className="bg-pink-50 rounded-lg p-4 mb-4">
                                    <div className="flex items-center gap-2 text-pink-600 mb-2">
                                        <Tag className="w-5 h-5" />
                                        <span className="font-semibold">
                                            특가 혜택
                                        </span>
                                    </div>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• 라이브 한정 특가</li>
                                        <li>• 추가 쿠폰 제공</li>
                                        <li>• 무료 배송</li>
                                    </ul>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    size="lg"
                                >
                                    <Heart className="w-5 h-5 mr-2" />
                                    관심 등록
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}
