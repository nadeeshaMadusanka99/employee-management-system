"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createEmployee } from "@/app/actions";

export function AddEmployeeForm({ departments }: { departments: { id: string, name: string }[] }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function onSubmit(formData: FormData) {
        setLoading(true);
        await createEmployee(formData);
        setLoading(false);
        setOpen(false); // Close the slide-out sheet automatically
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button>+ Add Employee</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px]">
                <SheetHeader>
                    <SheetTitle>Add New Employee</SheetTitle>
                    <SheetDescription>
                        Enter the employee details below. Click save when you are done.
                    </SheetDescription>
                </SheetHeader>

                <form action={onSubmit} className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input id="first_name" name="first_name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input id="last_name" name="last_name" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="position">Job Position</Label>
                        <Input id="position" name="position" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="department_id">Department</Label>
                        {/* Radix UI Select automatically creates a hidden input with this name for FormData */}
                        <Select name="department_id" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
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

                    <div className="space-y-2">
                        <Label htmlFor="salary">Salary (Annual)</Label>
                        <Input id="salary" name="salary" type="number" min="0" step="1000" required />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Saving..." : "Save Employee"}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}