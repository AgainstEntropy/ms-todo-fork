import TaskListWithExpandButton from "@/components/task-list-expand";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskTable } from "@/lib/schema";
import { getToday } from "@/lib/utils";
import { LayoutIcon } from "@radix-ui/react-icons";
import { and, eq, lt, gt, isNotNull } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async () => {

  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const resOverdue = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.userId, session.user.id),
      isNotNull(taskTable.dueDate),
      eq(taskTable.isCompleted, false),
      lt(taskTable.dueDate, getToday()),
    )
  });

  const resToday = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.userId, session.user.id),
      isNotNull(taskTable.dueDate),
      eq(taskTable.dueDate, getToday()),
    )
  });
  
  const resLater = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.userId, session.user.id),
      isNotNull(taskTable.dueDate),
      gt(taskTable.dueDate, getToday()),
    )
  });

  return (
    <div className="flex flex-col text-inplan-foreground">
      <h1 className="flex items-center font-bold text-3xl mb-6">
        <LayoutIcon className="w-8 h-8 mr-3" /> Planned
      </h1>
      {resOverdue.length > 0 && (
        <TaskListWithExpandButton tasks={resOverdue} buttonName="Overdue" expandByDefault={true}/>
      )}
      {resToday.length > 0 && (
        <TaskListWithExpandButton tasks={resToday} buttonName="Today" expandByDefault={true}/>
      )}
      {resLater.length > 0 && (
        <TaskListWithExpandButton tasks={resLater} buttonName="Today" expandByDefault={true}/>
      )}
    </div>
  );
};

export default Page;