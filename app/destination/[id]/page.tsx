"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ListingCard } from "@/components/home/ListingCard";
import { ChevronLeft, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock destination data
const destinationData: Record<string, any> = {
    dest1: {
        id: "dest1",
        name: "제주",
        fullName: "제주특별자치도",
        description:
            "아름다운 자연과 독특한 문화가 어우러진 대한민국 최고의 여행지",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=400&fit=crop",
        count: 3245,
        highlights: [
            "한라산",
            "섭지코지",
            "우도",
            "성산일출봉",
            "협재해수욕장",
        ],
        listings: [
            {
                id: "1",
                title: "제주 오션뷰 펜션",
                location: "제주 서귀포시",
                imageUrl:
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
                price: "₩150,000",
                originalPrice: "₩200,000",
                discount: "25%",
                rating: 4.9,
                reviewCount: 186,
                category: "펜션",
                isFeatured: true,
            },
            {
                id: "jeju2",
                title: "제주 신화월드 리조트",
                location: "제주 서귀포시",
                imageUrl:
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                price: "₩180,000",
                originalPrice: "₩250,000",
                discount: "28%",
                rating: 4.8,
                reviewCount: 421,
                category: "호텔",
            },
            {
                id: "jeju3",
                title: "제주 성산 풀빌라",
                location: "제주 서귀포시",
                imageUrl:
                    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800",
                price: "₩320,000",
                rating: 4.7,
                reviewCount: 95,
                category: "풀빌라",
            },
        ],
    },
    dest2: {
        id: "dest2",
        name: "부산",
        fullName: "부산광역시",
        description:
            "바다와 산이 어우러진 항구 도시, 신선한 해산물과 아름다운 해변",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=400&fit=crop",
        count: 1892,
        highlights: [
            "해운대",
            "광안리",
            "감천문화마을",
            "태종대",
            "자갈치시장",
        ],
        listings: [
            {
                id: "3",
                title: "부산 해운대 리조트",
                location: "부산 해운대구",
                imageUrl:
                    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
                price: "₩95,000",
                originalPrice: "₩130,000",
                discount: "27%",
                rating: 4.7,
                reviewCount: 521,
                category: "호텔",
                isFeatured: true,
            },
            {
                id: "busan2",
                title: "광안리 오션뷰 호텔",
                location: "부산 수영구",
                imageUrl:
                    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
                price: "₩120,000",
                originalPrice: "₩180,000",
                discount: "33%",
                rating: 4.6,
                reviewCount: 312,
                category: "호텔",
            },
            {
                id: "busan3",
                title: "기장 독채 펜션",
                location: "부산 기장군",
                imageUrl:
                    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
                price: "₩200,000",
                rating: 4.8,
                reviewCount: 143,
                category: "펜션",
            },
        ],
    },
    dest3: {
        id: "dest3",
        name: "강릉",
        fullName: "강원도 강릉시",
        description: "동해안의 아름다운 해변과 신선한 해산물, 커피의 도시",
        image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=400&fit=crop",
        count: 1456,
        highlights: [
            "경포해변",
            "주문진",
            "오죽헌",
            "정동진",
            "안목해변 카페거리",
        ],
        listings: [
            {
                id: "gangneung1",
                title: "강릉 경포대 리조트",
                location: "강원 강릉시",
                imageUrl:
                    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
                price: "₩110,000",
                originalPrice: "₩160,000",
                discount: "31%",
                rating: 4.5,
                reviewCount: 278,
                category: "호텔",
                isFeatured: true,
            },
            {
                id: "gangneung2",
                title: "주문진 오션뷰 펜션",
                location: "강원 강릉시",
                imageUrl:
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
                price: "₩140,000",
                rating: 4.7,
                reviewCount: 189,
                category: "펜션",
            },
            {
                id: "gangneung3",
                title: "정동진 풀빌라",
                location: "강원 강릉시",
                imageUrl:
                    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800",
                price: "₩250,000",
                originalPrice: "₩320,000",
                discount: "22%",
                rating: 4.9,
                reviewCount: 76,
                category: "풀빌라",
            },
        ],
    },
};

export default function DestinationPage() {
    const params = useParams();
    const t = useTranslations("Home");
    const destinationId = params.id as string;
    const destination = destinationData[destinationId];

    if (!destination) {
        return (
            <Container className="py-8">
                <div className="text-center py-16">
                    <h1 className="text-2xl font-bold mb-4">
                        목적지를 찾을 수 없습니다
                    </h1>
                    <Link href="/">
                        <Button>홈으로 돌아가기</Button>
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
                        뒤로가기
                    </Button>
                </Link>
            </Container>

            {/* Hero Section */}
            <div className="relative h-[300px] overflow-hidden mb-8">
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <Container className="relative h-full flex items-end pb-8">
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5" />
                            <span className="text-lg">
                                {destination.fullName}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            {destination.name}
                        </h1>
                        <p className="text-xl text-gray-200 mb-4">
                            {destination.description}
                        </p>
                        <Badge className="bg-white/20 text-white backdrop-blur-sm">
                            {destination.count.toLocaleString()}개의 숙소
                        </Badge>
                    </div>
                </Container>
            </div>

            {/* Highlights */}
            <Container className="mb-8">
                <div className="bg-white rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4">추천 명소</h2>
                    <div className="flex flex-wrap gap-2">
                        {destination.highlights.map(
                            (highlight: string, index: number) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-base py-2 px-4"
                                >
                                    {highlight}
                                </Badge>
                            )
                        )}
                    </div>
                </div>
            </Container>

            {/* Filter Bar */}
            <Container className="mb-6">
                <div className="bg-white rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            필터
                        </Button>
                        <Button variant="outline" size="sm">
                            <SlidersHorizontal className="w-4 h-4 mr-2" />
                            정렬
                        </Button>
                    </div>
                    <p className="text-sm text-gray-600">
                        총 {destination.count.toLocaleString()}개의 숙소
                    </p>
                </div>
            </Container>

            {/* Listings Grid */}
            <Container className="pb-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {destination.listings.map((listing: any) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12">
                    <Button size="lg" variant="outline">
                        더 많은 숙소 보기
                    </Button>
                </div>
            </Container>
        </div>
    );
}
