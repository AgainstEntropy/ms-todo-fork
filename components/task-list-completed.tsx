"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Task } from "@/types/task";
import TaskList from "./task-list";

export default function TaskListCompleted({ tasks }: { tasks: Task[] }) {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="my-4">
        <Button variant="secondary"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChevronDownIcon className="mr-2 h-4 w-4" />
          ) : (
            <ChevronRightIcon className="mr-2 h-4 w-4" />
          )} Completed &nbsp;{tasks.length}
        </Button>
      </div>
      {open &&
        <TaskList tasks={tasks} className="translate-y-0.5" />
      }
    </div>
  );
}