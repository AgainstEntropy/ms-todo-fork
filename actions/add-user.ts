import { Session } from "next-auth";
import { db } from '@/lib/db';
import { eq } from "drizzle-orm";
import { users } from "@/lib/schema";

export async function MaybeAddUser(session: Session) {
    // Check if the user exists
    const user = await db.query.users.findFirst({
        where: eq(users.id, session.user.id)
    });

    if (!user) {
        // If the user doesn't exist, create the user
        await db.insert(users).values({
            id: session.user.id,
            name: session.user.name,
            email: session.user.email
        });
    }
}