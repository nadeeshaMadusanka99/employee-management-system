import Link from "next/link";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col p-4 gap-6">
                <div className="font-bold text-xl px-2 text-slate-900 dark:text-slate-100">
                    EMS Admin
                </div>
                <nav className="flex flex-col gap-1">
                    <Link
                        href="/dashboard"
                        className="p-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                        Overview
                    </Link>
                    <Link
                        href="/dashboard/employees"
                        className="p-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                        Employees
                    </Link>
                    <Link
                        href="/dashboard/leave"
                        className="p-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                        Leave Requests
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6">
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            Employee Management System
          </span>
                </header>
                <main className="p-6 flex-1">{children}</main>
            </div>
        </div>
    );
}