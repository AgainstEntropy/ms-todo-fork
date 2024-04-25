import TaskList from "@/components/task-list";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { taskTable } from "@/lib/schema";
import { StarIcon } from "@radix-ui/react-icons";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const Page = async () => {

  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const res = await db.select()
    .from(taskTable)
    .where(and(
      eq(taskTable.userId, session.user.id),
      eq(taskTable.isImportant, true),
      eq(taskTable.isCompleted, false),
    ));

  return (
    <div className="flex flex-col">
      <h1 className="flex items-center font-bold text-3xl mb-6">
        <StarIcon className="w-8 h-8 mr-3" /> Important
      </h1>
      {res.length > 0 ? (
        <TaskList tasks={res} />
      ) : (
        <p>No important task now! Have a good rest!</p>
      )}
    </div>
  );
};

export default Page;