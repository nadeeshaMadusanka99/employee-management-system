import { EmsLoader } from "@/components/ui/EmsLoader";

export default function DashboardLoading() {
    return (
        <div className="h-[60vh] w-full flex items-center justify-center">
            <EmsLoader size="lg" text="Fetching data..." />
        </div>
    );
}