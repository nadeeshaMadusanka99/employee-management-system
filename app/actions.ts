"use server";

import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createEmployee(formData: FormData) {
    // Extract values from the form submission
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const position_id = formData.get("position_id") as string;
    const department_id = formData.get("department_id") as string;
    const salary = formData.get("salary") as string;

    // Execute the SQL
    try {
        await sql`
      INSERT INTO employees (
        first_name, 
        last_name, 
        email,
        position_id, 
        department_id, 
        salary
      )
      VALUES (
        ${first_name}, 
        ${last_name}, 
        ${email}, 
        ${position_id}, 
        ${department_id}, 
        ${salary}
      )
    `;

        // Cache these pages and re-fetch the database
        revalidatePath("/dashboard/employees");
        revalidatePath("/dashboard"); // Updates the employee count and stuff on the home page

    } catch (error) {
        console.error("Failed to add employee:", error);
        throw new Error("Failed to create employee in database.");
    }
}