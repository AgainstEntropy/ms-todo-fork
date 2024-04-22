import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { and, eq, like, count, isNotNull, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getToday } from "@/lib/utils";
import { Session } from "next-auth";


export async function fetchFilteredTasks(query: string) {
    const session = await auth();

    if (!session) {
        redirect('/');
    }

    const res = await db.query.tasks.findMany({
        where: and(
            eq(tasks.userId, session.user.id),
            like(tasks.title, `%${query}%`)
        )
    });

    return res;
}

export async function fetchTaskCounts(session: Session) {
    
    const myDayCount = await db
        .select({ value: count() })
        .from(tasks)
        .where(and(
            eq(tasks.userId, session.user.id),
            or(
                eq(tasks.addedToMyDayManually, true),
                eq(tasks.addedToMyDayAutomatically, true),
            ),
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
    const inPlanCount = await db
        .select({ value: count() })
        .from(tasks)
        .where(and(
            eq(tasks.userId, session.user.id),
            isNotNull(tasks.dueDate),
            eq(tasks.dueDate, getToday()),
        ))

    const counts = {
        myDay: myDayCount[0].value,
        inPlan: inPlanCount[0].value,
        important: importantCount[0].value,
        tasks: tasksCount[0].value,
    };

    return counts;
}