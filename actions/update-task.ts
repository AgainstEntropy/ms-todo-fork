"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function UpdateTask(id: number, data: any) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Not authenticated'
        }
    }

    const update = {
        title: data.title,
        description: data.description,
        updatedAt: new Date()
    };

    await db.update(tasks)
        .set(update)
        .where(and(
            eq(tasks.id, id),
            eq(tasks.userId, session.user.id)
        ));

    revalidatePath('/tasks');
}