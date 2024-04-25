import ListTitle from "@/components/list-title";
import { PageMenu } from "@/components/page-menu";
import TaskList from "@/components/task-list";
import TaskListWithExpandButton from "@/components/task-list-expand";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { listTable, taskTable } from "@/lib/schema";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { listId: number } }) => {

    const session = await auth();

    if (!session) {
        redirect('/');
    }

    const lists = await db
        .selectDistinct()
        .from(listTable)
        .where(and(
            eq(listTable.userId, session.user.id),
            eq(listTable.id, params.listId)
        ));
    const list = lists[0];

    if (!list) {
        return <div>List Not found</div>
    }

    const res = await db.select()
        .from(taskTable)
        .where(and(
            eq(taskTable.userId, session.user.id),
            eq(taskTable.inListId, params.listId),
            eq(taskTable.isCompleted, false)
        ));

    const resCompleted = await db.select()
        .from(taskTable)
        .where(and(
            eq(taskTable.userId, session.user.id),
            eq(taskTable.inListId, params.listId),
            eq(taskTable.isCompleted, true)
        ));

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <ListTitle list={list} />
                <PageMenu listId={list.id}/>
            </div>
            {res.length > 0 && (
                <TaskList tasks={res} />
            )
            }
            {resCompleted.length > 0 &&
                <TaskListWithExpandButton tasks={resCompleted} />
            }
        </div>
    );
};

export default Page;