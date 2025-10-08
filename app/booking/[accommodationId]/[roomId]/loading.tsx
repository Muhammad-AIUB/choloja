export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Progress Steps Skeleton */}
                <div className="mb-8">
                    <div className="flex justify-between">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Skeleton */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i}>
                                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
                                        <div className="h-10 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary Skeleton */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                            <div className="h-6 bg-gray-200 rounded w-2/3 mb-4 animate-pulse" />
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="flex justify-between">
                                        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                                        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

