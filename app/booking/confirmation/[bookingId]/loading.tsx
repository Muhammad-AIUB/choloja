export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Success Icon Skeleton */}
                <div className="text-center mb-8">
                    <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                    <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto animate-pulse" />
                </div>

                {/* Booking Details Card Skeleton */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex justify-between">
                                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div className="flex gap-4">
                    <div className="h-12 bg-gray-200 rounded-lg flex-1 animate-pulse" />
                    <div className="h-12 bg-gray-200 rounded-lg flex-1 animate-pulse" />
                </div>
            </div>
        </div>
    );
}

