"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskTable } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function deleteTask(id: number) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Not authenticated'
        }
    }

    await db.delete(taskTable)
        .where(and(
        eq(taskTable.id, id),
        eq(taskTable.userId, session.user.id)
    ));

    revalidatePath('/tasks');
}