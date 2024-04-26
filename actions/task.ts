"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskTable } from "@/lib/schema";
import { getNowISO, getToday } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { MaybeAddUser } from "./user";


export type CreateTaskSchema = {
    title: string;
    isImportant: boolean;
    addedToMyDayManually?: boolean;
    addedToMyDayAutomatically?: boolean;
    dueDate?: string;
    inListId?: number;
};

export async function createTask(data: CreateTaskSchema) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Unauthorized',
        };
    }

    await MaybeAddUser(session);

    const createTaskData = {
        ...data,
        createdAt: getToday(),
        userId: session.user.id,
    };

    await db.insert(taskTable).values(createTaskData);

    revalidatePath('/tasks');

}

export async function updateTask(id: number, data: any) {

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
export async function deleteTask(id: number) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Not authenticated'
        };
    }

    await db.delete(taskTable)
        .where(and(
            eq(taskTable.id, id),
            eq(taskTable.userId, session.user.id)
        ));

    revalidatePath('/tasks');
}
