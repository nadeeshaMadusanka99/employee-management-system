// app/dashboard/employees/page.tsx
import sql from "@/lib/db";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {AddEmployeeForm} from "@/components/AddEmployeeForm";

interface EmployeeRow {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    position_title: string | null;
    department_name: string | null;
    salary: string;
    status: string;
}

export default async function EmployeesPage() {
    // 1. Fetch data for our form dropdowns concurrently!
    const [departments, positions] = await Promise.all([
        sql`SELECT id, name
            FROM departments
            ORDER BY name ASC`,
        sql`SELECT id, title
            FROM job_positions
            ORDER BY title ASC`
    ]);

    // 2. Fetch employees, joining BOTH departments and job_positions
    const employees: EmployeeRow[] = await sql`
        SELECT e.id,
               e.first_name,
               e.last_name,
               e.email,
               p.title as position_title,
               d.name  as department_name,
               e.salary,
               e.status
        FROM employees e
                 LEFT JOIN departments d ON e.department_id = d.id
                 LEFT JOIN job_positions p ON e.position_id = p.id
        ORDER BY e.created_at DESC
    `;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
                    <p className="text-slate-500 text-sm">
                        Manage employee profiles, departments, and statuses.
                    </p>
                </div>
                {/* Pass the fetched data to our Client Component form */}
                <AddEmployeeForm
                    departments={departments as any}
                    positions={positions as any}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Employees ({employees.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Salary</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell className="font-medium">
                                        {emp.first_name} {emp.last_name}
                                    </TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                    <TableCell>{emp.position_title ?? "Unassigned"}</TableCell>
                                    <TableCell>{emp.department_name ?? "Unassigned"}</TableCell>
                                    <TableCell>${Number(emp.salary).toLocaleString()}</TableCell>
                                    <TableCell>
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            emp.status === "ACTIVE"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                    >
                      {emp.status}
                    </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}