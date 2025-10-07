"use client";

import { Check } from "lucide-react";

interface Step {
    id: number;
    name: string;
    description: string;
}

interface BookingStepIndicatorProps {
    currentStep: number;
    steps: Step[];
}

export function BookingStepIndicator({
    currentStep,
    steps,
}: BookingStepIndicatorProps) {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.id;
                    const isCurrent = currentStep === step.id;

                    return (
                        <div
                            key={step.id}
                            className="flex items-center flex-1"
                        >
                            <div className="flex flex-col items-center flex-1">
                                <div className="flex items-center w-full">
                                    {/* Circle */}
                                    <div
                                        className={`
                                            relative flex items-center justify-center
                                            w-10 h-10 rounded-full border-2 transition-all
                                            ${
                                                isCompleted
                                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 border-transparent text-white"
                                                    : isCurrent
                                                      ? "border-pink-500 text-pink-500 bg-white"
                                                      : "border-gray-300 text-gray-400 bg-white"
                                            }
                                        `}
                                    >
                                        {isCompleted ? (
                                            <Check className="h-5 w-5" />
                                        ) : (
                                            <span className="text-sm font-semibold">
                                                {step.id}
                                            </span>
                                        )}
                                    </div>

                                    {/* Line */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`
                                                flex-1 h-0.5 mx-2 transition-all
                                                ${isCompleted ? "bg-gradient-to-r from-pink-500 to-purple-600" : "bg-gray-300"}
                                            `}
                                        />
                                    )}
                                </div>

                                {/* Label */}
                                <div className="mt-2 text-center">
                                    <p
                                        className={`
                                            text-sm font-medium
                                            ${isCurrent ? "text-pink-500" : isCompleted ? "text-gray-900" : "text-gray-400"}
                                        `}
                                    >
                                        {step.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 hidden md:block">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

