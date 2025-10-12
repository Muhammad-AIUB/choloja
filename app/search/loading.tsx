export default function SearchLoading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading search results...</p>
            </div>
        </div>
    );
}

