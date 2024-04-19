"use client";

import { Checkbox } from "./ui/checkbox";
import TaskDrawer from "./task-drawer";
import { Task } from "@/types/task";
import completeTask from "@/actions/complete-task";
import ImportantToggle from "./important-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function TaskList({ tasks }: { tasks: Task[] }) {

    async function checkTask(task: Task) {
        await completeTask(task.id, true);
    }

    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-1 justify-between text-accent-blue-foreground">
            {tasks.map((task) => (
                <div key={task.id}
                    className={cn(
                        "flex items-center bg-accent rounded text-foreground",
                        pathname === "/tasks" && "hover:bg-sky-100 dark:hover:bg-slate-700",
                        pathname === "/important" && "hover:bg-pink-100 dark:hover:bg-pink-700/50",
                        pathname === "/myday" && "hover:bg-green-100 dark:hover:bg-green-700/50"
                    )}>
                    <div className="p-3">
                        <Checkbox className="rounded-full"
                            checked={task.isCompleted as boolean}
                            onClick={() => checkTask(task)} />
                    </div>
                    <div className="flex-auto">
                        <TaskDrawer task={task}/>
                        {/* modify this with pnpm dlx shadcn-ui@latest add sheet */}
                    </div>
                    <ImportantToggle task={task} />
                </div>
            ))}
        </div>
    );
}