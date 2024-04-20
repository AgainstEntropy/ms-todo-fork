import AddTask from "@/components/add-task";
import TaskList from "@/components/task-list";
import TaskListWithExpandButton from "@/components/task-list-completed";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { HomeIcon } from "@radix-ui/react-icons";
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
        <div className="h-full flex flex-col justify-between bg-accent-task-foreground dark:bg-background sm:rounded-l-lg ">
            <div>
                <h1 className="flex items-center font-bold text-3xl mb-6 text-white dark:text-accent-task-foreground">
                    <HomeIcon className="w-8 h-8 mr-3" /> Tasks
                </h1>
                {res.length > 0 ? (
                    <TaskList tasks={res} />
                ) : (
                    <p>No task now! Have a good rest!</p>
                )
                }
                {resCompleted.length > 0 &&
                    <TaskListWithExpandButton tasks={resCompleted} />
                }
            </div>
            <AddTask isImportant={false} isMyDay={false} />
        </div>
    );
};

export default Page;