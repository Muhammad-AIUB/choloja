import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Promotion {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    link: string;
    badge?: string;
    badgeColor?: "pink" | "blue" | "green" | "red" | "purple";
}

interface PromotionCardProps {
    promotion: Promotion;
}

const badgeColors = {
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
};

export function PromotionCard({ promotion }: PromotionCardProps) {
    return (
        <Link href={promotion.link}>
            <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl">
                <div className="relative aspect-[3/4] overflow-hidden md:aspect-[4/3]">
                    <Image
                        src={promotion.imageUrl}
                        alt={promotion.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                    />

                    {promotion.badge && (
                        <Badge
                            className={`absolute left-3 top-3 text-white ${
                                badgeColors[promotion.badgeColor || "pink"]
                            }`}
                        >
                            {promotion.badge}
                        </Badge>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="mb-1 text-lg font-bold line-clamp-2">
                            {promotion.title}
                        </h3>
                        {promotion.description && (
                            <p className="text-sm line-clamp-2 opacity-90">
                                {promotion.description}
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}
