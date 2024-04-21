"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Task } from "@/types/task";
import TaskList from "./task-list";
import { cn } from "@/lib/utils";

export default function TaskListWithExpandButton({ 
  tasks,
  buttonName,
}: { 
  tasks: Task[]
  buttonName?: string
}) {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="my-4">
        <Button variant={'outline'}
          className=" bg-accent/85"
          onClick={() => setOpen(!open)}
        >
          <ChevronRightIcon className={cn(
            "mr-2 h-4 w-4",
            "transform transition",
            open ? "rotate-90" : "rotate-0"
          )} />
          {buttonName || "Completed"} &nbsp;{tasks.length}
        </Button>
      </div>
      {open &&
        <TaskList tasks={tasks} className="translate-y-0.5" />
      }
    </div>
  );
}