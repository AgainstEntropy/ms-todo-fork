import { Session } from "next-auth";
import { db } from '@/lib/db';
import { eq } from "drizzle-orm";
import { userTable } from "@/lib/schema";

export async function MaybeAddUser(session: Session) {
    // Check if the user exists
    const user = await db
        .selectDistinct()
        .from(userTable)
        .where(eq(userTable.id, session.user.id));


    if (!user) {
        // If the user doesn't exist, create the user
        await db.insert(userTable).values(session.user);
    } else {
        // If the user exists, update the user
        await db.update(userTable).set(session.user)
            .where(eq(userTable.id, session.user.id));
    }
}