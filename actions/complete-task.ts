"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function CompleteTask(id: number, isCompleted: boolean) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Not authenticated'
        }
    }

    await db.update(tasks).set({
        isCompleted: isCompleted
    }).where(and(
        eq(tasks.id, id),
        eq(tasks.userId, session.user.id)
    ));

    revalidatePath('/tasks');
}