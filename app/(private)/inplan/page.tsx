import TaskListWithExpandButton from "@/components/task-list-expand";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { getToday } from "@/lib/utils";
import { LayoutIcon } from "@radix-ui/react-icons";
import { and, eq, isNotNull } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async () => {

  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const resToday = await db.query.tasks.findMany({
    where: and(
      eq(tasks.userId, session.user.id),
      isNotNull(tasks.dueDate),
      eq(tasks.dueDate, getToday()),
    )
  });

  return (
    <>
      <div className="flex flex-col text-inplan-foreground">
        <h1 className="flex items-center font-bold text-3xl mb-6">
          <LayoutIcon className="w-8 h-8 mr-3" /> In Plan
        </h1>
        {resToday.length > 0 && (
          <TaskListWithExpandButton tasks={resToday} buttonName="Today" expandByDefault={true}/>
        )}
      </div>
    </>
  );
};

export default Page;