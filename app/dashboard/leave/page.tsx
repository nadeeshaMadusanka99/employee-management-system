import sql from "@/lib/db";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LeaveRequestRow {
    id: string;
    employee_name: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: string;
}

export default async function LeaveRequestsPage() {
    const leaves: LeaveRequestRow[] = await sql`
    SELECT 
      l.id,
      e.first_name || ' ' || e.last_name AS employee_name,
      l.leave_type,
      l.start_date,
      l.end_date,
      l.reason,
      l.status
    FROM leave_requests l
    LEFT JOIN employees e ON l.employee_id = e.id
    ORDER BY l.created_at DESC
  `;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leave Requests</h1>
                    <p className="text-slate-500 text-sm">Review and manage employee time off.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaves.map((leave) => (
                                <TableRow key={leave.id}>
                                    <TableCell className="font-medium">{leave.employee_name}</TableCell>
                                    <TableCell>{leave.leave_type}</TableCell>
                                    <TableCell>
                                        {new Date(leave.start_date).toLocaleDateString()} - {new Date(leave.end_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate" title={leave.reason}>
                                        {leave.reason}
                                    </TableCell>
                                    <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        leave.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                            leave.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                'bg-amber-100 text-amber-800'
                    }`}>
                      {leave.status}
                    </span>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {leave.status === 'PENDING' ? (
                                            <>
                                                <Button variant="outline" size="sm">Approve</Button>
                                                <Button variant="destructive" size="sm">Reject</Button>
                                            </>
                                        ) : (
                                            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                                                Processed
                                            </Badge>
                                        )}
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