import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskTable, listTable } from "@/lib/schema";
import { and, eq, like, count, isNotNull, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Session } from "next-auth";


export async function fetchFilteredTasks(query: string) {
    const session = await auth();

    if (!session) {
        redirect('/');
    }

    const res = await db
        .select()
        .from(taskTable)
        .where(and(
            eq(taskTable.userId, session.user.id),
            like(taskTable.title, `%${query}%`)
        ));

    return res;
}

export async function fetchTaskCounts(session: Session) {
    
    const myDayCount = await db
        .select({ value: count() })
        .from(taskTable)
        .where(and(
            eq(taskTable.userId, session.user.id),
            or(
                eq(taskTable.addedToMyDayManually, true),
                eq(taskTable.addedToMyDayAutomatically, true),
            ),
            eq(taskTable.isCompleted, false),
        ))
    const importantCount = await db
        .select({ value: count() })
        .from(taskTable)
        .where(and(
            eq(taskTable.userId, session.user.id),
            eq(taskTable.isImportant, true),
            eq(taskTable.isCompleted, false),
        ))
    const tasksCount = await db
        .select({ value: count() })
        .from(taskTable)
        .where(and(
            eq(taskTable.userId, session.user.id),
            eq(taskTable.isCompleted, false),
        ))
    const inPlanCount = await db
        .select({ value: count() })
        .from(taskTable)
        .where(and(
            eq(taskTable.userId, session.user.id),
            isNotNull(taskTable.dueDate),
            eq(taskTable.isCompleted, false),
        ))

    const counts = {
        myDay: myDayCount[0].value,
        inPlan: inPlanCount[0].value,
        important: importantCount[0].value,
        tasks: tasksCount[0].value,
    };

    return counts;
}

export async function fetchListsCounts(session: Session) {

    const lists = await db
        .select()
        .from(listTable)
        .where(and(
            eq(listTable.userId, session.user.id),
        ));

    const counts = await Promise.all(
        lists.map(async (list) => {
            const listCount = await db
                .select({ value: count() })
                .from(taskTable)
                .where(and(
                    eq(taskTable.userId, session.user.id),
                    eq(taskTable.inListId, list.id),
                    eq(taskTable.isCompleted, false),
                ))

            return {
                list: list,
                count: listCount[0].value
            }
        })
    );

    return counts;
}