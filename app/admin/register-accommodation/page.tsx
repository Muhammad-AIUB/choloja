"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { AccommodationRegistration, RoomRegistration } from "@/types";
import { Plus, X, Upload, Save, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function RegisterAccommodationPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });
    const [formData, setFormData] = useState<AccommodationRegistration>({
        basicInfo: {
            name: "",
            type: "hotel",
            description: "",
        },
        location: {
            address: "",
            city: "",
            state: "",
            country: "South Korea",
            zipCode: "",
        },
        contact: {
            phone: "",
            email: "",
            website: "",
        },
        amenities: [],
        policies: {
            checkInTime: "15:00",
            checkOutTime: "11:00",
            cancellationPolicy: "",
            childrenPolicy: "",
            petsPolicy: "",
            smokingPolicy: "",
        },
        images: {
            main: [],
            gallery: [],
        },
        rooms: [],
        pricing: {
            currency: "KRW",
            taxRate: 10,
            serviceFeeRate: 5,
        },
        status: "draft",
        ownerId: "admin-1", // In real app, get from auth
    });

    const amenitiesList = [
        "Free WiFi",
        "Free Parking",
        "Swimming Pool",
        "Fitness Center",
        "Restaurant",
        "Bar",
        "Spa",
        "Room Service",
        "Concierge",
        "Laundry Service",
        "Airport Shuttle",
        "Business Center",
    ];

    const addRoom = () => {
        const newRoom: RoomRegistration = {
            name: "",
            description: "",
            type: "Standard",
            bedType: "Queen Bed",
            size: 30,
            capacity: {
                standard: 2,
                max: 2,
            },
            quantity: 1,
            basePrice: 0,
            images: [],
            amenities: [],
            availability: true,
        };
        setFormData({
            ...formData,
            rooms: [...formData.rooms, newRoom],
        });
    };

    const removeRoom = (index: number) => {
        setFormData({
            ...formData,
            rooms: formData.rooms.filter((_, i) => i !== index),
        });
    };

    const updateRoom = (index: number, room: RoomRegistration) => {
        const updatedRooms = [...formData.rooms];
        updatedRooms[index] = room;
        setFormData({ ...formData, rooms: updatedRooms });
    };

    const toggleAmenity = (amenity: string) => {
        const amenities = formData.amenities.includes(amenity)
            ? formData.amenities.filter((a) => a !== amenity)
            : [...formData.amenities, amenity];
        setFormData({ ...formData, amenities });
    };

    const handleSubmit = async (status: "draft" | "pending_review") => {
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            // Get token from localStorage (or cookies in production)
            const token = localStorage.getItem("token");
            
            if (!token) {
                setSubmitStatus({
                    type: "error",
                    message: "Please login first to register accommodation",
                });
                setIsSubmitting(false);
                setTimeout(() => router.push("/auth/login"), 2000);
                return;
            }

            const response = await fetch("/api/accommodations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    status,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to register accommodation");
            }

            setSubmitStatus({
                type: "success",
                message: `Accommodation ${status === "draft" ? "saved as draft" : "submitted for review"} successfully! ✅`,
            });

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: error instanceof Error ? error.message : "Failed to submit. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Container>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Register New Accommodation
                    </h1>
                    <p className="text-gray-600">
                        Complete all sections to list your property on NOL
                    </p>
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                    <div
                        className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                            submitStatus.type === "success"
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                        }`}
                    >
                        {submitStatus.type === "success" ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        <p
                            className={`font-medium ${
                                submitStatus.type === "success"
                                    ? "text-green-800"
                                    : "text-red-800"
                            }`}
                        >
                            {submitStatus.message}
                        </p>
                    </div>
                )}

                {/* Progress Steps */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                    <div className="flex items-center justify-between">
                        {[
                            "Basic Info",
                            "Location",
                            "Amenities",
                            "Rooms",
                            "Policies",
                        ].map((step, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStep(index + 1)}
                                className={`flex-1 py-2 px-4 text-sm font-medium transition-all duration-300 cursor-pointer ${
                                    currentStep === index + 1
                                        ? "text-pink-600 border-b-2 border-pink-600"
                                        : "text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {step}
                            </button>
                        ))}
                    </div>
                </div>

                <form className="space-y-6">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold mb-6">
                                Basic Information
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Property Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.basicInfo.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                basicInfo: {
                                                    ...formData.basicInfo,
                                                    name: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        placeholder="e.g., Grand Seoul Luxury Hotel"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Property Type *
                                    </label>
                                    <select
                                        value={formData.basicInfo.type}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                basicInfo: {
                                                    ...formData.basicInfo,
                                                    type: e.target.value as "hotel" | "pension" | "motel" | "glamping" | "resort",
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    >
                                        <option value="hotel">Hotel</option>
                                        <option value="resort">Resort</option>
                                        <option value="pension">Pension</option>
                                        <option value="motel">Motel</option>
                                        <option value="glamping">Glamping</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Star Rating
                                    </label>
                                    <select
                                        value={
                                            formData.basicInfo.starRating || ""
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                basicInfo: {
                                                    ...formData.basicInfo,
                                                    starRating: e.target.value
                                                        ? parseInt(
                                                              e.target.value
                                                          )
                                                        : undefined,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    >
                                        <option value="">
                                            Select star rating
                                        </option>
                                        <option value="3">3 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="5">5 Stars</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        value={formData.basicInfo.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                basicInfo: {
                                                    ...formData.basicInfo,
                                                    description: e.target.value,
                                                },
                                            })
                                        }
                                        rows={6}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        placeholder="Describe your property, its unique features, and what makes it special..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Location */}
                    {currentStep === 2 && (
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold mb-6">
                                Location & Contact
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Street Address *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location.address}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                location: {
                                                    ...formData.location,
                                                    address: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location.city}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: {
                                                        ...formData.location,
                                                        city: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            State/Province *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location.state}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: {
                                                        ...formData.location,
                                                        state: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Zip Code *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location.zipCode}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: {
                                                        ...formData.location,
                                                        zipCode: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Country *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location.country}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: {
                                                        ...formData.location,
                                                        country: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        />
                                    </div>
                                </div>

                                <hr className="my-6" />

                                <h3 className="text-lg font-bold mb-4">
                                    Contact Information
                                </h3>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.contact.phone}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    contact: {
                                                        ...formData.contact,
                                                        phone: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.contact.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    contact: {
                                                        ...formData.contact,
                                                        email: e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Website (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.contact.website}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                contact: {
                                                    ...formData.contact,
                                                    website: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                        placeholder="https://"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Amenities */}
                    {currentStep === 3 && (
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold mb-6">
                                Amenities & Facilities
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {amenitiesList.map((amenity) => (
                                    <label
                                        key={amenity}
                                        className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(
                                                amenity
                                            )}
                                            onChange={() =>
                                                toggleAmenity(amenity)
                                            }
                                            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                                        />
                                        <span className="text-sm font-medium">
                                            {amenity}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Rooms */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold">
                                        Room Types
                                    </h2>
                                    <Button
                                        type="button"
                                        onClick={addRoom}
                                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add Room Type
                                    </Button>
                                </div>

                                {formData.rooms.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <p>
                                            No room types added yet. Click &quot;Add
                                            Room Type&quot; to get started.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {formData.rooms.map((room, index) => (
                                            <div
                                                key={index}
                                                className="p-4 border rounded-lg"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-bold">
                                                        Room {index + 1}
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeRoom(index)
                                                        }
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all duration-300 cursor-pointer"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Room name"
                                                        value={room.name}
                                                        onChange={(e) =>
                                                            updateRoom(index, {
                                                                ...room,
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="px-4 py-2 border rounded-lg"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Base price (per night)"
                                                        value={
                                                            room.basePrice || ""
                                                        }
                                                        onChange={(e) =>
                                                            updateRoom(index, {
                                                                ...room,
                                                                basePrice:
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ) || 0,
                                                            })
                                                        }
                                                        className="px-4 py-2 border rounded-lg"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Policies */}
                    {currentStep === 5 && (
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold mb-6">
                                Policies & Rules
                            </h2>

                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Check-in Time *
                                        </label>
                                        <input
                                            type="time"
                                            value={
                                                formData.policies.checkInTime
                                            }
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    policies: {
                                                        ...formData.policies,
                                                        checkInTime:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Check-out Time *
                                        </label>
                                        <input
                                            type="time"
                                            value={
                                                formData.policies.checkOutTime
                                            }
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    policies: {
                                                        ...formData.policies,
                                                        checkOutTime:
                                                            e.target.value,
                                                    },
                                                })
                                            }
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Cancellation Policy *
                                    </label>
                                    <textarea
                                        value={
                                            formData.policies.cancellationPolicy
                                        }
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                policies: {
                                                    ...formData.policies,
                                                    cancellationPolicy:
                                                        e.target.value,
                                                },
                                            })
                                        }
                                        rows={3}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                        placeholder="Describe your cancellation policy..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Children Policy *
                                    </label>
                                    <textarea
                                        value={formData.policies.childrenPolicy}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                policies: {
                                                    ...formData.policies,
                                                    childrenPolicy:
                                                        e.target.value,
                                                },
                                            })
                                        }
                                        rows={2}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                        placeholder="Describe your policy for children..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Pets Policy *
                                    </label>
                                    <textarea
                                        value={formData.policies.petsPolicy}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                policies: {
                                                    ...formData.policies,
                                                    petsPolicy: e.target.value,
                                                },
                                            })
                                        }
                                        rows={2}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                        placeholder="Describe your policy for pets..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Smoking Policy *
                                    </label>
                                    <textarea
                                        value={formData.policies.smokingPolicy}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                policies: {
                                                    ...formData.policies,
                                                    smokingPolicy:
                                                        e.target.value,
                                                },
                                            })
                                        }
                                        rows={2}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                                        placeholder="Describe your smoking policy..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-4">
                        {currentStep > 1 && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCurrentStep(currentStep - 1)}
                            >
                                Previous
                            </Button>
                        )}
                        {currentStep < 5 && (
                            <Button
                                type="button"
                                onClick={() => setCurrentStep(currentStep + 1)}
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                Next
                            </Button>
                        )}
                        {currentStep === 5 && (
                            <div className="flex gap-4 ml-auto">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => handleSubmit("draft")}
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    {isSubmitting ? "Saving..." : "Save Draft"}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        handleSubmit("pending_review")
                                    }
                                    disabled={isSubmitting}
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-lg transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Upload className="h-4 w-4" />
                                    )}
                                    {isSubmitting ? "Submitting..." : "Submit for Review"}
                                </Button>
                            </div>
                        )}
                    </div>
                </form>
            </Container>
        </div>
    );
}

