"use client";

import { Container } from "@/components/ui/container";
import { sampleAccommodations } from "@/lib/constants/sampleAccommodations";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16">
                <Container>
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                            Find Your Perfect Stay
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">
                            Book accommodations with ease
                        </p>
                    </div>
                </Container>
            </div>

            {/* Accommodations Listing */}
            <Container className="py-12">
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        Featured Accommodations
                    </h2>
                    <p className="text-gray-600">
                        Discover our handpicked selection of premium properties
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sampleAccommodations.map((accommodation) => (
                        <Link
                            key={accommodation.id}
                            href={`/hotel/${accommodation.id}`}
                            className="group"
                        >
                            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <div
                                        style={{
                                            backgroundImage: `url(${accommodation.images[0]})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {accommodation.badges &&
                                        accommodation.badges.length > 0 && (
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                    {accommodation.badges[0]}
                                                </span>
                                            </div>
                                        )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                        {accommodation.title}
                                    </h3>

                                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                        <MapPin className="h-4 w-4" />
                                        <span>{accommodation.location}</span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-gray-900">
                                                {accommodation.rating}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            ({accommodation.reviewCount.toLocaleString()}{" "}
                                            reviews)
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">
                                                Starting from
                                            </p>
                                            <p className="text-xl font-bold text-pink-600">
                                                {accommodation.priceRange.split(" - ")[0]}
                                            </p>
                                        </div>
                                        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-16 mt-12">
                <Container>
                    <div className="text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Book Your Stay?
                        </h2>
                        <p className="text-lg mb-8 text-pink-100">
                            Browse our accommodations and make a reservation today
                        </p>
                        <Link href="/admin/register-accommodation">
                            <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                Register Your Property
                            </button>
                        </Link>
                    </div>
                </Container>
            </div>
        </main>
    );
}
