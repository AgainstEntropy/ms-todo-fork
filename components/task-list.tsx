"use client";

import { Checkbox as NextCheckbox } from "@nextui-org/checkbox";
import TaskDrawer from "./task-drawer";
import ImportantToggle from "./important-toggle";
import { usePathname } from "next/navigation";
import { cn, getToday } from "@/lib/utils";
import TaskSheet from "./task-sheet";
import updateTask from "@/actions/update-task";
import { compareAsc, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { TaskType } from "@/lib/schema";

export default function TaskList({
  tasks,
}: {
  tasks: TaskType[],
}) {

  async function toggleComplete(task: TaskType) {
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
            pathname === "/important" && "hover:bg-primary-foreground dark:hover:bg-pink-700/50",
            pathname === "/myday" && "hover:bg-green-100 dark:hover:bg-green-700/50"
          )}>
          <div className="p-3">
            <NextCheckbox className="p-0 m-0"
              radius="full" color="secondary" size="md"
              isSelected={task.isCompleted as boolean}
              onClick={() => toggleComplete(task)} />
          </div>
          <div className="flex-auto">
            <div className="w-full sm:hidden">
              <TaskDrawer task={task} />
            </div>
            <div className="w-full hidden sm:block">
              <TaskSheet task={task} />
            </div>
            {task.dueDate && (
              <p className={cn(
                "flex items-center text-muted-foreground text-xs -translate-y-0.5",
                !task.isCompleted && compareAsc(new Date(task.dueDate), new Date(getToday())) < 0 && "text-red-500",
                compareAsc(new Date(task.dueDate), new Date(getToday())) == 0 && "text-sky-600",
              )}>
                <CalendarIcon className="w-3 h-3 mr-1 " /> {
                  compareAsc(new Date(task.dueDate), new Date(getToday())) == 0
                    ? "Today"
                    : format(new Date(task.dueDate), "EEE, MMM d")}
              </p>
            )}
          </div>
          <ImportantToggle task={task} />
        </div>
      ))}
    </div>
  );
}