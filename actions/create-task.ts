"use server";

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { tasks } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export type CreateTaskSchema = {
    title: string;
    isImportant: boolean;
    addedToMyDayAt?: string;
}

export async function createTask(data: CreateTaskSchema) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Unauthorized',
        }
    }

    const createTaskData = {
        ...data,
        userId: session.user.id,
    };

    await db.insert(tasks).values(createTaskData);

    revalidatePath('/tasks');

}