import AddTask from "@/components/add-task";
import TaskList from "@/components/task-list";
import TaskListWithExpandButton from "@/components/task-list-completed";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { StarIcon } from "@radix-ui/react-icons";
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
      eq(tasks.isImportant, true),
      eq(tasks.isCompleted, false),
    )
  });

  const resCompleted = await db.query.tasks.findMany({
    where: and(
      eq(tasks.userId, session.user.id),
      eq(tasks.isImportant, true),
      eq(tasks.isCompleted, true),
    )
  });

  return (
    <div className="flex flex-col text-accent-pink-foreground">
      <h1 className="flex items-center font-bold text-3xl mb-6">
        <StarIcon className="w-8 h-8 mr-3" /> Important
      </h1>
      {res.length > 0 ? (
        <TaskList tasks={res} />
      ) : (
        <p>No important task now! Have a good rest!</p>
      )
      }
      {resCompleted.length > 0 &&
        <TaskListWithExpandButton tasks={resCompleted} />
      }
      <AddTask isImportant={true} isMyDay={false} />
    </div>
  );
};

export default Page;