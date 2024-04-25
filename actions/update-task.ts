"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskTable } from "@/lib/schema";
import { getNowISO } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function updateTask(id: number, data: any) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Not authenticated'
        }
    }

    const update = {
        ...data,
        updatedAt: getNowISO(),
    };

    await db.update(taskTable)
        .set(update)
        .where(and(
            eq(taskTable.id, id),
            eq(taskTable.userId, session.user.id)
        ));

    revalidatePath('/tasks');
}