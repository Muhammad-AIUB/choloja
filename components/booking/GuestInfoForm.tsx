"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GuestInfo } from "@/types";

interface GuestInfoFormProps {
    onSubmit: (guestInfo: GuestInfo) => void;
    onBack: () => void;
    initialData?: Partial<GuestInfo>;
}

const countryCodes = [
    { code: "+82", country: "South Korea" },
    { code: "+1", country: "USA/Canada" },
    { code: "+44", country: "UK" },
    { code: "+81", country: "Japan" },
    { code: "+86", country: "China" },
    { code: "+880", country: "Bangladesh" },
];

export function GuestInfoForm({
    onSubmit,
    onBack,
    initialData,
}: GuestInfoFormProps) {
    const [formData, setFormData] = useState<GuestInfo>({
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        countryCode: initialData?.countryCode || "+82",
        specialRequests: initialData?.specialRequests || "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof GuestInfo, string>>>({});

    const validateForm = () => {
        const newErrors: Partial<Record<keyof GuestInfo, string>> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{8,15}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
            newErrors.phone = "Invalid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const updateField = (field: keyof GuestInfo, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Guest Information</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) =>
                                updateField("firstName", e.target.value)
                            }
                            className={`
                                w-full px-4 py-2.5 border rounded-lg
                                focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                                transition-colors
                                ${errors.firstName ? "border-red-500" : "border-gray-300"}
                            `}
                            placeholder="Enter first name"
                        />
                        {errors.firstName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.firstName}
                            </p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                                updateField("lastName", e.target.value)
                            }
                            className={`
                                w-full px-4 py-2.5 border rounded-lg
                                focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                                transition-colors
                                ${errors.lastName ? "border-red-500" : "border-gray-300"}
                            `}
                            placeholder="Enter last name"
                        />
                        {errors.lastName && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={`
                            w-full px-4 py-2.5 border rounded-lg
                            focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                            transition-colors
                            ${errors.email ? "border-red-500" : "border-gray-300"}
                        `}
                        placeholder="your@email.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                        Booking confirmation will be sent to this email
                    </p>
                </div>

                {/* Phone */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                        <select
                            value={formData.countryCode}
                            onChange={(e) =>
                                updateField("countryCode", e.target.value)
                            }
                            className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        >
                            {countryCodes.map((item) => (
                                <option key={item.code} value={item.code}>
                                    {item.code} {item.country}
                                </option>
                            ))}
                        </select>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            className={`
                                flex-1 px-4 py-2.5 border rounded-lg
                                focus:ring-2 focus:ring-pink-500 focus:border-pink-500
                                transition-colors
                                ${errors.phone ? "border-red-500" : "border-gray-300"}
                            `}
                            placeholder="10-1234-5678"
                        />
                    </div>
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                </div>

                {/* Special Requests */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                    </label>
                    <textarea
                        value={formData.specialRequests}
                        onChange={(e) =>
                            updateField("specialRequests", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="E.g., early check-in, high floor, etc."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Special requests are subject to availability
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex-1"
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                    Continue to Payment
                </Button>
            </div>
        </form>
    );
}

