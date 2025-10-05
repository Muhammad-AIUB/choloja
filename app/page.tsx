"use client";

import { useTranslations } from "next-intl";
import { BannerCarousel } from "@/components/home/BannerCarousel";
import { ListingSection } from "@/components/home/ListingSection";
import { DealCarousel } from "@/components/home/DealCarousel";
import { LiveCommerceGrid } from "@/components/home/LiveCommerceGrid";
import { PromotionCard } from "@/components/home/PromotionCard";
import { Section } from "@/components/ui/section";
import { useTranslatedMockData } from "@/lib/constants/useTranslatedMockData";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { 
    Plane, 
    Hotel, 
    Globe, 
    FerrisWheel, 
    Drama, 
    Home as HomeIcon, 
    Tent, 
    Building, 
    Bus,
    Send,
    Wallet,
    MapPin,
} from "lucide-react";

export default function Home() {
    const t = useTranslations("Home");
    const {
        mockBanners,
        mockHotelListings,
        mockPensionListings,
        mockLeisureDeals,
        mockLiveCommerce,
        mockPromotions,
    } = useTranslatedMockData();
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section with Search - Complete Yanolja Style */}
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
                <Container>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                            어디로 떠나볼까요?
                        </h1>
                        <p className="text-lg text-gray-600">{t("subtitle")}</p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    목적지
                                </label>
                                <input
                                    type="text"
                                    placeholder="어디로 가시나요?"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    체크인
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    체크아웃
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                            검색
                        </button>
                    </div>

                    {/* Popular Searches */}
                    <div className="mt-6 text-center">
                        <span className="text-sm text-gray-600 mr-3">인기 검색:</span>
                        {["서울", "부산", "제주도", "강릉", "여수", "경주"].map((city) => (
                            <button
                                key={city}
                                className="inline-block m-1 px-4 py-1.5 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-purple-50 transition-colors"
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Category Navigation - Exact Yanolja Design */}
            <div className="bg-white py-6">
                <Container>
                    {/* Main Categories - 11 icons in a row */}
                    <div className="flex justify-center gap-8 mb-6 flex-wrap">
                        <Link href="/flights" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <Plane className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900">항공</span>
                            </div>
                        </Link>

                        <Link href="/global" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900">해외숙소</span>
                            </div>
                        </Link>

                        <Link href="/tour" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <MapPin className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900 text-center leading-tight">해외투어티켓</span>
                            </div>
                        </Link>

                        <Link href="/leisure" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <FerrisWheel className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900">국내레저</span>
                            </div>
                        </Link>

                        <Link href="/performance" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <Drama className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900">공연/전시</span>
                            </div>
                        </Link>

                        <Link href="/hotel" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <Hotel className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900 text-center leading-tight">호텔/리조트</span>
                            </div>
                        </Link>

                        <Link href="/pension" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-green-500 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <HomeIcon className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900 text-center leading-tight">펜션/풀빌라</span>
                            </div>
                        </Link>

                        <Link href="/glamping" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <Tent className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900 text-center leading-tight">글램핑/캠핑</span>
                            </div>
                        </Link>

                        <Link href="/motel" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <Building className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900">모텔</span>
                            </div>
                        </Link>

                        <Link href="/transport" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <Bus className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900">교통</span>
                            </div>
                        </Link>

                        <Link href="/natural" className="group">
                            <div className="flex flex-col items-center gap-2 cursor-pointer">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-cyan-400 rounded-[32px] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <Send className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-[13px] font-bold text-gray-900">내추럴</span>
                            </div>
                        </Link>
                    </div>

                    {/* Special Deals Row - 5 cards */}
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href="/nol-money" className="group">
                            <div className="w-[140px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-4">
                                    <div className="flex items-start gap-2 mb-2">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Wallet className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</div>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">3%적립받기</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/seoul-sky" className="group">
                            <div className="w-[140px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src="https://images.unsplash.com/photo-1519817650390-64a93db51149?w=100&h=100&fit=crop"
                                                alt="서울스카이"
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 flex-1">서울스카이</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/southeast-asia" className="group">
                            <div className="w-[140px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=100&h=100&fit=crop"
                                                alt="동남아특가"
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 flex-1">동남아특가</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/jeju-flights" className="group">
                            <div className="w-[140px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop"
                                                alt="제주항공권"
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 flex-1">제주항공권</p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href="/performance-deals" className="group">
                            <div className="w-[140px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&h=100&fit=crop"
                                                alt="공연추석특가"
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 flex-1">공연추석특가</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Container>
            </div>

            {/* Main Banner Carousel - Full Width */}
            <div className="bg-white py-8">
                <Container>
                <BannerCarousel banners={mockBanners} />
                </Container>
            </div>

            {/* Promotions Grid - Yanolja Style */}
            <div className="bg-white py-12">
                <Container>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("promotionsTitle")}</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {mockPromotions.map((promo) => (
                        <PromotionCard key={promo.id} promotion={promo} />
                    ))}
                </div>
                </Container>
            </div>

            {/* HOT! Popular Performances/Exhibitions */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🔥</span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">HOT! 인기 공연/전시</h2>
                            <p className="text-gray-600">지금 가장 핫한 공연과 전시</p>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "뮤지컬 위키드", venue: "샤롯데씨어터", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=400&fit=crop", discount: "45%", price: "77,000" },
                            { title: "오페라의 유령", venue: "블루스퀘어", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop", discount: "45%", price: "66,000" },
                            { title: "김광석 다시 부르기", venue: "대학로 자유극장", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop", discount: "45%", price: "33,000" },
                            { title: "난타", venue: "명동 난타전용관", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=400&fit=crop", discount: "45%", price: "27,500" },
                        ].map((item, idx) => (
                            <Link key={idx} href={`/performance/${idx + 1}`}>
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                    <div className="relative h-64">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            HOT
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{item.venue}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-red-600 font-bold">{item.discount} 할인</span>
                                            <span className="text-lg font-bold">{item.price}원~</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Amazing Deals - 놀라운 혜택 */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🎁</span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">놀라운 혜택</h2>
                            <p className="text-gray-600">지금만 누릴 수 있는 특별 혜택</p>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { title: "신규 회원 10% 쿠폰", desc: "첫 구매 시 즉시 할인", color: "from-purple-500 to-pink-500" },
                            { title: "최대 5만원 쿠폰팩", desc: "매일 선착순 지급", color: "from-blue-500 to-cyan-500" },
                            { title: "골드 멤버십 혜택", desc: "추가 적립 & 우선 예약", color: "from-yellow-500 to-orange-500" },
                        ].map((deal, idx) => (
                            <div key={idx} className={`bg-gradient-to-br ${deal.color} rounded-xl p-6 text-white`}>
                                <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                                <p className="mb-4 opacity-90">{deal.desc}</p>
                                <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
                                    받기
                                </button>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Collection of Special Exhibitions */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🎨</span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">특별 기획전 모음</h2>
                            <p className="text-gray-600">놓치면 안 될 특별한 전시</p>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "모네전: 빛과 그림자", venue: "예술의전당", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop", price: "18,000" },
                            { title: "고흐: 별이 빛나는 밤", venue: "서울시립미술관", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop", price: "20,000" },
                            { title: "현대미술 특별전", venue: "국립현대미술관", image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=400&h=300&fit=crop", price: "15,000" },
                            { title: "한국 전통 미술전", venue: "국립중앙박물관", image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop", price: "12,000" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer">
                                <div className="relative h-48">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{item.venue}</p>
                                    <span className="text-purple-600 font-bold">{item.price}원~</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Live Commerce Section */}
            <div className="bg-gray-50 py-12">
                <Container>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("liveCommerceTitle")}</h2>
                        <p className="text-gray-600">{t("liveCommerceSubtitle")}</p>
                    </div>
                <LiveCommerceGrid items={mockLiveCommerce} />
                </Container>
            </div>

            {/* Popular Accommodations in Areas of Interest */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">📍</span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">관심 지역의 인기 숙소</h2>
                            <p className="text-gray-600">내가 찾는 지역의 베스트 숙소</p>
                        </div>
                    </div>
                    <ListingSection
                        title=""
                        listings={mockHotelListings}
                        viewAllLink="/hotel"
                    />
                </Container>
            </div>

            {/* Where Should I Go for a Staycation? */}
            <div className="bg-gray-50 py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🏖️</span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">호캉스는 어디로 갈까?</h2>
                            <p className="text-gray-600">완벽한 휴식을 위한 펜션 & 풀빌라</p>
                        </div>
                    </div>
                    <ListingSection
                        title=""
                        listings={mockPensionListings}
                        viewAllLink="/pension"
                    />
                </Container>
            </div>

            {/* Domestic Leisure: The Most Popular Places Today */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🎢</span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">국내 레저: 오늘 가장 인기있는 곳</h2>
                            <p className="text-gray-600">실시간 인기 레저 시설</p>
                        </div>
                    </div>
                    <DealCarousel deals={mockLeisureDeals} />
                </Container>
            </div>

            {/* Popular Attractions - 인기 명소 */}
            <div className="bg-gray-50 py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">⭐</span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">인기 명소</h2>
                            <p className="text-gray-600">꼭 가봐야 할 핫플레이스</p>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { name: "에버랜드", location: "경기 용인", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=400&fit=crop" },
                            { name: "롯데월드", location: "서울 송파", image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=600&h=400&fit=crop" },
                            { name: "제주 아쿠아플라넷", location: "제주 서귀포", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop" },
                        ].map((place, idx) => (
                            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                <div className="relative h-48">
                                    <Image src={place.image} alt={place.name} fill className="object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1">{place.name}</h3>
                                    <p className="text-sm text-gray-600">{place.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Most Purchased in the Past Month */}
            <div className="bg-white py-12">
                <Container>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🏆</span>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">최근 한 달간 가장 많이 구매한</h2>
                            <p className="text-gray-600">베스트셀러 상품</p>
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { name: "신촌 바론드호텔", location: "서울 마포구", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop", rating: "4.8", price: "75,000" },
                            { name: "역삼 루미에르", location: "서울 강남구", image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=300&fit=crop", rating: "4.9", price: "55,000" },
                            { name: "제주 오션뷰 펜션", location: "제주 서귀포", image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop", rating: "4.7", price: "98,000" },
                            { name: "강릉 힐링 펜션", location: "강원 강릉", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop", rating: "4.8", price: "85,000" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-500 transition-colors cursor-pointer">
                                <div className="relative h-48">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-purple-600 text-white font-bold px-3 py-1 rounded-full">
                                        #{idx + 1}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold mb-2">{item.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{item.location}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">⭐ {item.rating}</span>
                                        <span className="text-lg font-bold text-purple-600">{item.price}원~</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Popular Destinations */}
            <div className="bg-gray-50 py-12">
                <Container>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("destinationsTitle")}</h2>
                        <p className="text-gray-600">{t("destinationsSubtitle")}</p>
                    </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            id: "dest1",
                            name: t("destinations.jeju"),
                            imageUrl:
                                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
                            count: "3,245",
                        },
                        {
                            id: "dest2",
                            name: t("destinations.busan"),
                            imageUrl:
                                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
                            count: "1,892",
                        },
                        {
                            id: "dest3",
                            name: t("destinations.gangneung"),
                            imageUrl:
                                "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=600&fit=crop",
                            count: "1,456",
                        },
                    ].map((dest) => (
                        <Link key={dest.id} href={`/destination/${dest.id}`}>
                            <div className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl">
                                <Image
                                    src={dest.imageUrl}
                                    alt={dest.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="mb-1 text-2xl font-bold">
                                        {dest.name}
                                    </h3>
                                    <p className="text-sm opacity-90">
                                        {dest.count} {t("accommodations")}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                </Container>
            </div>

            {/* Trust Indicators */}
            <Section background="gray">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: "🏆",
                            titleKey: "trust.trusted",
                            descriptionKey: "trust.trustedDesc",
                        },
                        {
                            icon: "💰",
                            titleKey: "trust.bestPrice",
                            descriptionKey: "trust.bestPriceDesc",
                        },
                        {
                            icon: "🎁",
                            titleKey: "trust.benefits",
                            descriptionKey: "trust.benefitsDesc",
                        },
                        {
                            icon: "💬",
                            titleKey: "trust.support",
                            descriptionKey: "trust.supportDesc",
                        },
                    ].map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="mb-4 text-4xl">{feature.icon}</div>
                            <h3 className="mb-2 font-semibold text-gray-900">
                                {t(feature.titleKey)}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {t(feature.descriptionKey)}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>
        </main>
    );
}
