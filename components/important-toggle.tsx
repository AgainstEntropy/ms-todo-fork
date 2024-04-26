"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Tooltip } from "@nextui-org/tooltip";

import { updateTask } from "@/actions/task";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { TaskType } from "@/lib/schema";


export default function ImportantToggle({ task }: { task: TaskType }) {
  async function toggleImportant(task: TaskType) {
    await updateTask(task.id, { isImportant: !task.isImportant });
  }

  const pathname = usePathname();

  return (
    <Tooltip content={task.isImportant ? 'Remove from important' : 'Mark as important'}>
      <Button variant={"link"}
        className="p-0 mr-3"
        onClick={() => toggleImportant(task)}
      >
        {task.isImportant ?
          <StarFilledIcon className={cn(
            "w-5 h-5",
            pathname === "/tasks" && "text-task-foreground",
            pathname === "/important" && "text-important-foreground",
            pathname === "/myday" && "text-accent-green-foreground",
            pathname === "/inplan" && "text-inplan-foreground",
            pathname === "/search" && "text-muted-foreground",
          )} /> :
          <StarIcon className={cn(
            "w-5 h-5",
            pathname === "/tasks" && "hover:text-task-foreground",
            pathname === "/important" && "hover:text-important-foreground",
            pathname === "/myday" && "hover:text-accent-green-foreground",
            pathname === "/inplan" && "hover:text-inplan-foreground",
            pathname === "/search" && "text-muted-foreground",
          )} />
        }
      </Button>
    </Tooltip>
  )
}