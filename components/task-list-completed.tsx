"use client";

import { useState } from "react";

import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import CompleteTask from "@/actions/complete-task";
import { Task } from "@/types/task";
import TaskDrawer from "./task-drawer";

export default function TaskListCompleted({ tasks }: { tasks: Task[] }) {

    const [open, setOpen] = useState(false);

    async function uncheckTask(task: Task) {
        await CompleteTask(task.id, false);
    }

    return (
        <div className="flex flex-col gap-1 justify-between text-accent-blue-foreground">
            <Button onClick={() => setOpen(!open)} variant="ghost" className="w-32 my-4 bg-accent hover:bg-accent/50">
                {open ? <ChevronDownIcon className="mr-2 h-4 w-4"/> : <ChevronRightIcon className="mr-2 h-4 w-4"/>} Completed 
            </Button>
            {open && 
                tasks.map((task) => (
                    <div key={task.id}
                        className="flex items-center bg-accent hover:bg-sky-100 rounded text-foreground">
                        <div className="p-3">
                            <Checkbox checked={task.isCompleted as boolean}
                                onClick={() => uncheckTask(task)} />
                        </div>
                        <div className="flex-auto">
                            <TaskDrawer task={task}/>
                        </div>
                    </div>
                ))}
        </div>
    );
}