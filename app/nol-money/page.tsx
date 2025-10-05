"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle, Gift, TrendingUp, Zap, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NolMoneyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white py-20">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1920&h=600&fit=crop"
                        alt="NOL Money"
                        fill
                        className="object-cover"
                    />
                </div>

                <Container className="relative">
                    <div className="text-center max-w-3xl mx-auto">
                        <Badge className="bg-white/20 text-white backdrop-blur-sm mb-4 text-lg px-6 py-2">
                            NEW
                        </Badge>
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <Wallet className="w-16 h-16" />
                            <h1 className="text-5xl md:text-6xl font-bold">NOL 머니</h1>
                        </div>
                        <p className="text-2xl mb-4">쓸수록 쌓이는 간편결제</p>
                        <p className="text-xl text-purple-100">
                            레저 상품 결제 시 최대 3% 포인트 적립
                        </p>
                    </div>
                </Container>
            </div>

            {/* Main Benefits */}
            <Container className="py-16">
                <div className="grid gap-8 md:grid-cols-3 mb-16">
                    <Card className="text-center hover:shadow-xl transition-shadow">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">최대 3% 적립</h3>
                            <p className="text-gray-600">
                                국내 레저 카테고리 상품 결제 시<br/>
                                최대 3% NOL 포인트 적립
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-xl transition-shadow">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">간편 결제</h3>
                            <p className="text-gray-600">
                                한 번 가입하면 모든 서비스에서<br/>
                                빠르고 편리하게 결제
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-xl transition-shadow">
                        <CardContent className="p-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Gift className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">첫 결제 1,000P</h3>
                            <p className="text-gray-600">
                                NOL 머니 생애 첫 결제 시<br/>
                                1,000 포인트 지급
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* How it works */}
                <div className="bg-white rounded-2xl p-8 md:p-12 mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">이용 방법</h2>
                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            { step: "1", title: "계좌 연결", desc: "본인 명의 계좌 연결" },
                            { step: "2", title: "충전하기", desc: "10,000원부터 충전 가능" },
                            { step: "3", title: "결제하기", desc: "원하는 상품 구매" },
                            { step: "4", title: "포인트 적립", desc: "자동으로 포인트 적립" },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Earning Rates */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">카테고리별 적립률</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold">국내 레저</h3>
                                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg px-4 py-2">
                                        최대 3%
                                    </Badge>
                                </div>
                                <p className="text-gray-700">
                                    테마파크, 워터파크, 동물원, 체험 등 국내 레저 상품
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                            <CardContent className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold">숙소 & 교통</h3>
                                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg px-4 py-2">
                                        최대 2%
                                    </Badge>
                                </div>
                                <p className="text-gray-700">
                                    국내/해외 숙소, 항공권, 렌터카 등 교통 상품
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                        <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-bold mb-4">NOL 머니 안내사항</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>최소 충전 금액: 10,000원</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>계정당 최대 충전 한도: 2,000,000원</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>NOL 포인트 유효기간: 지급일로부터 1년</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>적립률은 2025년 11월 30일까지 적용</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <span>결제 금액 적립 리워드는 사용 완료 D+1 즉시 적립</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
                <Container className="text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        지금 바로 NOL 머니를 시작하세요
                    </h2>
                    <p className="text-xl mb-8 text-purple-100">
                        쓸수록 쌓이는 혜택을 경험해보세요
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                            <Wallet className="w-5 h-5 mr-2" />
                            NOL 머니 시작하기
                        </Button>
                        <Link href="/">
                            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                                홈으로 돌아가기
                            </Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
}
