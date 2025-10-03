import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Container } from "./container";

interface SectionProps {
    children: ReactNode;
    className?: string;
    containerSize?: "sm" | "md" | "lg" | "xl" | "full";
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    background?: "white" | "gray" | "transparent";
}

const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    transparent: "bg-transparent",
};

export function Section({
    children,
    className,
    containerSize = "xl",
    title,
    subtitle,
    action,
    background = "transparent",
}: SectionProps) {
    return (
        <section
            className={cn("py-8 md:py-12", backgrounds[background], className)}
        >
            <Container size={containerSize}>
                {(title || action) && (
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            {title && (
                                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="mt-2 text-sm text-muted-foreground md:text-base">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        {action && (
                            <div className="flex-shrink-0">{action}</div>
                        )}
                    </div>
                )}
                {children}
            </Container>
        </section>
    );
}
