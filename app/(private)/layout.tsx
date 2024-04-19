import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import AppShell from "@/components/app-shell";
import { db } from "@/lib/db";
import { and, count, eq } from "drizzle-orm";
import { tasks } from "@/lib/schema";
import { getFormatDate } from "@/lib/utils";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();

    if (!session) {
        redirect('/');
    }

    const myDayCount = await db
        .select({ value: count() })
        .from(tasks)
        .where(and(
            eq(tasks.userId, session.user.id),
            eq(tasks.addedToMyDayAt, getFormatDate()),
            eq(tasks.isCompleted, false),
        ))
    const importantCount = await db
        .select({ value: count() })
        .from(tasks)
        .where(and(
            eq(tasks.userId, session.user.id),
            eq(tasks.isImportant, true),
            eq(tasks.isCompleted, false),
        ))
    const tasksCount = await db
        .select({ value: count() })
        .from(tasks)
        .where(and(
            eq(tasks.userId, session.user.id),
            eq(tasks.isCompleted, false),
        ))

    const counts = {
        myDay: myDayCount[0].value,
        important: importantCount[0].value,
        tasks: tasksCount[0].value,
    }

    return (
        <SessionProvider session={session}>
            <AppShell taskCounts={counts} >{children}</AppShell>
        </SessionProvider>
    );
}