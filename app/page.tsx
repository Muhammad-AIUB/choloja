import { Container } from "@/components/ui/container";
import { Star, MapPin } from "lucide-react";
import Link from "next/link";
import { AccommodationRepository } from "@/lib/infrastructure/repositories/AccommodationRepository";
import { HeroSection } from "@/components/home/HeroSection";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

async function getAccommodations() {
    try {
        const accommodationRepository = new AccommodationRepository();
        const result = await accommodationRepository.findAll({
            page: 1,
            limit: 20,
            sortBy: "rating",
        });
        return result.data;
    } catch (error) {
        console.error("Failed to fetch accommodations:", error);
        return [];
    }
}

export default async function Home() {
    const accommodations = await getAccommodations();

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section with Beach Images */}
            <HeroSection />

            {/* Accommodations Listing */}
            <div id="accommodations">
                <Container className="py-12">
                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                        Featured Accommodations
                    </h2>
                    <p className="text-gray-600">
                        Discover our handpicked selection of premium properties
                    </p>
                </div>

                {/* Sample Featured Hotels */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Hotel 1 */}
                    <div className="group block cursor-pointer">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <div
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                    Grand Palace Hotel
                                </h3>

                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>Cox's Bazar, Bangladesh</span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">4.8</span>
                                    </div>
                                    <span className="text-sm text-gray-500">(1,234 reviews)</span>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Starting from</p>
                                        <p className="text-xl font-bold text-pink-600">৳8,500</p>
                                    </div>
                                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium group-hover:from-pink-600 group-hover:to-purple-700 group-hover:shadow-lg transition-all duration-300 cursor-pointer inline-block">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotel 2 */}
                    <div className="group block cursor-pointer">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <div
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&q=80')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                    Sea View Resort
                                </h3>

                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>Saint Martin, Bangladesh</span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">4.6</span>
                                    </div>
                                    <span className="text-sm text-gray-500">(856 reviews)</span>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Starting from</p>
                                        <p className="text-xl font-bold text-pink-600">৳12,000</p>
                                    </div>
                                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium group-hover:from-pink-600 group-hover:to-purple-700 group-hover:shadow-lg transition-all duration-300 cursor-pointer inline-block">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotel 3 */}
                    <div className="group block cursor-pointer">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <div
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&q=80')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                    Hill Station Lodge
                                </h3>

                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>Bandarban, Bangladesh</span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">4.7</span>
                                    </div>
                                    <span className="text-sm text-gray-500">(642 reviews)</span>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Starting from</p>
                                        <p className="text-xl font-bold text-pink-600">৳6,500</p>
                                    </div>
                                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium group-hover:from-pink-600 group-hover:to-purple-700 group-hover:shadow-lg transition-all duration-300 cursor-pointer inline-block">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotel 4 */}
                    <div className="group block cursor-pointer">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <div
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&q=80')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                    Luxury Beach Villa
                                </h3>

                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>Kuakata, Bangladesh</span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">4.9</span>
                                    </div>
                                    <span className="text-sm text-gray-500">(1,567 reviews)</span>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Starting from</p>
                                        <p className="text-xl font-bold text-pink-600">৳15,000</p>
                                    </div>
                                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium group-hover:from-pink-600 group-hover:to-purple-700 group-hover:shadow-lg transition-all duration-300 cursor-pointer inline-block">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotel 5 */}
                    <div className="group block cursor-pointer">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <div
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop&q=80')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                    Forest Retreat Inn
                                </h3>

                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>Sylhet, Bangladesh</span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">4.5</span>
                                    </div>
                                    <span className="text-sm text-gray-500">(423 reviews)</span>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Starting from</p>
                                        <p className="text-xl font-bold text-pink-600">৳7,200</p>
                                    </div>
                                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium group-hover:from-pink-600 group-hover:to-purple-700 group-hover:shadow-lg transition-all duration-300 cursor-pointer inline-block">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hotel 6 */}
                    <div className="group block cursor-pointer">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <div
                                    style={{
                                        backgroundImage: `url('https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                                    Heritage Palace
                                </h3>

                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                                    <MapPin className="h-4 w-4" />
                                    <span>Dhaka, Bangladesh</span>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-gray-900">4.4</span>
                                    </div>
                                    <span className="text-sm text-gray-500">(789 reviews)</span>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Starting from</p>
                                        <p className="text-xl font-bold text-pink-600">৳9,800</p>
                                    </div>
                                    <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-sm font-medium group-hover:from-pink-600 group-hover:to-purple-700 group-hover:shadow-lg transition-all duration-300 cursor-pointer inline-block">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Container>
            </div>

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
                            <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                                Register Your Property
                            </button>
                        </Link>
                    </div>
                </Container>
            </div>
        </main>
    );
}
