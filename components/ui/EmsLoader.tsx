import { cn } from "@/lib/utils";

interface LoaderProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    text?: string;
    fullScreen?: boolean;
}

export function EmsLoader({
                           className,
                           size = "md",
                           text,
                           fullScreen = false
                       }: LoaderProps) {
    // Map sizes to Tailwind dimensions and border widths
    const sizeClasses = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
        xl: "w-16 h-16 border-4",
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-4">
            {/* The animated spinning ring */}
            <div
                className={cn(
                    "animate-spin rounded-full border-solid border-slate-200 dark:border-slate-800 border-t-slate-900 dark:border-t-slate-100",
                    sizeClasses[size],
                    className
                )}
            />
            {text && (
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    // If fullScreen is true, wrap it in a fixed overlay with a blur effect
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-sm">
                {spinner}
            </div>
        );
    }

    return spinner;
}