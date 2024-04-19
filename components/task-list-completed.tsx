"use client";

import { useState } from "react";

import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import completeTask from "@/actions/complete-task";
import { Task } from "@/types/task";
import TaskDrawer from "./task-drawer";
import ImportantToggle from "./important-toggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function TaskListCompleted({ tasks }: { tasks: Task[] }) {

    const [open, setOpen] = useState(false);

    async function uncheckTask(task: Task) {
        await completeTask(task.id, false);
    }

    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-1 justify-between">
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
                tasks.map((task) => (
                    <div key={task.id}
                        className={cn(
                            "flex items-center bg-accent rounded text-foreground",
                            pathname === "/tasks" && "hover:bg-sky-100 dark:hover:bg-slate-700",
                            pathname === "/important" && "hover:bg-pink-100 dark:hover:bg-pink-700/50",
                            pathname === "/myday" && "hover:bg-green-100 dark:hover:bg-green-700/50"
                        )}>
                        <div className="p-3">
                            <Checkbox className="rounded-full translate-y-0.5"
                                checked={task.isCompleted as boolean}
                                onClick={() => uncheckTask(task)} />
                        </div>
                        <div className="flex-auto">
                            <TaskDrawer task={task} />
                        </div>
                        <ImportantToggle task={task} />
                    </div>
                ))}
        </div>
    );
}