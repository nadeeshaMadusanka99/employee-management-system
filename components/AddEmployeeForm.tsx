"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {EmsLoader} from "@/components/ui/EmsLoader";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {createEmployee} from "@/app/actions";

export function AddEmployeeForm({
                                    departments,
                                    positions
                                }: {
    departments: { id: string, name: string }[],
    positions: { id: string, title: string }[]
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function onSubmit(formData: FormData) {
        setLoading(true);
        await createEmployee(formData);
        setLoading(false);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>+ Add Employee</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                        Enter the employee details below. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>

                <form action={onSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input id="first_name" name="first_name" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name" >Last Name</Label>
                            <Input id="last_name" name="last_name" required/>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required/>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        {/* JOB POSITION DROPDOWN */}
                        <div className="space-y-2">
                            <Label htmlFor="position_id">Job Position</Label>
                            <Select name="position_id" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {positions.map((pos) => (
                                        <SelectItem key={pos.id} value={pos.id}>
                                            {pos.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* DEPARTMENT DROPDOWN */}
                        <div className="space-y-2">
                            <Label htmlFor="department_id">Department</Label>
                            <Select name="department_id" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select department"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="salary">Salary (Annual)</Label>
                        <Input id="salary" name="salary" type="number" min="0" step="1000" required/>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="button" variant="outline" className="mr-2" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <EmsLoader size="sm" className="mr-2 border-t-white dark:border-t-slate-900" />
                                    Saving...
                                </>
                            ) : (
                                "Save Employee"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}