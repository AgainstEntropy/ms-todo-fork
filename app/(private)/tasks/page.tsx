import AddTask from "@/components/add-task";
import TaskList from "@/components/task-list";
import TaskListCompleted from "@/components/task-list-completed";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async () => {

    const session = await auth();

    if (!session) {
        redirect('/');
    }

    const res = await db.query.tasks.findMany({
        where: and(
            eq(tasks.userId, session.user.id),
            eq(tasks.isCompleted, false)
        )
    });

    const resCompleted = await db.query.tasks.findMany({
        where: and(
            eq(tasks.userId, session.user.id),
            eq(tasks.isCompleted, true)
        )
    });

    return (
        <div className="flex flex-col justify-between text-accent-blue-foreground">
            <h1 className="font-bold text-3xl mb-4">Tasks</h1>
            {res.length > 0 ? (
                <TaskList tasks={res}/>
            ) : (
                <p>No task now! Have a good rest!</p>
            )
            }
            <div>
                {resCompleted.length > 0 && <TaskListCompleted tasks={resCompleted}/>}
            </div>
            <div>
                <AddTask/>
            </div>
        </div>
    );
};

export default Page;