export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title Skeleton */}
                <div className="mb-6">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>

                {/* Filter Tabs Skeleton */}
                <div className="flex gap-2 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"
                        />
                    ))}
                </div>

                {/* Booking Cards Skeleton */}
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-sm p-6"
                        >
                            <div className="flex gap-6">
                                <div className="w-48 h-32 bg-gray-200 rounded-lg animate-pulse flex-shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                                    <div className="flex gap-4 mt-4">
                                        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                                        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

