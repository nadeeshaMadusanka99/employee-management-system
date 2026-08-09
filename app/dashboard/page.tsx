// app/dashboard/page.tsx
import sql from '@/lib/db';

export default async function DashboardPage() {
    // Test raw SQL execution
    const result = await sql`SELECT NOW() as current_time`;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Database connected! Current time: {result[0].current_time.toString()}</p>
        </div>
    );
}