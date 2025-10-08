"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

interface CancelBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    bookingNumber: string;
    hotelName: string;
}

export function CancelBookingModal({
    isOpen,
    onClose,
    onConfirm,
    bookingNumber,
    hotelName,
}: CancelBookingModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            setError(null);
            await onConfirm();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to cancel booking");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 animate-in fade-in zoom-in duration-200">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                </div>

                {/* Content */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Cancel Booking?
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Are you sure you want to cancel this booking?
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                        <div className="text-sm space-y-1">
                            <p className="text-gray-500">Booking Number</p>
                            <p className="font-mono font-bold text-gray-900">
                                {bookingNumber}
                            </p>
                        </div>
                        <div className="text-sm space-y-1 mt-3">
                            <p className="text-gray-500">Hotel</p>
                            <p className="font-medium text-gray-900">
                                {hotelName}
                            </p>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                            ⚠️ This action cannot be undone. Refund will be processed within 5-7 business days.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1"
                    >
                        Keep Booking
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isLoading ? "Cancelling..." : "Yes, Cancel"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

