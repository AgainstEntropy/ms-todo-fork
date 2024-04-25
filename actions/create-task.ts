"use server";

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { taskTable } from '@/lib/schema';
import { getToday } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { MaybeAddUser } from './user';

export type CreateTaskSchema = {
    title: string;
    isImportant: boolean;
    addedToMyDayManually?: boolean;
    addedToMyDayAutomatically?: boolean;
    dueDate?: string;
    inListId?: number;
}

export async function createTask(data: CreateTaskSchema) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Unauthorized',
        }
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