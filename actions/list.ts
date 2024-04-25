"use server";

import { and, eq } from "drizzle-orm";
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { listTable } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { MaybeAddUser } from './add-user';

export async function createList(title: string) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Unauthorized',
        }
    }

    await MaybeAddUser(session);

    const createListData = {
        title,
        userId: session.user.id,
    };

    await db.insert(listTable).values(createListData);

    revalidatePath('/tasks');

}

export async function updateList(id: number, updateData: any) {

    const session = await auth();

    if (!session) {
        return {
            message: 'Not authenticated'
        }
    }

    await db.update(listTable)
        .set(updateData)
        .where(and(
            eq(listTable.userId, session.user.id),
            eq(listTable.id, id),
        ));

    revalidatePath('/tasks');
}


export default async function deleteList(id?: number) {

    if (!id) {
        return {
            message: 'No id provided'
        }
    }

    const session = await auth();

    if (!session) {
        return {
            message: 'Not authenticated'
        }
    }

    await db.delete(listTable).where(
        and(
            eq(listTable.userId, session.user.id),
            eq(listTable.id, id),
        )
    );

    revalidatePath('/tasks');
}