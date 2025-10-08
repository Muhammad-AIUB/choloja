import { Container } from "@/components/ui/container";

export default function Loading() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16">
                <Container>
                    <div className="text-center">
                        <div className="h-12 w-96 mx-auto bg-gray-200 animate-pulse rounded-lg mb-4" />
                        <div className="h-6 w-64 mx-auto bg-gray-200 animate-pulse rounded-lg" />
                    </div>
                </Container>
            </div>

            {/* Accommodations Listing Skeleton */}
            <Container className="py-12">
                <div className="mb-8">
                    <div className="h-8 w-96 bg-gray-200 animate-pulse rounded-lg mb-2" />
                    <div className="h-5 w-80 bg-gray-200 animate-pulse rounded-lg" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                            {/* Image Skeleton */}
                            <div className="h-56 bg-gray-200 animate-pulse" />

                            {/* Content Skeleton */}
                            <div className="p-5">
                                <div className="h-6 bg-gray-200 animate-pulse rounded mb-3" />
                                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-3" />
                                <div className="h-4 w-40 bg-gray-200 animate-pulse rounded mb-4" />
                                <div className="flex items-center justify-between pt-3 border-t">
                                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded" />
                                    <div className="h-10 w-28 bg-gray-200 animate-pulse rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-16 mt-12">
                <Container>
                    <div className="text-center text-white">
                        <div className="h-10 w-96 mx-auto bg-white/20 animate-pulse rounded-lg mb-4" />
                        <div className="h-6 w-80 mx-auto bg-white/20 animate-pulse rounded-lg mb-8" />
                        <div className="h-12 w-64 mx-auto bg-white/30 animate-pulse rounded-lg" />
                    </div>
                </Container>
            </div>
        </main>
    );
}

