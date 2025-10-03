import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Listing {
    id: string;
    title: string;
    location: string;
    imageUrl: string;
    price: string;
    originalPrice?: string;
    discount?: string;
    rating?: number;
    reviewCount?: number;
    category?: string;
    isFeatured?: boolean;
}

interface ListingCardProps {
    listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
    // Determine route based on category
    const getRoutePrefix = () => {
        if (
            listing.category?.includes("펜션") ||
            listing.category?.toLowerCase().includes("pension")
        ) {
            return "/pension";
        }
        return "/hotel";
    };

    return (
        <Link href={`${getRoutePrefix()}/${listing.id}`}>
            <Card className="group min-w-[280px] flex-shrink-0 cursor-pointer overflow-hidden transition-all hover:shadow-xl md:min-w-[320px]">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={listing.imageUrl}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                    />

                    {listing.isFeatured && (
                        <Badge className="absolute left-3 top-3 bg-yellow-500 text-white">
                            ⭐ 추천
                        </Badge>
                    )}

                    {listing.discount && (
                        <Badge className="absolute right-3 top-3 bg-red-500 text-white">
                            {listing.discount}
                        </Badge>
                    )}

                    {listing.category && (
                        <Badge className="absolute bottom-3 left-3 bg-black/70 text-white backdrop-blur-sm">
                            {listing.category}
                        </Badge>
                    )}
                </div>

                <CardContent className="p-4">
                    <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                        {listing.title}
                    </h3>

                    <div className="mb-2 flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{listing.location}</span>
                    </div>

                    {(listing.rating || listing.reviewCount) && (
                        <div className="mb-3 flex items-center gap-2">
                            {listing.rating && (
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-gray-900">
                                        {listing.rating}
                                    </span>
                                </div>
                            )}
                            {listing.reviewCount && (
                                <span className="text-sm text-gray-500">
                                    ({listing.reviewCount.toLocaleString()}개
                                    리뷰)
                                </span>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {listing.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {listing.originalPrice}
                            </span>
                        )}
                        <span className="text-xl font-bold text-pink-600">
                            {listing.price}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
