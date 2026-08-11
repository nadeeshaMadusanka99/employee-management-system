"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
                                           error,
                                           reset,
                                       }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Dashboard caught an error:", error);
    }, [error]);

    return (
        <div className="flex h-[60vh] w-full flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center space-y-2 text-center bg-red-50 dark:bg-red-950/30 p-8 rounded-xl border border-red-100 dark:border-red-900">
                <AlertTriangle className="h-12 w-12 text-red-500 mb-2" />
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    Something went wrong
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[400px]">
                    We couldn't load this section. The database might be asleep or there's a temporary connection issue. Contact System Admin.
                </p>
            </div>

            {/* The reset function tells Next.js to re-execute the Server Component that failed */}
            <Button onClick={() => reset()} variant="outline" className="w-32">
                Try again
            </Button>
        </div>
    );
}