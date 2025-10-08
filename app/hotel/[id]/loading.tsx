export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button Skeleton */}
                <div className="mb-6">
                    <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
                </div>

                {/* Gallery Skeleton */}
                <div className="mb-8">
                    <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
                </div>

                {/* Title and Rating Skeleton */}
                <div className="mb-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 mb-8">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>

                {/* Rooms Skeleton */}
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-6 shadow-sm"
                        >
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse" />
                            <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

