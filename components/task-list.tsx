"use client";

import { Checkbox } from "./ui/checkbox";
import TaskDrawer from "./task-drawer";
import { Task } from "@/types/task";
import ImportantToggle from "./important-toggle";
import { usePathname } from "next/navigation";
import { cn, getToday } from "@/lib/utils";
import TaskSheet from "./task-sheet";
import updateTask from "@/actions/update-task";

export default function TaskList({
  tasks,
  className
}: {
  tasks: Task[],
  className?: string
}) {

  async function toggleComplete(task: Task) {
    await updateTask(task.id, {
      isCompleted: !task.isCompleted,
      completeDate: task.isCompleted ? null : getToday()
    });
  }

  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1 justify-between">
      {/* TODO: add Context Menu on each task item */}
      {tasks.map((task) => (
        <div key={task.id}
          className={cn(
            "flex items-center bg-accent rounded text-foreground",
            pathname === "/tasks" && "hover:bg-white dark:hover:bg-slate-700",
            pathname === "/important" && "hover:bg-pink-100 dark:hover:bg-pink-700/50",
            pathname === "/myday" && "hover:bg-green-100 dark:hover:bg-green-700/50"
          )}>
          <div className="p-3">
            <Checkbox className={`rounded-full ${className}`}
              checked={task.isCompleted as boolean}
              onClick={() => toggleComplete(task)} />
          </div>
          <div className="flex-auto sm:hidden">
            <TaskDrawer task={task} />
          </div>
          <div className="flex-auto hidden sm:block">
            <TaskSheet task={task} />
          </div>
          <ImportantToggle task={task} />
        </div>
      ))}
    </div>
  );
}