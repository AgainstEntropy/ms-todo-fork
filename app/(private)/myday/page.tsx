import AddTask from "@/components/add-task";
import TaskList from "@/components/task-list";
import TaskListCompleted from "@/components/task-list-completed";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { getFormatDate } from "@/lib/utils";
import { SunIcon } from "@radix-ui/react-icons";
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
      eq(tasks.addedToMyDayOn, getFormatDate()),
      eq(tasks.isCompleted, false),
    )
  });

  const resCompleted = await db.query.tasks.findMany({
    where: and(
      eq(tasks.userId, session.user.id),
      eq(tasks.addedToMyDayOn, getFormatDate()),
      eq(tasks.isCompleted, true),
    )
  });

  return (
    <div className="flex flex-col justify-between text-accent-green-foreground">
      <h1 className="flex items-center font-bold text-3xl mb-6">
        <SunIcon className="w-8 h-8 mr-3" /> My Day
      </h1>
      {res.length > 0 ? (
        <TaskList tasks={res} />
      ) : (
        <p>No task today! Have a good rest!</p>
      )
      }
      <div>
        {resCompleted.length > 0 && <TaskListCompleted tasks={resCompleted} />}
      </div>
      <div>
        <AddTask isImportant={false} isMyDay={true} />
      </div>
    </div>
  );
};

export default Page;