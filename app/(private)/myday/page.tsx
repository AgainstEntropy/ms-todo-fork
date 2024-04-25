import TaskList from "@/components/task-list";
import TaskListWithExpandButton from "@/components/task-list-expand";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskTable } from "@/lib/schema";
import { SunIcon } from "@radix-ui/react-icons";
import { and, eq, or } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async () => {

  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const res = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.userId, session.user.id),
      or(
        eq(taskTable.addedToMyDayManually, true),
        eq(taskTable.addedToMyDayAutomatically, true),
      ),
      eq(taskTable.isCompleted, false),
    )
  });

  const resCompleted = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.userId, session.user.id),
      or(
        eq(taskTable.addedToMyDayManually, true),
        eq(taskTable.addedToMyDayAutomatically, true),
      ),
      eq(taskTable.isCompleted, true),
    )
  });

  return (
    <div className="flex flex-col text-accent-green-foreground">
      <h1 className="flex items-center font-bold text-3xl mb-6">
        <SunIcon className="w-8 h-8 mr-3" /> My Day
      </h1>
      {res.length > 0 ? (
        <TaskList tasks={res} />
      ) : (
        <p>No task today! Have a good rest!</p>
      )}
      {resCompleted.length > 0 &&
        <TaskListWithExpandButton tasks={resCompleted} />}
    </div>
  );
};

export default Page;