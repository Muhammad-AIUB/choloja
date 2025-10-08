"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentInfo, PaymentMethod, PricingBreakdown } from "@/types";
import { CreditCard, DollarSign, Building2, Wallet } from "lucide-react";

interface PaymentFormProps {
    pricing: PricingBreakdown;
    onSubmit: (paymentInfo: PaymentInfo) => void;
    onBack: () => void;
}

const paymentMethods: PaymentMethod[] = [
    {
        id: "credit_card",
        type: "credit_card",
        name: "Credit Card",
        icon: "CreditCard",
    },
    {
        id: "debit_card",
        type: "debit_card",
        name: "Debit Card",
        icon: "CreditCard",
    },
    {
        id: "nol_money",
        type: "nol_money",
        name: "NOL Money",
        icon: "Wallet",
    },
    {
        id: "bank_transfer",
        type: "bank_transfer",
        name: "Bank Transfer",
        icon: "Building",
    },
];

export function PaymentForm({ pricing, onSubmit, onBack }: PaymentFormProps) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
        paymentMethods[0]
    );
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        cardHolderName: "",
        expiryDate: "",
        cvv: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
        return formatted.substring(0, 19); // 16 digits + 3 spaces
    };

    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length >= 2) {
            return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
        }
        return cleaned;
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (
            selectedMethod.type === "credit_card" ||
            selectedMethod.type === "debit_card"
        ) {
            if (!cardInfo.cardHolderName.trim()) {
                newErrors.cardHolderName = "Cardholder name is required";
            }
            const cleanedCardNumber = cardInfo.cardNumber.replace(/\s/g, "");
            if (!cleanedCardNumber || cleanedCardNumber.length !== 16) {
                newErrors.cardNumber = "Invalid card number";
            }
            if (!cardInfo.expiryDate || cardInfo.expiryDate.length !== 5) {
                newErrors.expiryDate = "Invalid expiry date";
            }
            if (!cardInfo.cvv || cardInfo.cvv.length < 3) {
                newErrors.cvv = "Invalid CVV";
            }
        }

        if (!agreeToTerms) {
            newErrors.terms = "You must agree to the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const paymentInfo: PaymentInfo = {
                method: selectedMethod,
                ...(selectedMethod.type === "credit_card" ||
                selectedMethod.type === "debit_card"
                    ? {
                          cardNumber: cardInfo.cardNumber.replace(/\s/g, ""),
                          cardHolderName: cardInfo.cardHolderName,
                          expiryDate: cardInfo.expiryDate,
                          cvv: cardInfo.cvv,
                      }
                    : {}),
            };
            onSubmit(paymentInfo);
        }
    };

    const getPaymentIcon = (iconName: string) => {
        const iconProps = { className: "h-5 w-5" };
        switch (iconName) {
            case "CreditCard":
                return <CreditCard {...iconProps} />;
            case "Wallet":
                return <Wallet {...iconProps} />;
            case "Building":
                return <Building2 {...iconProps} />;
            default:
                return <DollarSign {...iconProps} />;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Payment Method & Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Payment Method Selection */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">
                            Select Payment Method
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => setSelectedMethod(method)}
                                    className={`
                                        flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
                                        ${
                                            selectedMethod.id === method.id
                                                ? "border-pink-500 bg-pink-50 shadow-md"
                                                : "border-gray-200 hover:border-pink-300 hover:bg-pink-25 hover:shadow-sm"
                                        }
                                    `}
                                >
                                    {getPaymentIcon(method.icon || "")}
                                    <span className="font-medium text-sm">
                                        {method.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Card Details (shown for card payments) */}
                    {(selectedMethod.type === "credit_card" ||
                        selectedMethod.type === "debit_card") && (
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold mb-4">
                                Card Details
                            </h2>

                            <div className="space-y-4">
                                {/* Cardholder Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        value={cardInfo.cardHolderName}
                                        onChange={(e) =>
                                            setCardInfo({
                                                ...cardInfo,
                                                cardHolderName: e.target.value.toUpperCase(),
                                            })
                                        }
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.cardHolderName ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="JOHN DOE"
                                    />
                                    {errors.cardHolderName && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.cardHolderName}
                                        </p>
                                    )}
                                </div>

                                {/* Card Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        value={cardInfo.cardNumber}
                                        onChange={(e) =>
                                            setCardInfo({
                                                ...cardInfo,
                                                cardNumber: formatCardNumber(
                                                    e.target.value
                                                ),
                                            })
                                        }
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                    />
                                    {errors.cardNumber && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.cardNumber}
                                        </p>
                                    )}
                                </div>

                                {/* Expiry & CVV */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            value={cardInfo.expiryDate}
                                            onChange={(e) =>
                                                setCardInfo({
                                                    ...cardInfo,
                                                    expiryDate:
                                                        formatExpiryDate(
                                                            e.target.value
                                                        ),
                                                })
                                            }
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.expiryDate ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                        />
                                        {errors.expiryDate && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.expiryDate}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            value={cardInfo.cvv}
                                            onChange={(e) =>
                                                setCardInfo({
                                                    ...cardInfo,
                                                    cvv: e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    ),
                                                })
                                            }
                                            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${errors.cvv ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="123"
                                            maxLength={4}
                                        />
                                        {errors.cvv && (
                                            <p className="mt-1 text-sm text-red-500">
                                                {errors.cvv}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* NOL Money */}
                    {selectedMethod.type === "nol_money" && (
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Wallet className="h-6 w-6 text-pink-600" />
                                <h3 className="text-lg font-bold">NOL Money Balance</h3>
                            </div>
                            <p className="text-3xl font-bold text-pink-600 mb-2">
                                1,500,000원
                            </p>
                            <p className="text-sm text-gray-600">
                                You have sufficient balance for this booking
                            </p>
                        </div>
                    )}

                    {/* Bank Transfer */}
                    {selectedMethod.type === "bank_transfer" && (
                        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                            <h3 className="text-lg font-bold mb-4">
                                Bank Transfer Information
                            </h3>
                            <div className="space-y-2 text-sm">
                                <p>
                                    <strong>Bank:</strong> KB Kookmin Bank
                                </p>
                                <p>
                                    <strong>Account Number:</strong>{" "}
                                    123-456-789012
                                </p>
                                <p>
                                    <strong>Account Name:</strong> NOL Travel
                                    Co., Ltd.
                                </p>
                                <p className="text-red-600 mt-4">
                                    * Please complete the transfer within 24
                                    hours. Your booking will be confirmed upon
                                    payment verification.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Terms & Conditions */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={(e) =>
                                    setAgreeToTerms(e.target.checked)
                                }
                                className="mt-1 h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="text-pink-600 hover:underline"
                                >
                                    Terms and Conditions
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="text-pink-600 hover:underline"
                                >
                                    Cancellation Policy
                                </a>
                                . I understand that my payment will be processed
                                immediately.
                            </span>
                        </label>
                        {errors.terms && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.terms}
                            </p>
                        )}
                    </div>
                </div>

                {/* Pricing Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold mb-4">
                            Price Summary
                        </h3>

                        <div className="space-y-3 mb-4 pb-4 border-b">
                            <div className="flex justify-between text-sm">
                                <span>
                                    {pricing.roomPrice.toLocaleString()}원 x{" "}
                                    {pricing.nights} nights
                                </span>
                                <span>
                                    {pricing.subtotal.toLocaleString()}원
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Tax (10%)</span>
                                <span>{pricing.tax.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Service Fee</span>
                                <span>
                                    {pricing.serviceFee.toLocaleString()}원
                                </span>
                            </div>
                            {pricing.discount && pricing.discount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span>Discount</span>
                                    <span>
                                        -{pricing.discount.toLocaleString()}원
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-2xl font-bold text-pink-600">
                                {pricing.total.toLocaleString()}원
                            </span>
                        </div>

                        <div className="space-y-2 text-xs text-gray-500 mb-4">
                            <p>🔒 Secure payment processing</p>
                            <p>✓ Instant booking confirmation</p>
                            <p>✓ Free cancellation available</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex-1 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                    Complete Booking - {pricing.total.toLocaleString()}원
                </Button>
            </div>
        </form>
    );
}

