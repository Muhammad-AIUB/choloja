"use client";

import { MapPin, ExternalLink } from "lucide-react";

interface GoogleMapProps {
    address: string;
    city: string;
    state: string;
    country: string;
    name: string;
}

export function GoogleMap({ address, city, state, country, name }: GoogleMapProps) {
    // Construct search query for Google Maps
    const searchQuery = encodeURIComponent(`${name}, ${address}, ${city}, ${state}, ${country}`);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
    
    // For iframe, we'll use the q parameter
    const mapEmbedUrl = `https://maps.google.com/maps?q=${searchQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="space-y-3">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group">
                <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title={`Map showing location of ${name}`}
                />
                {/* Overlay for better UX */}
                <div className="absolute inset-0 pointer-events-none group-hover:bg-black/5 transition-colors" />
            </div>
            
            {/* Open in Google Maps Button */}
            <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-pink-500 hover:text-pink-600 transition-all duration-300 cursor-pointer text-sm font-medium"
            >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
                <ExternalLink className="h-3 w-3" />
            </a>
        </div>
    );
}

