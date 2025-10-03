"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star, ThumbsUp, Sparkles } from "lucide-react";
import { Review } from "@/types";
import { Button } from "@/components/ui/button";

interface ReviewsSectionProps {
    reviews: Review[];
    aiSummary?: string;
    overallRating: number;
}

export function ReviewsSection({
    reviews,
    aiSummary,
    overallRating,
}: ReviewsSectionProps) {
    const t = useTranslations("HotelDetail");
    const [showAllReviews, setShowAllReviews] = useState(false);

    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 5);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${
                            star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Overall Rating */}
            <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-blue-600">
                    {overallRating.toFixed(1)}
                </div>
                <div>
                    {renderStars(Math.round(overallRating))}
                    <p className="text-gray-600 text-sm mt-1">
                        {t("reviewCount", { count: reviews.length })}
                    </p>
                </div>
            </div>

            {/* AI Summary */}
            {aiSummary && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-blue-900 mb-2">
                                {t("aiReviewSummary")}
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {aiSummary}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {displayedReviews.map((review) => (
                    <div
                        key={review.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">
                                        {review.author}
                                    </span>
                                    {renderStars(review.rating)}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {formatDate(review.date)}
                                </p>
                            </div>
                        </div>

                        {/* Review Content */}
                        <p className="text-gray-700 mb-3 leading-relaxed">
                            {review.comment}
                        </p>

                        {/* Review Images */}
                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mb-3 overflow-x-auto">
                                {review.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden"
                                    >
                                        <Image
                                            src={image}
                                            alt={`Review image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Helpful Button */}
                        {review.helpful !== undefined && (
                            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span>
                                    {t("helpful")} ({review.helpful})
                                </span>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {reviews.length > 5 && (
                <div className="text-center">
                    <Button
                        variant="outline"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                        {showAllReviews
                            ? t("showLessReviews")
                            : t("showAllReviews", {
                                  count: reviews.length - 5,
                              })}
                    </Button>
                </div>
            )}
        </div>
    );
}
