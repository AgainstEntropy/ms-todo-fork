"use server";

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { tasks } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function createTask(title: string) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Unauthorized',
        }
    }

    await db.insert(tasks).values({
        title,
        userId: session.user.id,
    });

    revalidatePath('/tasks');

}