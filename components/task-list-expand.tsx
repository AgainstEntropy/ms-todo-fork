"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Task } from "@/types/task";
import TaskList from "./task-list";
import { cn } from "@/lib/utils";

export default function TaskListWithExpandButton({ 
  tasks,
  buttonName = "Completed",
  expandByDefault = false
}: { 
  tasks: Task[]
  buttonName?: string
  expandByDefault?: boolean
}) {

  const [open, setOpen] = useState(expandByDefault);

  return (
    <div>
      <div className="my-4">
        <Button variant={'outline'}
          className="bg-accent/85 h-8 text-sm px-3"
          onClick={() => setOpen(!open)}
        >
          <ChevronRightIcon className={cn(
            "mr-2 h-4 w-4",
            "transform transition",
            open ? "rotate-90" : "rotate-0"
          )} />
          {buttonName} &nbsp;{tasks.length}
        </Button>
      </div>
      {open &&
        <TaskList tasks={tasks} />
      }
    </div>
  );
}